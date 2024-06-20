<template>
  <Header></Header>
  <div class="p-8 bg-slate-600">
    <h1 class="text-4xl font-bold mb-8 text-center">Welcome to Our Art Store!</h1>

    <!-- Search input -->
    <div class="mb-4">
      <input v-model="searchQuery" type="text" placeholder="Search by item name" class="px-4 py-2 w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300">
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="item in filteredItems" :key="item.id" class="bg-white rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
        <div class="relative">
          <img :src="item.image" alt="Product Image" class="w-full h-64 object-cover transition-opacity duration-300 hover:opacity-80">
          <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button @click="buyItem(item)" class="bg-white text-black px-4 py-2 rounded-md font-semibold shadow-md hover:bg-gray-200 transition-colors duration-300">Buy Now</button>
          </div>
        </div>
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ item.name }}</h2>
          <p class="text-gray-700 mb-4">{{ item.description }}</p>
          <p class="text-indigo-600 font-bold text-xl mb-4">${{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


  
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getCollection, setDocument, setDocumentRandomId } from '@/firebase/Functions';
import { useMainStore } from '@/store/MainStore';
import Header from '../header/Header.vue';
const mainStore = useMainStore();
const items = ref([]);
const searchQuery = ref('');

// Fetch items on component mount
onMounted(async () => {
  try {
    const fetchedItems = await getCollection('items');
    items.value = fetchedItems;
  } catch (error) {
    console.error('Error fetching items:', error.message);
  }
});

// Computed property to filter items based on search query
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return items.value.filter(item => item.name.toLowerCase().includes(query));
});

// Function to handle item purchase
const buyItem = async (item) => {
  if (!mainStore.user.uid) {
    console.error('User is not logged in');
    // Optionally, show a message to the user or redirect to login page
    return;
  }

  try {
    // Create an order or transaction document
    const order = {
      itemId: item.id,
      userId: mainStore.user.uid,
      status: 'pending', // Example status, can be 'pending', 'confirmed', etc.
      timestamp: new Date().toISOString(),
    };

    // Save the order to a 'orders' collection
    await setDocumentRandomId('orders', order); // Use setDocumentRandomId or setDocument with a specific ID

    console.log(`Item ${item.name} bought successfully.`);
    // Optionally, show a success message or redirect to a confirmation page
  } catch (error) {
    console.error('Error buying item:', error.message);
    // Optionally, show an error message to the user
  }
};
</script>


  
