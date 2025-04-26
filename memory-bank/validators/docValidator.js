export class DocumentationValidator {
  static validateMermaidConsistency(components) {
    const techContext = fs.readFileSync("./memory-bank/techContext.md", "utf8");
    const systemPatterns = fs.readFileSync(
      "./memory-bank/systemPatterns.md",
      "utf8"
    );

    components.nodes.forEach((node) => {
      if (
        !techContext.includes(node.label) &&
        !systemPatterns.includes(node.label)
      ) {
        console.warn(`Undocumented component: ${node.label}`);
      }
    });
  }
}
