import SignIn from "~/component/layout/auth/SignIn";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <SignIn />
    </>
  );
}
