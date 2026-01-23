import { Component, inject, Signal, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CatFactService } from './cat-fact.service';
import { CatModel } from './cat.model';
import { CatService } from './cat.service';

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
  private readonly catService = inject(CatService);
  
  protected catFact = toSignal(this.catFactService.getOne(), { initialValue: null });
  protected cats: Signal<CatModel[] | null> = toSignal(this.catService.getAll(), { initialValue: null });
}
}