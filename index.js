const compiler = require('vue-template-compiler');
const transpileVueTemplate = require('vue-template-es2015-compiler');
const path = require('path');
const fs = require('fs');

function toFunction (code) {
  return `function(){${code}}`;
}

module.exports = function vueTemplate(opts = {}) {
  return {
    name: 'vue-template',

    resolveId(importee, importer) {
      if (importee.match(/\?vue$/)) {
        return path.resolve(path.dirname(importer), importee);
      }
    },

    load(id) {
      if (id.match(/\?vue$/)) {
        return fs.readFileSync(id.replace(/\?vue$/, ''), 'utf-8');
      }
    },

    transform(code, id) {
      if (id.match(/\?vue$/)) {
        const compiled = compiler.compile(code);
        return {
          code: transpileVueTemplate(`module.exports={render:${toFunction(compiled.render)},staticRenderFns:[${compiled.staticRenderFns.map(toFunction).join(',')}]}`, opts.buble).replace('module.exports=', 'export default '),
          map: { mappings: '' }
        };
      }
    },
  };
};
