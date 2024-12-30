"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-4 mt-2">
      <div className="flex items-center gap-1 mt-8">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{timeLeft.days}</span>
          <span className="text-xs text-gray-500">Dias</span>
        </div>
        <div className="text-red-500 text-2xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{timeLeft.hours}</span>
          <span className="text-xs text-gray-500">Horas</span>
        </div>
        <div className="text-red-500 text-2xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{timeLeft.minutes}</span>
          <span className="text-xs text-gray-500">Minutos</span>
        </div>
        <div className="text-red-500 text-2xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{timeLeft.seconds}</span>
          <span className="text-xs text-gray-500">Segundos</span>
        </div>
      </div>
    </div>
  );
}
