"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LockKeyhole } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });
    setPending(false);
    if (result?.error) {
      setError("Those credentials could not be verified.");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen bg-[#f4f7f4] md:grid-cols-[1fr_480px]">
      <aside className="hidden flex-col justify-between bg-primary p-12 text-white md:flex">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.12em]"><Image src="/logo.JPG" alt="" width={40} height={40} className="size-10 rounded-[5px] object-cover" /> UAHIN / ADMINISTRATION</div>
        <div className="max-w-xl pb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b8d2c5]">Upliftment Against Hunger Initiative NG</p>
          <h1 className="display mt-5 text-5xl leading-tight">Stewarding the work. Supporting the people.</h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/75">A secure workspace for UAHIN’s programmes, community registrations, and public information.</p>
        </div>
        <p className="text-xs text-white/55">Empowering Lives • Fighting Hunger • Building Hope</p>
      </aside>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-7 flex items-center gap-3 md:hidden">
            <Image src="/logo.JPG" alt="Upliftment Against Hunger Initiative NG logo" width={48} height={48} className="size-12 rounded-[5px] object-cover" />
            <span className="text-sm font-semibold leading-tight text-secondary-foreground">Upliftment Against Hunger<br />in Nigeria</span>
          </div>
          <div className="mb-9 flex size-11 items-center justify-center rounded-[5px] bg-[#e7f0e9] text-primary">
            <LockKeyhole size={19} aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a6658]">Restricted access</p>
          <h2 className="mt-2 text-3xl font-semibold text-secondary-foreground">Admin sign in</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Sign in with your authorized UAHIN administrator credentials.</p>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-[#253b33]" htmlFor="admin-email">
              Email address
              <input className="mt-2 w-full rounded-[5px] border border-[#d3ded7] bg-white px-3.5 py-3 outline-none focus:border-[#1a6658] focus:ring-2 focus:ring-[#1a6658]/15" id="admin-email" name="email" type="email" autoComplete="username" required />
            </label>
            <label className="block text-sm font-medium text-[#253b33]" htmlFor="admin-password">
              Password
              <input className="mt-2 w-full rounded-[5px] border border-[#d3ded7] bg-white px-3.5 py-3 outline-none focus:border-[#1a6658] focus:ring-2 focus:ring-[#1a6658]/15" id="admin-password" name="password" type="password" autoComplete="current-password" required />
            </label>
            {error && <p role="alert" className="text-sm text-[#a6382b]">{error}</p>}
            <button className="w-full rounded-[5px] bg-[#1a6658] px-4 py-3 text-sm font-semibold text-white hover:bg-[#154d44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6658] focus-visible:ring-offset-2 disabled:opacity-60" disabled={pending} type="submit">
              {pending ? "Verifying…" : "Sign in securely"}
            </button>
          </form>
          <a href="/" className="mt-7 inline-block text-sm text-[#1a6658] hover:underline">Return to UAHIN website</a>
        </div>
      </div>
    </main>
  );
}