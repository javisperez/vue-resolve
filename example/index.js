import Vue from 'vue/dist/vue';
import VueRouter from 'vue-router';
import VueResolve from '../src/resolve';

import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,

    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});

Vue.use(VueResolve, {
    router,
    dataProperty: 'data',
});

new Vue({
    name: 'app',

    router,

    template: `
        <div>
            <h1>Vue-Resolve Example</h1>

            <router-view class="view"></router-view>
        </div>
    `
}).$mount('#app');