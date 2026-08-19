"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
    </svg>
  );
}

export default function ViewAllButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => {
          setOpen(true);
          track("view_all_click");
        }}
      >
        <ListIcon />
        View all
      </button>

      {open && (
        <div
          className="modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            className="popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="viewall-title"
          >
            <button
              className="modal-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="popup-emoji">👀</div>
            <h3 id="viewall-title">Potanu jo ne</h3>
            <p>Bas tamaru enrollment number search karo 😄</p>

            <button className="btn btn-primary" onClick={() => setOpen(false)}>
              Okay, fine
            </button>
          </div>
        </div>
      )}
    </>
  );
}
