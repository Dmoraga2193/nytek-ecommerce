"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
  total: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
    total: 0,
  });

  useEffect(() => {
    if (!targetDate) return;

    function calculateTimeLeft(): TimeLeft {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        return {
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
          total: 0,
        };
      }

      return {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
        total: difference,
      };
    }

    function updateTimeLeft() {
      setTimeLeft(calculateTimeLeft());
    }

    // Initial update
    updateTimeLeft();

    // Set up interval for updates
    const timer = setInterval(updateTimeLeft, 1000);

    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-4 text-lg">
      <div className="flex flex-col items-center">
        <span className="font-bold text-2xl">{timeLeft.dias}</span>
        <span className="text-sm text-gray-500">Días</span>
      </div>
      <span className="font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="font-bold text-2xl">{timeLeft.horas}</span>
        <span className="text-sm text-gray-500">Horas</span>
      </div>
      <span className="font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="font-bold text-2xl">{timeLeft.minutos}</span>
        <span className="text-sm text-gray-500">Minutos</span>
      </div>
      <span className="font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="font-bold text-2xl">{timeLeft.segundos}</span>
        <span className="text-sm text-gray-500">Segundos</span>
      </div>
    </div>
  );
}
