<template>
    <div class="container text-center mt-5">
      <h1 class="display-3">404 - Página no encontrada</h1>
      <img src="@/assets/404-background.png" alt="Error 404" class="img-fluid my-4" style="max-width: 300px;" />
      <p>La página que buscas no existe.</p>
      <button class="btn btn-danger mt-3" @click="goHome">Ir a Inicio</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goHome() {
        this.$router.push({ name: 'Home' });
      },
    },
  };
  </script>
  