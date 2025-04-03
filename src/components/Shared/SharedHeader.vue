<script setup>

const menuItems = [
  { title: 'Accueil', url: '#' },
  { title: 'Nouveautés', url: '#' },
  { title: 'Homme', url: '#' },
  { title: 'Femme', url: '#' },
  { title: 'Contact', url: '#' },
]

</script>

<template>
  <header class="border-b shadow-sm sticky top-0 bg-white z-50">
    <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Chaussures Élégance</h1>
      <nav class="space-x-6 hidden md:flex">
        <a v-for="menuItem in menuItems" :key="menuItem.title"  :href="menuItem.url" class="hover:text-blue-600">{{menuItem.title}}</a>
      </nav>
      <button class="md:hidden">☰</button>
    </div>
  </header>
</template>
