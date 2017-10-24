const { createFilter } = require('rollup-pluginutils');
const compiler = rquire('vue-template-compiler');
const transpileVueTemplate = rquire('vue-template-es2015-compiler');

function toFunction (code) {
  return `function(){${code}}`;
}

module.exports = function vueTemplate(opts = {}) {
  if (!opts.include) {
    throw Error('include option should be specified');
  }
  
  const filter = createFilter(opts.include, opts.exclude);

  return {
    name: 'vue-template',

    transform(code, id) {
      if (filter(id)) {
        const compiled = compiler.compile(code);
        return {
          code: transpileVueTemplate(`module.exports={render:${toFunction(compiled.render)},staticRenderFns:[${compiled.staticRenderFns.map(toFunction).join(',')}]}`).replace('module.exports=', 'export default '),
          map: { mappings: '' }
        };
      }
    },
  };
};
