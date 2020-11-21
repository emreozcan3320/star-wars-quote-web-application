export class Quote {
  id: number;
  quote: string;
  source: string;
  date: number; // Math.floor(Date.now() / 1000)
}
