import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Respuesta_opciones } from "src/modules/respuestas/entitis/respuesta-opciones.entity";
import { Respuesta_abierta } from "src/modules/respuestas/entitis/respuestas-abiertas.entity";
import { Repository } from "typeorm";
import { Respuesta } from "../entitis/respuestas.entity";
import { CreateRespuesta } from "../dtos/create-respuesta.dto";
import { Pregunta } from "src/modules/encuestas/entities/pregunta.entity";
import { Opcion } from "src/modules/encuestas/entities/opcion.entity";



@Injectable()
export class RespuestasService{
    constructor(
    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,
    @InjectRepository(Respuesta_opciones)
    private readonly respuestaOpcionesRepository: Repository<Respuesta_opciones>,
    @InjectRepository(Respuesta_abierta)
    private readonly respuestaAbiertaRepository: Repository<Respuesta_abierta>,
    @InjectRepository(Pregunta)
    private readonly preguntasRepository: Repository<Pregunta>,
    @InjectRepository(Opcion)
    private readonly opcionRepository: Repository<Opcion>){}

    
    async getRespuestas() {
        return this.respuestaRepository.find({
            relations: {
                encuesta: true,
                respuestas_abierta: true,
                respuestas_opciones: true
            }
        });
    }

    async getRespuestasByEncuestaId(id: number) {
        return this.respuestaRepository.findOne({
            where: {id},
            relations: {
                respuestas_abierta: true,
                respuestas_opciones: true
            }
        });
    }

    async createRespuesta(respuestas:CreateRespuesta[], idEncuesta: number) {
        const preguntas: Pregunta[] = await this.preguntasRepository.find({
            where: {encuesta: {id: idEncuesta}},
            relations: ['encuesta'],
        });

        for(const resp of respuestas){

            const pregunta: Pregunta | undefined = preguntas.find((preg) => resp.id_pregunta === preg.id);
           
           if(!pregunta){
            continue 
           }

           const idRespuesta = await this.respuestaRepository.save({
            encuesta: pregunta.encuesta
           });

           if(pregunta.tipo === 'ABIERTA') {
            const guardarRespuesta = this.respuestaAbiertaRepository.create({
                texto: resp.texto,
                respuesta: idRespuesta,
                pregunta: pregunta,
                
            });

            await this.respuestaAbiertaRepository.save(guardarRespuesta);
            
           }  

            const opciones: Opcion[] = await this.opcionRepository.find({
                where: {pregunta: {id: pregunta.id}}
            });

            for(const opcion of opciones) {
                if(resp.numero === opcion.numero)
                await this.respuestaOpcionesRepository.save({
                    respuesta: idRespuesta,
                    opcion: {id: opcion.id}                 
                });
            }
            
        }
    }
}