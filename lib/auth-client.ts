import { createAuthClient } from "better-auth/client";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

async function signInWithLINE() {
  const res = await authClient.signIn.social({ provider: "line" });
}
