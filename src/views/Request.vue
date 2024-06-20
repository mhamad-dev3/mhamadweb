<template>
    <div class="bg-gray-100 min-h-screen p-8">
      <v-container>
        <v-card class="mx-auto" max-width="1000" outlined>
          <v-card-title class="text-2xl font-bold text-center text-blue-700">
            Comments Section
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="comments"
              class="elevation-1"
            >
              <template #item.actions="{ item }">
                <v-btn
                  color="green darken-1"
                  class="mr-2 white--text"
                  small
                  @click="acceptComment(item)"
                >Accept</v-btn>
                <v-btn
                  color="red darken-1"
                  class="white--text"
                  small
                  @click="rejectComment(item)"
                >Reject</v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const headers = [
    { text: 'Username', value: 'username' },
    { text: 'Comment', value: 'comment' },
    { text: 'Actions', value: 'actions', sortable: false }
  ];
  
  const comments = ref([
    { username: 'User1', comment: 'Great artwork!' },
    { username: 'User2', comment: 'I love this piece.' },
    { username: 'User3', comment: 'Not my favorite.' },
    // Add more comments as needed
  ]);
  
  const acceptComment = (item) => {
    console.log('Accepted comment:', item);
    // Add your accept logic here
  };
  
  const rejectComment = (item) => {
    console.log('Rejected comment:', item);
    // Add your reject logic here
  };
  </script>
  
  <style scoped>
  .v-application--wrap {
    min-height: 100vh;
  }
  </style>
  