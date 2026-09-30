import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

async function signInWithLINE() {
  const res = await authClient.signIn.social({ provider: "line" });
}
