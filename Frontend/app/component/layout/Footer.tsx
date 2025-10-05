import { useLanguage } from "~/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-100 py-6">
      <div className="container body1 flex justify-center items-center">
        {(t as any)("footer.text") as string}
      </div>
    </footer>
  );
}
