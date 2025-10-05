import SignUp from "~/component/layout/auth/SignUp";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Registration() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <SignUp />
    </>
  );
}
