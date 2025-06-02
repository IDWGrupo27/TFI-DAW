import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Respuesta } from "./respuestas.entity";
import { Pregunta } from "./pregunta.entity";


@Entity({ name: 'respuestas_abiertas'})
export class Respuesta_abierta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'texto'})
    texto: string

    @ManyToOne(()=> Respuesta)
    @JoinColumn({name: 'id_respuesta'})
    @Exclude()
    respuesta: Respuesta
    
    @ManyToOne(()=> Pregunta)
    @JoinColumn({name: 'id_pregunta'})
    @Exclude()
    pregunta: Pregunta

}