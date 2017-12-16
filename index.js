const compiler = require('vue-template-compiler');
const transpileVueTemplate = require('vue-template-es2015-compiler');
const path = require('path');
const fs = require('fs');

function toFunction (code) {
  return `function(){${code}}`;
}

module.exports = function vueTemplate(opts = {}) {
  if (!opts.include) {
    throw Error('include option should be specified');
  }

  return {
    name: 'vue-template',

    resolveId(importee, importer) {
      if (importee.match(/\?vue-template$/)) {
        return path.resolve(path.dirname(importer), importee);
      }
    },

    load(id) {
      if (id.match(/\?vue-template$/)) {
        return fs.readFileSync(id.replace(/\?vue-template$/, ''), 'utf-8');
      }
    },

    transform(code, id) {
      if (id.match(/\?vue-template$/)) {
        const compiled = compiler.compile(code);
        return {
          code: transpileVueTemplate(`module.exports={render:${toFunction(compiled.render)},staticRenderFns:[${compiled.staticRenderFns.map(toFunction).join(',')}]}`, opts.buble).replace('module.exports=', 'export default '),
          map: { mappings: '' }
        };
      }
    },
  };
};
