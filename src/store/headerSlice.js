import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleMenu: null,
  activeMenuData: [{ icon: "", title: "" }],
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setVisibleMenu(state, action) {
      const { menu, data } = action.payload;
      state.visibleMenu = menu;
      data && (state.activeMenuData = data);
    },
  },
});

export const { setVisibleMenu } = headerSlice.actions;

export default headerSlice.reducer;
