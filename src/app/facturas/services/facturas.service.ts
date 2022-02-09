import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto';
import { Venta } from '../models/venta';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private urlEndPoint:string=URL_BACKEND+'/api/facturas';
  private httpHeaders= new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http:HttpClient) { }

  getFactura(id:number):Observable<Venta>{
    return this.http.get<Venta>(`${this.urlEndPoint}/${id}`);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }
  filtrarProductos(term:String):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrar-productos/${term}`);
  }

  create(factura:Venta):Observable<Venta>{
    return this.http.post<Venta>(this.urlEndPoint,factura,{headers:this.httpHeaders});
  }
  createFactura(factura:Venta):Observable<Venta>{
    return this.http.post(this.urlEndPoint,factura,{headers:this.httpHeaders}).pipe(
      map((response:any)=>response.factura as Venta)
     
    );
  }
}
