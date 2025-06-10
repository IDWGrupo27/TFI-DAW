import { Module } from "@nestjs/common";
import { RespuestasController } from "./controllers/respuestas.controller";
import { RespuestasService } from "./services/respuestas.service";
import { Respuesta_opciones } from "./entitis/respuesta-opciones.entity";
import { Respuesta_abierta } from "./entitis/respuestas-abiertas.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Respuesta } from "./entitis/respuestas.entity";
import { Pregunta } from "../encuestas/entities/pregunta.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Respuesta, Respuesta_opciones, Respuesta_abierta, Pregunta])],
    controllers: [RespuestasController],
    providers: [RespuestasService]
})

export class RespuestasModule{
    constructor() {}
}