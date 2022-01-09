import { Component, OnInit } from '@angular/core';
import { Cliente } from './clientes';
import { ClientesService } from './clientes.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[];
  paginador:any;
 

  
  
  constructor(private clienteService: ClientesService,private activatedRoute:ActivatedRoute) { }
 
  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe( params=>{
      let page:number=+params.get('page');
      if(!page){
        page=0;
      }
   this.clienteService.getClientes(page).pipe(
     tap(response=>{
        (response.content as Cliente[]).forEach(cliente=>{
         console.log(cliente.nombre)
       })
     })
   )
   .subscribe(
    response=>{
      this.clientes=response.content as Cliente[];
      this.paginador=response;
    }
   )
  }
   );

  }
  delete(cliente:Cliente):void{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  swalWithBootstrapButtons.fire({
    title: 'Estas Seguro?',
    text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido} `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.clienteService.delete(cliente.id).subscribe(response=>{
        this.clientes=this.clientes.filter(cli=>cli!==cliente)
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          `Cliente ${cliente.nombre} ${cliente.apellido} eliminado `,
          'success'
        )
      })
     
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'El cliente no se borro',
        'error'
      )
    }
  })

  }

}
