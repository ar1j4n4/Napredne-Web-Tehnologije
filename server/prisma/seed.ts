import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const day = (offset=0) => { const d=new Date(); d.setUTCDate(d.getUTCDate()+offset); return new Date(`${d.toISOString().slice(0,10)}T00:00:00.000Z`); };
const at = (date: Date, h:number,m:number) => new Date(`${date.toISOString().slice(0,10)}T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00.000Z`);
async function main(){
  const today=day(0), tomorrow=day(1);
  await prisma.orderItem.deleteMany(); await prisma.order.deleteMany();
  await prisma.mealIngredient.deleteMany(); await prisma.mealAllergen.deleteMany();
  await prisma.pickupSlot.deleteMany(); await prisma.meal.deleteMany(); await prisma.ingredient.deleteMany(); await prisma.allergen.deleteMany();
  const rice=await prisma.ingredient.create({data:{name:"Riža"}}), chicken=await prisma.ingredient.create({data:{name:"Piletina"}}), pasta=await prisma.ingredient.create({data:{name:"Tjestenina"}}), tomato=await prisma.ingredient.create({data:{name:"Rajčica"}});
  const gluten=await prisma.allergen.create({data:{name:"Gluten"}});
  await prisma.meal.create({data:{name:"Pileći rižoto",description:"Pileći rižoto s povrćem",menuDate:today,availablePortions:20,active:true,ingredients:{create:[{ingredientId:rice.id},{ingredientId:chicken.id}]}}});
  await prisma.meal.create({data:{name:"Tjestenina s rajčicom",description:"Tjestenina u umaku od rajčice",menuDate:today,availablePortions:15,active:true,ingredients:{create:[{ingredientId:pasta.id},{ingredientId:tomato.id}]},allergens:{create:[{allergenId:gluten.id}]}}});
  await prisma.meal.create({data:{name:"Varivo od graha",description:"Grah s povrćem",menuDate:tomorrow,availablePortions:12,active:true}});
  for (const d of [today,tomorrow]) for (const h of [11,12,13]) await prisma.pickupSlot.create({data:{startAt:at(d,h,0),endAt:at(d,h,30),capacity:8,maxOrderSize:5,open:true}});
  console.log("Phase-2 domain seed: meals, references and pickup slots. Demo users are added by the auth PR.");
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>prisma.$disconnect());
