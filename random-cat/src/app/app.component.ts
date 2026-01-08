import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CatFact } from './cat-fact.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  catFact: CatFact | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCatFact();
  }

  fetchCatFact(): void {
    this.http.get<CatFact>('https://catfact.ninja/fact').subscribe({
      next: (data) => {
        this.catFact = data;
      },
      error: (error) => {
        console.error('Error fetching cat fact:', error);
      }
    });
  }
}
