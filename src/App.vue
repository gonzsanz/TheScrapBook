<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
</template>

<script>

import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  data() {
    return {};
  },
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
    RouterView,
    RouterLink
  }
};
</script>
<style>

</style>