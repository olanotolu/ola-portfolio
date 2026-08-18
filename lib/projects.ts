export type Project = {
  slug: string;
  name: string;
  image: string;
  category: string;
  year: string;
  color?: string;
  logo?: string;
  url?: string;
  tagline?: string;
  prototype?: boolean;
};

// ponytail: single source of truth for the project list on the one-pager.
// Categories match the original site exactly (Web, Branding, Branding + Web).
// Image filenames mirror the Chrome "Save As" snapshot from emelecollab.com.
export const projects: Project[] = [
  { slug: "xanvier-allison", name: "Concya", image: "/projects/XA-hero.png", category: "Web", year: "2026", url: "https://www.concya.com", tagline: "Autonomous General Manager for Hospitality" },
  { slug: "bustem", name: "Bustem", image: "/projects/BSTM-hero.png", category: "AI", year: "2026", url: "https://bustem1draft.vercel.app", tagline: "AI agent to kill Copycats & Infringers", prototype: true },
  { slug: "hilary-eden", name: "Unbehalf", image: "/projects/HE-ue.png", category: "Web", year: "2026", url: "https://www.unbehalf.com", tagline: "Superintelligence on behalf of you" },
  { slug: "jump-factory", name: "Ontitled", image: "/projects/JF-hero.png", category: "Branding + Web", year: "2026", tagline: "Go where it isn't named yet" },
];
