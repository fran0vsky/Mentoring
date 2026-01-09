import { Component, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CatFactService } from './cat-fact.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private readonly catFactService = inject(CatFactService);
  
  catFact = toSignal(this.catFactService.getOne(), { initialValue: null });
}
