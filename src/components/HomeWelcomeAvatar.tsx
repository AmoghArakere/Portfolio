"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const FRAMES = [
  "/home/avatar/idle-t3-final.png",
  "/home/avatar/smile-t3-clean-final.png",
  "/home/avatar/wave-t-clean-final.png",
  "/home/avatar/eyesclosed-t-clean-final.png",
];

const SEQUENCE = [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3];
const FRAME_Y_OFFSETS = [0, 2, 0, 0];

export default function HomeWelcomeAvatar() {
  const [step, setStep] = useState(0);
  const activeFrame = SEQUENCE[step % SEQUENCE.length] ?? 0;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((prev) => (prev + 1) % SEQUENCE.length);
    }, 900);
    return () => window.clearInterval(timer);
  }, []);

  const frameMap = useMemo(
    () =>
      FRAMES.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          className={`z-10 object-contain ${
            index === activeFrame ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `translateY(${FRAME_Y_OFFSETS[index] ?? 0}px)`,
          }}
          sizes="(max-width: 768px) 92vw, 500px"
          aria-hidden
          priority={index === 0}
        />
      )),
    [activeFrame],
  );

  return (
    <div className="mx-auto w-fit md:mx-0 md:-translate-x-12">
      <div className="relative h-[420px] w-[500px] overflow-visible rounded-xl">
        <Image
          src="/home/avatar/agent-overlay-huh-t.png"
          alt=""
          fill
          className="object-contain object-bottom opacity-95"
          style={{ transform: "translateX(28px) translateY(-28px) scale(1.02)" }}
          sizes="(max-width: 768px) 92vw, 500px"
          aria-hidden
          priority
        />
        {frameMap}
      </div>
    </div>
  );
}
