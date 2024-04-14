<template>
    <div class="wrapper">
        <div class="input-search">
            <input @keyup.enter="goViewResult" type="search" class="search" id="search-dropdown"
                placeholder="Titulo, autor, fecha..." required v-model="searchQuery" @input="convertToUpperCase" />
            <button @click="goViewResult"
                class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-black rounded-2xl borde">
                <i class="material-icons">search</i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: ''

        }
    },
    methods: {
        async goViewResult() {
            localStorage.setItem("searchQuery", JSON.stringify(this.searchQuery));
            if (this.$route.name === 'results') {
                window.location.reload();
            } else {
                this.$router.push({
                    name: 'results'
                });
            }
        },
        convertToUpperCase() {
            this.searchQuery = this.searchQuery.toUpperCase();
        }
    },
    mounted() {
        if (this.$route.name === 'results')
            this.searchQuery = JSON.parse(localStorage.getItem("searchQuery")).toUpperCase();
    }
}

</script>

<style scoped>
.input-search {
    display: flex;
    margin-bottom: 15px;
    margin-top: 15px;
}

.search {
    width: 25rem;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

i {}

button {
    background-color: #008000;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
}
button:hover {
    background-color: #006400;
    cursor: pointer;
}

@media screen and (width <=600px) {

    .search {
        width: 80vw;
    }
}
</style>