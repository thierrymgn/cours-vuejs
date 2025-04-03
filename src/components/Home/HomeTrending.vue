<script setup>
import { ref, onMounted } from 'vue'
import productsData from '@/api/products.js'
import ProductTrendingCard from '../Product/ProductTrendingCard.vue'

const trendingProducts = ref([])

onMounted(() => {
  const bestSellerIds = productsData.bestSellers || []
  trendingProducts.value = productsData.products
    .filter(product => bestSellerIds.includes(product.id))
})

function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}
</script>

<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Tendances populaires</h2>
        <p class="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
          Les articles les plus recherchés et les plus vendus cette semaine.
        </p>
      </div>
      
      <div v-if="trendingProducts.length > 0" class="grid grid-cols-1 gap-8">
        <ProductTrendingCard
          v-for="product in trendingProducts"
          :key="product.id"
          :product="product"
          :formatted-price="formatPrice(product.price)"/>
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-gray-500">Chargement des tendances...</p>
      </div>
    </div>
  </section>
</template>