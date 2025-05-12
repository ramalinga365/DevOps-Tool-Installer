import { remark } from 'remark';
import html from 'remark-html';

interface Section {
  title: string;
  content: string;
  steps: {
    description: string;
    code?: string;
    language?: string;
  }[];
}

export async function parseMarkdownSections(markdown: string): Promise<Section[]> {
  // Split content into sections based on h2 headers
  const sections: Section[] = [];
  const sectionRegex = /## (.+?)\n([\s\S]*?)(?=## |$)/g;
  let match;

  while ((match = sectionRegex.exec(markdown)) !== null) {
    const [_, title, content] = match;
    
    // Extract steps (h3 headers and code blocks)
    const steps: { description: string; code?: string; language?: string }[] = [];
    const stepRegex = /### (.+?)\n([\s\S]*?)(?=### |$)/g;
    let stepMatch;

    while ((stepMatch = stepRegex.exec(content)) !== null) {
      const description = stepMatch[1].trim();
      const stepContent = stepMatch[2].trim();
      
      // Extract code blocks from step content with improved regex
      const codeBlockRegex = /```([\w-]*)\n([\s\S]*?)```/g;
      const codes: { code: string; language: string }[] = [];
      
      let codeMatch;
      while ((codeMatch = codeBlockRegex.exec(stepContent)) !== null) {
        codes.push({
          language: codeMatch[1] || 'bash',
          code: codeMatch[2].trim()
        });
      }

      // If we found code blocks, add each as a separate step
      if (codes.length > 0) {
        codes.forEach(({ code, language }) => {
          steps.push({
            description,
            code,
            language
          });
        });
      } else {
        // If no code blocks found, just add the description
        steps.push({
          description,
          code: undefined,
          language: undefined
        });
      }
    }

    // Process section content to HTML (excluding the steps part)
    const contentWithoutSteps = content.split(/### /)[0].trim();
    const processedContent = await remark()
      .use(html)
      .process(contentWithoutSteps);

    sections.push({
      title: title.trim(),
      content: processedContent.toString(),
      steps
    });
  }

  return sections;
} 