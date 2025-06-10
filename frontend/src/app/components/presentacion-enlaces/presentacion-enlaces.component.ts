import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-presentacion-enlaces',
  imports: [
    MatCardModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './presentacion-enlaces.component.html',
  styleUrl: './presentacion-enlaces.component.css'
})
export class PresentacionEnlacesComponent implements OnInit {

  idEncuesta: string = '';
  codigoRespuesta: string = '';
  codigoResultados: string = '';

  window = window.location.origin;

  private route: ActivatedRoute = inject(ActivatedRoute);

  private router: Router = inject(Router)

  constructor() {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idEncuesta = params['id-encuesta'] || '';
      this.codigoRespuesta = params['codigo-respuesta'] || '';
      this.codigoResultados = params['codigo-resultados'] || '';

      console.log('Parámetros recibidos:', {
        idEncuesta: this.idEncuesta,
        codigoRespuesta: this.codigoRespuesta,
        codigoResultados: this.codigoResultados
      });
    })
  }

  enlaceRespuesta(): string {
    return `/respuesta?codigo=${this.codigoRespuesta}&encuesta=${this.idEncuesta}`
  }

  enlaceResultado() {
    return `/resultados?codigo=${this.codigoResultados}&encuesta=${this.idEncuesta}`
  }

  volver(): void {
    this.router.navigate(['/']);
  }

}
