import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import {
    map,
    catchError,
    exhaustMap,
    concatMap,
    mergeMap,
} from "rxjs/operators";
import { BooksService } from "../shared/services";
import { BooksPageActions, BooksApiActions } from "./actions";
import { Observable, of } from "rxjs";
// import { Action } from "@ngrx/store";

@Injectable()
export class BooksApiEffects {
    // loadBooks$: Observable<Action | unknown>;
    constructor(
        private actions$: Actions,
        private booksService: BooksService
    ) {}
    loadBooks$ = createEffect(() => {
        // Use ofType to filter the action type
        // Map the action to a side effect
        // then map the response into the action that will be dispatched
        // Effects should return an action
        return this.actions$.pipe(
            ofType(BooksPageActions.enter),
            exhaustMap(() => {
                // Catch errors inside inner Observable
                // Ensure that outer Observable will continue listening for actions even if inner Observable fails
                return this.booksService.all().pipe(
                    map((books) =>
                        BooksApiActions.booksLoadedSuccess({ books })
                    ),
                    catchError((err) => of({ type: "Books Loaded Failure" }))
                );
            })
        );
    });

    createBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BooksPageActions.createBook),
            concatMap((action) => {
                return this.booksService.create(action.book).pipe(
                    map((book) => BooksApiActions.bookCreatedSuccess({ book })),
                    catchError((err) => of({ type: "Book Created Failure" }))
                );
            })
        );
    });

    updateBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BooksPageActions.updateBook),
            concatMap((action) => {
                return this.booksService
                    .update(action.bookId, action.changes)
                    .pipe(
                        map((book) =>
                            BooksApiActions.bookUpdatedSuccess({ book })
                        ),
                        catchError((err) =>
                            of({ type: "Book Updated Failure" })
                        )
                    );
            })
        );
    });

    deleteBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BooksPageActions.deleteBook),
            mergeMap((action) => {
                return this.booksService.delete(action.bookId).pipe(
                    map(() =>
                        BooksApiActions.bookDeletedSuccess({
                            bookId: action.bookId,
                        })
                    ),
                    catchError((err) => of({ type: "Book Deleted Failure" }))
                );
            })
        );
    });
}
