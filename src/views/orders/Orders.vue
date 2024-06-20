<template>
  <Header></Header>
    <div class="p-4 bg-slate-600 h-screen">
      <h1 class="text-2xl font-bold mb-4">Requests for Your Items</h1>
      <div v-if="requests.length === 0" class="text-gray-600">No requests found.</div>
      <div v-else>
        <div v-for="request in requests" :key="request.id" class="bg-white shadow-md rounded-lg p-4 mb-4">
          <div class="flex items-center justify-between">
            <!-- Item Details -->
            <div>
              <h2 class="text-lg font-semibold">{{ request.product.name }}</h2>
              <p class="text-gray-600">{{ request.product.description }}</p>
              <p class="text-gray-600">Category: {{ request.product.category }}</p>
            </div>
            <!-- User Details -->
            <div>
              <h3 class="text-lg font-semibold">{{ request.user.name }}</h3>
              <p class="text-gray-600">{{ request.user.email }}</p>
            </div>
            <!-- Request Actions -->
            <div>
              <p>Status: <span :class="getStatusColor(request.status)" class="font-semibold">{{ request.status }}</span></p>
              <template v-if="request.status === 'pending'">
                <button @click="changeRequestStatus(request.id, 'approved')" class="bg-green-500 text-white px-3 py-1 rounded-md">Approve</button>
                <button @click="changeRequestStatus(request.id, 'rejected')" class="bg-red-500 text-white px-3 py-1 rounded-md ml-2">Reject</button>
              </template>
              <template v-else-if="request.status === 'approved'">
                <button @click="changeRequestStatus(request.id, 'fulfilled')" class="bg-blue-500 text-white px-3 py-1 rounded-md">Fulfill</button>
              </template>
              <!-- Add more status transitions as needed -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
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
  
  const changeRequestStatus = async (requestId: string, newStatus: string) => {
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
  