export type Project = {
  slug: string;
  name: string;
  image: string;
  category: string;
  year: string;
};

// ponytail: single source of truth for all views (list/grid/gallery/project).
// Categories match the original site exactly (Web, Branding, Branding + Web).
// Image filenames mirror the Chrome "Save As" snapshot from emelecollab.com.
export const projects: Project[] = [
  { slug: "xanvier-allison", name: "Xanvier Allison", image: "/projects/XA-Featured-image.jpg", category: "Web", year: "2026" },
  { slug: "hilary-eden", name: "Hilary Eden", image: "/projects/HE-web-content-01-819x1024.jpg", category: "Web", year: "2026" },
  { slug: "jump-factory", name: "Jump Factory", image: "/projects/JF-01-1024x692.jpg", category: "Branding + Web", year: "2026" },
  { slug: "adcker", name: "Adcker", image: "/projects/ADCKR-01-1024x900.jpg", category: "Web", year: "2026" },
  { slug: "jochi-labs", name: "Jochi Labs", image: "/projects/JL-03-1024x640.jpg", category: "Branding", year: "2026" },
  { slug: "sonder", name: "Sonder", image: "/projects/SNDR-12-931x1024.jpg", category: "Web", year: "2026" },
  { slug: "marianna-von-fedak", name: "Marianna von Fedak", image: "/projects/MVF-02-797x1024.jpg", category: "Branding + Web", year: "2026" },
  { slug: "farah-gorayeb", name: "Farah Gorayeb", image: "/projects/FG-00-1024x1013.jpg", category: "Branding + Web", year: "2026" },
  { slug: "newol", name: "Newol", image: "/projects/NWL-01-1-1024x1024.jpg", category: "Branding", year: "2026" },
  { slug: "the-cortege", name: "The Cortège", image: "/projects/TC-02-914x1024.jpg", category: "Web", year: "2026" },
  { slug: "future-agency", name: "Future Agency", image: "/projects/FA-02-819x1024.jpg", category: "Web", year: "2026" },
  { slug: "salmara-swimwear", name: "Salmara Swimwear", image: "/projects/SS-03-819x1024.jpg", category: "Branding", year: "2026" },
  { slug: "matt-jones-orchestra", name: "Matt Jones Orchestra", image: "/projects/MJO-01-1024x576.jpg", category: "Branding", year: "2026" },
  { slug: "selina-miles", name: "Selina Miles", image: "/projects/SM-5-1024x855.jpg", category: "Branding", year: "2026" },
  { slug: "built-by-ross", name: "Built by Ross", image: "/projects/BBR-1-753x1024.jpg", category: "Branding", year: "2026" },
  { slug: "hybrid-creative-lab", name: "Hybrid Creative Lab", image: "/projects/HCL-03-1024x637.jpg", category: "Branding", year: "2026" },
  { slug: "moxey", name: "Moxey", image: "/projects/MX-3-1024x1024.jpg", category: "Web", year: "2026" },
  { slug: "into-the-swell", name: "Into the Swell", image: "/projects/ITS-08-1024x836.jpg", category: "Branding", year: "2026" },
  { slug: "nate-walker", name: "Nate Walker", image: "/projects/NW-1-1024x849.jpg", category: "Branding", year: "2026" },
  { slug: "arkitektkontoret-vest", name: "Arkitektkontoret Vest", image: "/projects/ARK-3-897x1024.jpg", category: "Web", year: "2026" },
  { slug: "bruno-suraski", name: "Bruno Suraski", image: "/projects/BS-Web-1024x801.jpg", category: "Branding", year: "2026" },
  { slug: "golf-fit", name: "Golf Fit", image: "/projects/GF-1-829x1024.jpg", category: "Branding", year: "2026" },
  { slug: "iiwi-pizzeria", name: "IIWI Pizzeria", image: "/projects/IIWI-1-1024x849.jpg", category: "Web", year: "2026" },
  { slug: "lidia-conde", name: "Lidia Conde", image: "/projects/LC-5-1024x768.jpg", category: "Branding", year: "2026" },
  { slug: "sotogrande-life-experience", name: "Sotogrande Life Experience", image: "/projects/insta5-1024x1024.jpg", category: "Branding + Web", year: "2026" },
  { slug: "barbara-skrodzka", name: "Barbara Skrodzka", image: "/projects/BSK-1-842x1024.jpg", category: "Web", year: "2026" },
];

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
