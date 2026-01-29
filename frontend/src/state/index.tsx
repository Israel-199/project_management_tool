import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

// ✅ Safe read (works with Next.js SSR)
const getInitialDarkMode = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isDarkMode") === "true";
};

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: getInitialDarkMode(),
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },

    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;

      // ✅ Persist immediately
      if (typeof window !== "undefined") {
        localStorage.setItem("isDarkMode", String(action.payload));
      }
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode } =
  globalSlice.actions;

export default globalSlice.reducer;
