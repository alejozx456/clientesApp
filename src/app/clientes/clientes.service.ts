import { Injectable } from '@angular/core';
import { Cliente } from './clientes';

import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {map,catchError, tap} from 'rxjs/operators'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { formatDate, registerLocaleData } from '@angular/common';
import localeEC from '@angular/common/locales/es-EC';
import { Region } from './region';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

private urlEndPoint:string='http://localhost:8080/api/clientes';
private httpHeaders= new HttpHeaders({
  'Content-type': 'application/json'
});
  constructor(private http:HttpClient,private router:Router) { }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
}
  getRegiones():Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint+'/regiones');
    
  }

  getClientes(page:number):Observable<any>{
   // return of(CLIENTES);
  // return this.http.get<Cliente[]>(this.urlEndPoint)
   return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
     tap((response:any)=>{
     
      (response.content as Cliente[]).forEach(cliente=>{
        console.log(cliente.nombre)
      })
     }),
     map((response:any)=>
     {
      
     (response.content as Cliente[]).map(cliente=>{
       cliente.nombre=cliente.nombre.toUpperCase();
       cliente.apellido=cliente.apellido.toUpperCase();
       registerLocaleData(localeEC,'EC')
       cliente.createAt=formatDate(cliente.createAt,'fullDate','EC')
       return cliente
      })
        return response
      })
   );
  }

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post(this.urlEndPoint,cliente,{headers:this.httpHeaders}).pipe(
      map((response:any)=>response.cliente as Cliente),
     catchError(this.handleError)
    );
  }
  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      //this.router.navigate(['/clientes']);
      catchError(this.handleError)
      
    );
  }
  editarcliente(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.urlEndPoint,cliente,{headers:this.httpHeaders})
  }
  update(cliente:Cliente):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers:this.httpHeaders})
  }
  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders})
  }
}
