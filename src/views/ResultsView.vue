<template>
    <div class="container">
        <SearchComponentVue />
        <ListBooksComponent :searchQuery="searchQuery" />
    </div>
</template>

<script>
import ListBooksComponent from '../components/ListBooksComponent.vue';
import SearchComponentVue from '../components/SearchComponent.vue';

export default {
    components: {
        ListBooksComponent,
        SearchComponentVue,
    },
    data() {
        return {

        }
    },
    beforeMount() {
        this.searchQuery = JSON.parse(localStorage.getItem('searchQuery'));
    },
}
</script>

<style scoped>
.container {
    padding: 0.5rem;
}
</style>