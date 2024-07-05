import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { User } from '@/@types/store/user'

export const useUserStore = defineStore('user', () => {
  // state
  const user = ref<User | null>(null)
  const users = ref<User[]>([])

  // getters
  // 所有使用者
  const gerUsers = async () => {
    const api = 'https://fakestoreapi.com/users'
    try {
      const res = await axios.get(api)
      if(res.status === 200) {
        users.value = res.data
      } else {
        console.error(res.status ,res.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }
  // 單一使用者
  const getUser = async (id: number) => {
    const api = `https://fakestoreapi.com/users/${id}`
    try {
      const res = await axios.get(api)
      if(res.status === 200) {
        user.value = res.data
      } else {
        console.error(res.status, res.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }
  // 取得使用者的假資料，做出登入系統後要改掉
  getUser(1)

  // actions
  const addUser = (user: User) => {
    users.value.push(user)
  }

  const updateUser = (user: User) => {
    const index = users.value.findIndex((item) => item.id === user.id)
    if (index !== -1) {
      users.value[index] = user
    }
  }

  const deleteUser = (id: number) => {
    const index = users.value.findIndex((user) => user.id === id)
    if (index !== -1) {
      users.value.splice(index, 1)
    }
  }

  return {
    user,
    gerUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
  }
})
