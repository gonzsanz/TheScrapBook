<template>
    <header class="header">
        <div>
            <router-link to="/">
                <img src="/logo_blanco.png" alt="logo biblio">
            </router-link>
        </div>
        <div class="text">
            <router-link to="/">
                <span>ScrapBook</span>
            </router-link>
        </div>
    </header>
</template>

<script>
export default {

}
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    background-color: #006400;
    margin-bottom: 1rem;
}

img {
    width: 5rem;
    height: auto;
}

.text>* {
    margin-right: 1rem;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    font-style: italic;
    text-decoration: none;
}
</style>