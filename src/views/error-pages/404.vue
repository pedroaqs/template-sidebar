<template>
    <div class="not-found">
      <img src="https://example.com/tu-imagen-404.jpg" alt="Error 404">
      <p>¡Página no encontrada!</p>
      <router-link to="/dashboard/index">Ir al Dashboard</router-link>
      <button @click="volverAtras">Volver Atrás</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Error404Page',
    methods: {
      volverAtras() {
        this.$router.go(-1); // Vuelve a la ruta anterior
      }
    }
  }
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  </style>
  