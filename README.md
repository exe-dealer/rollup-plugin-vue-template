# rollup-plugin-vue-template

Rollup plugin to compile Vue.js 2.0 templates.

`npm i rollup-plugin-vue-template --save-dev`

### Sample rollup config
```javascript
import vueTemplate from 'rollup-plugin-vue-template';
import buble from 'rollup-plugin-buble';

export default {
  entry: 'index.js',
  dest: 'dist/app.js',
  format: 'umd',
  plugins: [
    vueTemplate(),
    buble()
  ]
};
```


### Usage

`import template from './template.html'`

`template` will be an object

```javascript
{
  render: Function,
  staticRenderFns: Array<Function>
}
```

Set `render` and `staticRenderFns` properties on a component e.g:

```javascript
// manually
import template from './template.html'

export const myComponent = {
  render: template.render,
  staticRenderFns: template.staticRenderFns,
  mounted () {}
}



// mixin
import template from './template.html'

export const myComponent = {
  mixins: [template],
  mounted () {}
}



// stage2 object spread
import template from './template.html'

export const myComponent = {
  ...template,
  mounted () {}
}
```
