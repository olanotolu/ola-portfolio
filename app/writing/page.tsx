export const metadata = {
  title: "Writing — Ola Aduloju",
  description: "Essays on the future of intelligence, infrastructure, and civilization.",
};

const essays = [
  { title: "Why Distance Should Become Irrelevant", year: "2026" },
  { title: "The Autonomous General Manager", year: "2026" },
  { title: "What Happens When Intelligence Becomes Cheap", year: "2026" },
  { title: "The Economics of Space Logistics", year: "2026" },
  { title: "Civilization as Software", year: "2026" },
];

export default function WritingPage() {
  return (
    <div className="pt-20 px-6 md:px-10 py-24 md:py-36">
      <div className="max-w-3xl">
        <h1 className="font-pr text-[calc(1rem+5vw)] leading-[0.9] mb-6">
          Writing
        </h1>
        <p className="font-sc text-[15px] text-gray-600 leading-relaxed mb-16">
          What I&rsquo;ve concluded.
        </p>

        <ul className="space-y-0">
          {essays.map((essay) => (
            <li
              key={essay.title}
              className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8 border-b border-gray-200 py-5"
            >
              <h2 className="font-pr text-[20px] md:text-[26px] leading-[1.1]">
                {essay.title}
              </h2>
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
