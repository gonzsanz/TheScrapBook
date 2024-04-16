<template>
    <div class="list-books">
        <BookResultComponent v-for="book in paginatedFilteredBooks" :key="book.id" :id="String(book.id)"
            :title="String(book.title)" :authors="String(book.authors)" :thumbnail="String(book.thumbnail)"
            :publisher="String(book.publisher)" :publish_date="String(book.publish_date)"
            :file_info="Object(book.file_info)" />

        <!-- Controles de paginación -->
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1"><i class="material-icons">arrow_back_ios</i></button>
            <span>{{ currentPage }} de {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages"><i
                    class="material-icons">arrow_forward_ios</i></button>
        </div>

    </div>
</template>

<script>
import BookResultComponent from './BookResultComponent.vue';
import FilterComponent from './FilterComponent.vue';

export default {

    name: 'ListBookComponent',
    props: {
        searchQuery: String,
        required: true,
    },
    components: {
        BookResultComponent,
        FilterComponent
    },
    data() {
        return {
            languages: [],
            validExtensions: ["epub", "mobi", "pdf", "rtf"],
            books: [],
            currentPage: 1,
            perPage: 10 // Número de libros por página
        }
    },
    methods: {
        async loadBooks() {
            const url = import.meta.env.VITE_API_URL;
            try {
                const response = await fetch(url + `/search?q=${this.searchQuery}`);
                if (!response.ok) {
                    throw new Error('Error al cargar los libros');
                }
                const data = await response.json();
                this.books = data.map(book => ({
                    id: book.id,
                    title: book.title,
                    authors: book.authors ? book.authors : 'Sin autor',
                    file_info: book.file_info,
                    thumbnail: book.thumbnail ? book.thumbnail : '/default_image.jpg',
                    publisher: book.publisher,
                    publish_date: book.publish_date ? book.publish_date : 'Sin fecha',
                }));
            } catch (error) {
                console.error('Error al cargar los libros:', error.message);
                // Manejar el error según sea necesario
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll hacia arriba
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll hacia arriba
            }
        },
        getLanguages() {
            // Método para obtener todos los lenguajes de los libros
            const languages = new Set();
            this.filteredBooks.forEach(book => {
                if (book.file_info.language !== null) {
                    languages.add(book.file_info.language);
                }
            });
            return Array.from(languages);
        },

        storeLanguages() {
            const languages = this.getLanguages();
            localStorage.setItem('languages', JSON.stringify(languages));
        }


    },
    async mounted() {
        await this.loadBooks();
        // this.languages = this.getLanguages();
        this.storeLanguages();
    },
    computed: {
        totalPages() {
            return Math.ceil(this.getBooksWithFiltersApplied.length / this.perPage);
        },
        filteredBooks() {

            return this.books.filter(extension => {
                return this.validExtensions.some(keyWord => {
                    return extension.file_info.extension.toLowerCase().includes(keyWord);
                });
            });
        },
        paginatedFilteredBooks() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.getBooksWithFiltersApplied.slice(startIndex, endIndex);
        },
        getBooksWithFiltersApplied() {
            let books = this.filteredBooks;
            const languageFilter = localStorage.getItem('languageFilter');
            const extensionFilter = localStorage.getItem('extensionFilter');

            // Filtrar por idiomas si el filtro está presente en localStorage
            if (languageFilter) {
                const selectedLanguages = JSON.parse(languageFilter);
                books = books.filter(book => {
                    return selectedLanguages.includes(book.file_info.language);
                });
            }

            // Filtrar por extensiones si el filtro está presente en localStorage
            if (extensionFilter) {
                const selectedExtensions = JSON.parse(extensionFilter);
                books = books.filter(book => {
                    // Eliminar el punto al comparar las extensiones
                    const extension = book.file_info.extension.toLowerCase();
                    return selectedExtensions.includes(extension.substring(1)); // Eliminar el punto al inicio
                });
            }

            return books;
        }


    }
}
</script>

<style scoped>
/* Estilos específicos del componente */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    padding: 1rem;
}

.pagination button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    background: none;
    border: none;
    outline: none;
    color: #006400;
}

.pagination button:hover {
    color: #000080;
    cursor: pointer
}

.pagination button:disabled {
    color: #808080;
}
</style>

