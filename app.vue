<template>
  <div>
    <button @click="generate" :disabled="isLoading">Generate {{ isLoading ? '...' : '' }}</button>

    <ClientOnly>
      <VuePdfEmbed v-if="pdf" :source="`data:application/pdf;base64,${pdf}`" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import VuePdfEmbed from 'vue-pdf-embed'
import 'vue-pdf-embed/dist/style/index.css'

const isLoading = ref(false)
const pdf = ref<string | null>(null)

const generate = async () => {
  try {
    isLoading.value = true;
    pdf.value = await $fetch('/api/pdf/generate', {
      method: 'POST',
    })
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>
