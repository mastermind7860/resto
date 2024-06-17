import { connectionStr } from "@/app/lib/db"
import { RestaurantOwner } from "@/app/lib/resturantModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"




export async function GET(request){
    let queryParams = request.nextUrl.searchParams;
  
    let filter = {};

    if (queryParams.get('location')) {
        let city = queryParams.get('location');
        filter = { city: { $regex: new RegExp(city, 'i') } };
    } else if (queryParams.get('resturant')) {
        let name = queryParams.get('resturant');
        filter = {name:{ $regex: new RegExp(name, 'i')} };
    }

    await mongoose.connect(connectionStr);
    let result = await RestaurantOwner.find(filter);
    return NextResponse.json({ success: true, result });
}
