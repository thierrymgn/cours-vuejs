<script setup>
import { ref } from 'vue'

const categories = ref([
  {
    id: 1,
    name: "Sneakers",
    image: "https://picsum.photos/id/237/600/400",
    description: "Les meilleures sneakers du moment"
  },
  {
    id: 2,
    name: "Streetwear",
    image: "https://picsum.photos/id/238/600/400",
    description: "Vêtements et accessoires streetwear"
  },
  {
    id: 3,
    name: "Électronique",
    image: "https://picsum.photos/id/239/600/400",
    description: "Consoles, jeux vidéo et plus"
  },
  {
    id: 4,
    name: "Cartes à collectionner",
    image: "https://picsum.photos/id/240/600/400",
    description: "Pokémon, Magic et autres"
  }
])
</script>

<template>
  <section class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Parcourir par catégorie</h2>
        <p class="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
          Trouvez exactement ce que vous cherchez parmi nos collections.
        </p>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="group relative rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-shadow duration-300"
        >
          <div class="h-48 overflow-hidden">
            <img 
              :src="category.image" 
              :alt="category.name" 
              class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div class="absolute inset-0 bg-black/35 flex flex-col justify-end p-6 group-hover:bg-opacity-40 transition-all duration-300">
            <h3 class="text-xl font-bold text-white">{{ category.name }}</h3>
            <p class="text-sm text-white mt-1">{{ category.description }}</p>
            <button class="mt-4 bg-white text-gray-900 px-4 py-2 rounded text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              Explorer
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>