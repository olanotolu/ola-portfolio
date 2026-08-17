export type Project = {
  slug: string;
  name: string;
  image: string;
  category: string;
  year: string;
  color?: string;
  logo?: string;
};

// ponytail: single source of truth for the project list on the one-pager.
// Categories match the original site exactly (Web, Branding, Branding + Web).
// Image filenames mirror the Chrome "Save As" snapshot from emelecollab.com.
export const projects: Project[] = [
  { slug: "xanvier-allison", name: "Concya", image: "/projects/XA-Featured-image.jpg", category: "Web", year: "2026" },
  { slug: "hilary-eden", name: "Unbehalf", image: "/projects/HE-web-content-01-819x1024.jpg", category: "Web", year: "2026" },
  { slug: "jump-factory", name: "Ontitled", image: "/projects/JF-01-1024x692.jpg", category: "Branding + Web", year: "2026" },
  { slug: "adcker", name: "Omposition", image: "/projects/ADCKR-01-1024x900.jpg", category: "Web", year: "2026" },
  { slug: "jochi-labs", name: "Education", image: "/projects/JL-03-1024x640.jpg", category: "Branding", year: "2026", color: "#00ff00", logo: "harvard" },
  { slug: "newol", name: "Research", image: "/projects/NWL-01-1-1024x1024.jpg", category: "Branding", year: "2026", color: "#ff0000" },
  { slug: "barbara-skrodzka", name: "Barbara Skrodzka", image: "/projects/BSK-1-842x1024.jpg", category: "Web", year: "2026" },
];
