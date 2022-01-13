import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Venta } from 'src/app/facturas/models/venta';
import { FacturasService } from 'src/app/facturas/services/facturas.service';
import { Cliente } from '../clientes';
import { ClientesService } from '../clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente:Cliente;
  constructor(private clienteService:ClientesService,private activated:ActivatedRoute,
   private facturaService:FacturasService ) { }

  ngOnInit(): void {
    this.activated.paramMap.subscribe(params=>{
      let id:number=+params.get('id');
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente=>{
          this.cliente=cliente;
        })
      }
    })
  }
  delete(factura:Venta){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `Seguro que desea eliminar la Factura ${factura.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaService.delete(factura.id).subscribe(response=>{
          this.cliente.facturas=this.cliente.facturas.filter(f=>f!==factura)
          swalWithBootstrapButtons.fire(
            'Factura Eliminada!',
            `Factura ${factura.descripcion}  eliminada con exito `,
            'success'
          )
        })
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La factura no se borro',
          'error'
        )
      }
    })
  
    }
  }


