import React, { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "~/api/auth";
import Button from "~/component/ui/Button";
import Section from "~/component/ui/Section";
import { saveToStorage } from "~/lib/utils/storage";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(false);

    try {
      const data = await login(email, password);
      saveToStorage("access", data.access);
      saveToStorage("refresh", data.refresh);
      navigate("/");
    } catch (err: any) {
      setErrorMessage(true);
      console.error(err);
    }
  }

  return (
    <Section className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-6 bg-gray-100 p-12 rounded-xl border-2 border-gray-400 w-100">
        <h1 className="text-center text-2xl font-bold">Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 max-w-sm mx-auto mt-10 w-full"
        >
          {errorMessage && (
            <span className="text-red-500 body3">Login failed</span>
          )}
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-3 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-3 py-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" className="mt-4 w-full">
            Sign In
          </Button>
        </form>
      </div>
    </Section>
  );
}

export default SignIn;
