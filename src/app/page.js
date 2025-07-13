'use client';

import { signIn } from "next-auth/react";


export default function Home() {
  return (<button onClick={() => signIn("google", { callbackUrl: "/" }, { baseUrl: "/api/auth" })}>
  Sign in with Google
</button>
)
}
