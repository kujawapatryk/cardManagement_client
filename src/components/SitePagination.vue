<script setup lang="ts">

import { defineProps, computed } from 'vue';

const props = defineProps({
  totalItems: {
    type: Number,
    default: 0
  },
  itemsPerPage: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  },
});

const emit = defineEmits(['page-changed']);

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage );
});

const changePage = (page:number) => {
  emit('page-changed', page);
};

</script>


<template>
  <div class="flex justify-center items-center space-x-1">
    <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="{'bg-blue-500 text-white': currentPage === page, 'bg-white text-blue-500': currentPage !== page}"
        class="px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-600 hover:text-white transition-colors"
    >
      {{ page }}
    </button>
  </div>
</template>