<script>
export default {
    name: 'user-card',

    props: ['data'],

    computed: {
        fullname() {
            return `${this.data.first_name} ${this.data.last_name}`;
        }
    }
}
</script>

<template>
<div class="user-card-component">
    <img :src="data.avatar" :alt="fullname">

    <p>{{ data.first_name }}</p>

    <p>{{ data.last_name }}</p>
</div>
</template>

<style lang="scss">
.user-card-component {
    border: 1px solid rgba(#000, 0.2);
    padding: 10px;

    img {
        border-radius: 50%;
        box-shadow: 0 0 4px #999;
    }

    p {
        text-align: center;
    }
}
</style>
