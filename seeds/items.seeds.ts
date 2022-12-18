import ItemType from "models/ItemType.enum";
import { SeedCreateItemDto } from "src/item/dto/seed-create-item.dto";

export const items:SeedCreateItemDto[] = [
    {
      price: 12,
      description: "hello ", 
      storeid: 1, 
      userEmail: "user@test.test",
      type:ItemType.account
    },
    {
      price: 12,
      description: "title clear", 
      storeid: 2, 
      userEmail: "admin@test.test",
      type:ItemType.account
    }
  ];