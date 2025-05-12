import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PrivacyPolicy() {
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
              Privacy Policy
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
                  Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  DevOps Tool Installer ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
                  This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 border border-border/40 hover:border-border/60 transition-colors">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-lg">2</span>
                  Information We Collect
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not collect any personal information from users. Our website provides installation guides and documentation for DevOps tools.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 border border-border/40 hover:border-border/60 transition-colors">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-lg">3</span>
                  Third-Party Links
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.
                  We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 border border-border/40 hover:border-border/60 transition-colors">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-lg">4</span>
                  Changes to This Privacy Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                  You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 border border-border/40 hover:border-border/60 transition-colors">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-lg">5</span>
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us through our GitHub repository.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 