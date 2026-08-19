"use client";

import { ORIGINAL_PDF } from "@/data/meta";
import { track } from "@/lib/analytics";

export function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </svg>
  );
}

export default function DownloadButton({
  variant = "ghost",
  children,
  location = "page",
}) {
  return (
    <a
      className={`btn btn-${variant}`}
      href={ORIGINAL_PDF}
      download
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("download_pdf", { location })}
    >
      <DownloadIcon />
      {children || "Download original list"}
    </a>
  );
}
