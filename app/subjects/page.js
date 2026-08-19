import { students } from "@/data/students";
import { subjects } from "@/data/subjects";
import DownloadButton from "@/components/DownloadButton";
import SupportButton from "@/components/SupportButton";

export const metadata = {
  title: "Subjects | LY CSD Elective Portal",
  description: "All elective subjects with codes and enrolment numbers.",
};

export default function SubjectsPage() {
  const total = students.length;

  const rows = subjects.map((subject) => {
    const count = students.filter((s) => s.codes.includes(subject.code)).length;
    return { ...subject, count, share: Math.round((count / total) * 100) };
  });

  return (
    <div className="shell">
      <section className="section-head">
        <h1>Elective subjects</h1>
        <p>
          Every elective offered this term, with its GTU subject code and how
          many of the {total} students are enrolled in it.
        </p>
        <div className="hero-actions" style={{ justifyContent: "flex-start" }}>
          <DownloadButton variant="ghost" location="subjects_page" />
          <SupportButton />
        </div>
      </section>

      <div className="subject-grid">
        {rows.map((subject) => (
          <article className="subject-card" key={subject.code}>
            <div className="subject-card-top">
              <div className={`subject-tile a-${subject.accent}`}>
                {subject.short}
              </div>
              <div>
                <h3>{subject.name}</h3>
                <div className="code">{subject.code}</div>
              </div>
            </div>

            <span className="tag">{subject.group}</span>
            <p className="blurb">{subject.blurb}</p>

            <div>
              <div className="enrol-line">
                <span>
                  <b>{subject.count}</b> students
                </span>
                <span>{subject.share}%</span>
              </div>
              <div className="bar-track" style={{ marginTop: 8 }}>
                <div
                  className={`bar-fill d-${subject.accent}`}
                  style={{ width: `${subject.share}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
