import { createAction, props } from "@ngrx/store";
import { BookModel } from "src/app/shared/models";

// Actions to Create
// Getting all the books, Updating a book, Creating a book, Deleting a book

// Failure actions not required for workshop, but can be used in error handling

export const booksLoadedSuccess = createAction(
  "[Books API] Books Loaded Success",
  props<{ books: BookModel[] }>()
);

export const booksLoadedFailure = createAction(
  "[Books API] Books Loaded Failure"
);

export const bookUpdatedSuccess = createAction(
  "[Books API] Book Updated Success",
  props<{ book: BookModel }>()
);

export const bookUpdatedFailure = createAction(
  "[Books API] Book Updated Failure"
);

export const bookCreatedSuccess = createAction(
  "[Books API] Book Created Success",
  props<{ book: BookModel }>()
);

export const bookCreatedFailure = createAction(
  "[Books API] Book Created Failure"
);

export const bookDeletedSuccess = createAction(
  "[Books API] Book Created Success",
  props<{ bookId: string }>()
);

export const bookDeletedFailure = createAction(
  "[Books API] Book Created Failure"
);
