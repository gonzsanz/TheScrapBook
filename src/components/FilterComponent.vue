<template>
    <div class="card flex justify-content-center">
        <Button class="filter-button" @click="visible = true, this.loadSavedCategories();"> <i class="material-icons">tune</i></Button>
        <Dialog v-model:visible="visible" modal header="Aplicar filtros" :style="{ width: '50vw' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="card flex justify-content-center">
                <div class="flex flex-column gap-3">
                    <p><strong>Idiomas </strong></p>
                    <div v-for="language in languages" :key="language" class="flex align-items-center checkbox">
                        <Checkbox v-model="languageFilter" :inputId="language" name="category" :value="language" />
                        <label :for="language">{{ extractLanguageName(language) }}</label>
                    </div>
                    <p><strong>Formato de libro</strong></p>
                    <div v-for="extension in validExtensions" :key="extension" class="flex align-items-center checkbox">
                        <Checkbox v-model="extensionFilter" :inputId="extension" name="category" :value="extension" />
                        <label :for="extension">{{ extension }}</label>
                    </div>
                    <div class="buttons">
                        <Button label="Aplicar" @click="applyFilters" />
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            languageFilter: [],
            extensionFilter: [],
            validExtensions: ["epub", "mobi", "pdf", "rtf"],
            visible: false,
            languages: []
        }
    },
    methods: {
        async applyFilters() {
            // Guardar el filtro de idioma en localStorage
            if (!this.languageFilter || this.languageFilter.length === 0) {
                localStorage.removeItem('languageFilter');
            } else {
                localStorage.setItem('languageFilter', JSON.stringify(this.languageFilter));
            }

            // Guardar el filtro de extensión en localStorage
            if (!this.extensionFilter || this.extensionFilter.length === 0) {
                localStorage.removeItem('extensionFilter');
            } else {
                localStorage.setItem('extensionFilter', JSON.stringify(this.extensionFilter));
            }

            // Recargar la página
            window.location.reload();
        },
        async loadSavedCategories() {

            this.getLanguages();

            // Cargar las categorías seleccionadas guardadas en localStorage
            const savedLanguages = localStorage.getItem('languageFilter');
            const savedExtension = localStorage.getItem('extensionFilter');
            if (savedLanguages || savedExtension) {
                this.languageFilter = JSON.parse(savedLanguages);
                this.extensionFilter = JSON.parse(savedExtension);
            }
        },
        extractLanguageName(languageString) {
            const regex = /\[(.*?)\]/; // Expresión regular para hacer coincidir el texto entre corchetes
            const match = languageString.match(regex);
            if (match && match.length > 1) {
                return languageString.replace(match[0], '').trim(); // Elimina el texto entre corchetes y cualquier espacio en blanco adicional
            }
            return languageString.trim(); // Si no se encuentra ninguna coincidencia, devuelve la cadena original sin espacios en blanco adicionales
        },
        getLanguages() {
            // Cargar los idiomas disponibles
            const storedLanguages = localStorage.getItem('languages');
            if (storedLanguages) {
                this.languages = JSON.parse(storedLanguages);
            } else {
                this.languages = []; // Si no hay idiomas almacenados, asignar un array vacío
            }
        }
    },
    async mounted() {


        // Cargar las categorías seleccionadas después de cargar los idiomas
        await this.loadSavedCategories();
    }
}


</script>

<style scoped>
.checkbox {
    margin: 0.6rem;
}

label {
    margin: 1rem;
}

.filter-button {
    background: none;
    border: none;
    cursor: pointer;
    width: 2rem;
    color: black;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
    padding: 0;
    padding-right: 1rem;
}

.buttons {
    display: flex;
    align-items: end;
    justify-content: end;
}
</style>