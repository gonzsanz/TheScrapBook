<template>
    <div class="container">
        <hr />
        <div class="card">
            <img :src="thumbnail ? thumbnail : defaultImage" :alt="title" @error="handleImageError">
            <div class="book">
                <div class="info">
                    <div class="title">
                        {{ title.toUpperCase() }}
                    </div>
                    <div class="authors">
                        {{ authors }},
                        {{ publish_date }}
                    </div>
                    <span>Formato: </span>
                    <div class="extension">
                        {{ file_info.extension }}
                    </div>
                    <div class="language">
                        <span>Idioma: </span>
                        <strong>{{ extractLanguageName(file_info.language) }}</strong>
                    </div>
                </div>
                <div class="download">
                    <Button @click="goViewResult">
                        <strong>Descargar</strong><i class="material-icons">download</i>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    return: {
        defaultImage: '/default_image.jpg',
        errorOcurred: false
    },
    props: {
        id: String,
        title: String,
        authors: String,
        file_info: {
            language: String,
            extension: String,
            size: String
        },
        thumbnail: String,
        publisher: String,
        publish_date: String
    },
    methods: {
        async goViewResult() {
            localStorage.setItem("bookId", JSON.stringify(this.id));
            this.$router.push({
                name: 'downloadBook'
            });
        },
        extractLanguageName(languageString) {
            const regex = /\[(.*?)\]/; // Expresión regular para hacer coincidir el texto entre corchetes
            const match = languageString.match(regex);
            if (match && match.length > 1) {
                return languageString.replace(match[0], '').trim(); // Elimina el texto entre corchetes y cualquier espacio en blanco adicional
            }
            return languageString.trim(); // Si no se encuentra ninguna coincidencia, devuelve la cadena original sin espacios en blanco adicionales
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
    }
}
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: row;
    /* border: 1.5px solid green; */
    border-radius: 5px;
    /* margin-bottom: 7px; */
    /* background-color: var(--primary-50); */
}

hr {
    border: 1px solid var(--green-500);

}

.book {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.2rem;
}

img {
    width: 7rem;
    height: auto;
    border-radius: 5px;
}

.title {
    font-weight: bold;
    display: flex;
    flex-wrap: wrap;
}

.authors {
    font-style: italic;
}

.info {
    margin: 5px;
}

.download {
    display: flex;
    width: 100%;
    align-items: end;
    padding: 0.2rem;
}

.download>* {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
    border-radius: 25px;
    color: aliceblue;
    height: 1.6rem;
    padding: 0.5rem;
    background-color: var(--green-600);

}

.download>*:hover {
    cursor: pointer;
    background-color: var(--green-700);

}

.extension {
    display: inline;
    background-color: var(--green-300);
    border-radius: 5px;
    padding: 2px;
}

@media screen and (width <=600px) {

    .card {
        font-size: small;
    }
}
</style>