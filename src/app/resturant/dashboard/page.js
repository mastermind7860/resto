"use client"
import AddFoodItems from "@/app/_component/AddFoodItems"
import FooditemList from "@/app/_component/FoodItemList"

import ResturantHeader from "@/app/_component/resturantHeader"
import { useState } from "react"

const Dashboard=() =>{
    const [addItems,setAdItems]=useState(false)
    return(
        <>
            <div>
                <ResturantHeader/>
                <button onClick={()=>{setAdItems(true)}}>Add Food Items</button>
                <button onClick={()=>{setAdItems(false)}}>Dashboard</button>
                {
                    addItems?<AddFoodItems setAdItems={setAdItems} />:
                   <FooditemList/>
                }
               
            
            </div>
         
        </>
    )
}
export default Dashboard 