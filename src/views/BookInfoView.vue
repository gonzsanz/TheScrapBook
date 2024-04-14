<template>
    <div>
        <BookInfoComponent :bookId="bookId" />
    </div>
</template>

<script>
import BookInfoComponent from '../components/BookInfoComponent.vue';

export default {
    components: {
        BookInfoComponent,
    },
    data() {
        return {

        }
    },
    beforeMount() {
        this.bookId = JSON.parse(localStorage.getItem('bookId'));
    },
}
</script>

<style lang="scss" scoped></style>