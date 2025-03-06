import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";
import HeaderNav from "../components/header-nav";

export default async function Project() {
  const projects: ProjectType[] = await getProjects();

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <HeaderNav />
      <section className="mt-24 max-w-2xl mb-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
        Projects I've worked on
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
        Here are some of the projects I've worked on over the years.
        I'm going to add more projects soon so stay tuned!
        </p>
      </section>

      <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project._id}
            className="flex items-center gap-x-4 border border-transparent hover:border-zinc-700 p-4 rounded-lg ease-in-out"
          >
            <Image
              src={project.logo}
              width={60}
              height={60}
              alt={project.name}
              className="rounded-md p-2"
            />
            <div>
              <h2 className="font-semibold mb-1">{project.name}</h2>
              <div className="text-sm text-zinc-400">{project.tagline}</div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}