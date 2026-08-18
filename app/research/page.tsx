import { SiteFooter } from "@/components/SiteFooter";

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

const papers = [
  {
    title: "The Emergence of Machine Labor Markets",
    description:
      "An adversarial investigation into whether AI-completed work will become standardized and financialized like oil, electricity, and cloud compute.",
    url: "https://www.uninitial.com/markets",
    year: "2026",
  },
  {
    title: "JOHN DOE: Zero-Raw-Context AI Orchestration",
    description:
      "A privacy-preserving coordination system that routes tasks across frontier models while minimizing raw private context exposure.",
    url: "https://www.uninitial.com/JOHN_DOE_Zero_Raw_Context_AI_Orchestration.pdf",
    year: "2026",
  },
  {
    title: "World Models for Hospitality",
    description:
      "A research agenda for agentic venue operations — framing hospitality as a partially observable system and proposing a continuous world model as the intelligence layer for humans, agents, and robots.",
    url: "https://www.concya.com/research/world-models-for-hospitality.pdf",
    year: "2026",
  },
];

export default function ResearchPage() {
  return (
    <>
    <div className="pt-20 px-6 md:px-10 py-24 md:py-36">
      <div className="max-w-3xl">
        <h1 className="font-pr text-[calc(1rem+5vw)] leading-[0.9] mb-6">
          Research
        </h1>
        <p className="font-sc text-[15px] text-gray-600 leading-relaxed mb-16">
          Things I&rsquo;m trying to understand before they become companies.
        </p>

        {/* Topics — one italic serif agenda line, the extended thesis */}
        <h2 className="font-sc text-[11px] uppercase tracking-[0.15em] text-gray-600 mb-6">
          Topics
        </h2>
        <p className="font-pr italic text-[18px] md:text-[22px] leading-[1.5] max-w-4xl mb-20">
          {researchTopics.join(", ")}.
        </p>

        {/* Papers */}
        <h2 className="font-sc text-[11px] uppercase tracking-[0.15em] text-gray-600 mb-6">
          Papers
        </h2>
        <ul className="space-y-0 mb-20">
          {papers.map((paper) => (
            <li key={paper.title} className="border-b border-gray-200 py-6">
              <a
                href={paper.url}
                target="_blank"
                rel="noopener"
                className="lnk-blr-hvr block"
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8 mb-2">
                  <h3 className="font-pr text-[20px] md:text-[26px] leading-[1.1]">
                    {paper.title}
                  </h3>
                  <span className="font-sc text-[12px] uppercase tracking-wider text-gray-600 whitespace-nowrap">
                    {paper.year}
                  </span>
                </div>
                <p className="font-sc text-[14px] text-gray-600 leading-relaxed max-w-2xl">
                  {paper.description}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <SiteFooter />
    </>
  );
}
