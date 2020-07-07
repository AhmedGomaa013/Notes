import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { INote } from "./note";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class DataService {

  private baseUrl = 'api/notes/';
  

  public notes: INote[] = [];
  constructor(private http: HttpClient) { }

  getNotes(): Observable<INote[]> {
    return this.http.get<INote[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  postNote(note: INote) {
    return this.http.post<INote>(this.baseUrl, note)
      .pipe(catchError(this.handleError));
  }

  putNote(note: INote) {
    return this.http.put(this.baseUrl + note.noteId.toString(), note)
      .pipe(catchError(this.handleError));
  }

  deleteNote(note: INote) {
    return this.http.delete(this.baseUrl + note.noteId.toString())
      .pipe(catchError(this.handleError));
  }

  deleteAllNotes() {
    return this.http.delete(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
