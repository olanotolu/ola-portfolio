export const metadata = {
  title: "Research — Ola Aduloju",
  description:
    "Things I'm trying to understand before they become companies.",
};

const researchTopics = [
  "Autonomous organizations",
  "AI agents",
  "Space logistics",
  "Civilization-scale infrastructure",
  "Energy abundance",
  "Robotics",
  "Artificial general intelligence",
  "Machine economies",
  "ARO / GEO",
  "Future interfaces",
];

const essays = [
  { title: "Why Distance Should Become Irrelevant", year: "2026" },
  { title: "The Autonomous General Manager", year: "2026" },
  { title: "What Happens When Intelligence Becomes Cheap", year: "2026" },
  { title: "The Economics of Space Logistics", year: "2026" },
  { title: "Civilization as Software", year: "2026" },
];

export default function ResearchPage() {
  return (
    <div className="pt-20 px-6 md:px-10 py-24 md:py-36">
      <div className="max-w-3xl">
        <h1 className="font-pr text-[calc(1rem+5vw)] leading-[0.9] mb-6">
          Research
        </h1>
        <p className="font-sc text-[15px] text-gray-600 leading-relaxed mb-16">
          Things I&rsquo;m trying to understand before they become companies.
        </p>

        {/* Topics */}
        <h2 className="font-sc text-[11px] uppercase tracking-[0.15em] text-gray-500 mb-6">
          Topics
        </h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 mb-20">
          {researchTopics.map((topic) => (
            <li key={topic} className="font-pr text-[20px] md:text-[26px] leading-[1.1]">
              {topic}
            </li>
          ))}
        </ul>

        {/* Essays */}
        <h2 className="font-sc text-[11px] uppercase tracking-[0.15em] text-gray-500 mb-6">
          Writing
        </h2>
        <ul className="space-y-0">
          {essays.map((essay) => (
            <li
              key={essay.title}
              className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8 border-b border-gray-200 py-5"
            >
              <h3 className="font-pr text-[20px] md:text-[26px] leading-[1.1]">
                {essay.title}
              </h3>
              <span className="font-sc text-[12px] uppercase tracking-wider text-gray-500 whitespace-nowrap">
                {essay.year}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
