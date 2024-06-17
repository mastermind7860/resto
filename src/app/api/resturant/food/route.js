import { connectionStr } from "@/app/lib/db";
import { FoodOwner } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload=await request.json();
    await mongoose.connect(connectionStr);
    const food=new FoodOwner(payload);
    const result=await food.save();
    return NextResponse.json({result,success:true})

}