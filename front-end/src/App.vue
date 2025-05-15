<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import Header from './components/layout/Header.vue'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <Header></Header>
  <main>
    <div class="app-content">
      <RouterView/>
    </div>
  </main>
</template>

<style scoped>

</style>
