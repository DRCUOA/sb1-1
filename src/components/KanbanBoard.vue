<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Todo {
  id: number
  title: string
  description: string
  status: string
}

const todos = ref<Todo[]>([])

const fetchTodos = async () => {
  const response = await axios.get('http://localhost:3000/todos')
  todos.value = response.data
}

onMounted(fetchTodos)
</script>

<template>
  <div class="kanban-board">
    <div v-for="status in ['To Do', 'In Progress', 'Done']" :key="status" class="column">
      <h2>{{ status }}</h2>
      <div v-for="todo in todos.filter(t => t.status === status)" :key="todo.id" class="todo-card">
        <router-link :to="`/todo/${todo.id}`">
          <h3>{{ todo.title }}</h3>
          <p>{{ todo.description }}</p>
        </router-link>
      </div>
    </div>
    <router-link to="/add" class="add-todo-btn">Add New Todo</router-link>
  </div>
</template>

<style scoped>
.kanban-board {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.column {
  flex: 1;
  margin: 0 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  padding: 10px;
}
.todo-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
.add-todo-btn {
  display: block;
  margin-top: 20px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>