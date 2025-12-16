import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

// -------------------------
// DOCX extraction
// -------------------------
async function extractDocxText(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || "";
  } catch {
    return buffer.toString("utf-8");
  }
}

// -------------------------
function normalizeText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function buildKeywords(jd: string) {
  const stopwords = new Set([
    "and",
    "or",
    "the",
    "a",
    "an",
    "for",
    "to",
    "of",
    "in",
    "with",
    "on",
    "at",
    "by",
    "is",
    "are",
    "as",
    "be",
    "this",
    "that",
    "will",
    "you",
    "we",
    "our",
    "your",
  ]);

  return jd
    .toLowerCase()
    .split(/[^a-z0-9+]+/g)
    .filter((t) => t.length >= 3 && !stopwords.has(t));
}

function computeMatch(jdKeywords: string[], resume: string) {
  const tokens = new Set(
    resume.toLowerCase().split(/[^a-z0-9+]+/g).filter((t) => t.length >= 3)
  );

  const matched: string[] = [];
  const missing: string[] = [];

  for (const kw of jdKeywords) {
    if (tokens.has(kw)) matched.push(kw);
    else missing.push(kw);
  }

  const total = jdKeywords.length || 1;
  const matchPercent = Math.round((matched.length / total) * 100);

  return {
    matched,
    missing,
    matchPercent,
    score: matchPercent / 100,
  };
}

function makeSummary(
  name: string,
  pct: number,
  matched: string[],
  missing: string[]
) {
  return [
    `${name} is a ${pct >= 80 ? "strong" : pct >= 60 ? "moderate" : "low"} match (${pct}%).`,
    matched.length > 0
      ? `Strengths: ${matched.slice(0, 5).join(", ")}.`
      : `No overlapping strengths found.`,
    missing.length > 0 ? `Missing/weak: ${missing.slice(0, 5).join(", ")}.` : "",
  ].filter(Boolean);
}

// ✅ NEW: Turn keywords into human-friendly insight bullets
function pickTop(list: string[], max: number) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const x of list) {
    const k = x.toLowerCase();
    if (!seen.has(k)) {
      seen.add(k);
      out.push(x);
    }
    if (out.length >= max) break;
  }
  return out;
}

function bucketize(keywords: string[]) {
  const buckets = {
    cloud: [] as string[],
    data: [] as string[],
    backend: [] as string[],
    frontend: [] as string[],
    devops: [] as string[],
    security: [] as string[],
    leadership: [] as string[],
    general: [] as string[],
  };

  const cloud = new Set(["aws", "azure", "gcp", "cloud", "ec2", "s3", "lambda", "kubernetes", "k8s"]);
  const data = new Set(["sql", "postgres", "mysql", "mongodb", "etl", "warehouse", "snowflake", "bigquery", "spark"]);
  const backend = new Set(["node", "nodejs", "java", "spring", "python", "fastapi", "django", "api", "microservices"]);
  const frontend = new Set(["react", "nextjs", "next", "angular", "vue", "typescript", "javascript", "ui", "frontend"]);
  const devops = new Set(["docker", "ci", "cd", "cicd", "jenkins", "github", "gitlab", "terraform", "ansible"]);
  const security = new Set(["security", "oauth", "sso", "jwt", "hipaa", "pci", "gdpr", "soc2"]);
  const leadership = new Set(["lead", "leadership", "mentor", "stakeholder", "roadmap", "strategy", "ownership", "communication"]);

  for (const k of keywords) {
    const t = k.toLowerCase();
    if (cloud.has(t)) buckets.cloud.push(k);
    else if (data.has(t)) buckets.data.push(k);
    else if (backend.has(t)) buckets.backend.push(k);
    else if (frontend.has(t)) buckets.frontend.push(k);
    else if (devops.has(t)) buckets.devops.push(k);
    else if (security.has(t)) buckets.security.push(k);
    else if (leadership.has(t)) buckets.leadership.push(k);
    else buckets.general.push(k);
  }

  return buckets;
}

