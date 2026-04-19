"use client";

import { useEffect, useState } from "react";

export default function LiveClock({
  inline = false,
  className = "",
}: {
  inline?: boolean;
  className?: string;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`tabular-nums ${inline ? "inline" : ""} ${className}`}>
      {time}
    </span>
  );
}
