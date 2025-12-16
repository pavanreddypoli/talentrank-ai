"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import confetti from "canvas-confetti";
import SparkleSuccess from "@/components/SparkleSuccess";
import DownloadResumeButton from "@/components/DownloadResumeButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Upload, FileText, Sparkles, Loader2, Wand2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/* -----------------------------
   Score badge logic
------------------------------ */
function getScoreInfo(score: number) {
  if (score >= 85)
    return {
      label: "Strong match",
      className: "bg-emerald-100 text-emerald-700",
    };
  if (score >= 60)
    return {
      label: "Potential fit",
      className: "bg-amber-100 text-amber-700",
    };
  return {
    label: "Low match",
    className: "bg-rose-100 text-rose-700",
  };
}

/* -----------------------------
   MAIN DASHBOARD CLIENT
------------------------------ */
export default function DashboardClient() {
  const [jobDescription, setJobDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = (accepted: File[]) => setFiles(accepted);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
  });

  async function handleUpload() {
    if (!jobDescription || !files.length) {
      alert("Upload your resume and paste a job description.");
      return;
    }

    setLoading(true);
    setResults([]);
    setProgress(0);

    const interval = setInterval(
      () => setProgress((p) => Math.min(p + Math.random() * 12, 95)),
      300
    );

    try {
      const fd = new FormData();
      fd.append("jobDescription", jobDescription);
      files.forEach((f) => fd.append("resumes", f));

      const res = await fetch("/api/rank", { method: "POST", body: fd });
      const data = await res.json();

      clearInterval(interval);
      setProgress(100);

      if (!res.ok) throw new Error(data.error);

      setResults(data.results || []);
      setSuccess(true);
      confetti({ particleCount: 120, spread: 80 });
    } catch {
      alert("Ranking failed.");
    } finally {
      clearInterval(interval);
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }

  return (
    <>
      <SparkleSuccess trigger={success} />

      <header className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg shadow">
        <div className="px-6 py-4 flex justify-between">
          <h1 className="font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            Talentryx AI
          </h1>
          <span className="text-xs opacity-80">Job Seeker Dashboard</span>
        </div>
      </header>

      <section className="px-4 py-8 space-y-6">
        {/* INPUT CARD */}
        <Card>
          <CardHeader>
            <CardTitle>Your Resume Match Analysis</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <Textarea
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="h-[260px]"
            />

            <div {...getRootProps()} className="border-dashed border-2 p-6 text-center rounded-lg cursor-pointer">
              <input {...getInputProps()} />
              <Upload className="mx-auto mb-2 text-indigo-600" />
              <p className="text-sm">Upload your resume (PDF/DOCX)</p>
            </div>
          </CardContent>

          <CardContent>
            <Button
              onClick={handleUpload}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Get Match Score"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* PROGRESS */}
        {loading && (
          <div className="h-3 bg-slate-200 rounded">
            <div
              className="h-full bg-indigo-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* RESULTS */}
        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Match Results</CardTitle>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Strengths</TableHead>
                    <TableHead>Gaps</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {results.map((r, i) => {
                    const pct = r.score * 100;
                    const info = getScoreInfo(pct);

                    return (
                      <TableRow key={i}>
                        <TableCell>{r.candidate_name}</TableCell>

                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {r.matched_keywords.slice(0, 6).map((k: string) => (
                              <span
                                key={k}
                                className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full"
                              >
                                {k}
                              </span>
                            ))}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {r.missing_keywords.slice(0, 6).map((k: string) => (
                              <span
                                key={k}
                                className="bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full"
                              >
                                {k}
                              </span>
                            ))}
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          <span className={`px-2 py-1 rounded text-xs ${info.className}`}>
                            {pct.toFixed(1)}%
                          </span>
                        </TableCell>

                        <TableCell className="text-right space-x-2">
                          <Button size="sm" variant="outline">
                            Rewrite with AI
                          </Button>
                          <Button size="sm" className="bg-green-600 text-white">
                            Boost to 80+
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </section>
    </>
  );
}
