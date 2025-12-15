"use client";

import Link from "next/link";

export default function RecruiterEntryPage() {
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
          Hire smarter with AI-powered resume ranking
        </h1>

        <p className="mt-3 text-slate-600">
          Upload job descriptions and hundreds of resumes.
          Get instant, explainable rankings based on true role fit.
        </p>

        {/* Benefits */}
        <ul className="mt-6 space-y-2 text-sm text-slate-700 text-left">
          <li>✅ Bulk resume upload</li>
          <li>✅ AI-powered candidate ranking</li>
          <li>✅ Shortlists & ATS-friendly exports</li>
          <li>✅ Save hours of manual screening</li>
        </ul>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/signup"
            className="w-full rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700"
          >
            Get started as a recruiter
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
