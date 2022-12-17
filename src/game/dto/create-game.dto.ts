import { isEmpty, IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateGameDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    image: string;
}
