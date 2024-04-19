<template>
    <div class="container">
        <div class="info">
            <div class="image">
                <img :src="thumbnail ? thumbnail : '/default_image.jpg'" alt="Imagen libro" class="bookImage"
                    @error="handleImageError">
            </div>
            <div class="book-data">
                <div class="title">{{ title.toUpperCase() }}</div>
                <div class="authors">{{ authors }}, {{ publish_date }}</div>
                <span><strong>Sinopsis de: {{ title }}</strong></span><br>
                <div class="description">
                    {{ getCleanDescription(description) }}
                </div>
                <div class="read-more">
                    <button v-if="description.length > 200" class="btn-read-more"
                        @click="toggleDescription">{{ showFullDescription ? 'Leer menos' : 'Leer más' }}</button>
                </div>
                <div class="more_info">
                    <strong><span class="tecnic">Ficha técnica</span></strong>
                    <ul>
                        <li class="publisher">
                            <strong>Publicado por:</strong> {{ publisher ? publisher : 'No se sabe' }}
                        </li>
                        <li class="language">
                            <strong>Idioma:</strong> {{ file_info.language }}
                        </li>
                        <li class="extension">
                            <strong>Formato de archivo: </strong> {{ file_info.extension }}
                        </li>
                    </ul>
                </div>
                <div>
                    <h4>Enlaces de descarga</h4>
                    <div class="urls">
                        <Button v-for="(item, index) in slowLinks" :key="index">
                            <a :href="item.url" target="_blank"><span class="option">Opción {{ index + 1 }}</span></a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookInfo',
    props: {
        bookId: String,
        required: true
    },
    data() {
        return {
            title: '',
            description: '',
            authors: '',
            file_info: {
                language: '',
                extension: '',
                size: ''
            },
            urls: [],
            thumbnail: '',
            publisher: '',
            publish_date: '',
            errorOccurred: false,
            showFullDescription: false
        };
    },
    methods: {
        async getBookInfo() {
            const url = import.meta.env.VITE_API_URL;
            const URL_BOOK = url + `/download?id=${this.bookId}`;
            await fetch(URL_BOOK)
                .then((response) => response.json())
                .then((book) => {
                    this.title = book.title;
                    this.description = book.description ? book.description : 'Sin sinopsis todavía';
                    this.authors = book.authors;
                    this.file_info = book.file_info;
                    this.urls = book.urls;
                    this.thumbnail = book.thumbnail;
                    this.publisher = book.publisher;
                    this.publish_date = book.publish_date
                })
        },
        getCleanDescription(description) {
            const cleanedDescription = this.cleanDescription(description);

            return this.showFullDescription ? cleanedDescription : (cleanedDescription.length > 200 ? cleanedDescription.substring(0, 200) + '...' : cleanedDescription);
        },
        cleanDescription(description) {
            const regex = /“([^”]*)”/;
            const firstMatch = description.match(regex);
            return firstMatch ? firstMatch[1] : 'Sin sinopsis todavía';
        },
        toggleDescription() {
            this.showFullDescription = !this.showFullDescription;
        },
        handleImageError(event) {
            // Verificar si ya ha ocurrido un error de carga de imagen
            if (!this.errorOccurred) {
                // Establecer la bandera de error
                this.errorOccurred = true;
                // En caso de error al cargar la imagen, establecer una imagen por defecto
                event.target.src = '/default_image.jpg'; // Ruta de la imagen por defecto
            }
        }
    },
    computed: {
        slowLinks() {
            return this.urls.filter(link => !link.title.toLowerCase().includes('fast'));
        }
    },
    mounted() {
        this.getBookInfo();
    },
}
</script>

<style scoped>
.container {
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info {
    background-color: var(--green-200);
    margin: 2rem;
    padding: 1rem;
}

.book-data {
    flex-grow: 1;
}

.read-more {
    display: flex;
    justify-content: center;
}

.btn-read-more {
    background: none;
    border: none;
    color: #000;
    text-decoration: underline;
    cursor: pointer;
    justify-content: center;
}

.btn-read-more:hover {
    background: none;
}

.info {
    display: flex;
}

img {
    max-width: 100vw;
    height: auto;
    margin-right: 1rem;
}

.title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.authors {
    font-style: italic;
    margin-bottom: 0.5rem;
}

.description {
    text-align: justify;

}

.more_info {
    padding-top: 1rem;
}

a {
    text-decoration: none;
    color: whitesmoke;
    font-weight: bold;

}

button {
    margin-right: 1rem;
    /* padding: 0.6rem; */
    border-radius: 10px;
    /* border: 1px solid black; */
    background-color: var(--green-600);

}

button:hover {
    background-color: var(--green-700);
}

.urls>* {
    margin-top: 1rem;

}

/* Media query para dispositivos con un ancho máximo de 600px (generalmente dispositivos móviles) */
@media screen and (width <=600px) {

    /* Cambia el flujo a una columna en dispositivos móviles */
    .info {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    img {
        width: auto;
        margin-right: 0;
        margin-bottom: 0.5rem;
    }

}
</style>
