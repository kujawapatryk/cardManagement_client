<script setup lang="ts">

import {ref, watch} from "vue";
import axios from "axios";
import {API_URL} from "../../../config/config";

const blankCard = {
  card_number: '',
  pin: '',
  expiry_date: '',
  balance: 0,
}

const props = defineProps({
  editCardData: Object
});

const isEditMode = ref(false);
const newCard = ref({ ...blankCard })
const emits = defineEmits(['card-added', 'card-updated', `form-closed`]);

watch(() => props.editCardData, (newData) => {

  if (props.editCardData && props.editCardData.card_number) {
    newCard.value = { ...newData };
    isEditMode.value = true;
  }
}, { immediate: true });

const submitForm = async () => {
  try {
    let response;
    if (isEditMode.value) {
      response = await axios.put(`${API_URL}/cards/${newCard.value.id}`, newCard.value);
      emits('card-updated', response.data);
    } else {
      response = await axios.post(`${API_URL}/cards`, newCard.value);
      emits('card-added', response.data);
    }
    newCard.value = { ...blankCard };
  } catch (error) {
    console.error(error);
  }
};

const cancelForm = () => {
  emits('form-closed');
};
</script>

<template>
  <div class="flex justify-center mt-10 mb-10">
    <div class="w-full max-w-xs">
      <h3 class="text-lg font-semibold text-center mb-4">Add a New Card</h3>
      <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="cardNumber">
            Card Number
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 type="text"
                 id="cardNumber"
                 v-model="newCard.card_number"
                 maxlength="20"
                 minlength="20"
                 required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="pin">
            PIN
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 type="text"
                 id="pin"
                 v-model="newCard.pin"
                 maxlength="4"
                 minlength="4"
                 required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="expiryDate">
            Expiration Date
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" id="expiryDate" v-model="newCard.expiry_date" required>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="balance">
            Balance
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="number" id="balance" v-model="newCard.balance" required>
        </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {{ isEditMode ? 'Update Card' : 'Add Card' }}
            </button>
            <button @click="cancelForm" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Anuluj
            </button>
          </div>
      </form>
    </div>
  </div>
</template>



