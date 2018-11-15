
import * as jade from "jade";

interface TemplateEngineOptions {
  performCaching?: boolean
}

interface TemplateEngineRenderOptions {
  locals?: jade.TemplateLocals
}

export default class TemplateEngine {
  private templateCache: {[path: string]: jade.JadeGenerationFunction}
  private performCaching: boolean

  constructor(options: TemplateEngineOptions = {}) {
    this.performCaching = options.performCaching || false;
    this.templateCache = {};
  }

  render(filename: string, options: TemplateEngineRenderOptions = {}): string {
    const locals = options.locals || {};
    const path = `src/server/templates/${filename}.html.jade`;

    let fn = this.templateCache[path];
    if (fn && this.performCaching) {
      console.log('Hot cache', path);
    } else {
      fn = this.templateCache[path] = jade.compileFile(path);
      console.log('Cold cache', path);
    }

    return fn(locals);
  }
}