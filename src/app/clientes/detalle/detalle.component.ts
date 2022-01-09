import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../clientes';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente:Cliente;
  constructor(private clienteService:ClientesService,private activated:ActivatedRoute) { }

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

}
