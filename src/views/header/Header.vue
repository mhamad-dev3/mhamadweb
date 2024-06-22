<template>
    <header class="bg-gray-800 text-white shadow-md w-full fixed top-0">
      <div class=" mx-auto px-4 py-2 flex items-center justify-between">
        <!-- Left side: Website name -->
        <div class="flex items-center space-x-2">
          <h1 class="text-lg font-bold">Art Store</h1>
          <span class="hidden md:block text-gray-400">- Buy and Sell Art</span>
        </div>
  
        <!-- Center: Navigation links (Shop, My Orders) -->
        <nav class="space-x-4">
          <router-link to="/shop" class="text-white hover:text-gray-300 transition-colors duration-300">Shop</router-link>
          <router-link to="/my-orders" class="text-white hover:text-gray-300 transition-colors duration-300">My Orders</router-link>
        </nav>
  
        <!-- Right side: Logout button -->
        <button @click="logout" class="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1zM5.293 9.293a1 1 0 011.414-1.414L9 10.586V7a1 1 0 112 0v3.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 01-.001-1.414z" clip-rule="evenodd"/>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
 
  import { useRouter } from 'vue-router';
  
 
  const router = useRouter();
  
  const logout = () => {
    // Implement logout functionality here
    console.log('Logging out...');
    // mainStore.logout(); // Example: call logout method from your store
    router.push('/login'); // Redirect to login page after logout
  };
  </script>
  
  <style scoped>
  /* Custom styles for the header */
  header {
    position: sticky;
    top: 0;
    z-index: 10;
  }
  </style>
  