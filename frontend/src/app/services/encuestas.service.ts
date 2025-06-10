import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CreateEncuestaDTO } from "../interfaces/create-encuesta.dto";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EncuestasService {
    private httpClient = inject(HttpClient);
    
    crearEncuesta(dto: CreateEncuestaDTO): Observable<{
        id: number;
        codigoRespuesta: string;
        codigoResultados: string;
    }> {
        return this.httpClient.post<{
            id: number;
            codigoRespuesta: string;
            codigoResultados: string;
        }>('/api/v1/encuestas', dto)
    };

}