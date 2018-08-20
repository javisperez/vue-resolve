<template>
    <div class="home-component">
        <h2>Welcome to Vue-Resolve</h2>

        <h3>What is this?</h3>

        <p>
            Is a plugin for Vue.js + Vue-router that lets you define a promise that must be
            resolved before rendering the route.
        </p>

        <p>
            For example you can set async requests (xhr) from an api, so the view renders
            <em>after</em> the data fetched is fetched.
        </p>

        <h3>How to use</h3>

        <p>
            In your routes definition, you need to add a <code>resolve</code> propery 
            inside the <code>meta</code> properties, with all the dependencies you
            want to resolve for that route.
        </p>

        <p>
            Each property defined inside the <code>resolve</code> key, <strong>must</strong>
            be a function and return a promise. Also, the property name must match the data entry on
            the component mapped to that route.
        </p>

        <p>
            <strong>* Important:</strong> to avoid <em>reactivity issues</em>, you <strong>must</strong>
            define the data that will store the resolved value on the route's component.
        </p>

        <h3>Example</h3>

        <p>
            1. Define the empty data property on your model, like this:
        </p>

        <pre>
        const mycomponent = {
            data() {
                return {
                    mydata: null
                };
            }
        };
        </pre>

        <p>
            2. Define your route with the <code>resolve</code> key as dependency:
        </p>
        <pre>
        ...
        {
            path: '/',
            component: mycomponent,
            meta: {
                resolve: {
                    mydata() {
                        return axios.get('http://my.api.example/endpoint');
                    }
                }
            }
        }
        ...
        </pre>

        <h3>Options</h3>

        <h4>Re-resolving dependencies</h4>

        <p>
            If you need to re-run the resolved dependencies,
            you can use the <code>$resolved()</code>, all the dependencies for the current route
            will be executed again and re-populated to the data. 

            If data was modified since the route was resolved, this data will be lost as 
            the route will be re-resolved.
        </p>

        <h4>Executing a callback when the route is resolved</h4>

        <p>
            If you want to run something when the dependencies for a route is resolved,
            you can add a <code>resolve()</code> option (at the same level as the <code>data</code>
            or <code>methods</code> options) on the component that is attached to the route,
            and that method is going to be executed once the routes dependencies are resolve.
        </p>

        <p>
            <strong>* Important</strong> due limitations on the way that Vue-router pass the instanced components
            to the guards, the <code>resolved</code> option is called at the same time as the <code>resolved</code>.
        </p>
    </div>
</template>

<style lang="scss">
code,
pre {
    background-color: #EEE;
    border-radius: 3px;
    padding: 3px;
}
</style>
