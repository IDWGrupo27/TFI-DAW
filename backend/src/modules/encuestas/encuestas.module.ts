import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Encuesta } from "./entities/encuestas.entity";
import { Pregunta } from "./entities/pregunta.entity";
import { Opcion } from "./entities/opcion.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Encuesta, Pregunta,Opcion])],
    controllers:[],
    providers:[]
})

export class EncuestasModule{
    
}