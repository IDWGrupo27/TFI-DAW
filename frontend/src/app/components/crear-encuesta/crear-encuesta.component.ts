import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-encuesta',
  templateUrl: './crear-encuesta.component.html',
    styleUrl: './crear-encuesta.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule, // ¡Importante!
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class CrearEncuestaComponent implements OnInit {
  encuestaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.encuestaForm = this.fb.group({
      titulo: ['', Validators.required],
      preguntas: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.agregarPregunta(); // Agregar una pregunta inicial al cargar el componente
  }

  get preguntas(): FormArray {
    return this.encuestaForm.get('preguntas') as FormArray;
  }

  agregarPregunta() {
    const preguntaForm = this.fb.group({
      texto: ['', Validators.required],
      tipo: ['abierta'],
      obligatoria: [false],
      opciones: this.fb.array([])
    });
    this.preguntas.push(preguntaForm);
  }

  eliminarPregunta(index: number) {
    this.preguntas.removeAt(index);
  }

  getOpciones(preguntaIndex: number): FormArray {
    const preguntaFormGroup = this.preguntas.controls[preguntaIndex] as FormGroup;
    return preguntaFormGroup.get('opciones') as FormArray;
  }

  agregarOpcion(preguntaIndex: number) {
    this.getOpciones(preguntaIndex).push(this.fb.group({ texto: ['', Validators.required] }));
  }

  eliminarOpcion(preguntaIndex: number, opcionIndex: number) {
    this.getOpciones(preguntaIndex).removeAt(opcionIndex);
  }

  onSubmit() {
    if (this.encuestaForm.valid) {
      console.log('Formulario de encuesta:', this.encuestaForm.value);
      // Aquí iría la lógica para enviar los datos al backend
    } else {
      this.encuestaForm.markAllAsTouched();
    }
  }
}