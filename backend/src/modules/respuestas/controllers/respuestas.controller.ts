import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RespuestasService } from '../services/respuestas.service';
import { CreateRespuesta } from '../dtos/create-respuesta.dto';

@Controller('respuestas-encuesta')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}

  @Get()
  getRespuestas() {
    return this.respuestasService.getRespuestas();
  }

  @Get(':id')
  getRespuestasByEncuestaId(id: number) {
    return this.respuestasService.getRespuestasByEncuestaId(id);
  }

  @Post(':idEncuesta')
  creatRespuesta(
    @Body() respuestas: CreateRespuesta[],
    @Param('idEncuesta') idEncuesta: number,
  ) {
    return this.respuestasService.createRespuesta(respuestas, idEncuesta);
  }
}
