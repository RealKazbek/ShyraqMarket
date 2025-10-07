import React, { useEffect } from "react";
import { LoginForm } from "../ui/login-form";

type Props = {
  onClose: () => void;
};

function Login({ onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black/50"
      onClick={onClose}
    >
      <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <LoginForm onClose={onClose} />
      </div>
    </div>
  );
}

export default Login;
