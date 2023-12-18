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
      <li>
        <router-link
            to="/login"
            class="hover:text-gray-300 text-lg transition duration-300 ease-in-out"
            active-class="border-b-2 border-blue-500"
        >
          Login
        </router-link>
      </li>
        <li>
          <router-link
              to="/logout"
              class="hover:text-gray-300 text-lg transition duration-300 ease-in-out"
              active-class="border-b-2 border-blue-500"
          >
            Logout
          </router-link>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
</script>