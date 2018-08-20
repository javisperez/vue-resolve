<script>
import userCard from './user-card.vue';

export default {
    name: 'user',

    components: {
        userCard,
    },

    data() {
        return {
            data: {},
        };
    },
}
</script>

<template>
<div>
    <h2>User ID: {{ data.id }}</h2>

    <p>
        <img :src="data.avatar">
    </p>

    <p>
        <strong>First name:</strong> {{ data.first_name }}
    </p>

    <p>
        <strong>Last name:</strong> {{ data.last_name }}
    </p>
</div>
</template>
