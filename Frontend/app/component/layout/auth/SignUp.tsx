import React, { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "~/api/auth";
import Button from "~/component/ui/Button";
import Section from "~/component/ui/Section";
import { saveToStorage } from "~/lib/utils/storage";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(false);

    try {
      const data = await register(name, email, password1, password2);
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
        <h1>Sign Up</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 max-w-sm mx-auto mt-10 w-full"
        >
          {errorMessage && (
            <span className="text-red-500 body3">Login failed</span>
          )}
          <input
            type="text"
            placeholder="Username"
            className="border rounded px-3 py-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-3 py-2 w-full"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </Section>
  );
}

export default SignUp;
