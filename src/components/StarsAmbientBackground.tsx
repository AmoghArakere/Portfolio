"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

/**
 * Full-viewport [Stars + shooting stars](https://ui.aceternity.com/components/shooting-stars-and-stars-background)
 * behind app content (all main routes + blog).
 */
export default function StarsAmbientBackground() {
  return (
    <div
      className="stars-ambient pointer-events-none fixed inset-0 z-0 h-svh min-h-dvh w-full overflow-hidden"
      aria-hidden
    >
      <StarsBackground starDensity={0.00014} className="absolute inset-0" />
      <ShootingStars
        className="absolute inset-0"
        minSpeed={12}
        maxSpeed={28}
        minDelay={4200}
        maxDelay={8700}
        starColor="#4338ca"
        trailColor="#a5b4fc"
        starWidth={12}
        starHeight={1}
      />
    </div>
  );
}
