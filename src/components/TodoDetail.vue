<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const todo = ref({ id: 0, title: '', description: '', status: '' })

const fetchTodo = async () => {
  const response = await axios.get(`http://localhost:3000/todos/${route.params.id}`)
  todo.value = response.data
}

const updateTodo = async () => {
  await axios.put(`http://localhost:3000/todos/${todo.value.id}`, todo.value)
  router.push('/')
}

const deleteTodo = async () => {
  await axios.delete(`http://localhost:3000/todos/${todo.value.id}`)
  router.push('/')
}

onMounted(fetchTodo)
</script>

<template>
  <div class="todo-detail">
    <h2>Todo Detail</h2>
    <form @submit.prevent="updateTodo">
      <input v-model="todo.title" placeholder="Title" required>
      <textarea v-model="todo.description" placeholder="Description" required></textarea>
      <select v-model="todo.status">
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <button type="submit">Update Todo</button>
    </form>
    <button @click="deleteTodo" class="delete-btn">Delete Todo</button>
  </div>
</template>

<style scoped>
.todo-detail {
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
  margin-bottom: 10px;
}
.delete-btn {
  background-color: #f44336;
}
</style>