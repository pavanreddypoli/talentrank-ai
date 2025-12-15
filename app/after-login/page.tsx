import { Suspense } from "react";
import AfterLoginClient from "./AfterLoginClient";

// 🔴 THIS IS THE MISSING LINE
export const dynamic = "force-dynamic";

export default function AfterLoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AfterLoginClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-900 text-white">
      <div className="text-lg font-medium animate-pulse">
        Setting up your account…
      </div>
    </div>
  );
}
