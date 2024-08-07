<template>
  <div class="flex flex-col gap-10 pt-10 items-center">
    <h3 class="text-3xl">Create your account</h3>
    <v-sheet class="mx-auto w-full" max-width="300">
      <v-form @submit.prevent="handleRegister">
        <v-text-field v-model="name" label="Username" required />
        <v-text-field v-model="email" label="Your email" required type="email" />
        <v-text-field v-model="password" label="Your password" type="password" required />
        <v-text-field v-model="confirmPassword" label="Confirm password" type="password" required />

        <div class="flex gap-4 mt-4">
          <label class="flex items-center">
            <input type="radio" v-model="role" value="user" class="form-radio text-blue-600">
            <span class="ml-2">User</span>
          </label>
          <label class="flex items-center">
            <input type="radio" v-model="role" value="seller" class="form-radio text-blue-600">
            <span class="ml-2">Seller</span>
          </label>
        </div>

        <div class="flex flex-col mt-4" v-if="errorState.hasError">
          <span class="text-red-500">{{ errorState.errorMessage }}</span>
        </div>

        <div class="flex justify-end mt-4">
          <v-btn :loading="loading" class="mt-2" text="Register" type="submit" block />
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { setDocument } from "@/firebase/Functions";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMainStore } from "@/store/MainStore";
import { auth } from "@/firebase/firebase";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const role = ref<string>('user'); // New state for user role
const mainStore = useMainStore();
const loading = ref<boolean>(false);
const errorState = reactive({
  hasError: false,
  errorMessage: '',
});

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorState.hasError = true;
    errorState.errorMessage = 'Passwords do not match.';
    return;
  }

  loading.value = true;
  try {
    const user = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const userId = user.user.uid;
   
    await setDocument('user', userId, {
      email: email.value,
      name: name.value,
      id: userId,
      role: role.value, // Save the selected role
    });
    mainStore.user = user.user;
    window.localStorage.setItem('userT',JSON.stringify(mainStore.user))
   if(role.value = 'seller'){
    router.push({ name: 'shop' });
   } else {
    router.push({ name: 'dashboard' });
   }
  } catch (error: any) {
    errorState.hasError = true;
    errorState.errorMessage = 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Tailwind CSS classes can be used directly in your component */
</style>
