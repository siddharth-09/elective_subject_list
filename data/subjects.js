export const subjects = [
  {
    code: "3170717",
    name: "Cloud Computing",
    short: "CC",
    group: "Professional Elective",
    accent: "sky",
    blurb:
      "Virtualisation, service models and deploying scalable workloads on the cloud.",
  },
  {
    code: "3170725",
    name: "Digital Forensics",
    short: "DF",
    group: "Professional Elective",
    accent: "lilac",
    blurb:
      "Evidence acquisition, disk & network analysis and cyber investigation workflows.",
  },
  {
    code: "3171618",
    name: "Blockchain",
    short: "BC",
    group: "Professional Elective",
    accent: "mint",
    blurb:
      "Distributed ledgers, consensus, smart contracts and decentralised applications.",
  },
  {
    code: "3174904",
    name: "3D Animation",
    short: "3D",
    group: "Open Elective",
    accent: "peach",
    blurb:
      "Modelling, rigging, lighting and rendering pipelines for 3D motion content.",
  },
  {
    code: "3174903",
    name: "Advanced Web Programming",
    short: "AWP",
    group: "Open Elective",
    accent: "rose",
    blurb:
      "Modern full-stack web development, APIs, frameworks and deployment practices.",
  },
  {
    code: "3174905",
    name: "Game Development",
    short: "GD",
    group: "Open Elective",
    accent: "sand",
    blurb:
      "Game loops, physics, level design and building playable builds with an engine.",
  },
];

export const subjectByCode = Object.fromEntries(
  subjects.map((s) => [s.code, s])
);

export function getSubjects(codes = []) {
  return codes
    .map((code) => subjectByCode[code] || {
      code,
      name: "Unknown Subject",
      short: "--",
      group: "Elective",
      accent: "sky",
      blurb: "This subject code is not in the elective list.",
    });
}
