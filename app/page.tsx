"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900">

      {/* ================= NAV ================= */}
      <header className="sticky top-0 z-50 bg-indigo-900/90 backdrop-blur-md border-b border-indigo-700 shadow-lg">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4 text-white">

          <div className="flex items-center gap-3">
            <span className="text-yellow-400 text-2xl md:text-3xl">✨</span>
            <span className="font-bold text-xl md:text-2xl tracking-tight">
              Talentryx AI
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-yellow-300">Features</a>
            <a href="#how-it-works" className="hover:text-yellow-300">How it works</a>
            <a href="#pricing" className="hover:text-yellow-300">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
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

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-b from-slate-100 to-white">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-20 grid gap-12 lg:grid-cols-2 items-center">

          <div className="text-center lg:text-left">
            <p className="mb-3 text-xs font-semibold tracking-wide text-indigo-700 uppercase">
              For recruiters & job applicants
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Rank resumes in minutes.<br />
              Improve them in seconds.
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
              Talentryx AI ingests your job description and resumes, then ranks
              candidates instantly by true role fit.
            </p>

            {/* PERSONA CARDS */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl shadow-sm text-left">
                <h3 className="font-semibold text-indigo-700 text-sm">
                  For recruiters
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Upload hundreds of resumes. Get instant ranked shortlists with AI-powered insights.
                </p>

                <Link
                  href="/recruiter"
                  className="mt-4 block w-full text-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 shadow"
                >
                  Start ranking resumes
                </Link>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl shadow-sm text-left">
                <h3 className="font-semibold text-indigo-700 text-sm">
                  For job seekers
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  See your Match Score + get personalized AI suggestions to boost ranking.
                </p>

                <Link
                  href="/job-seeker"
                  className="mt-4 block w-full text-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 shadow"
                >
                  See my match score
                </Link>
              </div>

            </div>
          </div>

          <div className="rounded-2xl border bg-white p-4 shadow-xl mx-auto w-full max-w-lg">
            <Image
              src="/screenshot.png"
              width={900}
              height={600}
              alt="Talentryx AI dashboard preview"
              className="rounded-lg border shadow-md object-contain w-full"
            />
            <p className="mt-3 text-xs text-slate-500 text-center">
              Example AI ranking view
            </p>
          </div>

        </div>
      </section>

      {/* ================= BUILT FOR HIRING ================= */}
      <section id="features" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Built for hiring at scale
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border bg-slate-50 p-6">
              <h3 className="font-semibold mb-2">Bulk resume intake</h3>
              <p className="text-sm text-slate-600">
                Upload hundreds of resumes instantly. AI parses everything.
              </p>
            </div>

            <div className="rounded-xl border bg-slate-50 p-6">
              <h3 className="font-semibold mb-2">AI-powered ranking</h3>
              <p className="text-sm text-slate-600">
                Skill match · Experience relevance · Career progression
              </p>
            </div>

            <div className="rounded-xl border bg-slate-50 p-6">
              <h3 className="font-semibold mb-2">ATS-friendly exports</h3>
              <p className="text-sm text-slate-600">
                Export ranked shortlists to CSV or ATS platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BUILT FOR JOB SEEKERS ================= */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Built for job seekers who want to stand out
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border bg-white p-6">
              <h3 className="font-semibold mb-2">Resume Match Score</h3>
              <p className="text-sm text-slate-600">
                Instantly see how well your resume matches a job description.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <h3 className="font-semibold mb-2">AI-powered improvement tips</h3>
              <p className="text-sm text-slate-600">
                Personalized suggestions to improve keywords, experience, and impact.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <h3 className="font-semibold mb-2">ATS optimization</h3>
              <p className="text-sm text-slate-600">
                Optimize your resume to pass automated screening systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-indigo-950 text-indigo-100 py-6">
        <div className="mx-auto max-w-6xl px-4 flex justify-between text-xs">
          <span>© 2025 Talentryx AI</span>
          <span>AI for hiring teams & job seekers</span>
        </div>
      </footer>

    </main>
  );
}
