<script setup>
import axios from 'axios';
import {ref} from 'vue';
import {API_URL} from "@/config/config.ts";
import {getToken} from "@/composables/getToken";
import router from "@/router";

const credentials = ref({
  email: '',
  password: ''
});

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {email, password}, { withCredentials: true });
    localStorage.setItem("authToken", response.data.token);
    await fetchUser();
    await router.push('/');
  } catch (error) {
    console.error('Login error: ', error.response);
  }
};

const fetchUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`,{ withCredentials: true , headers: { Authorization: `Bearer ${getToken()}` } });
    console.log('User data: ', response.data);

  } catch (error) {
    console.error('Error fetching user data: ', error.response);
  }
};
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="max-w-sm w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-8">Login</h2>
      <form @submit.prevent="login(credentials.email, credentials.password)">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" v-model="credentials.email" required
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input type="password" id="password" v-model="credentials.password" required
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Zaloguj się
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

