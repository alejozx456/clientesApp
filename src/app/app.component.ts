import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientesApp';
  curso='Curso con Angular';
  profesor:string='Andres Guzman'
}
