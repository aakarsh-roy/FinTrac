import { create } from 'zustand'
import { categories, mockTransactions } from '../data/mockTransactions'

const defaultFilters = {
  search: '',
  category: 'all',
  type: 'all',
  startDate: '',
  endDate: '',
  sortBy: 'date',
  sortOrder: 'desc',
  page: 1,
  pageSize: 8,
}

const fakeFetchTransactions = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(mockTransactions), 900)
  })

export const useFinanceStore = create((set, get) => ({
  loading: true,
  error: null,
  role: 'admin',
  theme: 'dark',
  transactions: [],
  categories,
  monthlyBudget: 3200,
  selectedCategory: null,
  filters: defaultFilters,

  initialize: async () => {
    set({ loading: true, error: null })
    try {
      const transactions = await fakeFetchTransactions()
      set({ transactions, loading: false })
    } catch {
      set({ error: 'Unable to load financial data.', loading: false })
    }
  },

  addTransaction: (payload) => {
    if (get().role !== 'admin') return

    const tx = {
      ...payload,
      id: `t${Date.now()}`,
      amount: Number(payload.amount),
    }

    set((state) => ({
      transactions: [tx, ...state.transactions],
    }))
  },

  updateTransaction: (transactionId, payload) => {
    if (get().role !== 'admin') return

    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.id === transactionId
          ? {
              ...tx,
              ...payload,
              amount: Number(payload.amount ?? tx.amount),
            }
          : tx,
      ),
    }))
  },

  setRole: (role) => set({ role }),

  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

  setBudget: (monthlyBudget) => {
    if (get().role !== 'admin') return
    set({ monthlyBudget: Number(monthlyBudget) })
  },

  setFilters: (nextFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...nextFilters,
        page: nextFilters.page ?? 1,
      },
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  setPage: (page) =>
    set((state) => ({
      filters: {
        ...state.filters,
        page,
      },
    })),

  openCategory: (category) => set({ selectedCategory: category }),
  closeCategory: () => set({ selectedCategory: null }),

  getCategoryTransactions: () => {
    const { selectedCategory, transactions } = get()
    if (!selectedCategory) return []
    return transactions.filter((tx) => tx.category === selectedCategory)
  },
}))
