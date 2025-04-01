<script setup>
import { RouterView } from 'vue-router'
import SharedHeader from '@/components/Shared/SharedHeader.vue'
import SharedFooter from '@/components/Shared/SharedFooter.vue'
</script>

<template>

  <SharedHeader/>

  <RouterView />

  <SharedFooter/>
</template>

<style scoped>
</style>
