"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/mypage",
    });

    setLoading(false);

    if (error) {
      setError(error.message || "登録に失敗しました");
      return;
    }

    router.push("/mypage");
  };

  const handleLineLogin = async () => {
    setError("");
    setLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "line",
      callbackURL: "/mypage",
    });

    if (error) {
      setError(error.message || "登録に失敗しました");
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>アカウント登録</h1>

      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="name">名前</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "登録中..." : "メールアドレスで登録"}
        </button>
      </form>

      <hr />

      <button type="button" onClick={handleLineLogin} disabled={loading}>
        LINEで登録・ログイン
      </button>

      <p>
        すでにアカウントをお持ちですか？
        <a href="/login">ログイン</a>
      </p>
    </main>
  );
}
