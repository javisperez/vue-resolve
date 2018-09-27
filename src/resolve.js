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
    /**
     * Install method for Vue as a plugin
     * @param {Object} Vue - The Vue instance
     * @param {Object} options - User options which are:
     *                           router: The Vue-router instance.
     *                           dataProperty: (Optional) A property of the resolved promise
     *                                         that will be evaluated before passing
     *                                         to the component.
     */
    install(Vue, options = {}) {
        // Default values
        const defaults = {
            dataProperty: null,
        };

        // Merge the given values and the defaults
        const userOptions = {
            ...defaults,
            ...options,
        };

        const { router } = userOptions;

        // Router instance is required
        if (!router) {
            throw new Error('Vue-resolve needs an instance of the router object.');
        }

        /**
         * Resolve Route
         * @param {RouteObject} route - A Vue-router RouteObject to get the resolve property if any.
         */
        const resolveRoute = (route) => {
            /**
             * Store all promises that needs to be resolved
             * @type Array
             */
            const promises = [];

            // Queue all promises to resolve
            for (const key in route.meta.resolve) {
                promises.push(route.meta.resolve[key].apply(this, Object.values(route.params)));
            }

            // And resolve them
            return Promise.all(promises);
        };

        /**
         * Populate the resolved responses to the current resolve route keys
         * 
         * @param {Component} vm - Vue component object to set the resolved data.
         * @param {Array} keys - Array of keys of the resolve object of the route.
         * @param {Array} data - Data for each key with matching indexes.
         */
        const populate = (vm, keys, data) => {
            // Assign the data to the proper resolve key
            for (const index in keys) {
                const key = keys[index];
                let value = data[index];

                // If we have a dataProperty to eval, do it now
                if (userOptions.dataProperty) {
                    value = value[userOptions.dataProperty];
                }

                // Assign it to the component
                vm[key] = value;
            }
        }

        // Before entering each route, try to resolve the dependencies and only enter
        // if everything resolved successfully.
        router.beforeEach((to, from, next) => {
            // If nothing to resolve, continue normally
            if (!to.meta || !to.meta.resolve) {
                return next();
            }

            // Resolve and move on
            resolveRoute(to)
                .then((responses) => {
                    // Enter the component now, as we need the component instance to
                    // be able to populate it with the resolve data.
                    next();

                    // After mounting the component, populate it with the resolved data
                    Vue.nextTick(() => {
                        // We're gonna store the component here
                        let component = null;

                        for (const match of to.matched) {
                            if (match.meta !== to.meta) {
                                continue;
                            }

                            component = match.instances.default;

                            // Populate the resolved component data
                            populate(component, Object.keys(to.meta.resolve), responses);
                        }

                        // Run any `resolved` option on the component
                        if (component.$options.resolved) {
                            component.$options.resolved.bind(component)();
                        }
                    });
                })
                .catch((responses) => {
                    console.error(responses);
                });;
        });

        // $resolve method as a mixin
        Vue.mixin({
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
                            populate(this, Object.keys(this.$route.meta.resolve), responses);
                        })
                        .catch((responses) => {
                            console.error(responses);
                        });
                }
            }
        });
    }
};