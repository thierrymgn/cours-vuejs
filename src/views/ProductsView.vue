<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import ProductCard from '@/components/Product/ProductCard.vue'
import ProductsFilter from '@/components/Products/ProductsFilter.vue'
import ProductsSorting from '@/components/Products/ProductsSorting.vue'
import ProductsPagination from '@/components/Products/ProductsPagination.vue'
import ProductsHeader from '@/components/Products/ProductsHeader.vue'
import ProductsFilterSummary from '@/components/Products/ProductsFilterSummary.vue'

const route = useRoute()
const productStore = useProductStore()
const isLoading = ref(true)
const mobileFiltersOpen = ref(false)
const activeFilters = ref({
  category: null,
  brand: null,
  minPrice: null,
  maxPrice: null,
  inStock: null,
  isNew: null,
})
const sortOption = ref('default')
const currentPage = ref(1)
const itemsPerPage = ref(12)

const categoryFromRoute = computed(() => {
  return route.params.category
    ? productStore.categories.find((c) => c.toLowerCase() === route.params.category.toLowerCase())
    : null
})

const allFilteredProducts = computed(() => {
  let products = productStore.filterProducts(activeFilters.value)

  if (sortOption.value === 'price-asc') {
    return [...products].sort((a, b) => a.price - b.price)
  } else if (sortOption.value === 'price-desc') {
    return [...products].sort((a, b) => b.price - a.price)
  } else if (sortOption.value === 'rating') {
    return [...products].sort((a, b) => b.rating - a.rating)
  } else if (sortOption.value === 'newest') {
    return [...products].sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1))
  }

  return products
})

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return allFilteredProducts.value.slice(startIndex, endIndex)
})

function updateFilters(filters) {
  activeFilters.value = filters
}

function resetAllFilters() {
  updateFilters({
    category: null,
    brand: null,
    minPrice: null,
    maxPrice: null,
    inStock: null,
    isNew: null,
  })
  mobileFiltersOpen.value = false
}

function updateSorting(option) {
  sortOption.value = option
}

function changePage(page) {
  currentPage.value = page
  window.scrollTo({
    top: document.querySelector('.products-grid')?.offsetTop - 20 || 0,
    behavior: 'smooth',
  })
}

watch(
  () => route.params.category,
  (newCategory) => {
    if (newCategory && categoryFromRoute.value) {
      activeFilters.value.category = categoryFromRoute.value
      currentPage.value = 1
    } else {
      activeFilters.value.category = null
    }
  },
  { immediate: true }
)

watch(
  activeFilters,
  () => {
    currentPage.value = 1
  },
  { deep: true }
)

watch(sortOption, () => {
  currentPage.value = 1
})

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }

  if (categoryFromRoute.value) {
    activeFilters.value.category = categoryFromRoute.value
  }

  isLoading.value = false
})
</script>

<template>
  <main>
    <ProductsHeader
      :title="categoryFromRoute ? categoryFromRoute : 'Tous les produits'"
      :category="categoryFromRoute"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Explorer</h2>
          <p class="text-sm text-gray-500 mt-1">
            {{ allFilteredProducts.length }} produits disponibles
          </p>
        </div>
        <div class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
          <button
            class="sm:hidden px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm hover:bg-gray-50"
            @click="mobileFiltersOpen = !mobileFiltersOpen"
          >
            Filtres
            <span class="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              {{ Object.values(activeFilters).filter((v) => v !== null).length }}
            </span>
          </button>
          <ProductsSorting :selected="sortOption" @update-sorting="updateSorting" />
        </div>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-8 mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div class="lg:w-1/4">
        <ProductsFilter
          :active-filters="activeFilters"
          :categories="productStore.categories"
          :brands="[...new Set(productStore.products.map((p) => p.brand))]"
          @update-filters="updateFilters"
        />
      </div>

      <div class="lg:w-3/4">
        <div v-if="isLoading" class="flex justify-center items-center py-20">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-600"
          ></div>
        </div>

        <div v-else-if="allFilteredProducts.length === 0" class="py-12 text-center">
          <p class="text-gray-500 text-lg">
            Aucun produit ne correspond à vos critères de recherche.
          </p>
          <button
            @click="resetAllFilters"
            class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Réinitialiser les filtres
          </button>
        </div>

        <div v-else>
          <div class="mb-4 text-sm text-gray-500">
            {{ allFilteredProducts.length }} produits trouvés
          </div>

          <div class="sm:hidden">
            <ProductsFilterSummary :filters="activeFilters" @reset-filters="resetAllFilters" />
          </div>

          <div class="hidden lg:block lg:ml-4 mb-4">
            <ProductsFilterSummary :filters="activeFilters" @reset-filters="resetAllFilters" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 products-grid">
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <ProductsPagination
            :current-page="currentPage"
            :total-items="allFilteredProducts.length"
            :items-per-page="itemsPerPage"
            @page-changed="changePage"
          />
        </div>
      </div>
    </div>
  </main>
</template>