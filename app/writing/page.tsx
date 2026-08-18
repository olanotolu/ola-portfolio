export const metadata = {
  title: "Writing — Ola Aduloju",
  description: "Essays on the future of intelligence, infrastructure, and civilization.",
};

const essays = [
  {
    title: "Before the Screen",
    description:
      "Why the future belongs to tools that preserve the original energy of thought.",
    url: "https://x.com/olanotolu/status/2085475779589083607",
    year: "2026",
  },
  {
    title: "Held Hostage by Your Own Coherence",
    description:
      "The danger of AI memory isn't that it forgets who you are. It's that it remembers one version of you too well.",
    url: "https://x.com/olanotolu/status/2082172153751888354",
    year: "2026",
  },
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
            <li key={essay.title} className="border-b border-gray-200 py-6">
              <a
                href={essay.url}
                target="_blank"
                rel="noopener"
                className="lnk-blr-hvr block"
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8 mb-2">
                  <h2 className="font-pr text-[20px] md:text-[26px] leading-[1.1]">
                    {essay.title}
                  </h2>
                  <span className="font-sc text-[12px] uppercase tracking-wider text-gray-500 whitespace-nowrap">
                    {essay.year}
                  </span>
                </div>
                <p className="font-sc text-[14px] text-gray-600 leading-relaxed max-w-2xl">
                  {essay.description}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
