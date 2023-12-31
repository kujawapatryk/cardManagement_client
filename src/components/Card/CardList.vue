<script setup lang="ts">
import {ref, onMounted, watch} from "vue";
import CardForm from "./CardForm.vue";
import router from "@/router";
import SitePagination from "@/components/SitePagination.vue";
import {apiRequest} from "@/composables/apiRequest";

import type {CardEntity} from "@/types";

const cards = ref<CardEntity[]>();
const totalCards = ref(0);
const currentPage = ref(1);
const itemsPerPage = 2;

const isFormVisible = ref(false);
const cardToEdit = ref({});

const fetchCards = async () => {

  const page = Number(router.currentRoute.value.query.page) || 1;
  try {
    const params = {
      page,
      limit: itemsPerPage,
    }
    const response = await apiRequest('cards','get',params,null,true,false);

    if (response.status === 200) {
      cards.value = response.data.data;
      totalCards.value = response.data.total;
      currentPage.value = page;
    }

  } catch (error) {
    console.error(error);
  }
};

const deleteCard = async (cardId: number) => {
  try {
     await apiRequest(`cards/${cardId}`,'delete', null,null,true,true);
      cards.value = cards.value?.filter(card => card.id !== cardId);
  } catch (error) {
    console.error(error);
  }
};

const handleCardAdded = (newCard:CardEntity) => {
    cards.value?.unshift(newCard);
    handleFormClose();
};

const handleCardUpdated = (updatedCard: CardEntity) => {
  if(cards.value) {
    const index = cards.value.findIndex(card => card.id === updatedCard.id);
    if (index !== -1) {
      cards.value[index] = updatedCard;
    }
    handleFormClose();
  }
};

const showForm = (card = {}) => {
  isFormVisible.value = true;
  cardToEdit.value = { ...card };
};

const handleFormClose = () => {
  isFormVisible.value = false;
};

onMounted(fetchCards);

watch(() => router.currentRoute.value.query.page, () => {
  fetchCards();
});
</script>



<template>
  <div class="mx-auto w-full max-w-7xl mb-10">
    <div class="overflow-x-auto">

      <button
          v-if="!isFormVisible"
          @click="showForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >Add New Card</button>

      <CardForm v-if="isFormVisible" @form-closed="handleFormClose" :editCardData="cardToEdit" @card-added="handleCardAdded" @card-updated="handleCardUpdated" />

      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Card Number
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            PIN
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Activation Date
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Expiration Date
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Balance
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="card in cards" :key="card.id" class="hover:bg-gray-100">
          <td class="px-6 py-4 whitespace-nowrap">
            {{ card.card_number }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ card.pin }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ card.activation_date }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ card.expiry_date }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ card.balance }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button class="text-indigo-600 hover:text-indigo-900" @click="showForm(card)">Edit</button>
            <button class="text-red-600 hover:text-red-900 ml-4" @click="deleteCard(card.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
      <SitePagination
          :totalItems="totalCards"
          :itemsPerPage="itemsPerPage"
          :currentPage="currentPage"
      />
    </div>
  </div>
</template>
