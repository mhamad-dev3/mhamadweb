<template>
  <div class="min-h-screen bg-blue-50">
    <Header />
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold text-blue-700 mb-4">Requests for Your Items</h1>
      <div v-if="requests.length === 0" class="text-center text-gray-500">
        No requests found.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="request in requests"
          :key="request.id"
          class="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ request.product.name }}</h2>
          <p class="text-gray-600 mb-2">Requested by: {{ request.user.name }}</p>
          <p class="text-gray-600 mb-4">{{ request.product.description }}</p>
          <p :class="getStatusColor(request.status) + ' mb-4'">Status: {{ request.status }}</p>
          <div class="flex justify-between">
            <button
              @click="changeRequestStatus(request.id, 'approved')"
              class="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
            >
              Approve
            </button>
            <button
              @click="changeRequestStatus(request.id, 'rejected')"
              class="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useMainStore } from '@/store/MainStore';
  import { queryCollectionByField, setDocument, getDocument,updateRequestStatus } from '@/firebase/Functions'; // Adjust import path as per your project structure
  import Header from '../header/Header.vue';
  const mainStore = useMainStore();
  const requests = ref([]);
  
  onMounted(async () => {
    // Fetch requests for the artist's items
    const artistId = mainStore.user.uid;
    try {
      const fetchedRequests = await queryCollectionByField('orders', 'artistId', artistId);
      // Enhance each request with user and product details
      console.log(fetchedRequests)
      for (const request of fetchedRequests) {
        const userData = await getDocument('user', request.userId);
        const productData = await getDocument('items', request.itemId);
        console.log(userData)
        request.user = userData;
        console.log()
        request.product = productData;
      }
      requests.value = fetchedRequests;
    } catch (error) {
      console.error('Error fetching requests:', error.message);
    }
  });
  
  const changeRequestStatus = async (requestId, newStatus) => {
    console.log(requestId,'kk')
    try {
      await updateRequestStatus('orders', requestId, { status: newStatus });
      // Optionally update local state or notify user
    } catch (error) {
      console.error('Error updating request status:', error.message);
    }
  };
  
  // Function to dynamically assign colors based on request status
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'approved':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      case 'fulfilled':
        return 'text-blue-500';
      case 'completed':
        return 'text-gray-500';
      default:
        return '';
    }
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS classes can be used directly in your component */
  </style>
  