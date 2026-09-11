"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const DARK_FRAMES = [
  "/home/avatar/idle-t3-final.png",
  "/home/avatar/smile-t3-clean-final.png",
  "/home/avatar/wave-t-clean-final.png",
  "/home/avatar/eyesclosed-t-clean-final.png",
];

const LIGHT_FRAMES = [
  "/home/avatar/light-voice-1.png",
  "/home/avatar/light-voice-2.png",
  "/home/avatar/light-voice-3.png",
  "/home/avatar/light-voice-4.png",
];

const DARK_SEQUENCE = [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3];
const LIGHT_SEQUENCE = [0, 0, 2, 2, 1, 1, 3, 3];
const DARK_FRAME_Y_OFFSETS = [0, 2, 0, 0];
const LIGHT_FRAME_Y_OFFSETS = [0, 0, 0, 0];

function useIsLightMode() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const sync = () => setIsLight(document.documentElement.classList.contains("light"));
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isLight;
}

export default function HomeWelcomeAvatar() {
  const isLight = useIsLightMode();
  const frames = isLight ? LIGHT_FRAMES : DARK_FRAMES;
  const sequence = isLight ? LIGHT_SEQUENCE : DARK_SEQUENCE;
  const yOffsets = isLight ? LIGHT_FRAME_Y_OFFSETS : DARK_FRAME_Y_OFFSETS;
  const [step, setStep] = useState(0);
  const activeFrame = sequence[step % sequence.length] ?? 0;

  useEffect(() => {
    setStep(0);
  }, [isLight]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((prev) => (prev + 1) % sequence.length);
    }, isLight ? 1100 : 900);
    return () => window.clearInterval(timer);
  }, [isLight, sequence.length]);

  const frameMap = useMemo(
    () =>
      frames.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          unoptimized={isLight}
          className={`z-10 object-contain ${
            isLight ? "object-bottom" : "object-center"
          } ${index === activeFrame ? "opacity-100" : "opacity-0"}`}
          style={{
            transform: `translateY(${yOffsets[index] ?? 0}px)`,
            backgroundColor: "transparent",
          }}
          sizes="(max-width: 768px) 92vw, 500px"
          aria-hidden
          priority={index === 0}
        />
      )),
    [activeFrame, frames, isLight, yOffsets],
  );

  return (
    <div className="mx-auto w-fit md:mx-0 md:-translate-x-12">
      <div className="relative h-[420px] w-[500px] overflow-visible bg-transparent">
        {!isLight ? (
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
        ) : null}
        {frameMap}
      </div>
    </div>
  );
}
