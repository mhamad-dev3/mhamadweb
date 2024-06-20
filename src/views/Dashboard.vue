<template>
<Header></Header>
<body class="bg-gray-100 flex flex-col items-center justify-center h-screen" >

<h1 class="text-4xl"> Artist DashBoard</h1>
<div class="container mx-auto px-4 py-8">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Card 1 -->
    <div class="bg-white shadow-lg rounded-lg p-6">
      <div class="flex items-center">
        <div class="bg-blue-500 text-white rounded-full p-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </div>
        <RouterLink :to="{name:'add-item'}" class="ml-4">
          <h3 class="text-lg font-semibold">Add New Item</h3>
          <p class="text-gray-600">Create a new art piece entry</p>
        </RouterLink>
      </div>
    </div>
    <div class="bg-white shadow-lg rounded-lg p-6">
      <div class="flex items-center">
        <div class="bg-violet-500 text-white rounded-full p-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </div>
        <RouterLink :to="{name:'orders'}" class="ml-4">
          <h3 class="text-lg font-semibold">Orders</h3>
          <p class="text-gray-600">Show requests</p>
        </RouterLink>
      </div>
    </div>
    <!-- Card 2 -->
    <div class="bg-white shadow-lg rounded-lg p-6">
      <div class="flex items-center">
        <div class="bg-green-500 text-white rounded-full p-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <RouterLink :to="{name:'manage-item'}" ass="ml-4">
          <h3 class="text-lg font-semibold">Manage Items</h3>
          <p class="text-gray-600">Edit or delete existing items</p>
        </RouterLink>
      </div>
    </div>
    <!-- Card 3 -->
 
    <!-- Card 4 -->
    <div class="bg-white shadow-lg rounded-lg p-6">
      <div class="flex items-center">
        <div class="bg-yellow-500 text-white rounded-full p-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-semibold">Profile</h3>
          <p class="text-gray-600">Manage Profiel</p>
        </div>
      </div>
    </div>
    <!-- Card 5 -->

    <!-- Card 6 -->

  </div>
</div>

</body>


</template>
<script setup>
import Header from "@/views/header/Header.vue"
</script>