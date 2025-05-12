import Link from "next/link"
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
        
        <div className="relative px-4 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 mb-6 animate-fade-in">
            About Me
          </h1>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Hey there! 👋 I'm Harshhaa Vardhan Reddy, a passionate DevOps Engineer on a mission to automate everything and scale cloud infrastructures efficiently.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <Link 
                href="https://github.com/NotHarshhaa" 
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-border/40 hover:bg-card/50 transition-colors w-full sm:w-auto"
              >
                <FaGithub className="w-5 h-5" />
                <span>GitHub</span>
              </Link>
              <Link 
                href="https://linkedin.com/in/harshhaa-vardhan-reddy" 
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-border/40 hover:bg-card/50 transition-colors w-full sm:w-auto"
              >
                <FaLinkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </Link>
              <Link 
                href="https://t.me/NotHarshhaa" 
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-border/40 hover:bg-card/50 transition-colors w-full sm:w-auto"
              >
                <FaTelegram className="w-5 h-5" />
                <span>Telegram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-primary/10 text-primary p-2 rounded-lg">👨‍💻</span>
                My Expertise
              </h2>
              <div className="space-y-6">
                <div className="group">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Cloud & DevOps Enthusiast
                  </h3>
                  <p className="text-muted-foreground pl-4 border-l-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                    Architecting scalable, secure, and high-performance infrastructures using AWS, Azure, Kubernetes, Terraform, and more.
                  </p>
                </div>
                <div className="group">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Automation Lover
                  </h3>
                  <p className="text-muted-foreground pl-4 border-l-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                    Scripting, CI/CD pipelines, Infrastructure as Code (IaC), and making deployments seamless.
                  </p>
                </div>
                <div className="group">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Content Creator
                  </h3>
                  <p className="text-muted-foreground pl-4 border-l-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                    I write blogs, create projects, and share everything I learn to help others grow in DevOps!
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-primary/10 text-primary p-2 rounded-lg">🔗</span>
                Find Me Online
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Link href="https://notharshhaa.site/" target="_blank" className="group">
                  <div className="p-4 rounded-xl bg-card/50 hover:bg-card transition-colors border border-border/50 hover:border-primary/50">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">Portfolio</h3>
                    <p className="text-sm text-muted-foreground">My personal website</p>
                  </div>
                </Link>
                <Link href="https://cv.notharshhaa.site/" target="_blank" className="group">
                  <div className="p-4 rounded-xl bg-card/50 hover:bg-card transition-colors border border-border/50 hover:border-primary/50">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">Resume</h3>
                    <p className="text-sm text-muted-foreground">Professional CV</p>
                  </div>
                </Link>
                <Link href="https://blog.notharshhaa.site/" target="_blank" className="group">
                  <div className="p-4 rounded-xl bg-card/50 hover:bg-card transition-colors border border-border/50 hover:border-primary/50">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">Blog</h3>
                    <p className="text-sm text-muted-foreground">Tech articles</p>
                  </div>
                </Link>
                <Link href="https://link.notharshhaa.site/" target="_blank" className="group">
                  <div className="p-4 rounded-xl bg-card/50 hover:bg-card transition-colors border border-border/50 hover:border-primary/50">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">Links</h3>
                    <p className="text-sm text-muted-foreground">All my profiles</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-primary/10 text-primary p-2 rounded-lg">🌐</span>
                My Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Empowering DevOps & Cloud Learners — One Resource at a Time. I believe DevOps shouldn't be locked behind paywalls or complexity. My goal is to facilitate learning by building and sharing with the community.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-primary/10 text-primary p-2 rounded-lg">📚</span>
                Learning Resources
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "💻 Real-Time Projects Hub",
                    description: "Work on real-world DevOps/Cloud projects",
                    link: "https://projects.prodevopsguytech.com"
                  },
                  {
                    title: "📚 Ultimate Docs Portal",
                    description: "900+ curated learning materials",
                    link: "https://docs.prodevopsguytech.com"
                  },
                  {
                    title: "📦 Repositories Central",
                    description: "Scripts, infra, prep content, and more",
                    link: "https://repos.prodevopsguytech.com"
                  },
                  {
                    title: "🧭 Jobs Portal",
                    description: "Find your next opportunity in DevOps or Cloud",
                    link: "https://jobs.prodevopsguytech.com"
                  }
                ].map((resource, index) => (
                  <Link key={index} href={resource.link} target="_blank">
                    <div className="group p-4 rounded-xl bg-card/50 hover:bg-card transition-all duration-300 border border-border/50 hover:border-primary/50">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                  </Link>
                ))}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Link href="https://blog.prodevopsguytech.com" target="_blank">
                    <div className="group p-4 rounded-xl bg-card/50 hover:bg-card transition-all duration-300 border border-border/50 hover:border-primary/50">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">📰 DevOps Blog</h3>
                      <p className="text-sm text-muted-foreground">Deep dives and guides</p>
                    </div>
                  </Link>
                  <Link href="https://cloud.prodevopsguytech.com" target="_blank">
                    <div className="group p-4 rounded-xl bg-card/50 hover:bg-card transition-all duration-300 border border-border/50 hover:border-primary/50">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">☁️ Cloud Blog</h3>
                      <p className="text-sm text-muted-foreground">Cloud insights</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mt-16">
          <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40">
            <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <span className="bg-primary/10 text-primary p-2 rounded-lg">🛠️</span>
              Technologies I Work With
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "AWS", "Azure", "Kubernetes", "Docker", "Terraform", "Ansible",
                "Jenkins", "GitHub Actions", "Python", "Bash", "Linux",
                "CI/CD", "IaC", "Monitoring", "Security", "Cloud Native"
              ].map((skill) => (
                <span 
                  key={skill} 
                  className="px-4 py-2 text-sm bg-card/50 hover:bg-card transition-colors border border-border/50 hover:border-primary/50 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 