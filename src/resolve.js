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
    install(Vue) {
        /**
         * Resolve all the dependencies from then given route object
         * @param {object} route The route object from vue-router
         */
        const resolveRoute = (route) => {
            if (!route.meta.resolve) {
                console.error('There\'s nothing to resolve');
                return Promise.resolve([]);
            }

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

        Vue.mixin({
            // Before entering any route, resolve any given dependency
            beforeRouteEnter(to, from, next) {
                // If there's nothing to resolve, continue;
                if (!to.meta.resolve) {
                    next();
                    return;
                }

                // Resolve all the dependencies
                resolveRoute(to)
                    .then((responses) => {
                        // And after that, redirect to the route
                        next((vm) => {
                            // Get all the keys on the dependencies
                            const keys = Object.keys(to.meta.resolve);

                            // And populate the component with it
                            for (const index in keys) {
                                const key = keys[index];
                                vm[key] = responses[index].data;
                            }

                            // And execute any `resolved` callback
                            if (vm.$options.resolved) {
                                vm.$options.resolved.call(vm);
                            }
                        });
                    })
                    .catch((responses) => {
                        console.error(responses);
                    });
            },

            methods: {
                /**
                 * Re-resolve the dependencies for the current route
                 */
                $resolve() {
                    if (!this.$route.meta.resolve) {
                        return;
                    }

                    resolveRoute(this.$route)
                        .then((responses) => {
                            // Re-populate the data
                            const keys = Object.keys(this.$route.meta.resolve);

                            for (const index in keys) {
                                const key = keys[index];
                                this[key] = responses[index].data;
                            }
                        })
                        .catch((responses) => {
                            console.error(responses);
                        });
                }
            }
        });
    }
};