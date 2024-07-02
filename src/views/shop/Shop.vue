<template>
  <div class="min-h-screen bg-blue-50">
    <Header />
    <div class="container mx-auto py-8">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-3xl font-bold text-blue-700">Items for Sale</h1>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search items..."
          class="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ item.name }}</h2>
          <img :src="item.image" class=" h-36 w-full rounded-lg" alt="">

          <p class="text-gray-600 mb-4">{{ item.description }}</p>
          <button :disabled="isId === item.documentId"
            @click="buyItem(item)"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
           {{isId === item.documentId?'pending':'buy now'}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCollection, setDocument, setDocumentRandomId } from '@/firebase/Functions';
import { useMainStore } from '@/store/MainStore';
import Header from '../header/Header.vue';
const mainStore = useMainStore();
const items = ref([]);
const searchQuery = ref('');
const isOrder = ref(false)
const isId = ref('')
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
      itemId: item.documentId,
      artistId: item.id,
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
 await checkBuy(item.documentId) 
};

const checkBuy = async(id)=>{
   const orders = await getCollection('orders')
   orders.forEach((object)=>{
  
    if(object.itemId === id){
      isOrder.value =true
      isId.value = object.itemId
    } else {   isOrder.value =false}
 
   })
}
</script>


  
