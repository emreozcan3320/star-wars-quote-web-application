import {Component, Input, OnInit} from '@angular/core';
import {Quote} from '../../models/quote.model';
import {BehaviorSubject} from 'rxjs';
import {QuoteService} from '../../services/quote.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() inputQuote?: Quote;
  @Input() modalStatus: BehaviorSubject<boolean>;
  public modalQuote: Quote;

  constructor(private quoteService: QuoteService) {
    this.modalQuote = (this.inputQuote === undefined) ? new Quote() : this.inputQuote;
  }

  ngOnInit(): void {
    this.modalQuote = (this.inputQuote === undefined) ? new Quote() : this.inputQuote;
  }

  public update(e): void {
    e.preventDefault();
    this.quoteService.updateQuote(this.modalQuote.id, this.modalQuote).subscribe(value => {
      this.modalStatus.next(false);
    });
  }

  public save(e): void {
    e.preventDefault();
    this.quoteService.saveQuote(this.modalQuote).subscribe(value => {
      this.modalStatus.next(false);
    });
  }

  public cancel(): void {
    this.modalStatus.next(false);
  }

}
