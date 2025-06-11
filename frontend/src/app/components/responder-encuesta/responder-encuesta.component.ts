import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EncuestasService } from '../../services/encuestas.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-responder-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './responder-encuesta.component.html',
  styleUrls: ['./responder-encuesta.component.css']
})
export class ResponderEncuestaComponent implements OnInit {

  encuesta: any = null;
  formulario!: FormGroup;

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private encuestasService = inject(EncuestasService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const codigo = params.get('codigo');

      if (id && codigo) {
        console.log('ID recibido:', id, 'Código recibido:', codigo);

        this.encuestasService.obtenerEncuestaPorIdYCodigo(id, codigo).subscribe({
          next: (data) => {
            console.log('Encuesta recibida:', data);
            this.encuesta = data;
            this.crearFormulario();
          },
          error: (err) => {
            console.error('Error al obtener la encuesta', err);
          }
        });
      }
    });
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      respuestas: this.fb.array([])
    });

    const respuestasArray = this.formulario.get('respuestas') as FormArray;

    this.encuesta.preguntas.forEach((pregunta: any) => {
      if (pregunta.tipo === 'ABIERTA') {
        respuestasArray.push(this.fb.control('', Validators.required));
      } else if (
        pregunta.tipo === 'OPCION_MULTIPLE_SELECCION_SIMPLE' ||
        pregunta.tipo === 'OPCION_MULTIPLE_SELECCION_MULTIPLE'
      ) {
        if (pregunta.tipo === 'OPCION_MULTIPLE_SELECCION_SIMPLE') {
          respuestasArray.push(this.fb.control('', Validators.required));
        } else {
          const opcionesFG = this.fb.group({});
          pregunta.opciones.forEach((opcion: any) => {
            opcionesFG.addControl(opcion.id.toString(), this.fb.control(false));
          });
          respuestasArray.push(opcionesFG);
        }
      }
    });
  }

  get respuestas() {
    return this.formulario.get('respuestas') as FormArray;
  }

  onSubmit() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const respuestaPayload = {
      respuestas: [] as any[]
    };

    this.encuesta.preguntas.forEach((pregunta: any, index: number) => {
      const respuesta = this.respuestas.at(index).value;
      if (pregunta.tipo === 'ABIERTA') {
        respuestaPayload.respuestas.push({
          preguntaId: pregunta.id,
          texto: respuesta
        });
      } else if (pregunta.tipo === 'OPCION_MULTIPLE_SELECCION_SIMPLE') {
        respuestaPayload.respuestas.push({
          preguntaId: pregunta.id,
          opcionId: respuesta
        });
      } else if (pregunta.tipo === 'OPCION_MULTIPLE_SELECCION_MULTIPLE') {
        const opcionesElegidas = Object.entries(respuesta)
          .filter(([_, seleccionado]) => seleccionado)
          .map(([opcionId, _]) => Number(opcionId));
        respuestaPayload.respuestas.push({
          preguntaId: pregunta.id,
          opcionIds: opcionesElegidas
        });
      }
    });

    console.log('Payload para enviar:', respuestaPayload);
    // acá llamarías al servicio para guardar la respuesta
  }
}
