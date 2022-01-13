import { Venta } from "../facturas/models/venta";
import { Region } from "./region";

export class Cliente{
    id:number=0;
    nombre:string='';
    apellido:string='';
    createAt:string='';
    email:string='';
    region:Region;
    facturas: Array<Venta>=[];

}