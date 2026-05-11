import { create } from 'zustand';

export const useUserStore = create((set) => ({
  users: [
    { 
      id: 1, name: 'Figma', url: 'https://www.figma.com/', 
      fullCardNumber: '5294243647802468', email: 'ItaiBracha31@gmail.com',
      assigned: 'Itai Bracha', status: 'Done', 
      lastTransaction: 'Jan 2, 2022', amount: 783.22, endDate: 'Jan 12, 2022'
    },
    { 
      id: 2, name: 'Adobe XD', url: 'https://www.adobe.com/', 
      fullCardNumber: '5294243647801111', email: 'ItaiBracha31@gmail.com',
      assigned: 'Itai Bracha', status: 'Done', 
      lastTransaction: 'Jan 2, 2022', amount: 783.22, endDate: 'Jan 12, 2022'
    }
  ],
  searchQuery: '',
  filterStatus: 'All',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  
addUser: (newUser) =>
  set((state) => ({
    users: [...state.users, newUser],
  })),
  
editUser: (updatedUser) =>
  set((state) => ({
    users: state.users.map((u) =>
      u.id === updatedUser.id
        ? {
            ...u,
            ...updatedUser,
          }
        : u
    ),
  })),

  deleteUser: (id) => set((state) => ({
    users: state.users.filter(u => u.id !== id)
  }))
}));