<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const title = ref('')
const description = ref('')
const status = ref('To Do')

const addTodo = async () => {
  await axios.post('http://localhost:3000/todos', {
    title: title.value,
    description: description.value,
    status: status.value
  })
  router.push('/')
}
</script>

<template>
  <div class="todo-form">
    <h2>Add New Todo</h2>
    <form @submit.prevent="addTodo">
      <input v-model="title" placeholder="Title" required>
      <textarea v-model="description" placeholder="Description" required></textarea>
      <select v-model="status">
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <button type="submit">Add Todo</button>
    </form>
  </div>
</template>

<style scoped>
.todo-form {
  max-width: 500px;
  margin: 0 auto;
}
form {
  display: flex;
  flex-direction: column;
}
input, textarea, select {
  margin-bottom: 10px;
  padding: 5px;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
</style>