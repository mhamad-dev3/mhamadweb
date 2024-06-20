<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8">Manage Items</h1>
    <div class="overflow-x-auto">
      <table class="table-auto w-full">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Description</th>
            <th class="px-4 py-2">Price</th>
            <th class="px-4 py-2">Quantity</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in mainStore.listItem" :key="item.docId">
            <td class="border px-4 py-2">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ item.name }}</td>
            <td class="border px-4 py-2">{{ item.description }}</td>
            <td class="border px-4 py-2">{{ item.price }}</td>
            <td class="border px-4 py-2">{{ item.quantity }}</td>
            <td class="border px-4 py-2">
              <button @click="deleteItem(item.docId)" class="text-white bg-red-500 px-3 py-1 rounded-full hover:bg-red-600">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    
    </div>
  </div>
</template>

<script setup>
import { db } from '@/firebase/firebase'; // Import Firebase database instance
import { getDocs, collection, where, query, deleteDoc, doc } from 'firebase/firestore';
import { useMainStore } from '@/store/MainStore';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { deleteItems } from '@/firebase/Functions';
// Initialize items as empty array
const mainStore = useMainStore();

// Fetch items from Firestore
const fetchItems = async () => {
  try {
    const collectionRef = collection(db, "items");
    const uid = mainStore.user.uid; // Assuming uid is in mainStore.user

    if (!uid) {
      console.error("User ID not found in mainStore.user");
      return; // Handle the case where user ID is not available
    }

    const q = query(collectionRef, where("id", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.docs.forEach((doc) => {
      console.log(doc.id)
      mainStore.listItem.push({
    
        docId: doc.id,
        ...doc.data(),
      });
    });
  } catch (error) {
    console.error("Error fetching items:", error.message);
  }
};

// Delete item from Firestore and remove it from local items array
const deleteItem = async (itemId) => {
  console.log(itemId,'s')
  await deleteItems('items',itemId)
};

// Fetch items when component is mounted
fetchItems();



 const logout = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
</script>
