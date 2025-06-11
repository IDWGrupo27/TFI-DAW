import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateEncuestaDTO } from '../interfaces/create-encuesta.dto';
import { Observable } from 'rxjs';

interface createEncuestaResponse {
  id: number;
  codigoRespuesta: string;
  codigoResultados: string;
}

interface EncuestaPublica {
  id: number;
  nombre: string;
  codigoRespuesta: string;
  codigoResultados: string;
  preguntas: any[];
}

@Injectable({ providedIn: 'root' })
export class EncuestasService {
  private httpClient = inject(HttpClient);

  getEncuestasPublicas(): Observable<EncuestaPublica[]> {
    return this.httpClient.get<EncuestaPublica[]>('/api/v1/encuestas/publicas');
  }

  crearEncuesta(dto: CreateEncuestaDTO): Observable<createEncuestaResponse> {
    return this.httpClient.post<createEncuestaResponse>(
      '/api/v1/encuestas',
      dto,
    );
  }
}
