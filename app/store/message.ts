import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type MessageStore = {
  count: number;
  setTotalUnreadMessages: (unreadMessages: number) => number;
  setAddCount: () => number;
  setRemoveCount: () => number;
};

const useMessageStore = create<MessageStore>()(
  devtools((set) => ({
    count: 0,
    setTotalUnreadMessages: (unreadMessages) =>
      set(() => ({ count: unreadMessages })),
    setAddCount: () => set((state) => ({ count: state.count + 1 })),
    setRemoveCount: () => set((state) => ({ count: state.count - 1 })),
  }))
);

export default useMessageStore;
