import { connectionStr } from "@/app/lib/db";
import { FoodOwner } from "@/app/lib/foodModel";
import { RestaurantOwner } from "@/app/lib/resturantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export  async function GET(){

    await mongoose.connect(connectionStr)
    let result=await RestaurantOwner.find();
    result=result.map((items) =>items.city.charAt(0).toUpperCase()+items.city.slice(1));
    result=[...new Set(result.map((items)=>items))]
    return NextResponse.json({success:true,result})

}