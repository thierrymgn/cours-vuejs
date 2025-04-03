<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const slides = [
  {
    id: 1,
    title: "Nouvelles Jordans",
    subtitle: "Les Jordan 4 Red Thunder sont maintenant disponibles",
    cta: "Acheter maintenant",
    bgColor: "bg-red-600",
    image: "https://picsum.photos/id/234/1200/500"
  },
  {
    id: 2,
    title: "Collection Streetwear",
    subtitle: "Découvrez les dernières tendances streetwear",
    cta: "Explorer",
    bgColor: "bg-blue-600",
    image: "https://picsum.photos/id/235/1200/500"
  },
  {
    id: 3,
    title: "Électronique de luxe",
    subtitle: "PlayStation 5, Xbox Series X et plus encore",
    cta: "Voir la sélection",
    bgColor: "bg-purple-600",
    image: "https://picsum.photos/id/236/1200/500"
  }
]

const currentSlide = ref(0)
let slideInterval = null

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

function setSlide(index) {
  currentSlide.value = index
}

onMounted(() => {
  slideInterval = setInterval(() => {
    nextSlide()
  }, 7000)
})

onBeforeUnmount(() => {
  if (slideInterval) clearInterval(slideInterval)
})
</script>

<template>
  <section class="relative overflow-hidden" style="height: 500px;">
    <div class="w-full h-full relative">
      <div 
        v-for="(slide, index) in slides" 
        :key="slide.id"
        class="absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out"
        :class="index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'"
      >
        <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
        
        <div class="absolute inset-0 opacity-40" :class="slide.bgColor"></div>
        
        <div class="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 text-white z-20">
          <div class="max-w-md">
            <h2 class="text-4xl md:text-5xl font-bold mb-2">{{ slide.title }}</h2>
            <p class="text-lg md:text-xl mb-6">{{ slide.subtitle }}</p>
            <button class="bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition">
              {{ slide.cta }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="absolute inset-y-0 left-0 flex items-center z-20">
      <button 
        @click="prevSlide" 
        class="bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 mx-3 rounded-full focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
    <div class="absolute inset-y-0 right-0 flex items-center z-20">
      <button 
        @click="nextSlide" 
        class="bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 mx-3 rounded-full focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    
    <div class="absolute bottom-5 left-0 right-0 flex justify-center z-20 space-x-2">
      <button 
        v-for="(slide, index) in slides" 
        :key="slide.id" 
        @click="setSlide(index)"
        class="w-3 h-3 rounded-full focus:outline-none transition-all duration-300"
        :class="currentSlide === index ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'"
      ></button>
    </div>
  </section>
</template>