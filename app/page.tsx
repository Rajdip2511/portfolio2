"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ContactModal } from "@/components/contact-modal"
import {
  Github,
  ExternalLink,
  Mail,
  Code2,
  Database,
  Globe,
  Cpu,
  Zap,
  Server,
  Layers,
  Palette,
  Bot,
  Coffee,
  Sparkles,
  Play,
} from "lucide-react"

export default function Portfolio() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }

      animationId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`
        }
        if (cursorTrailRef.current) {
          cursorTrailRef.current.style.transform = `translate(${e.clientX - 24}px, ${e.clientY - 24}px)`
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Anime.js will be loaded via CDN
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"
    document.head.appendChild(script)

    script.onload = () => {
      if (typeof window !== "undefined" && (window as any).anime) {
        const anime = (window as any).anime

        // Animate floating particles
        anime({
          targets: ".floating-particle",
          translateY: [0, -20, 0],
          translateX: [0, 10, -10, 0],
          scale: [1, 1.2, 0.8, 1],
          opacity: [0.3, 0.8, 0.4, 0.6],
          duration: 4000,
          easing: "easeInOutSine",
          loop: true,
          delay: anime.stagger(200),
        })

        // Animate tech stack cards on scroll
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              anime({
                targets: entry.target,
                translateY: [50, 0],
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 800,
                easing: "easeOutElastic(1, .8)",
                delay: anime.stagger(100),
              })
            }
          })
        })

        document.querySelectorAll(".tech-card").forEach((card) => observer.observe(card))
        document.querySelectorAll(".project-card").forEach((card) => observer.observe(card))
      }
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (script.parentNode) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  const techStack = [
    { name: "HTML", icon: Code2, color: "text-orange-500" },
    { name: "CSS", icon: Palette, color: "text-blue-500" },
    { name: "TypeScript", icon: Code2, color: "text-blue-400" },
    { name: "Cursor AI IDE", icon: Zap, color: "text-purple-500" },
    { name: "Next.js", icon: Globe, color: "text-white" },
    { name: "Node.js", icon: Server, color: "text-green-500" },
    { name: "Express.js", icon: Server, color: "text-gray-400" },
    { name: "React", icon: Cpu, color: "text-cyan-400" },
    { name: "v0.dev", icon: Bot, color: "text-red-400" },
    { name: "REST API", icon: Database, color: "text-yellow-500" },
    { name: "Spring Boot", icon: Layers, color: "text-green-600" },
    { name: "Java", icon: Coffee, color: "text-red-600" },
    { name: "GraphQL", icon: Database, color: "text-pink-500" },
    { name: "Prompt Engineering", icon: Sparkles, color: "text-purple-400" },
    { name: "Anime.js", icon: Play, color: "text-red-500" },
    { name: "MySQL", icon: Database, color: "text-blue-600" },
    { name: "MongoDB", icon: Database, color: "text-green-500" },
    { name: "Firebase", icon: Zap, color: "text-yellow-500" },
    { name: "Vercel", icon: Globe, color: "text-white" },
    { name: "Render", icon: Server, color: "text-purple-400" },
  ]

  const projects = [
    {
      id: 1,
      title: "AugPersona – AI-Powered Roleplay Chat Companion",
      description:
        "Augmented Persona is an AI-driven chat app designed to provide personalized companionship, motivation, and mental wellness support. Features AI-powered conversations with context-aware responses, modern chat UI with sleek design, secure Firebase authentication, and real-time AI responses powered by Mistral AI API. Built with React + Vite frontend, Cursor AI IDE, Firebase backend, and Mistral AI integration. AugPersona redefines AI companionship, making digital interactions more human, supportive, and impactful.",
      image: "/ai-companion-interface.jpeg",
      liveDemo: "https://ai-persona-mentor.firebaseapp.com/persona",
      github: "https://github.com/Rajdip2511/ai_Persona.git",
    },
    {
      id: 2,
      title: "AI Resume Builder",
      description:
        "A modern resume builder application powered by AI technology. This tool helps users create professional resumes with intelligent suggestions and formatting. The application features an intuitive drag-and-drop interface, real-time preview, multiple template options, and AI-powered content suggestions. Built with React and modern web technologies, it streamlines the resume creation process with automated formatting and professional design templates. The tool includes features like PDF export, custom sections, and responsive layouts for all devices.",
      image: "/ai-resume-builder-interface.jpeg",
      liveDemo: "https://rajdipsairesumebuilder.netlify.app/",
      github: "https://github.com/Rajdip2511/AI_ResumeBuilder",
    },
    {
      id: 3,
      title: "Smart Image Compressor",
      description:
        "An intelligent image compression tool that optimizes images while maintaining quality. This web application uses advanced compression algorithms to reduce image file sizes without significant quality loss. Features include batch processing, custom compression levels, format conversion, and preview functionality. The tool supports multiple image formats, provides instant previews, and offers both lossy and lossless compression options. Built with modern web technologies and optimized for performance and user experience.",
      image: "/image-compressor-interface.jpg",
      liveDemo: "https://rajdipsimagecompressor.netlify.app/",
      github: "https://github.com/Rajdip2511/image_compressor",
    },
    {
      id: 4,
      title: "AI-Powered Software Development Chatbot",
      description:
        "The AI-Powered Software Development Chatbot is an intelligent assistant designed to help developers with comprehensive programming support. Built with modern web technologies and powered by Mistral AI, this chatbot provides expert-level assistance across multiple domains including algorithms, system design, modern frameworks, and emerging technologies. This project demonstrates full-stack development skills, API integration, responsive design, and professional deployment practices. Frontend: HTML5 with semantic markup, CSS3 with modern styling and animations, Vanilla JavaScript for client-side functionality. Backend: Node.js runtime, Express.js framework, Mistral AI API integration. DevOps: Docker containerization, GitHub Actions CI/CD, Vercel hosting with global CDN, secure environment variable management.",
      image: "/software-dev-chatbot-purple.jpg",
      liveDemo: "https://software-dev-chatbot-4zz8halzr-rajdipcollege-gmailcoms-projects.vercel.app/",
      github: "https://github.com/Rajdip2511/AI_Chat_bot",
    },
  ]

  return (
    <div className="min-h-screen relative text-white overflow-x-hidden cursor-none">
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{ top: 0, left: 0 }}
      >
        <div className="w-full h-full rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50">
          <div className="absolute inset-1 rounded-full border border-red-300 animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-red-600 animate-pulse"></div>
        </div>
      </div>

      <div
        ref={cursorTrailRef}
        className="fixed w-12 h-12 pointer-events-none z-[9998] opacity-30 will-change-transform"
        style={{ top: 0, left: 0 }}
      >
        <div className="w-full h-full rounded-full border-2 border-red-400 animate-ping"></div>
      </div>

      {/* Akatsuki Background with Multiple Overlay Layers */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-pulse"
          style={{
            backgroundImage: "url('/akatsuki-background.jpeg')",
            filter: "brightness(0.3) contrast(1.2) saturate(0.8)",
            animationDuration: "8s",
          }}
        />
        {/* Primary dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Red gradient overlay for theme consistency */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black/60 to-slate-900/80" />
        {/* Subtle animated overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="floating-particle absolute top-20 left-10 w-3 h-3 bg-red-500 rounded-full animate-pulse opacity-80 shadow-lg shadow-red-500/50"></div>
        <div className="floating-particle absolute top-40 right-20 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-60 shadow-md shadow-red-400/40"></div>
        <div className="floating-particle absolute bottom-40 left-1/4 w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse opacity-70 shadow-lg shadow-red-600/50"></div>
        <div className="floating-particle absolute bottom-20 right-1/3 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-50 shadow-md shadow-red-500/40"></div>
        <div className="floating-particle absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-red-700 rounded-full animate-pulse opacity-40 shadow-sm shadow-red-700/30"></div>
        <div className="floating-particle absolute top-2/3 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-60 shadow-md shadow-red-400/40"></div>

        <div className="floating-particle absolute top-32 left-1/3 w-1 h-4 bg-red-600 rounded-full opacity-30 animate-bounce transform rotate-12"></div>
        <div
          className="floating-particle absolute bottom-32 right-1/2 w-1 h-3 bg-red-500 rounded-full opacity-40 animate-bounce transform -rotate-45"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="floating-particle absolute top-1/2 left-20 w-2 h-6 bg-red-700 rounded-full opacity-25 animate-bounce transform rotate-45"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="floating-particle absolute bottom-1/3 right-20 w-1.5 h-5 bg-red-600 rounded-full opacity-35 animate-bounce transform -rotate-12"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Navigation with enhanced backdrop */}
      <nav className="absolute top-0 w-full z-50 bg-gradient-to-r from-black/80 via-red-950/60 to-black/80 backdrop-blur-md border-b border-red-500/30 shadow-2xl shadow-red-900/40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-red-400 via-red-300 to-white bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer drop-shadow-2xl animate-pulse">
            Rajdip Mandal
          </div>
          <div className="flex space-x-8">
            {["about", "description", "tech-stack", "projects"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize hover:text-red-300 transition-all duration-300 relative group font-medium text-lg hover:scale-110 transform ${
                  activeSection === section ? "text-red-400 drop-shadow-lg scale-105" : "text-gray-200"
                }`}
              >
                {section.replace("-", " ")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-300 group-hover:w-full transition-all duration-300 shadow-lg shadow-red-500/50"></span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero/About Section with enhanced effects */}
      <section id="about" className="relative z-20 pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 relative">
            <div className="mb-6 relative group">
              <img
                src="/rajdip-profile.jpeg"
                alt="Rajdip Mandal Profile"
                className="w-32 h-32 mx-auto rounded-full border-3 border-red-500/80 ring-4 ring-red-500/30 hover:scale-110 hover:ring-red-400/60 hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-500 relative z-10 drop-shadow-2xl hover:animate-pulse"
              />

              {/* Enhanced blood splatter effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div
                  className="absolute -top-2 -left-2 w-4 h-4 bg-red-600 rounded-full animate-bounce shadow-lg shadow-red-600/50"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="absolute -top-1 right-4 w-3 h-3 bg-red-500 rounded-full animate-ping shadow-md shadow-red-500/40"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="absolute bottom-2 -left-3 w-3.5 h-3.5 bg-red-700 rounded-full animate-bounce shadow-lg shadow-red-700/50"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute -bottom-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full animate-ping shadow-md shadow-red-600/40"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="absolute top-6 -right-4 w-3 h-3 bg-red-500 rounded-full animate-bounce shadow-lg shadow-red-500/50"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <div
                  className="absolute bottom-8 -left-1 w-2 h-2 bg-red-700 rounded-full animate-pulse shadow-sm shadow-red-700/40"
                  style={{ animationDelay: "0.6s" }}
                ></div>

                {/* Enhanced splatter streaks */}
                <div
                  className="absolute -top-3 left-8 w-5 h-2 bg-red-600 rounded-full opacity-80 animate-pulse shadow-md shadow-red-600/40"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="absolute bottom-4 right-8 w-4 h-2.5 bg-red-500 rounded-full opacity-70 animate-pulse shadow-lg shadow-red-500/50"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent drop-shadow-2xl hover:scale-105 transition-transform duration-500">
              Hi, I&apos;m Rajdip Mandal 👋
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed drop-shadow-lg hover:text-gray-100 transition-colors duration-300">
            I&apos;m a{" "}
            <span className="text-red-400 font-semibold bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20 hover:bg-red-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">
              10x No-Code/Low-Code Developer
            </span>
            , specializing in MVP development that brings ideas to life faster than traditional teams.
          </p>
          <p className="text-lg text-gray-300 mb-8 drop-shadow-md hover:text-gray-200 transition-colors duration-300">
            Using AI-powered tools, I build, test, and deploy scalable products in record time—without writing code.
          </p>
          <p className="text-xl text-red-300 font-medium drop-shadow-lg hover:text-red-200 hover:scale-105 transition-all duration-300 cursor-pointer">
            📩Let&apos;s turn ideas into reality—fast!🚀
          </p>
        </div>
      </section>

      {/* Brief Description Section with enhanced backdrop */}
      <section id="description" className="relative z-20 py-20 px-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-red-400 drop-shadow-xl hover:scale-105 transition-transform duration-300">
            My Journey
          </h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-200 leading-relaxed mb-6 drop-shadow-md bg-black/20 p-6 rounded-lg border border-red-900/20 hover:bg-black/30 hover:border-red-800/30 transition-all duration-300 hover:scale-[1.02] transform">
              I am a forward-thinking AI-powered MVP developer with a passion for leveraging no-code, low-code, and
              AI-driven development tools to bring ideas to life at an unprecedented speed. Currently pursuing my B.Tech
              in IT at RCCIIT (MAKAUT University), I have redefined my approach to technology by embracing AI-assisted
              development, enabling me to build scalable applications, websites, and digital products with efficiency
              that rivals traditional methods.
            </p>
            <p className="text-gray-200 leading-relaxed mb-6 drop-shadow-md bg-black/20 p-6 rounded-lg border border-red-900/20 hover:bg-black/30 hover:border-red-800/30 transition-all duration-300 hover:scale-[1.02] transform">
              While many developers spend years mastering syntax and algorithms, I focus on what truly matters—building
              real-world solutions. With the advancements of AI tools like Cursor, Windsurf, and other modern automation
              platforms, I have turned application development into an intuitive process, making it as seamless as
              working with Excel or handling basic data tasks.
            </p>
            <p className="text-gray-200 leading-relaxed mb-6 drop-shadow-md bg-black/20 p-6 rounded-lg border border-red-900/20 hover:bg-black/30 hover:border-red-800/30 transition-all duration-300 hover:scale-[1.02] transform">
              I am not defined by conventional coding paradigms but by my ability to transform ideas into functional,
              market-ready products—whether it&apos;s web apps, video content, automation tools, or AI-driven experiences. I
              firmly believe that in 2025 and beyond, AI will bridge the gap between technical expertise and creativity,
              empowering individuals who once thought software development was out of reach.
            </p>
            <p className="text-red-300 font-medium leading-relaxed drop-shadow-lg bg-red-950/20 p-6 rounded-lg border border-red-500/30 hover:bg-red-950/30 hover:border-red-500/50 transition-all duration-300 hover:scale-[1.02] transform">
              My mission is simple: to showcase to the world that AI is the ultimate equalizer in tech, making software
              development accessible to everyone. No university curriculum can teach what hands-on experience with AI
              can. Let&apos;s build the future—faster, smarter, and more efficiently than ever before.
            </p>
          </div>
        </div>
      </section>

      <section id="tech-stack" className="relative z-20 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-red-400 drop-shadow-xl hover:scale-105 transition-transform duration-300">
            {"My Tech Skills"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {techStack.map((tech, index) => {
              const IconComponent = tech.icon
              return (
                <div
                  key={tech.name}
                  className="tech-card group relative bg-black/60 backdrop-blur-sm border border-red-900/40 rounded-lg p-6 text-center hover:bg-black/80 hover:border-red-500/60 transition-all duration-500 hover:scale-125 hover:rotate-3 cursor-pointer overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-500/30 opacity-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg animate-pulse"></div>
                  <div className="relative z-10 flex flex-col items-center space-y-3">
                    <IconComponent
                      className={`w-8 h-8 ${tech.color} group-hover:scale-150 group-hover:rotate-12 transition-all duration-500 drop-shadow-lg`}
                    />
                    <span className="text-gray-200 group-hover:text-white font-medium text-sm drop-shadow-md group-hover:font-bold transition-all duration-300">
                      {tech.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-20 py-20 px-6">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-red-400 drop-shadow-xl hover:scale-105 transition-transform duration-300">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="project-card group bg-black/70 backdrop-blur-sm border-red-900/40 hover:border-red-500/60 transition-all duration-700 hover:scale-110 hover:rotate-1 hover:shadow-2xl hover:shadow-red-500/40 cursor-pointer overflow-hidden shadow-xl opacity-0"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-300 transition-colors drop-shadow-md group-hover:scale-105 transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed drop-shadow-sm group-hover:text-gray-200 transition-colors duration-300">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/60 text-red-400 hover:bg-red-500/20 hover:border-red-400 bg-transparent backdrop-blur-sm shadow-lg hover:shadow-red-500/30 hover:scale-110 transition-all duration-300"
                      onClick={() => window.open(project.liveDemo, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-500/60 text-gray-300 hover:bg-gray-700/50 hover:border-gray-400 bg-transparent backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-300"
                      onClick={() => window.open("https://github.com/Rajdip2511", "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with enhanced backdrop */}
      <footer className="relative z-20 py-12 px-6 border-t border-red-900/40">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-gray-300 drop-shadow-md hover:text-gray-200 transition-colors duration-300">
            <p>&copy; 2025 Rajdip Mandal. Built with AI-powered precision.</p>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-500/60 text-gray-300 hover:bg-gray-700/50 hover:border-gray-400 bg-transparent backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-300"
              onClick={() => window.open("https://github.com/Rajdip2511", "_blank")}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button
              onClick={() => setIsContactOpen(true)}
              className="bg-red-600/90 hover:bg-red-700 text-white backdrop-blur-sm shadow-lg hover:shadow-red-500/30 border border-red-500/30 hover:scale-110 transition-all duration-300"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
          </div>
        </div>
      </footer>

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  )
}
