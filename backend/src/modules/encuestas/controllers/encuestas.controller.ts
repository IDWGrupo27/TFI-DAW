import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { EncuestasService } from '../services/encuestas.service';
import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';

@Controller('encuestas')
export class EncuestasController {
  constructor(private readonly encuestasService: EncuestasService) {}

  @Get()
  getEncuestas() {
    return this.encuestasService.getEncuestas();
  }

  @Post()
  createEncuesta(@Body() dto: CreateEncuestaDTO) {
    return this.encuestasService.createEncuesta(dto);
  }

  @Put()
  updateEncuesta(@Body() dto: CreateEncuestaDTO) {
    return this.encuestasService.updateEncuesta(dto);
  }
}
