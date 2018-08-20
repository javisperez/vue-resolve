<script>
export default {
    name: 'layout',
}
</script>

<template>
    <div>
        <ul class="navbar">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/users">Fake Users</router-link>
            </li>
        </ul>

        <router-view></router-view>
    </div>
</template>

<style lang="scss">
.navbar {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        display: inline-block;
        padding: 0;
        margin: 0;
        margin-right: 20px;
    }
}
</style>
