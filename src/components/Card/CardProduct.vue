<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}
</script>

<template>
  <div class="border rounded-2xl overflow-hidden shadow hover:shadow-md transition hover:scale-105">
    <img :src="product.image" alt="Chaussure" class="w-full h-60 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-lg">{{product.name}}</h4>
      <p class="text-gray-600">{{product.description}}</p>
      <p class="font-bold mt-2">{{formatPrice(product.price)}}</p>
    </div>
  </div>
</template>
