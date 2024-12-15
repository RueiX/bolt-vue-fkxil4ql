import { defineStore } from 'pinia'
import type { Order, OrderQuery } from '@/types/order'
import { request } from '@/utils/request'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orderList: [] as Order[],
    total: 0
  }),

  actions: {
    async getOrders(query: OrderQuery) {
      const response = await request.get('/api/orders', { params: query })
      return {
        data: response.data,
        total: response.total
      }
    },

    async createOrder(data: Partial<Order>) {
      return await request.post('/api/orders', data)
    },

    async updateOrder(data: Partial<Order>) {
      return await request.put(`/api/orders/${data.id}`, data)
    },

    async deleteOrder(id: string) {
      return await request.delete(`/api/orders/${id}`)
    },

    async searchCustomers(query: string) {
      const response = await request.get('/api/customers/search', {
        params: { query }
      })
      return response.data
    },

    async searchProducts(query: string) {
      const response = await request.get('/api/products/search', {
        params: { query }
      })
      return response.data
    }
  }
})