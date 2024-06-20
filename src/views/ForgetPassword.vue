<template>
    <v-card class="mx-auto w-full md:w-1/2 lg:w-1/3 mt-10">
      <v-card-text class="pb-10">
        <v-form class="flex flex-col" @submit.prevent="submitForgotPassword">
          <h3 class="text-3xl font-medium mb-5">Forgot Password</h3>
          <v-text-field
            v-model="email"
            label="Email Address"
            required
            type="email"
            class="rounded-lg shadow-sm pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          />
          <div class="flex justify-between mt-5">
            <v-btn
              :loading="loading"
              class="w-full md:w-1/2 py-2 rounded-lg text-white font-medium shadow-sm bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              type="submit"
            >
              Send Reset Link
            </v-btn>
            <v-btn  @click="$router.push({ name: 'login' })" class="text-primary hover:text-indigo-700">
              Back to Login
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </template>
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useMainStore } from '@/store/MainStore';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const loading = ref(false);
  const mainStore = useMainStore();
  const router = useRouter();
  
  const submitForgotPassword = async () => {
    try {
      loading.value = true;
      await mainStore.forgotPassword(email.value); // Assuming login store has a forgotPassword method
      router.push({ name: 'login' }); // Redirect back to login after success
    } catch (error) {
      console.error('Error sending reset link:', error);
      // Handle errors gracefully (e.g., display an error message to the user)
    } finally {
      loading.value = false;
    }
  };
  </script>
  <style scoped>
  .v-card {
    @apply rounded-lg border border-gray-200 shadow-md overflow-hidden;
  }
  
  .v-card-text {
    @apply p-8;
  }
  </style>
  