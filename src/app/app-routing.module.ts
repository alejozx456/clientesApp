import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { FormComponent } from './clientes/form.component';
import { DirectivaComponent } from './directiva/directiva.component';

const routes: Routes = [
  {path:'clientes',component:ClientesComponent},
  {path:'clientes/page/:page',component:ClientesComponent},
  {path:'directivas',component:DirectivaComponent},
  {path:'clientes/form',component:FormComponent},
  {path:'clientes/form/:id',component:FormComponent},
  {path:'clientes/ver/:id',component:DetalleComponent},
  {path:'',redirectTo:'/clientes',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
