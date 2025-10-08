"use client";

import { useEffect, useRef, useState } from "react";

export default function FixedArrowWinnerWheel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [names] = useState<string[]>([
    "Аманжол",
    "Багдат",
    "Казбек",
    "Анар",
    "Айя",
    "Молдир",
    "Темирлан",
    "Аслан",
    "Едиге",
    "Жанибек",
    "Ерасыл",
    "Маргулан", // 🎯 победитель
    "Асылжан",
    "Думан",
    "Олжас",
    "Сапарбек",
    "Ерсерик",
    "Куят",
    "Нурда",
  ]);
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const winnerName = "Маргулан";
  const winnerIndex = names.indexOf(winnerName);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || names.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 350;
    const radius = size / 2;
    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);

    const sliceAngle = (2 * Math.PI) / names.length;

    names.forEach((name, i) => {
      const startAngle = angle + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      // сектор
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, startAngle, endAngle);
      ctx.fillStyle = i % 2 === 0 ? "#4ade80" : "#60a5fa";
      ctx.fill();
      ctx.stroke();

      // текст
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "white";
      ctx.font = "15px sans-serif";
      ctx.fillText(name, radius - 10, 5);
      ctx.restore();
    });

    // === Рисуем стрелку именно на сектор "Маргулан" ===
    // === Рисуем стрелку именно на сектор "Маргулан" ===
    // === Рисуем стрелку именно на сектор "Маргулан" ===
    const targetAngle = angle + winnerIndex * sliceAngle + sliceAngle / 2;

    // кончик стрелки (ближе к краю круга)
    const tipX = radius + Math.cos(targetAngle) * (radius - 5);
    const tipY = radius + Math.sin(targetAngle) * (radius - 5);

    // две боковые точки чуть ближе к центру
    const baseX1 = radius + Math.cos(targetAngle + 0.2) * (radius - 40);
    const baseY1 = radius + Math.sin(targetAngle + 0.2) * (radius - 40);

    const baseX2 = radius + Math.cos(targetAngle - 0.2) * (radius - 40);
    const baseY2 = radius + Math.sin(targetAngle - 0.2) * (radius - 40);

    // рисуем маленький треугольник
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(baseX1, baseY1);
    ctx.lineTo(baseX2, baseY2);
    ctx.closePath();
    ctx.fill();
  }, [angle, names, winnerIndex]);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const spinTime = 4000;
    const finalAngle = angle + 10 * Math.PI + Math.random() * (2 * Math.PI);

    let start: number | null = null;

    const animate = (time: number) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / spinTime, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAngle(angle + eased * (finalAngle - angle));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">🎯 Колесо рулетки</h1>
      <canvas
        ref={canvasRef}
        style={{ border: "2px solid #ccc", borderRadius: "50%" }}
      />
      <button
        onClick={spin}
        disabled={spinning}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {spinning ? "Крутится…" : "Крутить колесо"}
      </button>
      <div className="mt-4 text-xl font-semibold text-green-600">
        Победитель: {winnerName} 🎉
      </div>
    </div>
  );
}
