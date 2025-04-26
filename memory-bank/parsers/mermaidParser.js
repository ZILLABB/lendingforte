export class MermaidParser {
  static extractComponents(mermaidCode) {
    const nodePattern = /(\w+)\[([^\]]+)\]/g;
    const relationPattern = /(\w+)\s*-->\s*\|?([^|]+)\|?\s*(\w+)/g;

    const components = {
      nodes: new Map(),
      relationships: [],
    };

    // Parse nodes
    let match;
    while ((match = nodePattern.exec(mermaidCode)) !== null) {
      components.nodes.set(match[1], {
        id: match[1],
        label: match[2],
        type: this.determineNodeType(match[2]),
      });
    }

    // Parse relationships
    while ((match = relationPattern.exec(mermaidCode)) !== null) {
      components.relationships.push({
        source: match[1],
        label: match[2].trim(),
        target: match[3],
      });
    }

    return components;
  }
}
