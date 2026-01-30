import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { CatModel } from './cat.model';

@Injectable({ providedIn: 'root' })
export class CatService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<CatModel[]> {
    return this.http.get<{ data: CatModel[] }>('/cats.json').pipe(
      delay(2000),
      map(response => response.data)
    );
  }
}