import { IsEmail } from "class-validator";
import { CreateItemDto } from "./create-item.dto";

export class SeedCreateItemDto extends CreateItemDto{
    @IsEmail()
    userEmail: string;
}