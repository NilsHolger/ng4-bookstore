import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookService } from '../book.service';
import { Book } from '../models/books';

import { CartService } from '../cart.service';
import { Cart, CartItem } from '../models/cart';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit  {

  book: Book;
  cartItem: CartItem;

  get quantity(): number {
    return this.cartItem ? this.cartItem.count : 0;
  }

  get amount(): number {
    return this.cartItem ? this.cartItem.amount : 0;
  }

  constructor(private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
        let id: string = params['id'];
        this.bookService.getBook(id).subscribe((book: Book) => this.book = book);
        this.cartItem = this.cartService.findItem(id);
    });
  }

  addToCart($event: Event) {
    this.cartItem = this.cartService.addBook(this.book);
    $event.preventDefault();
  }
  removeFromCart($event: Event) {
    this.cartItem = this.cartService.removeBook(this.book);
    $event.preventDefault();
  }
}
