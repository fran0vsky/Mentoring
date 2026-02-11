import { Component, inject, signal, Signal, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

  private readonly refreshCats$ = new BehaviorSubject<void>(undefined);

  protected catToRemove = signal<CatModel | null>(null);

  protected catFact = toSignal(this.catFactService.getOne(), { initialValue: null });
  protected cats: Signal<CatModel[] | null> = toSignal(
    this.refreshCats$.pipe(switchMap(() => this.catService.getAll())),
    { initialValue: null }
  );

  protected openRemoveConfirm(cat: CatModel): void {
    this.catToRemove.set(cat);
  }

  protected closeRemoveConfirm(): void {
    this.catToRemove.set(null);
  }

  protected confirmRemove(): void {
    const cat = this.catToRemove();
    if (!cat) return;
    this.catService.removeOne(cat.id).subscribe({
      next: () => {
        this.refreshCats$.next();
        this.catToRemove.set(null);
      },
      error: (err) => console.error('Failed to remove cat', err),
    });
  }
}