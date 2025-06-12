import { Body, Controller, Get, Post, Put,Param } from '@nestjs/common';
import { EncuestasService } from '../services/encuestas.service';
import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';

@Controller('encuestas')
export class EncuestasController {
  constructor(private readonly encuestasService: EncuestasService) {}

  @Get()
  getEncuestas(@Query('publicas') publicas?: boolean) {
    return this.encuestasService.getEncuestas(publicas);
  }

  @Post()
  async createEncuesta(@Body() dto: CreateEncuestaDTO): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    return await this.encuestasService.createEncuesta(dto);
  }

  @Put()
  updateEncuesta(@Body() dto: CreateEncuestaDTO) {
    return this.encuestasService.updateEncuesta(dto);
  }

  @Get(':id/por-codigo/:codigoRespuesta')
async getEncuestaPorIdYCodigo(
  @Param('id') id: number,
  @Param('codigoRespuesta') codigoRespuesta : string,
) {
  return this.encuestasService.getEncuestaPorIdYCodigo(id, codigoRespuesta );
}

}
