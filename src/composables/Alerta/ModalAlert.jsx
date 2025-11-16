import { useEffect, useState } from "react";

export default function BeautifulCountdown() {
  const targetDate = new Date("2026-04-12T00:00:00"); // FECHA DE ELECCIONES 2026

  const [timeLeft, setTimeLeft] = useState({
    months: "00",
    days: "00",
    hours: "00",
    minutes: "00",
  });

  const calculateTime = () => {
    const now = new Date();
    let diff = targetDate - now;

    if (diff <= 0) return;

    // Convertimos diferencias
    const totalMinutes = Math.floor(diff / 1000 / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;

    setTimeLeft({
      months: String(months).padStart(2, "0"),
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
    });
  };

  useEffect(() => {
    calculateTime();
    const interval = setInterval(calculateTime, 60000); // Actualiza cada 1 minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="font-semibold text-lg">LAS ELECCIONES SERAN EN:</h2>

      <div className="flex gap-4">
        
        {/* Caja */}
        <TimeBox number={timeLeft.months} label="Meses" />
        <TimeBox number={timeLeft.days} label="Días" />
        <TimeBox number={timeLeft.hours} label="Horas" />
        <TimeBox number={timeLeft.minutes} label="Minutos" />
      </div>
    </div>
  );
}

function TimeBox({ number, label }) {
  return (
    <div className="flex flex-col items-center p-3 border rounded-xl shadow-sm min-w-[80px]">
      <p className="text-2xl font-bold text-blue-700">{number}</p>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}
