import { connectionStr } from "@/app/lib/db";
import { FoodOwner } from "@/app/lib/foodModel";
import { RestaurantOwner } from "@/app/lib/resturantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {

    const id = content.params.id;
    await mongoose.connect(connectionStr);
    const details=await RestaurantOwner.findOne({_id:id});
    const foodItems=await FoodOwner.find({resto_id:id});

    return NextResponse.json({success:true,details,foodItems});
}