import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, Effect } from "@ngrx/effects";
import { mergeMap, map, catchError } from "rxjs/operators";
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
    @Effect() loadBooks$ = createEffect(() => {
        // Use ofType to filter the action type
        // Map the action to a side effect
        // then map the response into the action that will be dispatched
        // Effects should return an action
        return this.actions$.pipe(
            ofType(BooksPageActions.enter),
            mergeMap((action) => {
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
}
