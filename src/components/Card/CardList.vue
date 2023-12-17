<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import { API_URL } from "../../../config/config.js";
import AddCard from "@/components/Card/AddCard.vue";

const cards = ref(null);
const showForm = ref(false);

const fetchCards = async () => {
  try {
    const response = await axios.get(`${API_URL}/cards`);
    cards.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteCard = async (cardId) => {
  try {
    await axios.delete(`${API_URL}/cards/${cardId}`);
    cards.value = cards.value.filter(card => card.id !== cardId);
  } catch (error) {
    console.error(error);
  }
};

const handleCardAdded = (newCard) => {
  cards.value.unshift(newCard);
  showForm.value = false;
};

onMounted(fetchCards);
</script>



<template>
  <div class="mx-auto w-full max-w-7xl mb-10">
    <div class="overflow-x-auto">

      <button
          v-if="!showForm"
          @click="showForm = true"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Dodaj Nową Kartę
      </button>
        <AddCard v-if="showForm" @card-added="handleCardAdded" />

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
            <button class="text-indigo-600 hover:text-indigo-900" @click="editCard(card)">Edit</button>
            <button class="text-red-600 hover:text-red-900 ml-4" @click="deleteCard(card.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
