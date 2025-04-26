export class DocumentationGenerator {
  static updateSystemPatterns(components) {
    const existingContent = fs.readFileSync('./memory-bank/systemPatterns.md', 'utf8');
    const newSection = this.generatePatternsSection(components);
    
    // Preserve existing non-diagram content
    const updatedContent = existingContent.replace(
      /(## Component Relationships\s*)(.*?)(?=##|$)/s,
      `$1${newSection}`
    );
    
    fs.writeFileSync('./memory-bank/systemPatterns.md', updatedContent);
  }

  static generatePatternsSection(components) {
    let markdown = '\n\n';
    components.relationships.forEach(rel => {
      markdown += `- ${rel.source} → ${rel.label} → ${rel.target}\n`;
    });
    return markdown;
  }
} 