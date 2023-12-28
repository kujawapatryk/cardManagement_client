<script setup lang="ts" >

import axios from "axios";
import {API_URL} from "@/config/config";
import router from "@/router";
import {getToken} from "@/composables/getToken";
import {ref, watchEffect} from "vue";

const isLoggedIn = ref(false);

const sendLogoutRequest = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error('No auth token found');
      return;
    }
    await axios.post(`${API_URL}/logout`,{},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        })
    await router.push('/login');
  } catch (error) {
    console.error('Error logout: ', error)
  }
}

watchEffect(() => {
  isLoggedIn.value = !!getToken();
});

</script>

<template>
  <nav class="bg-gray-800 text-white py-4 px-6 mb-8">
    <ul class="flex space-x-6">
      <li>
        <router-link
            to="/"
            class="hover:text-gray-300 text-lg transition duration-300 ease-in-out"
            active-class="border-b-2 border-blue-500"
        >
          Cards
        </router-link>
      </li>
      <li v-if="!isLoggedIn">
        <router-link
            to="/login"
            class="hover:text-gray-300 text-lg transition duration-300 ease-in-out"
            active-class="border-b-2 border-blue-500"
        >
          Login
        </router-link>
      </li>
        <li v-if="isLoggedIn">
          <a
              href="#"
              class="hover:text-gray-300 text-lg transition duration-300 ease-in-out"
              @click.prevent="sendLogoutRequest"
          >
            Logout
          </a>
      </li>
    </ul>
  </nav>
</template>
