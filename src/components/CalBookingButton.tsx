"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

export default function CalBookingButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async function initCal() {
      const cal = await getCalApi({ namespace: "1hr" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="whitespace-nowrap rounded-full border border-emerald-700/50 bg-emerald-700/20 px-3 py-1 text-sm text-emerald-300 transition hover:bg-emerald-700/30"
      >
        Book now
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3" role="dialog" aria-modal="true">
          <div className="relative h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/45 text-xl font-light leading-none text-white/80 backdrop-blur-md transition-all duration-200 hover:scale-[1.04] hover:bg-black/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-95"
              aria-label="Close booking"
            >
              <span aria-hidden className="-mt-0.5">
                ×
              </span>
            </button>
            <Cal
              namespace="1hr"
              calLink="amogh07/1hr"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
