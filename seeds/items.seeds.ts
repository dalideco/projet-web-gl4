import ItemType from "models/ItemType.enum";
import { SeedCreateItemDto } from "src/item/dto/seed-create-item.dto";

export const items:SeedCreateItemDto[] = [
    {
      price: 12,
      description: "hello ", 
      storeid: 1, 
      userEmail: "user@test.test",
      type:ItemType.account,
      gameIds:[3,4]
    },
    {
      price: 12,
      description: "title clear", 
      storeid: 2, 
      userEmail: "admin@test.test",
      type:ItemType.account,
      gameIds:[5,6,1,2,3]
    },
    {
      price: 12,
      description: "hello ", 
      storeid: 4, 
      userEmail: "user@test.test",
      type:ItemType.account,
      gameIds:[3,4]
    },
    {
      price: 12,
      description: "title clear", 
      storeid: 3, 
      userEmail: "admin@test.test",
      type:ItemType.account,
      gameIds:[1,2]
    },
    {
      price: 12,
      description: "title clear", 
      storeid: 3, 
      userEmail: "admin@test.test",
      type:ItemType.account,
      gameIds:[1,2]
    },
    {
      price: 12,
      description: "title clear", 
      storeid: 3, 
      userEmail: "admin@test.test",
      type:ItemType.account,
      gameIds:[1,2]
    },
    {
      price: 12,
      description: "title clear", 
      storeid: 3, 
      userEmail: "admin@test.test",
      type:ItemType.account,
      gameIds:[1,2]
    },
    {
      price: 12,
      description: "title clear", 
      storeid: 3, 
      userEmail: "admin@test.test",
      type:ItemType.account,
      gameIds:[1,2]
    },
    {
      price: 12,
      description: "title clear", 
      storeid: 3, 
      userEmail: "admin@test.test",
      type:ItemType.account,
      gameIds:[1,2]
    },
    {
      price: 12,
      description: "title clear", 
      storeid: 3, 
      userEmail: "admin@test.test",
      type:ItemType.account,
      gameIds:[1,2]
    },
    {
      price: 12,
      description: "title clear", 
      storeid: 3, 
      userEmail: "admin@test.test",
      type:ItemType.gameKey,
      gameIds:[1]
    },
  ];