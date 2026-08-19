import { getSubjects } from "@/data/subjects";

function initials(name) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}

export default function StudentCard({ student }) {
  const subjects = getSubjects(student.codes);

  return (
    <article className="student-card">
      <div className="student-top">
        <div className="avatar">{initials(student.name)}</div>
        <div>
          <div className="student-name">{student.name}</div>
          <div className="student-meta">
            {student.enrollment} &middot; Sem {student.sem}
          </div>
        </div>
      </div>

      <div className="subject-list">
        {subjects.map((subject) => (
          <div className="subject-row" key={subject.code}>
            <span className={`subject-badge a-${subject.accent}`}>
              {subject.short}
            </span>
            <span className="grow">
              <div className="subject-name">{subject.name}</div>
              <div className="subject-code">{subject.code}</div>
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
