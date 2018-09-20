/**
 * Vue-Resolve
 * 
 * Resolve routes dependencies before entering the route.
 * 
 * This plugin let's you define dependencies for your routes (using vue-router)
 * that must be resolved before entering the route.
 * 
 * Javis V. Pérez
 * http://github.com/javisperez/vue-resolve
 */
export default {
    install(Vue, options = {}) {
        const defaults = {
            dataProperty: 'data',
        };

        const userOptions = {
            ...defaults,
            ...options,
        };

        const { router } = userOptions;

        if (!router) {
            throw new Error('Vue-resolve needs an instance of the router object.');
        }

        const resolveRoute = (route) => {
            /**
             * Store all promises that needs to be resolved
             * @type Array
             */
            const promises = [];

            // Resolve each promise while injecting the route parameters
            for (const key in route.meta.resolve) {
                promises.push(route.meta.resolve[key].apply(this, Object.values(route.params)));
            }

            return Promise.all(promises);
        };

        const populate = (vm, keys, data) => {
            // And populate the component with it
            for (const index in keys) {
                const key = keys[index];
                let value = data[index];

                if (userOptions.dataProperty) {
                    value = value[userOptions.dataProperty];
                }

                vm[key] = value;
            }
        }

        router.beforeEach((to, from, next) => {
            if (!to.meta || !to.meta.resolve) {
                return next();
            }

            resolveRoute(to)
                .then((responses) => {
                    next();

                    Vue.nextTick(() => {
                        let component = null;

                        for (const match of to.matched) {
                            if (match.meta !== to.meta) {
                                continue;
                            }

                            component = match.instances.default;

                            populate(component, Object.keys(to.meta.resolve), responses);

                        }

                        if (component.$options.resolved) {
                            component.$options.resolved();
                        }
                    });
                })
                .catch((responses) => {
                    console.error(responses);
                });;
        });
    }
};