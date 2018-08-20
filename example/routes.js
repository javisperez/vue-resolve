import axios from 'axios';

import layout from './components/layout.vue';
import users from './components/users.vue';
import user from './components/user.vue';
import home from './components/home.vue';

export default [
    {
        path: '/',
        component: layout,
        children: [
            {
                path: '/',
                component: home,
            },

            {
                path: '/users',
                component: users,
                meta: {
                    resolve: {
                        users: _ => axios.get(`https://reqres.in/api/users`)
                    }
                }
            },

            {
                path: '/users/:id',
                component: user,
                meta: {
                    resolve: {
                        data: id => new Promise((resolve) => {
                            axios.get(`https://reqres.in/api/users/${id}`)
                                .then((response) => {
                                    resolve(response.data);
                                });
                        }),
                    },
                }
            }
        ]
    }
];