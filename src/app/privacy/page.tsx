"use client";

import { LegalPageLayout, LegalSection } from "@/components/legal-page-layout";

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <LegalSection number={1} title="Introduction">
        <p className="text-muted-foreground leading-relaxed">
          DevOps Tool Installer ("we," "our," or "us") respects your privacy and
          is committed to protecting your personal information. This Privacy
          Policy explains how we collect, use, and safeguard your information
          when you use our website.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Information We Collect">
        <p className="text-muted-foreground leading-relaxed">
          We do not collect any personal information from users. Our website
          provides installation guides and documentation for DevOps tools.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">Usage Data</h3>
            <p className="text-sm text-muted-foreground">
              We do not track or store any usage data about how you interact
              with our website.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">Cookies</h3>
            <p className="text-sm text-muted-foreground">
              We do not use cookies or similar tracking technologies.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection number={3} title="Third-Party Links">
        <p className="text-muted-foreground leading-relaxed">
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these websites. We
          encourage you to review the privacy policies of any third-party sites
          you visit.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-warning/5 border border-warning/10">
          <p className="text-sm text-warning-foreground">
            <strong>Note:</strong> When you click on links to other websites,
            you will be subject to their privacy policies and practices.
          </p>
        </div>
      </LegalSection>

      <LegalSection number={4} title="Changes to This Privacy Policy">
        <p className="text-muted-foreground leading-relaxed">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page. You are
          advised to review this Privacy Policy periodically for any changes.
        </p>
        <div className="mt-4 flex items-start space-x-4">
          <div className="flex-1 p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">
              Notification of Changes
            </h3>
            <p className="text-sm text-muted-foreground">
              Any changes we make to our Privacy Policy will be posted on this
              page with an updated revision date.
            </p>
          </div>
          <div className="flex-1 p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">
              Previous Versions
            </h3>
            <p className="text-sm text-muted-foreground">
              You may request access to previous versions of our Privacy Policy
              by contacting us.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection number={5} title="Contact Us">
        <p className="text-muted-foreground leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us
          through our GitHub repository.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
          <h3 className="font-medium text-foreground mb-2">Get in Touch</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span>
              Open an issue on our GitHub repository
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span>
              Start a discussion in our community forum
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span>
              Submit a pull request with suggested changes
            </li>
          </ul>
        </div>
      </LegalSection>
    </LegalPageLayout>
  );
}
