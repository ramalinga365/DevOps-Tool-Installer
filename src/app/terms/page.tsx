"use client";

import { LegalPageLayout, LegalSection } from "@/components/legal-page-layout";

export default function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service">
      <LegalSection number={1} title="Acceptance of Terms">
        <p className="text-muted-foreground leading-relaxed">
          By accessing and using DevOps Tool Installer, you accept and agree to
          be bound by the terms and provisions of this agreement.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-sm text-foreground/80">
            <strong>Important:</strong> Please read these terms carefully before
            using our services. Your use of the service constitutes your
            agreement to these terms.
          </p>
        </div>
      </LegalSection>

      <LegalSection number={2} title="Use License">
        <p className="text-muted-foreground leading-relaxed mb-4">
          The content on DevOps Tool Installer is licensed under the MIT
          License. You are free to:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">Use</h3>
            <p className="text-sm text-muted-foreground">
              Use the installation guides for personal or commercial purposes
            </p>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">Modify</h3>
            <p className="text-sm text-muted-foreground">
              Modify and adapt the content for your needs
            </p>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">Share</h3>
            <p className="text-sm text-muted-foreground">
              Share and distribute the content
            </p>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-warning/5 border border-warning/10">
          <p className="text-sm text-warning-foreground">
            <strong>Note:</strong> While you have these freedoms, you must
            provide appropriate attribution and include the original license
            terms.
          </p>
        </div>
      </LegalSection>

      <LegalSection number={3} title="Disclaimer">
        <p className="text-muted-foreground leading-relaxed">
          The installation guides and documentation are provided "as is" without
          warranty of any kind, either express or implied. We do not warrant
          that the guides will be error-free or uninterrupted.
        </p>
        <div className="mt-4 space-y-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">No Guarantees</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
                We cannot guarantee the accuracy of all information
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
                Results may vary based on your system configuration
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
                Documentation may not cover all edge cases
              </li>
            </ul>
          </div>
        </div>
      </LegalSection>

      <LegalSection number={4} title="Limitations">
        <p className="text-muted-foreground leading-relaxed">
          In no event shall DevOps Tool Installer be liable for any damages
          arising out of the use or inability to use the materials on our
          website, even if we have been notified of the possibility of such
          damage.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-destructive/5 border border-destructive/10">
          <p className="text-sm text-destructive-foreground">
            <strong>Important:</strong> By using our service, you acknowledge
            and accept these limitations of liability.
          </p>
        </div>
      </LegalSection>

      <LegalSection number={5} title="Third-Party Tools">
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our website provides installation guides for third-party DevOps tools.
          These tools are subject to their own terms of service, licenses, and
          conditions. We are not responsible for third-party tools or their use.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">
              Third-Party Licenses
            </h3>
            <p className="text-sm text-muted-foreground">
              Each tool mentioned in our guides may have its own licensing terms
              that you need to comply with.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">
              Your Responsibility
            </h3>
            <p className="text-sm text-muted-foreground">
              It is your responsibility to ensure compliance with third-party
              terms when using their tools.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection number={6} title="Contact">
        <p className="text-muted-foreground leading-relaxed">
          If you have any questions about these Terms of Service, please contact
          us through our GitHub repository.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
          <h3 className="font-medium text-foreground mb-2">Ways to Reach Us</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
              Open an issue on GitHub
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
              Join our community discussions
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
              Submit documentation improvements
            </li>
          </ul>
        </div>
      </LegalSection>
    </LegalPageLayout>
  );
}
