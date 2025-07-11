import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { Respuesta_opciones } from '../../respuestas/entitis/respuesta-opciones.entity';

@Entity({ name: 'opciones' })
export class Opcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @Column()
  numero: number;

  @ManyToOne(() => Pregunta)
  @JoinColumn({ name: 'id_pregunta' })
  @Exclude()
  pregunta: Pregunta;

  @OneToMany(() => Respuesta_opciones, (respuesta_opciones) => respuesta_opciones.opcion)
  respuestas_opciones: Respuesta_opciones[];
  
}
