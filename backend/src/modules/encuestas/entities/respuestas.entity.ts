import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Encuesta } from "./encuestas.entity";
import { Exclude } from "class-transformer";
import { Respuesta_opciones } from "./respuesta-opciones.entity";
import { Respuesta_abierta } from "./respuestas-abiertas.entity";


@Entity({ name: 'respuestas'})
export class Respuesta {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Encuesta)
    @JoinColumn({name: 'id_encuesta'})
    @Exclude()
    encuesta: Encuesta

    @OneToMany(() => Respuesta_opciones, (respuesta_opciones) => respuesta_opciones.respuesta)
    respuestas_opciones: Respuesta_opciones[];

    @OneToMany(() => Respuesta_abierta, (respuesta_abierta) => respuesta_abierta.respuesta)
    respuestas_abierta: Respuesta_abierta[];

}