"use client"
import { useState } from "react"
import CustomerHeader from "../_component/customerHeader"
import { DELIVERY_CHARGES, TAX } from "../lib/constant"

const Page=() =>{
    const [cardStorage,setCardStorages]=useState(JSON.parse(localStorage.getItem('cart')))
    const [carttIds, setCardtIds]=useState(cardStorage?()=>cardStorage.map((items)=>{
        return items._id;
      }):[]);
      const [cartData,setCartData]=useState();
    const [removeCartData,setRemoveCartData]=useState();
    const [total]=useState(()=>cardStorage.length==1?cardStorage[0].price:cardStorage.reduce((a,b)=>{
        return a.price+b.price
    }));

   
    return(
        <>
               <CustomerHeader
               />
            
             <div className="food-item-wrapper">
                {
                   cardStorage.length>0? cardStorage.map((item,index)=>{
                        return(
                            <div className="list-item" key={index}>
                                <div className="list-item-block-1"> <img style={{width:100}} src={item.img_path} alt="" /></div>
                               <div className="list-item-block-2">
                                    <div>{item.name}</div>
                                 
                                    <div className="description">{item.description}</div>
                                    
                                       <button onClick={()=>removeFromeCart(item._id)}>Remove to cart</button>
                                     
                                    
                                  
                                    
                               </div>
                               <div className="list-item-block-3">{item.price}</div>
                               
                            </div>
                        )
                    }):
                    <h4>No Food Item Added For Now</h4>
                }
             </div>
            <div className="total-wrapper">
                <div className="block-1">
                    <div className="row">
                        <span>Food Charges :</span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax :</span>
                        <span>{total*TAX/100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Changes :</span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount :</span>
                        <span>{parseInt(total)+parseInt(DELIVERY_CHARGES)+(total*TAX/100)}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button>Order Now</button>
                </div>
             </div>
            
        </>
    )
}
export default Page