import { create } from 'zustand';
import { getItem, setItem, removeItem } from '@/utils/storage';
import { STORAGE_TYPE } from '@/types';

const useUserStore = create((set) => ({
  userInfo: getItem(STORAGE_TYPE.USER) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(STORAGE_TYPE.USER, userInfo);
    },

    clearUserInfo: () => {
      set({ userInfo: {} });
      removeItem(STORAGE_TYPE.USER);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserActions = () => useUserStore((state) => state.actions);

export default useUserStore;