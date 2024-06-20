<template>
    <Header></Header>
    <div class="p-8 bg-slate-600 h-screen">
      <h1 class="text-4xl font-bold mb-8">My Orders</h1>
      <div v-if="orders.length === 0" class="text-gray-600">No orders found.</div>
      <div v-else>
        <div v-for="order in orders" :key="order.orderId" class="bg-white shadow-md rounded-lg p-4 mb-4">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
              <img :src="order.image" alt="Product Image" class="h-16 w-16 object-cover rounded-md">
              <div>
                <h2 class="text-lg font-semibold">{{ order.name }}</h2>
                <!-- <p class="text-gray-600">Order ID: {{ order.orderId }}</p> -->
                <p class="text-gray-600">Status: <span class="font-semibold">{{ order.order.status }}</span></p>
              </div>
            </div>
            <button v-if="order.order.status === 'pending'" @click="cancelOrder(order.order.id)" class="bg-red-500 text-white px-3 py-1 rounded-md">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
 <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useMainStore } from '@/store/MainStore';
  import { getDocument, queryCollectionByField, updateRequestStatus } from '@/firebase/Functions'; // Adjust import path as per your project structure
import Header from '../header/Header.vue';
  const mainStore = useMainStore();
  const orders = ref([]);

  onMounted(async () => {
    // Fetch orders for the current user
    try {
      const fetchedOrders = await queryCollectionByField('orders', 'userId', mainStore.user.uid);
      // Enhance fetched orders with item details
      const ordersWithItems = await Promise.all(
        fetchedOrders.map(async (order: any) => {
          const item = await getItemDetails(order.itemId);
          return { order, ...item };
        })
      );
      orders.value = ordersWithItems;
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    }
  });

  const getItemDetails = async (itemId: string) => {
    try {
        console.log(itemId,'d')
      const item = await getDocument('items', itemId);
      return item;
    } catch (error) {
      console.error('Error fetching item details:', error.message);
      return null;
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      console.log(`Cancelling order ${orderId}`);
      await updateOrderStatus(orderId, 'cancelled');
      // Optionally update local state or notify user
    } catch (error) {
      console.error('Error cancelling order:', error.message);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
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
  