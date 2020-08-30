import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";

const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) =>
  books.map((book) => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  });
const deleteBook = (books: BookModel[], bookId: string) =>
  books.filter((book) => bookId !== book.id);

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

// Wrap reducer in function for AOT compilation
// For Angular 8 and below and non-Ivy versions of Angular
// Use this to access the book reducer
export function reducer(state: State | undefined, action: Action) {
  return booksReducer(state, action);
}
