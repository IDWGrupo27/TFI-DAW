import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRespuesta {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  texto: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  numero: number;
}
