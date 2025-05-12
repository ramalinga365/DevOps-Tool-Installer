import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary/5 border-b border-border/40">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            <section className="space-y-8">
              <div className="bg-card rounded-xl p-8 border border-border/40 hover:border-border/60 transition-colors">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-lg">1</span>
                  Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using DevOps Tool Installer, you accept and agree to be bound by the terms and provisions of this agreement.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 border border-border/40 hover:border-border/60 transition-colors">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-lg">2</span>
                  Use License
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The content on DevOps Tool Installer is licensed under the MIT License. You are free to:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span>
                    Use the installation guides for personal or commercial purposes
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span>
                    Modify and adapt the content for your needs
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span>
                    Share and distribute the content
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-8 border border-border/40 hover:border-border/60 transition-colors">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-lg">3</span>
                  Disclaimer
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The installation guides and documentation are provided "as is" without warranty of any kind, either express or implied.
                  We do not warrant that the guides will be error-free or uninterrupted.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 border border-border/40 hover:border-border/60 transition-colors">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-lg">4</span>
                  Limitations
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall DevOps Tool Installer be liable for any damages arising out of the use or inability to use the materials
                  on our website, even if we have been notified of the possibility of such damage.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 border border-border/40 hover:border-border/60 transition-colors">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-lg">5</span>
                  Third-Party Tools
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website provides installation guides for third-party DevOps tools. These tools are subject to their own terms of service,
                  licenses, and conditions. We are not responsible for third-party tools or their use.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 border border-border/40 hover:border-border/60 transition-colors">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-lg">6</span>
                  Contact
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us through our GitHub repository.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 