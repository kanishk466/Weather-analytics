import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class CitiesDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  cities!: string[];
}