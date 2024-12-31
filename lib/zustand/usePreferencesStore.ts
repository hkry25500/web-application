import { create } from "zustand";
import { persist } from "zustand/middleware";


// 创建一个 zustand 存储
const usePreferencesStore = create(
    persist(
        (set) => ({
            theme: 'light', // 默认主题为 'light'
            setTheme: (theme: string) => set({ theme }),
        }),
        {
            name: 'preferences', // 存储名称
        }
    )
);


export default usePreferencesStore;
