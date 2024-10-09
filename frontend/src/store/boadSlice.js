import { createSlice } from "@reduxjs/toolkit";
//
const initialState={}

export const boardSlice=createSlice({
    name: 'board',
    initialState,
    reducers: {
        fetchBoard: (state, action) => {
            return {
                ...action.payload
            }
        },
        addComment: (state, action) => {
            const card=state[action.payload.listID].cards.find(card => card._id===action.payload.cardID)
            card.comments.push(action.payload.comment)
        }
    }
})
//
export const {fetchBoard, addComment} = boardSlice.actions