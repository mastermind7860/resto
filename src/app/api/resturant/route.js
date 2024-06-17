import { connectionStr } from "@/app/lib/db";
import {  RestaurantOwner } from "@/app/lib/resturantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){mongoose.connect(connectionStr)
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.log('MongoDB connection error:'));

    const data=await resturantSchema.find()
    console.log(data)
    return NextResponse.json({result:true})
  
}
export async function POST(request){

  let payload=await request.json();
  let result;
  let success = false;
  
  await mongoose.connect(connectionStr,{useNewUrlParser:true})
  if(payload.login){
    result=await RestaurantOwner.findOne({email:payload.email,password:payload.password})
    if(result){
      success=true;
    }
  }
  else{
    const resturant=new RestaurantOwner(payload);
    const result=await resturant.save()
    if(result){
      success=true;
    }
  }
 
  return NextResponse.json({result,success})
}