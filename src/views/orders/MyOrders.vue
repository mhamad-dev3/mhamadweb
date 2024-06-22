<template>
  <div class="min-h-screen bg-blue-50">
    <Header />
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold text-blue-700 mb-4">My Orders</h1>
      <div v-if="orders.length === 0" class="text-center text-gray-500">
        No orders found.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="order in orders"
          :key="order.order.id"
          class="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ order.name }}</h2>
          <img :src="order.image" class=" h-36 w-full rounded-lg" alt="">
          <p class="text-gray-600 mb-4">{{ order.description }}</p>
          <p class="text-gray-500 mb-4">Status: {{ order.order.status }}</p>
          <button
            @click="cancelOrder(order.order.id)"
            class="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

  
 <script setup>
  import { ref, onMounted } from 'vue';
  import { useMainStore } from '@/store/MainStore';
  import { deleteItems, getDocument, queryCollectionByField, updateRequestStatus } from '@/firebase/Functions'; // Adjust import path as per your project structure
import Header from '../header/Header.vue';
  const mainStore = useMainStore();
  const orders = ref([]);

  onMounted(async () => {
    // Fetch orders for the current user
    try {
      const fetchedOrders = await queryCollectionByField('orders', 'userId', mainStore.user.uid);
      // Enhance fetched orders with item details
      const ordersWithItems = await Promise.all(
        fetchedOrders.map(async (order) => {
          const item = await getItemDetails(order.itemId);
          return { order, ...item };
        })
      );
      orders.value = ordersWithItems;
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    }
  });

  const getItemDetails = async (itemId) => {
    try {
        console.log(itemId,'d')
      const item = await getDocument('items', itemId);
      return item;
    } catch (error) {
      console.error('Error fetching item details:', error.message);
      return null;
    }
  };

  const cancelOrder = async (orderId) => {

    try {
    
      await deleteItems('orders',orderId);
      // Optionally update local state or notify user
    } catch (error) {
      console.error('Error cancelling order:', error.message);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateRequestStatus('orders', orderId, { status: newStatus });
      console.log(`Order ${orderId} updated with status: ${newStatus}`);
    } catch (error) {
      console.error(`Error updating order ${orderId} status:`, error.message);
      throw error;
    }
  };
</script>

  
  <style scoped>
  /* Optional: Add custom styles for the component */
  </style>
  