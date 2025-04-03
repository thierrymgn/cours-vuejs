import { defineStore } from 'pinia'
import productsData from '@/api/products.js'

export const useProductStore = defineStore('products', {
    state: () => ({
        products: [],
        featuredProducts: [],
        bestSellers: [],

        categories: [],
        homeCategories: [],

        heroSlides: [],

        isLoading: false,
        isLoadingCategories: false,
        isLoadingHero: false,
        error: null,
        categoryError: null,
        heroError: null
    }),

    getters: {
        getProductById: (state) => (id) => {
            return state.products.find(product => product.id === id)
        },
        getProductsByCategory: (state) => (category) => {
            return state.products.filter(product => product.category === category)
        },
        getProductsByBrand: (state) => (brand) => {
            return state.products.filter(product => product.brand === brand)
        },
        getNewProducts: (state) => {
            return state.products.filter(product => product.isNew)
        },
        getDiscountedProducts: (state) => {
            return state.products.filter(product => product.discount && product.discount > 0)
        }
    },

    actions: {
        async fetchProducts() {
            this.isLoading = true
            this.error = null

            try {
                await new Promise(resolve => setTimeout(resolve, 500))

                this.products = productsData.products

                if (productsData.featuredProducts && productsData.featuredProducts.length) {
                    this.featuredProducts = this.products.filter(product =>
                        productsData.featuredProducts.includes(product.id)
                    )
                }

                if (productsData.bestSellers && productsData.bestSellers.length) {
                    this.bestSellers = this.products.filter(product =>
                        productsData.bestSellers.includes(product.id)
                    )
                }

                this.categories = [...new Set(this.products.map(product => product.category))]

            } catch (error) {
                console.error('Error fetching products:', error)
                this.error = 'Impossible de charger les produits. Veuillez réessayer plus tard.'
            } finally {
                this.isLoading = false
            }
        },

        async fetchHomeCategories() {
            this.isLoadingCategories = true
            this.categoryError = null

            try {
                await new Promise(resolve => setTimeout(resolve, 300))

                if (productsData.homeCategories && productsData.homeCategories.length) {
                    this.homeCategories = productsData.homeCategories
                } else {
                    this.homeCategories = [
                        {
                            id: 1,
                            name: "Sneakers",
                            image: "https://picsum.photos/id/237/600/400",
                            description: "Les meilleures sneakers du moment",
                            slug: "sneakers"
                        },
                        {
                            id: 2,
                            name: "Streetwear",
                            image: "https://picsum.photos/id/238/600/400",
                            description: "Vêtements et accessoires streetwear",
                            slug: "streetwear"
                        },
                        {
                            id: 3,
                            name: "Électronique",
                            image: "https://picsum.photos/id/239/600/400",
                            description: "Consoles, jeux vidéo et plus",
                            slug: "electronique"
                        },
                        {
                            id: 4,
                            name: "Cartes à collectionner",
                            image: "https://picsum.photos/id/240/600/400",
                            description: "Pokémon, Magic et autres",
                            slug: "cartes"
                        }
                    ]
                }
            } catch (error) {
                console.error('Error fetching home categories:', error)
                this.categoryError = 'Impossible de charger les catégories. Veuillez réessayer plus tard.'
            } finally {
                this.isLoadingCategories = false
            }
        },

        async fetchHeroSlides() {
            this.isLoadingHero = true
            this.heroError = null

            try {
                await new Promise(resolve => setTimeout(resolve, 400))

                this.heroSlides = [
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
            } catch (error) {
                console.error('Error fetching hero slides:', error)
                this.heroError = 'Impossible de charger les slides. Veuillez réessayer plus tard.'
            } finally {
                this.isLoadingHero = false
            }
        },

        searchProducts(query) {
            if (!query) return this.products

            const searchTerm = query.toLowerCase()
            return this.products.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.brand.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            )
        },

        filterProducts(filters) {
            let filteredProducts = [...this.products]

            if (filters.category) {
                filteredProducts = filteredProducts.filter(product =>
                    product.category === filters.category
                )
            }

            if (filters.brand) {
                filteredProducts = filteredProducts.filter(product =>
                    product.brand === filters.brand
                )
            }

            if (filters.minPrice !== undefined) {
                filteredProducts = filteredProducts.filter(product =>
                    product.price >= filters.minPrice
                )
            }

            if (filters.maxPrice !== undefined) {
                filteredProducts = filteredProducts.filter(product =>
                    product.price <= filters.maxPrice
                )
            }

            if (filters.inStock !== undefined) {
                filteredProducts = filteredProducts.filter(product =>
                    product.inStock === filters.inStock
                )
            }

            if (filters.isNew !== undefined) {
                filteredProducts = filteredProducts.filter(product =>
                    product.isNew === filters.isNew
                )
            }

            return filteredProducts
        }
    }
})