import { Component, OnInit } from "@angular/core";
import { BookModel, BookRequiredProps } from "src/app/shared/models";
import { BooksService } from "src/app/shared/services";
import { Store } from "@ngrx/store";
import { BooksPageActions, BooksApiActions } from "../../actions";
import { Observable } from "rxjs";
import { selectBooksEarningsTotals, State } from "src/app/shared/state";

@Component({
    selector: "app-books",
    templateUrl: "./books-page.component.html",
    styleUrls: ["./books-page.component.css"],
})
export class BooksPageComponent implements OnInit {
    books: BookModel[] = [];
    currentBook: BookModel | null = null;
    total$: Observable<number>;

    constructor(
        private booksService: BooksService,
        private store: Store<State>
    ) {
        this.total$ = store.select(selectBooksEarningsTotals);
    }

    ngOnInit() {
        this.store.dispatch(BooksPageActions.enter());
        this.getBooks();
        this.removeSelectedBook();
    }

    getBooks() {
        this.booksService.all().subscribe((books) => {
            this.store.dispatch(BooksApiActions.booksLoadedSuccess({ books }));
            this.books = books;
        });
    }

    onSelect(book: BookModel) {
        this.store.dispatch(BooksPageActions.selectBook({ bookId: book.id }));
        this.currentBook = book;
    }

    onCancel() {
        this.removeSelectedBook();
    }

    removeSelectedBook() {
        this.store.dispatch(BooksPageActions.clearSelectedBook());
        this.currentBook = null;
    }

    onSave(book: BookRequiredProps | BookModel) {
        if ("id" in book) {
            this.updateBook(book);
        } else {
            this.saveBook(book);
        }
    }

    saveBook(bookProps: BookRequiredProps) {
        this.store.dispatch(BooksPageActions.createBook({ book: bookProps }));
        this.booksService.create(bookProps).subscribe((book) => {
            this.store.dispatch(BooksApiActions.bookCreatedSuccess({ book }));
            this.getBooks();
            this.removeSelectedBook();
        });
    }

    updateBook(book: BookModel) {
        this.store.dispatch(
            BooksPageActions.updateBook({ bookId: book.id, changes: book })
        );
        this.booksService.update(book.id, book).subscribe((book) => {
            this.store.dispatch(BooksApiActions.bookUpdatedSuccess({ book }));
            this.getBooks();
            this.removeSelectedBook();
        });
    }

    onDelete(book: BookModel) {
        this.store.dispatch(BooksPageActions.deleteBook({ bookId: book.id }));
        this.booksService.delete(book.id).subscribe(() => {
            this.store.dispatch(
                BooksApiActions.bookDeletedSuccess({ bookId: book.id })
            );
            this.getBooks();
            this.removeSelectedBook();
        });
    }
}
