<template>
  <body class="flex flex-col gap-10 pt-10 items-center ">
    <h3 class="text-3xl ">Create your account</h3>
    <v-sheet class="mx-auto w-full" max-width="300">
      <v-form @submit.prevent="handleRegister">
        <v-text-field v-model="name" label="Username" required />
        <v-text-field v-model="email" label="your email" required type="email" />
        <v-text-field v-model="password" label="your password" type="password" required />
        <v-text-field v-model="confirmPassword" label="Confirm password" type="password" required />

        <div class="flex flex-col" v-if="errorState.hasError">
          <span class="text-red-500">{{ errorState.errorMessage }}</span>
        </div>

        <div class="flex justify-end">
          <v-btn :loading="loading" class="mt-2" text="Register" type="submit" block />
        </div>
      </v-form>
    </v-sheet>
  </body>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { setDocument } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMainStore } from "@/store/MainStore";
import { auth } from "@/firebase/firebase";
import { useRouter } from "vue-router";
const router = useRouter()
const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const  mainStore = useMainStore()
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
   const userId = user.user.uid
   mainStore.user = user.user
   setDocument('user',userId,{
    email: email.value,
    name: name.value,
    id:userId,
    role:'user'
   })
   console.log('why not here')
   router.push({name:'dashbard'})
    // Registration successful, redirect or handle further logic here
  } catch (error:any) {
    errorState.hasError = true;
    console.log('or error')
    // // Handle specific error codes
    // if (error.code === 'auth/invalid-email') {
    //   errorState.errorMessage = 'Please enter a valid email address.';
    // } else {
    //   errorState.errorMessage = 'Registration failed. Please try again.';
    // }
  } finally {
    loading.value = false;
  }
};

</script>
