"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900">

      {/* 🌟 MOBILE + DESKTOP NAV */}
      <header className="sticky top-0 z-50 bg-indigo-900/90 backdrop-blur-md border-b border-indigo-700 shadow-lg">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4 text-white">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-yellow-400 rounded-lg shadow-md" />
            <span className="font-bold text-lg tracking-tight">
              Talentryx AI
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-yellow-300">Features</a>
            <a href="#how-it-works" className="hover:text-yellow-300">How it works</a>
            <a href="#pricing" className="hover:text-yellow-300">Pricing</a>
          </nav>

          {/* Desktop Buttons */}
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

          {/* Mobile Hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-indigo-800 text-white px-6 py-4 space-y-3 border-t border-indigo-700">
            <a href="#features" className="block text-sm">Features</a>
            <a href="#how-it-works" className="block text-sm">How it works</a>
            <a href="#pricing" className="block text-sm">Pricing</a>

            <div className="pt-3 flex flex-col gap-3">
              <Link href="/login" className="text-sm text-yellow-300">Log in</Link>
              <Link
                href="/signup"
                className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-indigo-900 text-center"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 🌟 HERO SECTION */}
      <section className="bg-gradient-to-b from-slate-100 to-white">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-20 grid gap-12 lg:grid-cols-2 items-center">

          {/* TEXT */}
          <div className="text-center lg:text-left">
            <p className="mb-3 text-xs font-semibold tracking-wide text-indigo-700 uppercase">
              For recruiters & job applicants
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Rank resumes in minutes.<br />
              Improve them in seconds.
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
              Talentryx AI ingests your job description and bulk resumes, then
              ranks candidates instantly by true role fit.
            </p>

            {/* VALUE BOXES (stack on mobile) */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">

              {/* Recruiters */}
              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl shadow-sm text-left">
                <h3 className="font-semibold text-indigo-700 text-sm">
                  For recruiters
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Upload hundreds of resumes. Get instant ranked shortlists with AI-powered insights.
                </p>
              </div>

              {/* Job Seekers */}
              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl shadow-sm text-left">
                <h3 className="font-semibold text-indigo-700 text-sm">
                  For job seekers
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  See your Match Score + get personalized AI suggestions to boost ranking.
                </p>
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/signup"
                className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 shadow"
              >
                Start ranking resumes
              </Link>
            </div>
          </div>

          {/* IMAGE — responsive */}
          <div className="rounded-2xl border bg-white p-4 shadow-xl mx-auto w-full max-w-lg">
            <Image
              src="/screenshot.png"
              width={900}
              height={600}
              alt="Talentryx AI dashboard preview"
              className="rounded-lg border shadow-md object-contain w-full"
            />
            <p className="mt-3 text-xs text-slate-500 text-center">
              Example AI ranking view — upload resumes to see your own results
            </p>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-t bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold text-slate-900 text-center md:text-left">
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
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Talentryx AI.</span>
          <span>AI for hiring teams & job seekers.</span>
        </div>
      </footer>

    </main>
  );
}
