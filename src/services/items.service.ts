import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Observable, catchError, throwError, delay, retry, map, tap } from 'rxjs';
import { IItem } from '../app/models/product';
import { Router } from '@angular/router';

@Injectable()
export class ItemsService {
  
  constructor(
    private _http: HttpClient,
    private _errorService: ErrorService,
    private _router: Router
  ){}
  
  getAll(): Observable<IItem[]>{
    return this._http.get<IItem[]>('https://fakestoreapi.com/products', {
      params: new HttpParams().append('limit', 2)
    }).pipe(
      map( (el) => {
        el.forEach( (m) => delete m?.rating)
        
        if (this.isStore()) {
          return this.getStore();
        } else {
          this.setStore(el);
        }
  
        return el;
      }),
      // retry(2),
      catchError(this._errorHandler.bind(this))
    )
  }
  
  getItem(itemId: number): Observable<IItem>{
    return this._http.get<IItem>(`https://fakestoreapi.com/products/${itemId}`).pipe(
      retry(2),
      catchError(this._errorHandler.bind(this))
    )
  }
  
  setItem(item: IItem): void {
    let masItems = this.getStore();
    masItems.push(item);
    this.setStore(masItems);
    this._router.navigate(['/']);
  }
  
  private _errorHandler(error: HttpErrorResponse){
    this._errorService.setMessage(error.message)
    return throwError( () => error.message)
  }
  
  setStore(items: IItem[]): void {
    localStorage.setItem('items', JSON.stringify(items));
  }
  
  getStore(): any {
    let mass = localStorage.getItem('items');
    const parseMass = JSON.parse(mass as any);
    return parseMass;
  }
  
  isStore(): boolean {
    return this.getStore() !== null;
  }
  
  clearStore(): void {
    localStorage.clear();
  }
}
