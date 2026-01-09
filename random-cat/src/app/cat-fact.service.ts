import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatFactModel } from './cat-fact.model';

@Injectable({ providedIn: 'root' })
export class CatFactService {
  private readonly http = inject(HttpClient);

  getOne(): Observable<CatFactModel> {
    return this.http.get<CatFactModel>('https://catfact.ninja/fact');
  }
}
