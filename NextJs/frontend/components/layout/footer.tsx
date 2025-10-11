import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Покупателям</h4>
          <div className="flex flex-col gap-2">
            <Button variant="secondary" className="justify-start">
              Поддержка
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Партнёрам</h4>
          <div className="flex flex-col gap-2">
            <Button variant="secondary" className="justify-start">
              Инвесторам
            </Button>
            <Button variant="secondary" className="justify-start">
              Аффилиатная программа
            </Button>
            {/* <Button variant="secondary" className="justify-start">
              Блог для продавца
            </Button> */}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">О компании</h4>
          <div className="flex flex-col gap-2">
            <Button variant="secondary" className="justify-start">
              Основатель
            </Button>
            <Button variant="secondary" className="justify-start">
              История
            </Button>
            {/* <Button variant="secondary" className="justify-start">
              Блог о жизни компании
            </Button> */}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Мы в соцсетях</h4>
          <div className="flex flex-col gap-2">
            <Button variant="secondary" className="justify-start">
              Instagram
            </Button>
            <Button variant="secondary" className="justify-start">
              Telegram
            </Button>
            <Button variant="secondary" className="justify-start">
              Whatsapp
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500 flex justify-between">
        <span>SHYRAQ MARKET 2025</span>
        <span>
          <a href="#" className="text-blue-600 hover:underline">
            Политика конфиденциальности
          </a>{" "}
          ·{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Пользовательские соглашения
          </a>
        </span>
      </div>
    </footer>
  );
}
