import { InjectRepository } from '@nestjs/typeorm';
import { Encuesta } from '../entities/encuestas.entity';
import { Pregunta } from '../entities/pregunta.entity';
import { Opcion } from '../entities/opcion.entity';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { instanceToPlain } from 'class-transformer';

export class EncuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private readonly encuestaRepository: Repository<Encuesta>,
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
    @InjectRepository(Opcion)
    private readonly opcionRepository: Repository<Opcion>,
  ) {}

  async getEncuestas(isPublica?: boolean) {
    const options: FindManyOptions<Encuesta> = {
      relations: {
        preguntas: true,
      },
    };
    if (isPublica !== undefined) {
      options.where = { isPublica: isPublica };
    }
    const encuestas = await this.encuestaRepository.find(options);

    return encuestas.map((e) =>
      instanceToPlain(e, {
        groups: e.isPublica ? ['public'] : undefined,
      }),
    );
  }

  async createEncuesta(encuesta: DeepPartial<Encuesta>) {
    const newEncuesta = this.encuestaRepository.create(
      {...encuesta,
        codigoRespuesta: v4(),
        codigoResultados: v4()
      });
    const encuestaGuardada = await this.encuestaRepository.save(newEncuesta);
    
    return {
      id: encuestaGuardada.id,
      codigoRespuesta: encuestaGuardada.codigoRespuesta,
      codigoResultados: encuestaGuardada.codigoResultados
    }
  }

  async updateEncuesta(encuesta: DeepPartial<Encuesta>) {
    const existingEncuesta = await this.encuestaRepository.findOne({
      where: { id: encuesta.id },
      relations: {
        preguntas: true,
      },
    });

    if (!existingEncuesta) {
      throw new Error('Encuesta no encontrada');
    }

    Object.assign(existingEncuesta, encuesta);
    return this.encuestaRepository.save(existingEncuesta);
  }
}
