<script>
import userCard from './user-card.vue';

export default {
    name: 'user',

    components: {
        userCard,
    },

    data() {
        return {
            user: {},
        };
    },
}
</script>

<template>
<div>
    <h2>Viewing User with ID: {{ user.id }}</h2>

    <user-card :data="user"></user-card>
</div>
</template>

<style lang="scss" scoped>
.user-card-component {
    max-width: 200px;
    text-align: center;
}
</style>
