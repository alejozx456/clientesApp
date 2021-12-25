import { Injectable } from '@angular/core';
import { Cliente } from './clientes';
import { CLIENTES } from './clientes.json';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

private urlEndPoint:string='http://localhost:8080/api/clientes';
private httpHeaders= new HttpHeaders({
  'Content-type': 'application/json'
});
  constructor(private http:HttpClient) { }

  getClientes():Observable<Cliente[]>{
   // return of(CLIENTES);
   return this.http.get<Cliente[]>(this.urlEndPoint)
   //this.http.get(this.urlEndPoint).pipe(
     //map((response)=>response as Cliente[])
   //);
  }

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint,cliente,{headers:this.httpHeaders})
  }
  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
  }
  editarcliente(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.urlEndPoint,cliente,{headers:this.httpHeaders})
  }
}
