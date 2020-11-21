import {Component, OnInit} from '@angular/core';
import {QuoteService} from './services/quote.service';
import {Quote} from './models/quote.model';
import {BehaviorSubject, combineLatest} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public quoteList: Array<Quote>;
  public currentQuote: Quote;
  public quoteIndex: number;
  public modalQuote: Quote;
  public addModalStatus = new BehaviorSubject<boolean>(false);
  public updateModalStatus = new BehaviorSubject<boolean>(false);

  constructor(private quoteService: QuoteService) {
    this.quoteIndex = 0;
  }

  public ngOnInit(): void {
    this.getQuotes();
    combineLatest([this.updateModalStatus, this.addModalStatus]).subscribe(value => {
      this.getQuotes();
    });
  }

  public getQuotes(): void {
    this.quoteService.getAllQuotes().subscribe(quoteList => {
      this.quoteList = quoteList;
      this.currentQuote = quoteList[this.quoteIndex];
    });
  }

  public nextQuote(): void {
    if (this.quoteIndex + 1 !== this.quoteList.length) {
      this.quoteIndex += 1;
      this.currentQuote = this.quoteList[this.quoteIndex];
    } else if (this.quoteIndex + 1 > this.quoteList.length) {
      this.quoteIndex = 0;
      this.currentQuote = this.quoteList[this.quoteIndex];
    } else {
      // if quoteIndex == quoteList.length -1
      this.quoteIndex = 0;
      this.currentQuote = this.quoteList[this.quoteIndex];
    }
  }

  public prevQuote(): void {
    if (this.quoteIndex - 1 < 0) {
      this.quoteIndex = this.quoteList.length - 1;
      this.currentQuote = this.quoteList[this.quoteIndex];
    } else if (this.quoteIndex - 1 !== 0) {
      this.quoteIndex -= 1;
      this.currentQuote = this.quoteList[this.quoteIndex];
    } else {
      // if quoteIndex == quoteList.length -1
      this.quoteIndex = 0;
      this.currentQuote = this.quoteList[this.quoteIndex];
    }
  }

  public getRandomQuote(): void {
    let random = Math.floor(Math.random() * this.quoteList.length);
    while (random === this.quoteIndex) {
      random = Math.floor(Math.random() * this.quoteList.length);
    }
    this.quoteIndex = random;
    this.currentQuote = this.quoteList[this.quoteIndex];
  }

  public addQuote(): void {
    this.modalQuote = undefined;
    this.updateModalStatus.next(true);
    this.addModalStatus.next(false);
  }

  public updatedQuote(): void {
    this.modalQuote = this.currentQuote;
    this.updateModalStatus.next(true);
    this.addModalStatus.next(false);
  }

  public deleteQuote(): void {
    this.quoteService.delete(this.currentQuote.id).subscribe(value => {
      this.getQuotes();
      this.getRandomQuote();
    });
  }

}
