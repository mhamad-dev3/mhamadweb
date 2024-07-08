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
      
      <!-- Categories Section -->
      <div class="mb-4">
        <h2 class="text-xl font-bold text-blue-700 mb-2">Categories</h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
          <button :class="{'bg-blue-500':selectedCategory===category.name}" @click="selectCategory(category.name)" v-for="category in categories" :key="category.name" class="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <Icon :class="{'text-blue-500':selectedCategory===category.name,'text-gray-700':selectedCategory!=category.name}" class=" w-6 h-6" :icon="category.icon" />
            <span :class="{'text-blue-500':selectedCategory===category.name,'text-gray-700':selectedCategory!=category.name}" class="text-gray-800 font-semibold">{{ category.name }}</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item,index in filteredItems"
          :key="item.id"
          class="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ item.name }}</h2>
          <img :src="item.image" class="h-36 w-full rounded-lg" alt="Item Image">
          <p class="text-gray-600 mb-4">{{ item.description }}</p>
          <button :disabled="isId === item.documentId"
            @click="buyItem(item)"
            :class="{'':isPending(item.documentId,item.name,index)}"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
        
            {{isId[index] === item.name ? 'Pending' : 'Buy Now'}}
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCollection, setDocument, setDocumentRandomId,queryCollectionByField } from '@/firebase/Functions';
import { useMainStore } from '@/store/MainStore';
import Header from '../header/Header.vue';
import { Icon } from '@iconify/vue';
const mainStore = useMainStore();
const items = ref([]);
const searchQuery = ref('');
const isOrder = ref(false)
const isId = ref([])
const selectedCategory = ref('')
// Fetch items on component mount
onMounted(async () => {
  try {
    // await getCategory()
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
const  categories = ref([
        { name: 'All', icon: 'mdi:art' },
        { name: 'Paintings', icon: 'mdi:art' },
        { name: 'Prints', icon: 'mingcute:print-fill' },
        { name: 'Sculptures', icon: 'game-icons:rock' },
        { name: 'Photography', icon: 'majesticons:image-photography' }
      ],)
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
      payed:false,
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
const getCategory = async ()=>{
  let response = await getCollection('categories')
    categories.value = response
}

const selectCategory = async (value)=>{
  if(value=="All"){
    try {
    // await getCategory()
    selectedCategory.value = value
    const fetchedItems = await getCollection('items');
    items.value = fetchedItems;
  } catch (error) {
    console.error('Error fetching items:', error.message);
  }
  }else {
    selectedCategory.value = value
  let response  = await queryCollectionByField('items','type',value)
  items.value = response
  }
}
const isPending = async (id,name,index) => {
  const orders = await getCollection('orders');
  let isOrder = false;

  for (const object of orders) {
    if (object.itemId === id) {
      isOrder = true;
      console.log(name)
      isId.value[index] = name
      break;
    }
  }
  console.log(isOrder)
  return isOrder;
};


const checkBuy = async(id)=>{
   const orders = await getCollection('orders')
   orders.forEach((object)=>{
  
    if(object.itemId === id){
      isOrder.value =true
      // isId.value = object.itemId
    } else {   isOrder.value =false}
 
   })
}
</script>


  
