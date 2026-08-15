import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bySlug, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: PageProps<"/project/[slug]">) {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <div>
      <div className="pt-20 px-6 md:px-10 pb-10">
        <h1 className="font-pr uppercase text-[calc(1rem+6vw)] leading-[0.85] mb-2">
          {project.name}
        </h1>
        <div className="font-sc text-sm text-gray-500 mb-10">
          {project.category} — {project.year}
        </div>
        <div className="relative w-full aspect-[16/10] bg-gray-100 mb-10">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="max-w-2xl font-sc text-[15px] leading-relaxed space-y-6">
          <p>
            {project.name} is a {project.category.toLowerCase()} project by
            Emele Collab. This page is a structural placeholder — the original
            site has rich per-project content that would be sourced from a CMS.
          </p>
        </div>
      </div>
      {/* prev / next */}
      <div className="flex justify-between px-6 md:px-10 pb-20 font-pr uppercase text-[calc(1rem+3vw)] leading-[0.9]">
        <Link href={`/project/${prev.slug}`} className="lnk-blr-hvr">
          ← {prev.name}
        </Link>
        <Link href={`/project/${next.slug}`} className="lnk-blr-hvr">
          {next.name} →
        </Link>
      </div>
    </div>
  );
}
