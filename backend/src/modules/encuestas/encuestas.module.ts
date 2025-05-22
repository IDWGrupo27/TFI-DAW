import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Encuesta } from "./entities/encuestas.entity";
import { Pregunta } from "./entities/pregunta.entity";
import { Opcion } from "./entities/opcion.entity";
import { EncuestasController } from './controllers/encuestas.controller';
import { EncuestasService } from "./services/encuestas.service";

@Module({
    imports: [TypeOrmModule.forFeature([Encuesta, Pregunta, Opcion])],
    controllers:[EncuestasController],
    providers:[EncuestasService]
})

export class EncuestasModule{
    constructor() {
    }
}