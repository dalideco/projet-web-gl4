import { IsNumber, IsString } from 'class-validator';
import ItemType from 'models/ItemType.enum';
export class CreateItemDto {
  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsString()
  type: ItemType;

  @IsNumber()
  storeid: number;
}
