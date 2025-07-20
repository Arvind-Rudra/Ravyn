"use client";

import React, { useState } from 'react';
import { MailCheck, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import SkewButton from '@/components/ui/Button';

export default function VerifyEmailPage({ 
  email = "",   // Optionally pass email as prop
  onResend = async () => await new Promise(res => setTimeout(res, 1200)), // Placeholder: replace with real resend call
}) {
  const [status, setStatus] = useState("idle"); // idle | loading | sent | error

  const handleResend = async () => {
    setStatus("loading");
    try {
      await onResend();
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3500);
    } catch (e) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent">
      <div className="max-w-md w-full bg-black/20 backdrop-blur rounded-xl border border-gray-800 p-8 shadow-2xl text-center">

        <div className="flex justify-center mb-6">
          <MailCheck className="w-14 h-14 text-[var(--color-cyberyellow)] bg-black/20 rounded-full p-3" />
        </div>

        <h1
          style={{ fontFamily: 'Zoredo Blocker' }}
          className="text-3xl font-bold text-[var(--color-cyberyellow)] mb-2 tracking-wider"
        >
          Verify your email
        </h1>

        <p className="text-[var(--color-typography)] mb-4 text-sm">
          We’ve sent a verification link to <span className="text-[var(--color-cyberyellow)] font-mono">{email || "your address"}</span>.
          <br />
          Please check your inbox (and spam folder).
        </p>

        {/* Status feedback */}
        {status === "sent" && (
          <div className="flex items-center gap-2 justify-center mb-2 text-[var(--color-cyberyellow)] font-bold animate-pulse">
            <CheckCircle2 className="w-5 h-5" />
            Email sent again!
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 justify-center mb-2 text-[var(--color-electricred)] font-bold">
            <AlertTriangle className="w-5 h-5" />
            Could not resend. Please try again.
          </div>
        )}
        {/* END Status feedback */}

        {/* Resend button */}
        <SkewButton
          width="100%"
          height="46px"
          fontSize="18px"
          className="mt-4"
          onClick={handleResend}
          style={{
            backgroundColor: "var(--color-electricblue)",
            color: "var(--color-typography)",
          }}
          disabled={status === "loading"}
        >
          {status === "loading"
            ? <span className="flex justify-center items-center gap-2">
                <Loader2 className="animate-spin w-5 h-5" /> Sending...
              </span>
            : "Resend verification email"}
        </SkewButton>

        <div className="text-center mt-8 text-[var(--color-typography)]/70 text-xs">
          <span>
            Wrong address?&nbsp;
            <a
              href="/profile/edit"
              className="text-[var(--color-cyberyellow)] hover:text-[var(--color-electricblue)]"
            >Change email</a>
          </span>
        </div>
      </div>
    </div>
  );
}
