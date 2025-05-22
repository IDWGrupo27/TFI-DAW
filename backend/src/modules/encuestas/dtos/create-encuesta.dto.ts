import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreatePreguntaDTO } from "./create-pregunta.dto";
import { Type } from "class-transformer";

export class CreateEncuestaDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({type: [CreatePreguntaDTO]})
    @IsArray()
    @IsNotEmpty()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreatePreguntaDTO)
    preguntas: CreatePreguntaDTO[];
}