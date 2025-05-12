'use client';

import { FaGithub, FaCode, FaBug, FaBook } from 'react-icons/fa';

export default function ContributePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contribute to DevOps Tool Installer</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Help us make DevOps tool installation easier for everyone. Your contributions make a difference!
        </p>
      </div>

      {/* Ways to Contribute */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-card rounded-lg p-6 border border-border/40">
          <div className="flex items-center mb-4">
            <FaCode className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-2xl font-semibold">Code Contributions</h2>
          </div>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Add new tool installation guides</li>
            <li>• Improve existing installation scripts</li>
            <li>• Enhance UI/UX components</li>
            <li>• Add new features and functionality</li>
            <li>• Optimize performance</li>
          </ul>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border/40">
          <div className="flex items-center mb-4">
            <FaBug className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-2xl font-semibold">Bug Reports</h2>
          </div>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Report installation issues</li>
            <li>• Submit UI/UX bug reports</li>
            <li>• Flag documentation errors</li>
            <li>• Identify security vulnerabilities</li>
            <li>• Test cross-platform compatibility</li>
          </ul>
        </div>
      </div>

      {/* Contribution Guidelines */}
      <div className="bg-card rounded-lg p-8 border border-border/40 mb-12">
        <div className="flex items-center mb-6">
          <FaBook className="w-6 h-6 text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold">Contribution Guidelines</h2>
        </div>
        <div className="space-y-6 text-muted-foreground">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">1. Fork and Clone</h3>
            <p>Start by forking the repository and cloning it locally:</p>
            <pre className="bg-muted p-4 rounded-md mt-2 overflow-x-auto">
              <code>git clone https://github.com/NotHarshhaa/DevOps-Tool-Installer.git</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">2. Create a Branch</h3>
            <p>Create a new branch for your contribution:</p>
            <pre className="bg-muted p-4 rounded-md mt-2 overflow-x-auto">
              <code>git checkout -b feature/your-feature-name</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">3. Make Changes</h3>
            <p>Make your changes following our coding standards:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Follow the existing code style</li>
              <li>Add comments for complex logic</li>
              <li>Update tests if necessary</li>
              <li>Ensure all tests pass</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">4. Submit a Pull Request</h3>
            <p>Push your changes and create a pull request:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Provide a clear PR description</li>
              <li>Reference any related issues</li>
              <li>Include screenshots for UI changes</li>
              <li>Update documentation if needed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Get Started */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Ready to Contribute?</h2>
        <a
          href="https://github.com/NotHarshhaa/DevOps-Tool-Installer"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FaGithub className="w-5 h-5 mr-2" />
          View on GitHub
        </a>
      </div>
    </div>
  );
} 