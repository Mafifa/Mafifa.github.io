import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { useTranslations } from "../i18n/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  websiteUrl: string;
  repositoryUrl: string;
  date: string;
}
type Lang = "en" | "fr" | "es";

export default function ProjectsSection({ lang }: { lang: Lang }) {
  const t = useTranslations(lang);
  const projects: Project[] = [
    {
      id: 1,
      title: "MAFFI TYPE",
      description: t("projects.project1.description"),
      longDescription: t("projects.project1.longDescription"),
      technologies: ["React.js", "TypeScript", "Tailwind CSS"],
      image: "../MAFFI-TYPE.png",
      websiteUrl: "https://maffi-type.vercel.app/",
      repositoryUrl: "https://github.com/Mafifa/maffi-type",
      date: "2023-05-15",
    },
    {
      id: 2,
      title: "Fer Books",
      description: t("projects.project2.description"),
      longDescription: t("projects.project2.longDescription"),
      technologies: ["Astro", "TypeScript", "Tailwind CSS"],
      image: "../FerBooks.png",
      websiteUrl: "https://fer-books.vercel.app/",
      repositoryUrl: "https://github.com/Mafifa/fer-books",
      date: "2023-03-20",
    },
    {
      id: 3,
      title: "BDV Crédito Clon",
      description: t("projects.project3.description"),
      longDescription: t("projects.project3.longDescription"),
      technologies: [
        "React.js",
        "Astro",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
      ],
      image: "../venezuelaso.png",
      websiteUrl: "https://bdvcredito.vercel.app", // Puedes reemplazarlo con una URL real si lo tienes.
      repositoryUrl: "https://github.com/Mafifa/web-credito-bdv",
      date: "2024-09-01",
    },
    {
      id: 4,
      title: "Gestor Web de Artículos y Ventas",
      description: t("projects.project4.description"),
      longDescription: t("projects.project4.longDescription"),
      technologies: [
        "Electron",
        "React.js",
        "TypeScript",
        "Tailwind CSS",
        "Chart.js",
        "Recharts",
        "Supabase",
        "Zustand",
      ],
      image: "../dashboardso.png",
      websiteUrl: "https://github.com/Mafifa/gestor-web",
      repositoryUrl: "https://github.com/Mafifa/gestor-web",
      date: "2024-09-12",
    },
    {
      id: 5,
      title: "Mafifa Pomodoro",
      description: t("projects.project5.description"),
      longDescription: t("projects.project5.longDescription"),
      technologies: ["Electron", "React.js", "TypeScript", "Tailwind CSS"],
      image: "../pomodoroso.png",
      websiteUrl: "https://github.com/Mafifa/Maff-pomodoro",
      repositoryUrl: "https://github.com/Mafifa/Maff-pomodoro",
      date: "2024-09-12",
    },

    // Add more projects here...
  ];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const filteredProjects = projects
    .filter(
      (project) => filter === "All" || project.technologies.includes(filter)
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  const allTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  );

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section className="py-16 bg-[#1c1d22] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 flex items-center justify-center">
          <span className="text-blue-400 text-center mr-2">&lt;/&gt;</span>{" "}
          {t("site.projects")}
        </h2>

        <div className="mb-8 flex items-center justify-center flex-wrap gap-4">
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Technologies</option>
            {allTechnologies.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
            onChange={(e) => setSortBy(e.target.value as "date" | "title")}
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer will-change-transform"
                onClick={() => handleProjectClick(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-600 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <Dialog
              as={motion.div}
              className="fixed inset-0 z-10 overflow-y-auto"
              open={!!selectedProject}
              onClose={closeModal}
              static
            >
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-25"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={overlayVariants}
              />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel
                  as={motion.div}
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle bg-gray-800 shadow-xl rounded-2xl"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-white mb-4"
                  >
                    {selectedProject.title}
                  </Dialog.Title>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <div className="mt-2">
                    <p className="text-sm text-gray-300 mb-4">
                      {selectedProject.longDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-600 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-4">
                    <a
                      href={selectedProject.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                    >
                      <FaGlobe className="mr-2" /> Visit Website
                    </a>
                    <a
                      href={selectedProject.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-200"
                    >
                      <FaGithub className="mr-2" /> View Repository
                    </a>
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
