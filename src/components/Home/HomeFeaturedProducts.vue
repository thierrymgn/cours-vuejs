<script setup>
import { ref, onMounted } from 'vue'
import productsData from '@/api/products.js'
import ProductCard from '@/components/Product/ProductCard.vue'

const featuredProducts = ref([])

onMounted(() => {
  const featuredIds = productsData.featuredProducts || []
  featuredProducts.value = productsData.products
    .filter(product => featuredIds.includes(product.id))
})
</script>

<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Produits en vedette</h2>
        <p class="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
          Les articles les plus populaires et les plus recherchés sur notre plateforme.
        </p>
      </div>
      
      <div v-if="featuredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in featuredProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-gray-500">Chargement des produits en vedette...</p>
      </div>
      
      <div class="mt-10 text-center">
        <a href="#" class="inline-block px-6 py-3 border border-gray-900 text-gray-900 font-medium rounded hover:bg-gray-900 hover:text-white transition">
          Voir tous les produits
        </a>
      </div>
    </div>
  </section>
</template>