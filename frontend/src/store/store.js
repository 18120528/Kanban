import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./boadSlice";
//
const store=configureStore({
    reducer: {
        board: boardSlice.reducer
    }
})
store.subscribe(()=>console.log(store.getState().board))
//
export default store