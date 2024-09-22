'use strict'
const Board =require("../models/board")
const List =require("../models/list")
const Card =require("../models/card")
const Comment =require("../models/comment")
//
const clearBoard=async ()=>{
    try {
        await Board.deleteMany({})
        await List.deleteMany({})
        await Card.deleteMany({})
        await Comment.deleteMany({})
    } catch (error) {
        console.log(error)
    }
}
const createBoard=async ()=>{
    try {
        const newBoard=await Board.create({})
        return newBoard
    } catch (error) {
        console.log(error)
    }
}
const createList=async (listTitle, boardId)=>{
    try {
        const newList=await List.create({
          title: listTitle
        })
        await Board.findByIdAndUpdate(boardId,
            {$push: { lists: newList._id }},
            {new: true}
        )
        return newList
      } catch (error) {
        console.log(error)
    }
}
const createCard=async (cardTitle, listId)=>{
    try {
        const newCard=await Card.create({
            title: cardTitle
        })
        await List.findByIdAndUpdate(listId, 
            {$push:{ cards: newCard._id }},
            {new: true}
        )
        return newCard
    } catch (error) {
        console.log(error)
    }
}
const createComment=async (username, commentText, cardId)=>{
    try {
        const newComment=await Comment.create({
            name: username,
            text: commentText
        })
        await Card.findByIdAndUpdate(cardId, 
            {$push: {comments: newComment}},
            {new: true}
        )
        return newComment
    } catch (error) {
        console.log(error)
    }
}
const getComments=async (cardId)=>{
    try {
        const card=await Card.findById(cardId).populate('comments')
        const comments = [...card.comments]
        return comments
    } catch (error) {
        console.log(error)
    }
}
const getListAndCardTitle=async (listID, cardID)=>{
    try {
        const list=await List.findById(listID)
        const card=await Card.findById(cardID)
        const lTitle=[...list.title]
        const cTitle=[...card.title]
        return {listTitle: lTitle, cardTitle: cTitle}
    } catch (error) {
        console.log(error)
    }
}
const deleteList=async (listID)=>{
    try {
        const list=await List.findById(listID)
        if(list){
            for (const cardID of list.cards) {
                await deleteCard(cardID);
            }
            await List.deleteOne({_id: listID})
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteCard=async (cardID)=>{
    try {
        const card=await Card.findById(cardID)
        if(card){
            await Comment.deleteMany({_id: {$in: card.comments}})
            await Card.deleteOne({_id: cardID})
        }        
    } catch (error) {
        console.log(error)
    }
}
const populateBoard = async (boardId) => {
    try {
      let jsonBoard = {};
      const board = await Board.findById(boardId)
        .populate({
          path: 'lists',
          populate: {
            path: 'cards'
          }
        });
      //
      board.lists.forEach(list => {
        jsonBoard[list._id] = {
          title: list.title,
          cards: list.cards
        };
      });
      return jsonBoard;
    } catch (error) {
      console.log(error);
    }
}; 
const cardDragged=async (source, destination, draggableId)=>{
    try {
        if(source.droppableId!==destination.droppableId){//diff list
            const srcList=await List.findById(source.droppableId)
            const desList=await List.findById(destination.droppableId)
            const srcCards=[...srcList.cards]
            const desCards=[...desList.cards]
            //
            srcCards.splice(source.index,1)
            desCards.splice(destination.index,0,draggableId)
            await List.findByIdAndUpdate(source.droppableId, {cards: srcCards})
            await List.findByIdAndUpdate(destination.droppableId, {cards: desCards})
        }
        else{//same list
            const srcList=await List.findById(source.droppableId)
            const srcCards=[...srcList.cards]
            srcCards.splice(source.index,1)
            srcCards.splice(destination.index,0,draggableId)
            await List.findByIdAndUpdate(source.droppableId, {cards: srcCards})
        }
    } catch (error) {
        console.log(error)
    }
}
//
module.exports={createBoard, createList, createCard, createComment, clearBoard, populateBoard, getComments,
     getListAndCardTitle, deleteCard, deleteList, cardDragged}