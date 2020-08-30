import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";

// Keep track of books as well as the book selected
export interface State {
  collection: BookModel[];
  activeBookId: string | null;
}

// Set initial state
export const initialState: State = {
  collection: [],
  activeBookId: null,
};

// Pass in initial state
// Use on function to define actions for reducer to handle
export const booksReducer = createReducer(
  initialState,
  on(
    BooksPageActions.enter,
    BooksPageActions.clearSelectedBook,
    (state, action) => {
      return {
        ...state,
        activeBookId: null,
      };
    }
  ),
  on(BooksPageActions.selectBook, (state, action) => {
    return {
      ...state,
      activeBookId: action.bookId,
    };
  })
);
