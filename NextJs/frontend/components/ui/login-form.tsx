"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, sendCode, register } from "@/api/auth";

type LoginFormProps = {
  onClose: () => void;
} & React.ComponentProps<"div">;

export function LoginForm({ className, onClose, ...props }: LoginFormProps) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSendCode() {
    try {
      setError(null);
      setMessage(null);
      const res = await sendCode(phone.trim());
      setMessage(res.message || "Код отправлен (проверь What)");
    } catch {
      setError("Ошибка отправки кода");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const trimmedPhone = phone.trim();
      const trimmedCode = code.trim();
      const trimmedName = firstName.trim();

      const res = isRegister
        ? await register(trimmedName, trimmedPhone, trimmedCode)
        : await login(trimmedPhone, trimmedCode);

      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);
      localStorage.setItem("user", JSON.stringify(res.user));
      window.dispatchEvent(new Event("userLoggedIn"));

      setMessage(isRegister ? "Регистрация успешна!" : "Вход выполнен!");
      setTimeout(onClose, 800);
    } catch {
      setError("Неверный код или ошибка при регистрации");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <h2 className="text-xl font-semibold text-center text-gray-800">
        {isRegister ? "Регистрация" : "Вход"}
      </h2>
      <p className="text-sm text-center text-gray-500">
        {isRegister
          ? "Создайте аккаунт с помощью телефона"
          : "Введите номер телефона и код для входа"}
      </p>

      <form onSubmit={handleSubmit} className="mt-2 space-y-4">
        {isRegister && (
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Имя
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Ваше имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Номер телефона
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="+77070000000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Код подтверждения
          </label>
          <div className="flex gap-2">
            <Input
              id="code"
              type="text"
              placeholder="1111"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <Button
              type="button"
              onClick={handleSendCode}
              disabled={!phone || loading}
            >
              Получить
            </Button>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-emerald-600">{message}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {loading
            ? isRegister
              ? "Создание..."
              : "Вход..."
            : isRegister
            ? "Создать аккаунт"
            : "Войти"}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => setIsRegister(!isRegister)}
          className="w-full"
        >
          {isRegister
            ? "Уже есть аккаунт? Войти"
            : "Нет аккаунта? Зарегистрируйтесь"}
        </Button>
      </form>
    </div>
  );
}
