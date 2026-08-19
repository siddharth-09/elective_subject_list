"use client";

import { usePathname, useRouter } from "next/navigation";
import { track } from "@/lib/analytics";

function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.2a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.7-.9 1.3v.4" />
      <path d="M12 16.8h.01" />
    </svg>
  );
}

export default function SupportButton({
  variant = "primary",
  label = "Subjects look wrong?",
}) {
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";

  const handleClick = (e) => {
    track("support_click", { from: pathname, label });

    if (!onHome) {
      router.push("/#support");
      return;
    }
    e.preventDefault();
    const target = document.getElementById("support");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#support");
    }
  };

  return (
    <a
      className={`btn btn-${variant}`}
      href={onHome ? "#support" : "/#support"}
      onClick={handleClick}
    >
      <HelpIcon />
      {label}
    </a>
  );
}
