<template>
    <div class="container">
        <img src="/logo.png" alt="Logo">
        <SearchComponent />
    </div>
</template>

<script>
import SearchComponent from '../components/SearchComponent.vue';

export default {
    components: {
        SearchComponent,
    }

}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: fit-content;
}

img {
    width: 300px;
    height: auto;
}

@media screen and (width <=600px) {

    img {
        width: 100vw;
        height: auto;
        margin-right: 0;
        margin-bottom: 0.5rem;
    }
}
</style>