"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ORIGINAL_PDF } from "@/data/meta";
import { track } from "@/lib/analytics";

const links = [
  { href: "/", label: "Students" },
  { href: "/subjects", label: "Subjects" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="shell header-row">
        <Link href="/" className="brand">
          <span className="brand-mark">LY</span>
          <span className="brand-text">
            <span className="brand-title">
              <span className="brand-title-full">LY CSD Elective Portal</span>
              <span className="brand-title-short">LY Electives</span>
            </span>
            <span className="brand-sub">Semester 7 &middot; ODD 2026-27</span>
          </span>
        </Link>

        <nav className="nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
          <a
            className="btn btn-ghost btn-sm header-download"
            href={ORIGINAL_PDF}
            download
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("download_pdf", { location: "header" })}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v11" />
              <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
              <path d="M4.5 19.5h15" />
            </svg>
            <span className="header-download-label">PDF</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
