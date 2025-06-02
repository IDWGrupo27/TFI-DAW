import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Encuesta } from "./entities/encuestas.entity";
import { Pregunta } from "./entities/pregunta.entity";
import { Opcion } from "./entities/opcion.entity";
import { EncuestasController } from './controllers/encuestas.controller';
import { EncuestasService } from "./services/encuestas.service";
import { Respuesta } from "./entities/respuestas.entity";
import { Respuesta_opciones } from "./entities/respuesta-opciones.entity";
import { Respuesta_abierta } from "./entities/respuestas-abiertas.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Encuesta, Pregunta, Opcion, Respuesta, Respuesta_opciones, Respuesta_abierta])],
    controllers:[EncuestasController],
    providers:[EncuestasService]
})

export class EncuestasModule{
    constructor() {
    }
}