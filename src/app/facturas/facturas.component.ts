import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../clientes/clientes.service';
import { Venta } from './models/venta';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {flatMap, map, startWith} from 'rxjs/operators';
import { FacturasService } from './services/facturas.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DetalleVenta } from './models/detalle-venta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  titulo:string="Nueva Factura";
  factura:Venta=new Venta();
  autocompleteControl = new FormControl();
  productos: string[] = ['Mesa', 'tablet', 'Tv'];
  productosFiltrados: Observable<Producto[]>;


  constructor(private clienteService:ClientesService,private activatedRoute:ActivatedRoute,
   private facturaService:FacturasService ,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let clienteId=+params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente=>this.factura.cliente=cliente)
    })
    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      //startWith(''),
      map(value=>typeof value==='string'? value: value.nombre),
      flatMap(value => value ? this._filter(value): [])
    );
  }
 
  

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?:Producto):string | undefined{
    return producto? producto.nombre: undefined
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent):void{
    let producto=event.option.value as Producto;
    console.log(producto);
    
    
    if(this.existeItem(producto.id)){
      this.incrementaCantidad(producto.id);
    }else{
      let nuevoItem=new DetalleVenta();
      nuevoItem.producto=producto;
  
      this.factura.items.push(nuevoItem);
    }

   

    this.autocompleteControl.setValue('');

    event.option.focus();

    event.option.deselect();
  }

  actualizarCantidad(id:number, event:any):void{
    let cantidad:number=event.target.value as number;
    if(cantidad==0){
      return this.eliminarItemFactura(id);
    }

    this.factura.items=this.factura.items.map((item:DetalleVenta)=>{
      if(id===item.producto.id){
        item.cantidad=cantidad;
      }
      return item;
    })
  }

  existeItem(id:number):boolean{
    let existe=false;
    this.factura.items.forEach((item:DetalleVenta)=>{
      if(id===item.producto.id){
        existe=true;
      }
    })
    return existe;
  }

  incrementaCantidad(id:number):void{
    this.factura.items=this.factura.items.map((item:DetalleVenta)=>{
      if(id===item.producto.id){
        ++item.cantidad;
      }
      return item;
    })
  }
  eliminarItemFactura(id:number):void{
    this.factura.items=this.factura.items.filter((item:DetalleVenta)=>id !== item.producto.id)
  }

  create():void{
    this.facturaService.create(this.factura).subscribe(factura=>{
      Swal.fire(this.titulo,`Factura${factura.descripcion} creada con exito`,'success');
      this.router.navigate(['/clientes']);
    })
  }
  public createF():void{
    //console.log(this.cliente);
    this.facturaService.createFactura(this.factura).subscribe(
      factura=>{
        this.router.navigate(['/clientes'])
        Swal.fire(this.titulo,`Factura${factura.descripcion} creada con exito`,'success');
        this.router.navigate(['/clientes']);
      }
     
    )
  }
}
