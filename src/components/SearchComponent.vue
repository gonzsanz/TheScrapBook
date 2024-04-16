<template>
    <div class="wrapper">
        <div class="input-search">
            <FilterComponent v-if="isNotRootRoute" />
            <input @keyup.enter="goViewResult" type="search" class="search" placeholder="Titulo, autor, fecha..." required
                v-model="searchQuery" @input="convertToUpperCase" />
            <Button @click="goViewResult"
                class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-black rounded-2xl borde">
                <i class="material-icons">search</i>
            </Button>
        </div>
    </div>
</template>

<script>
import FilterComponent from '../components/FilterComponent.vue';

export default {
    components: {
        FilterComponent
    },
    data() {
        return {
            searchQuery: ''
        }
    },
    methods: {
        async goViewResult() {
            localStorage.setItem("searchQuery", JSON.stringify(this.searchQuery));
            localStorage.removeItem('languageFilter');
            localStorage.removeItem('extensionFilter');
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
    computed: {
        isNotRootRoute() {
            return this.$route.path !== '/';
        }
    },
    mounted() {
        if (this.$route.name === 'results')
            this.searchQuery = JSON.parse(localStorage.getItem("searchQuery")).toUpperCase();
    }
}

</script>

<style scoped>
.wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-search {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    margin-top: 15px;
    width: 30rem;
}

.search {
    width: 85%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 25px;
}

button {
    color: #fff;
    /* padding: 10px 20px; */
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 25px;
    width: 2.5rem;
    height: 2rem;
    margin-left: 0.5rem;
}

button:hover {
    background-color: #006400;
    cursor: pointer;
}

::placeholder {
    font-style: italic;
}

@media screen and (width <=600px) {
    .input-search {
        width: ;
        justify-content: center;
    }

}
</style>