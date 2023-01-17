import ItemType from "models/ItemType.enum";
import { SeedCreateItemDto } from "src/item/dto/seed-create-item.dto";

export const items:SeedCreateItemDto[] = [
    {
      name: "account steam with 2 games(unplayed)",
      price: 12,
      description: "Dali's account ", 
      storeid: 1, 
      userEmail: "user@test.test",
      type:ItemType.account,
      gameIds:[3,4,7,7]
    },
    {
      name: "selling my 10 years epic games account (i need money)",
      price: 12,
      description: "title clear", 
      storeid: 2, 
      userEmail: "admin@test.test",
      type:ItemType.gameKey,
      gameIds:[5]
    },
    {
      name: "account steam for sale",
      price: 12,
      description: "hello ", 
      storeid: 4, 
      userEmail: "user@test.test",
      type:ItemType.account,
      gameIds:[3,4]
    },
    {
      name: "selling my epic games account (fortnite skins from battle pass 1)",
      price: 12,
      description: "title clear", 
      storeid: 3, 
      userEmail: "admin@test.test",
      type:ItemType.gameKey,
      gameIds:[1]
    },
    {
      name: "steam account with cs go stickers and 1200 hours of gameplay , 10 years of service medal and prime",
      price: 640,
      description: "title clear", 
      storeid: 1, 
      userEmail: "admin@test.test",
      type:ItemType.account,
      gameIds:[6,12,7,5,2]
    },
    {
      name: "origin account for sale",
      price: 12,
      description: "title clear", 
      storeid: 3, 
      userEmail: "admin@test.test",
      type:ItemType.gameKey,
      gameIds:[1]
    },
    {
      name: "valorant account with prime vandal",
      price: 1,
      description: "title clear", 
      storeid: 4, 
      userEmail: "admin@test.test",
      type:ItemType.account,
      gameIds:[30]
    },
    {
      name: "epic games account with many many fortnite skins",
      price: 40,
      description: "title clear", 
      storeid: 2, 
      userEmail: "admin@test.test",
      type:ItemType.gameKey,
      gameIds:[1]
    },
    {
      name: "origin account for sale",
      price: 500,
      description: "title clear", 
      storeid: 3, 
      userEmail: "admin@test.test",
      type:ItemType.account,
      gameIds:[1,2,3,4,5]
    },
    {
      name: "im selling my passed brother account, it has multiple new never played games",
      price: 420,
      description: "title clear", 
      storeid: 1, 
      userEmail: "admin@test.test",
      type:ItemType.account,
      gameIds:[1,10,12,7,8]
    },
    {
      name: "steam account for free",
      price: 0,
      description: "title clear", 
      storeid: 2, 
      userEmail: "admin@test.test",
      type:ItemType.gameKey,
      gameIds:[13,16,5,4]
    },
  ];