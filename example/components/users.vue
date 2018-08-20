<script>
import userCard from './user-card.vue';

export default {
    name: 'users',

    components: {
        userCard,
    },

    data() {
        return {
            users: [],
        };
    },

    resolved() {
        console.log('Users api was resolved');
    },
};
</script>

<template>
    <div>
        <h2>All Users</h2>

        <div class="users-container">
            <router-link v-for="user in users.data" :key="user.id" :to="`/users/${user.id}`">
                <user-card :data="user"
                    style="
                        display: inline-block;
                        margin-right: 20px;
                    "></user-card>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss">
.users-container {
    a {
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 20px;

        .user-card {
            display: inline-block;
        }
    }
}
</style>
