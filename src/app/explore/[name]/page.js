"use client"
import CustomerHeader from "@/app/_component/customerHeader";
import { Cardo } from "next/font/google";
import { useEffect, useState } from "react";

const Page =(props)=>{
    const [resturantDetails,setResturantDetails]=useState([]);
    const [foodDetails,setFoodDetails]=useState([]);
    const [cartData,setCartData]=useState();
    const [cardStorages, setCardStorages] = useState(JSON.parse(localStorage.getItem('cart')));
    const [carttIds, setCardtIds]=useState(cardStorages?()=>cardStorages.map((items)=>{
      return items._id;
    }):[]);
    const [removeCartData,setRemoveCartData]=useState();
    const name=props.params.name;
    useEffect(()=>{
        loadResturantDetails();
    },[]);
    console.log(carttIds);
    const loadResturantDetails=async()=>{
        const id=props.searchParams.id;
        console.log(id);
        let response = await fetch(`http://localhost:3000/api/customer/${id}`);
        let responseData = await response.json();
        if(responseData.success){
            setResturantDetails(responseData.details)
            setFoodDetails(responseData.foodItems);
        }
    }
    const addToCart = (item)=>{
        setCartData(item);
        let localCartId=carttIds;
        localCartId.push(item._id);
        setCardtIds(localCartId);
        setRemoveCartData();

    }
    const removeFromeCart=(id)=>{
        setRemoveCartData(id);
        let localIds=carttIds.filter(item => item!=id);
        setCartData();
        setCardtIds(localIds);
    }
    return(
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData}/>
             <div className="resturant-page-banner">
                <h1>{decodeURI(name)}</h1>
             </div>
             <div className="detail-wrapper">
                <h3>Contact:{resturantDetails?.contact}</h3>
                <h3>City:{resturantDetails?.city}</h3>
                <h3>Address:{resturantDetails?.address}</h3>
                <h3>Email:{resturantDetails?.email}</h3>
             </div>
             <div className="food-item-wrapper">
                {
                   foodDetails.length>0? foodDetails.map((item,index)=>{
                        return(
                            <div className="list-item" key={index}>
                                <div> <img style={{width:100}} src={item.img_path} alt="" /></div>
                               <div>
                                    <div>{item.name}</div>
                                    <div>{item.price}</div>
                                    <div className="description">{item.description}</div>
                                    {
                                        carttIds.includes(item._id)?  <button onClick={()=>removeFromeCart(item._id)}>Remove to cart</button>:
                                        <button onClick={()=>{addToCart(item)}}>Add to cart</button>
                                    }
                                  
                                    
                               </div>
                               
                            </div>
                        )
                    }):
                    <h4>No Food Item Added For Now</h4>
                }
             </div>
            
        </div>
    )
}
export default Page