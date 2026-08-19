"use client";

import { useEffect, useMemo, useState } from "react";
import { students } from "@/data/students";
import { subjects } from "@/data/subjects";
import { ORIGINAL_PDF_LABEL, SUPPORT_CONTACT } from "@/data/meta";
import StudentCard from "@/components/StudentCard";
import DownloadButton from "@/components/DownloadButton";
import SupportButton from "@/components/SupportButton";
import ViewAllButton from "@/components/ViewAllButton";
import { track, TRACK_SEARCH_TERMS } from "@/lib/analytics";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState([]);

  const toggle = (code) => {
    const on = !active.includes(code);
    track("filter_subject", {
      subject_code: code,
      subject_name: subjects.find((item) => item.code === code)?.name,
      state: on ? "on" : "off",
    });
    setActive((prev) =>
      on ? [...prev, code] : prev.filter((c) => c !== code)
    );
  };

  const q = query.trim().toLowerCase();
  const isNumeric = /^\d+$/.test(q);

  // A number only matches the END of an enrollment (last two digits or more),
  // never a prefix -- so typing "2304101490" cannot pull up the whole class.
  const queryUsable = isNumeric ? q.length >= 2 : q.length >= 3;
  const searching = queryUsable;
  const partialNumber = isNumeric && q.length < 2;
  const partialName = !isNumeric && q.length > 0 && q.length < 3;

  const results = useMemo(() => {
    if (!searching) return [];
    return students.filter((student) => {
      let matchesQuery = true;
      if (queryUsable) {
        matchesQuery = isNumeric
          ? student.enrollment.endsWith(q)
          : student.name.toLowerCase().includes(q);
      }
      const matchesSubjects = active.every((code) =>
        student.codes.includes(code)
      );
      return matchesQuery && matchesSubjects;
    });
  }, [q, isNumeric, queryUsable, active, searching]);

  // One event per settled search, not per keystroke.
  useEffect(() => {
    if (!queryUsable) return;
    const id = setTimeout(() => {
      track("search", {
        search_type: isNumeric ? "enrollment" : "name",
        results_count: results.length,
        ...(TRACK_SEARCH_TERMS ? { search_term: q } : {}),
      });
    }, 900);
    return () => clearTimeout(id);
  }, [q, isNumeric, queryUsable, results.length]);

  const reset = () => {
    setQuery("");
    setActive([]);
  };

  return (
    <div className="shell">
      <section className="hero">
        <span className="eyebrow">GTU Portal &middot; Final Entry</span>
        <h1>Find your elective subjects</h1>
        <p>
          Type your name, or the last two digits of your enrollment number, to
          see the elective subjects assigned to you for Semester 7. Nothing is
          listed until you search.
        </p>
        <div className="hero-actions">
          <DownloadButton variant="ghost" location="hero" />
          <SupportButton />
        </div>
      </section>

      <section className="panel">
        <div className="search-wrap">
          <SearchIcon />
          <input
            className="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your name or enrollment number..."
            aria-label="Search students"
            autoFocus
          />
          {query && (
            <button className="clear-btn" onClick={() => setQuery("")}>
              Clear
            </button>
          )}
        </div>

        <p className="filter-label">Narrow down by subject</p>
        <div className="chips">
          {subjects.map((subject) => (
            <button
              key={subject.code}
              className={`chip${active.includes(subject.code) ? " on" : ""}`}
              onClick={() => toggle(subject.code)}
            >
              <span className={`dot d-${subject.accent}`} />
              {subject.name}
            </button>
          ))}
          {active.length > 0 && (
            <button className="chip" onClick={() => setActive([])}>
              Reset filters
            </button>
          )}
        </div>

        <div className="panel-actions">
          <ViewAllButton />
          <SupportButton variant="ghost btn-sm" label="Need help?" />
          <p className="panel-hint">
            Full list is hidden &mdash; search your own name or number.
          </p>
        </div>
      </section>

      {!searching ? (
        <div className="idle">
          <div className="idle-icon">
            <SearchIcon />
          </div>
          <strong>
            {partialNumber
              ? "Keep going \u2014 enter at least the last two digits"
              : partialName
                ? "Keep going \u2014 type at least 3 letters"
                : "Your subjects are hidden until you search"}
          </strong>
          <p>
            {partialNumber || partialName
              ? "Partial searches are ignored on purpose, so nobody can pull up the whole class list."
              : "Start typing above \u2014 your name, or the last two digits of your enrollment number. Subject chips only narrow a search; they never list the class on their own."}
          </p>
        </div>
      ) : (
        <>
          <div className="results-bar">
            <h2>Matching students</h2>
            <span className="results-count">
              {results.length} of {students.length}
              {" · "}
              <button className="link-btn" onClick={reset}>
                Reset
              </button>
            </span>
          </div>

          {results.length === 0 ? (
            <div className="empty">
              <strong>No students found</strong>
              Check the spelling of your name, or the last digits of your
              enrollment number, and clear any subject filters.
            </div>
          ) : (
            <div className="card-grid">
              {results.map((student) => (
                <StudentCard key={student.enrollment} student={student} />
              ))}
            </div>
          )}
        </>
      )}

      <section className="support-section" id="support">
        <span className="eyebrow">Support</span>
        <h2>Subjects not matching?</h2>

        <ol className="steps">
          <li>
            <b>First, check the original list.</b> Download the GTU portal final
            elective entry PDF and find your enrollment number in it. This site
            is generated directly from that file, so whatever it says is what
            you see here.
          </li>
          <li>
            <b>Still mismatched?</b> If the PDF also shows the wrong subjects,
            the entry itself needs correcting &mdash; please contact{" "}
            <b>{SUPPORT_CONTACT}</b>.
          </li>
        </ol>

        <div className="callout">
          <span className="callout-mark">!</span>
          <div>
            <div className="callout-title">Contact {SUPPORT_CONTACT}</div>
            <div className="callout-body">
              For any elective allotment correction, reach out to{" "}
              {SUPPORT_CONTACT} with your full name and enrollment number.
            </div>
          </div>
        </div>

        <div className="support-actions">
          <DownloadButton variant="primary" location="support" />
        </div>

        <p className="file-note">{ORIGINAL_PDF_LABEL}</p>
      </section>
    </div>
  );
}
