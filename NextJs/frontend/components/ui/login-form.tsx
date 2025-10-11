"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login, sendCode, register } from "@/api/auth";
import Image from "next/image";
import cross from "@/public/icons/ui/cross.svg";

type loginProps = React.ComponentProps<"div"> & {
  onClose: () => void;
};

export function LoginForm({ className, onClose, ...props }: loginProps) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSendCode() {
    try {
      setError(null);
      setMessage(null);
      const res = await sendCode(phone);
      setMessage(res.message || "Code sent (check WhatsApp)");
    } catch (err) {
      console.log(err);
      setError("Failed to send code");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let res;
      if (isRegister) {
        res = await register(username, phone, code);
      } else {
        res = await login(phone, code);
      }

      console.log(`${isRegister ? "Register" : "Login"} success:`, res);

      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);

      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      window.dispatchEvent(new Event("userLoggedIn"));

      onClose();
    } catch (err) {
      console.log(err);
      setError("Invalid phone/code or registration error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>
              {isRegister ? "Sign up" : "Login"} to your account
            </CardTitle>
            <CardDescription>
              {isRegister
                ? "Create a new account using your phone and code"
                : "Enter your phone and code to login"}
            </CardDescription>
          </div>
          <Image
            className="hover:scale-90 hover:rotate-180 transition-transform duration-300"
            src={cross}
            alt="X"
            onClick={onClose}
          />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {isRegister && (
                <Field>
                  <FieldLabel htmlFor="username">Name</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={isRegister}
                  />
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+77070000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="code">Code</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    type="text"
                    placeholder="1111"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                  <Button type="button" onClick={handleSendCode}>
                    Get code
                  </Button>
                </div>
              </Field>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {message && <p className="text-sm text-green-600">{message}</p>}
              <Field className="flex flex-col gap-2">
                <Button type="submit" disabled={loading}>
                  {loading
                    ? isRegister
                      ? "Registering..."
                      : "Logging in..."
                    : isRegister
                    ? "Sign up"
                    : "Login"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister
                    ? "Already have an account? Login"
                    : "Don’t have an account? Sign up"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
