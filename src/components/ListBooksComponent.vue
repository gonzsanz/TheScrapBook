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

export default {

    name: 'ListBookComponent',
    props: {
        searchQuery: String,
        required: true
    },
    components: {
        BookResultComponent,
    },
    data() {
        return {
            books: [],
            currentPage: 1,
            perPage: 10 // Número de libros por página
        }
    },
    methods: {
        async loadBooks() {
            try {
                const response = await fetch(`https://scrapbook.zeabur.app/search?q=${this.searchQuery}`);
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

    },
    async mounted() {
        await this.loadBooks();
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredBooks.length / this.perPage);
        },
        filteredBooks() {
            const keyWords = ["epub", "mobi", "pdf", "rtf"];
            return this.books.filter(extension => {
                return keyWords.some(keyWord => {
                    return extension.file_info.extension.toLowerCase().includes(keyWord);
                });
            });
        },
        paginatedFilteredBooks() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.filteredBooks.slice(startIndex, endIndex);
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

