import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "p1",
    title: "Futuristic UI Dashboard",
    description: "Real-time metrics with glass panels & neon accents.",
    image: "/images/project-1.jpg",
    url: "#",
    tags: ["Next.js", "Tailwind", "Dashboard"],
  },
  {
    id: "p2",
    title: "Travel Booking App",
    description: "End-to-end booking flow with payments and admin panel.",
    image: "/images/project-2.jpg",
    url: "#",
    tags: ["Next.js", "Prisma", "Supabase"],
  },
  {
    id: "p3",
    title: "Portfolio Generator",
    description: "AI-assisted portfolio builder with presets.",
    image: "/images/project-3.jpg",
    url: "#",
    tags: ["AI", "React", "Design"],
  },
]
