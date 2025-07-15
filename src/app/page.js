'use client';

import { signIn } from "next-auth/react";


export default function Home() {
  return (<button onClick={() => signIn("google", { 
        callbackUrl: "/",
        redirect: true 
      })}>
  Sign in with Google
</button>
)
}
