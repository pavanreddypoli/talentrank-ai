"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function JobSeekerEntryPage() {

  useEffect(() => {
    localStorage.setItem("talentryx_user_type", "job_seeker");
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border p-8 text-center">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-yellow-400 text-3xl">✨</span>
          <span className="font-bold text-2xl text-indigo-700">
            Talentryx AI
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          See how well your resume matches the job
        </h1>

        <p className="mt-3 text-slate-600">
          Upload your resume and job description.
          Get a match score and AI-powered suggestions to improve your chances.
        </p>

        {/* Benefits */}
        <ul className="mt-6 space-y-2 text-sm text-slate-700 text-left">
          <li>✅ Resume-to-job match score</li>
          <li>✅ ATS optimization tips</li>
          <li>✅ AI-powered resume feedback</li>
          <li>✅ Stand out to recruiters</li>
        </ul>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/signup"
            className="w-full rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700"
          >
            Check my resume
          </Link>

          <Link
            href="/login"
            className="text-sm text-indigo-600 hover:underline"
          >
            Already have an account? Log in
          </Link>
        </div>

      </div>
    </main>
  );
}