function makeInsights(
  name: string,
  matchPercent: number,
  matched: string[],
  missing: string[]
): { strengths: string[]; gaps: string[] } {
  const m = bucketize(matched);
  const g = bucketize(missing);

  const strengths: string[] = [];
  const gaps: string[] = [];

  // Strengths (2–3 bullets)
  if (matchPercent >= 80) strengths.push("Strong alignment with the role requirements based on skills coverage.");
  else if (matchPercent >= 60) strengths.push("Good baseline alignment; core skills match many role requirements.");
  else strengths.push("Some alignment present, but key requirements appear to be missing or under-emphasized.");

  // Prefer category-based strengths
  const strengthCats: Array<[string, string[]]> = [
    ["Relevant cloud/platform skills", m.cloud],
    ["Relevant data & database skills", m.data],
    ["Relevant backend/service skills", m.backend],
    ["Relevant frontend/UI skills", m.frontend],
    ["Relevant DevOps/tooling", m.devops],
    ["Relevant security/compliance", m.security],
    ["Leadership / ownership indicators", m.leadership],
  ];

  for (const [label, arr] of strengthCats) {
    const top = pickTop(arr, 4);
    if (top.length > 0) {
      strengths.push(`${label}: ${top.join(", ")}.`);
      break;
    }
  }

  // If no categorized skills, fall back to general matched terms in a sentence
  if (strengths.length < 2) {
    const topGeneral = pickTop(matched, 5);
    if (topGeneral.length > 0) strengths.push(`Relevant skills mentioned that match the JD: ${topGeneral.join(", ")}.`);
    else strengths.push("Resume includes some relevant experience, but skill signals are weak or unclear.");
  }

  // Add a structure/clarity style bullet (generic but useful)
  strengths.push("Experience section can be strengthened further by adding measurable outcomes (impact, scale, metrics).");

  // Gaps (2–3 bullets)
  const gapCats: Array<[string, string[] , string]> = [
    ["Cloud keywords", g.cloud, "Add cloud/platform keywords and examples where applicable."],
    ["Data/SQL keywords", g.data, "Add missing data/SQL terms and concrete examples of usage."],
    ["Backend/API keywords", g.backend, "Highlight backend/API work with specific technologies and responsibilities."],
    ["Frontend/UI keywords", g.frontend, "If relevant, include UI/frontend technologies and deliverables."],
    ["DevOps keywords", g.devops, "Mention CI/CD, containerization, and deployment practices if you have them."],
    ["Security/compliance keywords", g.security, "Include security/compliance keywords (and examples) if applicable."],
    ["Leadership indicators", g.leadership, "Add leadership/ownership examples (scope, decisions, mentoring, stakeholder management)."],
  ];

  let addedGap = false;
  for (const [label, arr, advice] of gapCats) {
    const top = pickTop(arr, 4);
    if (top.length > 0) {
      gaps.push(`${label} appear missing: ${top.join(", ")}. ${advice}`);
      addedGap = true;
      break;
    }
  }

  if (!addedGap) {
    const topMissing = pickTop(missing, 5);
    if (topMissing.length > 0) {
      gaps.push(`Missing role keywords that may hurt ATS matching: ${topMissing.join(", ")}.`);
    } else {
      gaps.push("Consider tailoring keywords and phrasing more closely to the job description.");
    }
  }

  gaps.push("Improve clarity by adding 1–2 quantified achievements per role (e.g., % improvement, $ impact, scale).");

  // Limit to clean bullet count
  return {
    strengths: strengths.slice(0, 3),
    gaps: gaps.slice(0, 3),
  };
}

