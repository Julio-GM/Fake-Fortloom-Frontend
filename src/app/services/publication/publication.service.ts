import {Injectable, ViewChild} from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Publication } from 'src/app/models/publication';
import {MatPaginator} from "@angular/material/paginator";
import {Multimedia} from "../../models/multimedia";
@Injectable({
  providedIn: 'root'
})
export class PublicationService {


  basePath = 'http://localhost:3000/publications';
  basepath2= 'http://localhost:3000/artists';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }



  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message} `);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }

    return throwError('Something happened with request, please try again later');
  }

  // Create Publicacion
  create(item: Publication,id:number): Observable<Publication> {
    console.log("creating")
    return this.http.post<Publication>(`${this.basePath}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  createImage(multimedia: Multimedia): Observable<Multimedia> {
    return this.http.post<Multimedia>("http://localhost:3000/multimedias", JSON.stringify(multimedia), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get Publicacion by id
  getById(id: any): Observable<Publication> {
    return this.http.get<Publication>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get All Publicaciones
  getAll(): Observable<Publication> {
    console.log("getall")
    return this.http.get<Publication>("http://localhost:3000/publications", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Update Publicacion
  update(id: any, item: any): Observable<Publication> {
    return this.http.put<Publication>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Delete Publicacion
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


}
