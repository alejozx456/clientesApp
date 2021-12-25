import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './clientes';
import { ClientesService } from './clientes.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public  cliente:Cliente= new Cliente()
  public titulo:String='Crear CLiente';
  
  constructor(private clienteService:ClientesService,private router:Router
    ,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

 // abrirCliente(cliente:Cliente){
   // console.log('algo');
    //const abrirForm=this.router.navigate(['/clientes/form'],{
      //data:cliente
   // })
  //}  
  cargarCliente():void{
    this.activatedRoute.params.subscribe(params=>{
      let id=params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente)=>
        this.cliente=cliente)
      }
    })
  }


  public create():void{
    //console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      cliente=>{
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente Guardado',`Cliente ${cliente.nombre} creado con exito`,'success')
      }
     
    )
  }
}