// -------------------------
// MAIN HANDLER
// -------------------------
export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = session.user;

    // ======================================================
    // 🔐 STEP 1 — CHECK USER SUBSCRIPTION / CREDITS
    // ======================================================
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileErr || !profile) {
      console.error("Profile fetch error:", profileErr);
      return NextResponse.json({ error: "User profile not found" }, { status: 400 });
    }

    // ⛔ Block if subscription expired / inactive
    if (profile.stripe_subscription_status === "inactive") {
      return NextResponse.json(
        { error: "Your subscription is inactive. Please upgrade." },
        { status: 402 }
      );
    }

    // ⛔ Free tier limit: 10 analyses
    if (profile.stripe_subscription_status === "free") {
      if (profile.credits_used >= profile.credits_limit) {
        return NextResponse.json(
          {
            error: "Free-tier limit reached",
            message: "Upgrade to Pro for unlimited resume analysis.",
          },
          { status: 402 }
        );
      }
    }

    // ======================================================
    // Continue existing logic
    // ======================================================

    const formData = await req.formData();
    const jobDescription = formData.get("jobDescription") as string;
    const files = formData.getAll("resumes") as File[];

    if (!jobDescription || files.length === 0) {
      return NextResponse.json({ error: "Missing job description or files" }, { status: 400 });
    }

    const jdText = normalizeText(jobDescription);
    const keywords = buildKeywords(jdText);

    // Create ranking session
    const { data: sessionRow, error: sessionErr } = await supabase
      .from("ranking_sessions")
      .insert({
        user_id: user.id,
        job_description: jdText,
      })
      .select()
      .single();

    if (sessionErr || !sessionRow) {
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }

    const sessionId = sessionRow.id;
    const results: any[] = [];
    const dbRows: any[] = [];

    // Loop each file
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const path = `${user.id}/${sessionId}/${Date.now()}_${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(path, buffer, {
          upsert: false,
          contentType: file.type || "application/octet-stream",
        });

      if (uploadError) console.error("🚨 UPLOAD ERROR:", uploadError);

      // Extract text
      let text = "";

      if (file.name.toLowerCase().endsWith(".pdf")) {
        const pdfModule: any = await import("pdf-parse");
        const pdfParse = pdfModule; // use the module directly
        const parsed = await pdfParse(buffer);
        text = parsed.text || "";
      } else if (file.name.toLowerCase().endsWith(".docx")) {
        text = await extractDocxText(buffer);
      } else {
        text = buffer.toString("utf-8");
      }

      text = normalizeText(text);

      const snippet = text.slice(0, 400);
      const firstLine = text.split("\n")[0]?.trim() || "";
      const name =
        firstLine.length > 0 && firstLine.length < 80
          ? firstLine
          : file.name.replace(/\.(pdf|docx)$/i, "");

      const { matched, missing, matchPercent, score } = computeMatch(keywords, text);

      const summary = makeSummary(name, matchPercent, matched, missing);

      // ✅ NEW: Insight bullets (human-friendly)
      const { strengths, gaps } = makeInsights(name, matchPercent, matched, missing);

      const row = {
        candidate_name: name,
        snippet,
        score,
        keyword_match_percent: matchPercent,
        matched_keywords: matched,
        missing_keywords: missing,

        // ✅ Keep existing summary for backward compatibility
        summary,

        // ✅ NEW fields for better UX (response only)
        strengths,
        gaps,

        full_text: text,
        file_name: file.name,
        storage_path: path,
      };

      results.push(row);

      // ✅ IMPORTANT: Keep DB insert schema safe (do NOT add new columns unless they exist)
      dbRows.push({
        session_id: sessionId,
        candidate_name: name,
        snippet,
        score,
        keyword_match_percent: matchPercent,
        matched_keywords: matched,
        missing_keywords: missing,
        summary,
        full_text: text,
        file_name: file.name,
        storage_path: path,
      });
    }

    // Insert results
    await supabase.from("ranking_results").insert(dbRows);

    // Sort results
    results.sort((a, b) => b.score - a.score);

    // ======================================================
    // 🎯 STEP 2 — INCREMENT USER CREDITS
    // ======================================================
    await supabase
      .from("profiles")
      .update({
        credits_used: profile.credits_used + 1,
      })
      .eq("id", user.id);

    // ======================================================
    // 🎁 Include remaining credits in response
    // ======================================================
    const remainingCredits = profile.credits_limit - (profile.credits_used + 1);

    return NextResponse.json({
      sessionId,
      results,
      creditsUsed: profile.credits_used + 1,
      creditsLimit: profile.credits_limit,
      remainingCredits,
      subscriptionStatus: profile.stripe_subscription_status,
    });
  } catch (err) {
    console.error("ERROR /api/rank:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
