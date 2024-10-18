import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import KanbanBoard from './components/KanbanBoard.vue'
import TodoForm from './components/TodoForm.vue'
import TodoDetail from './components/TodoDetail.vue'

const routes = [
  { path: '/', component: KanbanBoard },
  { path: '/add', component: TodoForm },
  { path: '/todo/:id', component: TodoDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')