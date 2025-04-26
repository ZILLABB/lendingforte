// Core file watcher setup
import chokidar from "chokidar";
import { MermaidParser } from "./parsers/mermaidParser.js";

class AutoDocumenter {
  constructor() {
    this.watcher = chokidar.watch("./memory-bank", {
      ignored: /(^|[/\\])\../, // ignore dotfiles
      persistent: true,
      awaitWriteFinish: true,
    });

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    // ... existing watcher config ...
    this.watcher
      .on("add", (path) => this.handleFileChange("add", path))
      .on("change", (path) => this.handleFileChange("change", path))
      .on("unlink", (path) => this.handleFileChange("remove", path));
  }

  async handleFileChange(eventType, filePath) {
    if (filePath.endsWith(".md")) {
      await this.processDocumentationUpdate(filePath);
      this.validateDocumentationConsistency();
    }
  }
}
