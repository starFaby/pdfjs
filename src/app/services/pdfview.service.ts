import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfviewService {

  constructor(private http: HttpClient) { }
  /*getCedula(): Observable<any> {
    return this.http.get('http://localhost:3000/api/consultas/pagopaypal/' + 1);
  }*/
}
