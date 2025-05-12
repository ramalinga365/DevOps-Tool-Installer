import { remark } from 'remark';
import html from 'remark-html';

interface Section {
  title: string;
  content: string;
  steps: {
    description: string;
    code?: string;
  }[];
}

export async function parseMarkdownSections(markdown: string): Promise<Section[]> {
  // Process the markdown content to HTML
  const processedContent = await remark()
    .use(html)
    .process(markdown);
  const contentHtml = processedContent.toString();

  // Split content into sections based on h2 headers
  const sections: Section[] = [];
  const sectionRegex = /## (.+?)\n([\s\S]*?)(?=## |$)/g;
  let match;

  while ((match = sectionRegex.exec(markdown)) !== null) {
    const [_, title, content] = match;
    
    // Extract steps (h3 headers and code blocks)
    const steps: { description: string; code?: string }[] = [];
    const stepRegex = /### (.+?)\n```bash\n([\s\S]*?)```|### (.+?)(?=### |$)/g;
    let stepMatch;

    while ((stepMatch = stepRegex.exec(content)) !== null) {
      if (stepMatch[1]) {
        // Step with code block
        steps.push({
          description: stepMatch[1].trim(),
          code: stepMatch[2]?.trim()
        });
      } else if (stepMatch[3]) {
        // Step without code block
        steps.push({
          description: stepMatch[3].trim()
        });
      }
    }

    // Process section content to HTML (excluding the steps part)
    const sectionContent = await remark()
      .use(html)
      .process(content.replace(/### .+?(?=### |$)/g, ''));

    sections.push({
      title: title.trim(),
      content: sectionContent.toString(),
      steps
    });
  }

  return sections;
} 