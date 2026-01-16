import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatModel } from './cat.model';

@Injectable({ providedIn: 'root' })
export class CatService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<{ data: CatModel[] }> {
    return this.http.get<{ data: CatModel[] }>('/cats.json');
  }
}
