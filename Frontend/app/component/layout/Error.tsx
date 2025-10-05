import { isRouteErrorResponse } from "react-router";
import { useRouteError } from "react-router";
import { useLanguage } from "~/context/LanguageContext";
import Button from "../ui/Button";

export function ErrorLayout() {
  const { t } = useLanguage();

  let message = t("error.message1") as string;
  let message2 = t("error.message2") as string;

  const error = useRouteError();
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : message2;
    details =
      error.status === 404
        ? (t("error.status") as string)
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="flex-1 flex justify-center items-center">
      <div className="min-w-2/7 flex flex-col items-center border shadow px-4 py-8 rounded-xl">
        <h1>{message}</h1>
        <p className="body1 mb-6 text-center w-2/3">{details}</p>
        {stack && (
          <pre className="body2 mt-4 text-xs text-red-500 whitespace-pre-wrap mb-6">
            {stack}
          </pre>
        )}
        <Button href="/">{t("error.button") as string}</Button>
      </div>
    </main>
  );
}
