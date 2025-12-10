"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900">

      {/* 🌟 STICKY NAVBAR */}
      <header className="sticky top-0 z-50 bg-indigo-900/80 backdrop-blur-md border-b border-indigo-700 shadow-lg">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4 text-white">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-yellow-400 rounded-lg shadow-md" />
            <span className="font-bold text-lg tracking-tight">
              TalentRank AI
            </span>
          </div>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-yellow-300">Features</a>
            <a href="#how-it-works" className="hover:text-yellow-300">How it works</a>
            <a href="#pricing" className="hover:text-yellow-300">Pricing</a>
          </nav>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm hover:text-yellow-300">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-yellow-300"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* 🌟 HERO SECTION */}
      <section className="flex-1 bg-gradient-to-b from-slate-100 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24 grid gap-12 lg:grid-cols-2 items-center">

          {/* LEFT TEXT CONTENT */}
          <div>
            <p className="mb-3 text-xs font-semibold tracking-wide text-indigo-700 uppercase">
              For recruiters & job applicants
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Rank resumes in minutes.<br />
              Improve them in seconds.
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-xl">
              TalentRank AI ingests your job description and bulk resumes, then
              ranks candidates by true role fit — so your team focuses on
              interviews, not manual filtering.
            </p>

            {/* HR VALUE PROPOSITION */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-sm">
              <h3 className="font-semibold text-yellow-700 text-sm">
                For HR & Recruiting Teams
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Upload hundreds of resumes and a job description, and let AI
                automatically produce a <strong>rank-ordered shortlist</strong> with skill match,
                experience relevance, and red-flag detection — saving hours of
                manual resume screening.
              </p>
            </div>

            {/* APPLICANT VALUE PROPOSITION */}
            <div className="mt-4 bg-indigo-50 border border-indigo-200 p-4 rounded-xl shadow-sm">
              <h3 className="font-semibold text-indigo-700 text-sm">
                For job seekers
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Upload your resume and the job description to instantly see your
                <strong> Match Score</strong>, AI insights, and personalized suggestions
                to <strong>improve your resume</strong> so you rank higher.
              </p>
            </div>

            {/* CTA BUTTONS */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 shadow"
              >
                Start ranking resumes
              </Link>

              <span className="text-xs text-slate-500">
                No credit card required • Built for recruiters & applicants
              </span>
            </div>
          </div>

          {/* ⭐ RIGHT IMAGE / APP PREVIEW (BIGGER & CLEARER) */}
          <div className="rounded-2xl border bg-white p-5 shadow-2xl mx-auto 
                          max-w-[520px] lg:max-w-[560px]">
            <Image
              src="/screenshot.png"
              width={560}
              height={360}
              alt="TalentRank AI dashboard preview"
              className="rounded-lg border shadow-lg object-cover"
              style={{
                maxHeight: "360px",
                width: "100%",
                objectFit: "contain",
              }}
            />

            <p className="mt-3 text-xs text-slate-500 text-center">
              Example AI ranking view — upload resumes to see your own results
            </p>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="border-t bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Built for hiring at scale — and job seekers who want to stand out
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border bg-slate-50 p-4">
              <h3 className="text-sm font-semibold">Bulk resume intake</h3>
              <p className="mt-2 text-xs text-slate-600">
                Upload hundreds of resumes instantly. AI parses everything.
              </p>
            </div>

            <div className="rounded-xl border bg-slate-50 p-4">
              <h3 className="text-sm font-semibold">AI-powered ranking</h3>
              <p className="mt-2 text-xs text-slate-600">
                Skill match • Experience relevance • Career progression
              </p>
              <p className="text-xs text-green-600 mt-1">
                Applicants: Improve match score using AI rewrite tools.
              </p>
            </div>

            <div className="rounded-xl border bg-slate-50 p-4">
              <h3 className="text-sm font-semibold">ATS-friendly exports</h3>
              <p className="mt-2 text-xs text-slate-600">
                Export ranked shortlists to CSV or ATS platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-slate-950 text-slate-500 text-xs">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <span>© {new Date().getFullYear()} TalentRank AI.</span>
          <span>AI for hiring teams & job seekers.</span>
        </div>
      </footer>

    </main>
  );
}
