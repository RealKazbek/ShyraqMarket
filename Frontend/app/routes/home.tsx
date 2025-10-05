import { useEffect, useState } from "react";
import Section from "~/component/ui/Section";
import type { Route } from "./+types/home";
import Products from "~/component/layout/Products";
import { getProducts } from "~/api/product";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/auth/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        setError("Ошибка при загрузке товаров");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Section className="py-12">
      <h2 className="text-xl font-bold mb-6">
        Обувь для мужчин оптом и в розницу из Китая
      </h2>

      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <Products products={products} />}
    </Section>
  );
}
