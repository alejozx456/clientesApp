import { Cliente } from "src/app/clientes/clientes";
import { DetalleVenta } from "./detalle-venta";

export class Venta {
    id:number=0;
    descripcion:string;
    observacion:string;
    items:Array<DetalleVenta>=[];
    cliente:Cliente;
    total:number;
    createAt:string;

    calcularGranTotal():number{
        this.total=0;
        this.items.forEach((item:DetalleVenta)=>{
            this.total+=this.total+item.calcularImporte();
        });
        return this.total;
        
    }
    calcularIva():number{
        this.total=0;
        this.items.forEach((item:DetalleVenta)=>{
            this.total+=this.total+item.calcularImporte()*0.12;
        });
        return this.total;
        
    }
    calcularFinal():number{
        this.total=0;
        this.items.forEach((item:DetalleVenta)=>{
            this.total+=this.total+item.calcularImporte()+this.calcularIva()
        });
        return this.total;
    }
}
