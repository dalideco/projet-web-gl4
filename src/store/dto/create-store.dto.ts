import { isEmpty, IsNotEmpty, isNotEmpty, IsString } from "class-validator";
import { Item } from "entities/item.entity";
export class CreateStoreDto {

    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    image: string;

}
