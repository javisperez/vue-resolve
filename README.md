## Vue-resolve

A VueJS (2.x) / Vue-router plugin that resolves dependencies for routes before entering.

### What is this?

A plugin that reads a `meta.resolve` property on your component's route and resolve it (as a promise) before serving the route.

**Code Sandbox example**

https://codesandbox.io/s/wk2k671jyl

## Install

Install from npm:
```js
npm install vue-resolve --save
```

or from yarn:
```js
yarn add vue-resolve
```
## Example

```js
...
import VueResolve from 'vue-resolve';

const router = new VueRouter({
    routes: [{
        path: '/',
        component: mycomp,
        meta: {
            resolve: {
                mydata() {
                    return axios.get('/api/data');
                }
            }
        }
    }]
});

Vue.use(VueResolve, {
    router,
    dataProperty: 'data',
});

new Vue({
    ...
    router,
});
```

**Important:**

For  reactivity please make sure to define the *data* properties your route is going to populate in your component, so Vue can keep track of changes after the routes resolves. (e.g. on the `mycomp` component, *must* exist a `mydata` data)

For a more complete example, please check the [example folder](/example).

### Options

**resolved()**

You can add a `resolved()` option in your component that will be executed when dependencies for that route/component are resolved.

**this.$resolve()**

You can use `this.$resolve()` to re-resolve dependencies, in case you want to run the same dependencies again without the need of duplicating it.
