import { create } from 'zustand';

const storeLocal = create((set) => ({
  userInfo: {},
  setUserInfo: (datas) => set(() => ({ userInfo: { ...datas } })),

  documents: [],
  setDocuments: (datas) => set(() => ({ documents: [...datas] })),

  showSearch: false,
  setShowSearch: (value) => set(() => ({ showSearch: value })),

  oldSearchResult: [],
  setOldSearchResult: (datas) => set(() => ({ oldSearchResult: [...datas] })),

  resetStore: () =>
    set(() => ({
      userInfo: {},
      documents: [],
      showSearch: false,
      oldSearchResult: [],
    })),
}));

export { storeLocal };
