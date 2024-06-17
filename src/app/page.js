'use client'
import Image from "next/image";
import styles from "./page.module.css";
import CustomerHeader from "./_component/customerHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [location,setLocaiton] =useState([]);
  const [selectItem,setSelectItem] =useState([""]);
  const [showLocaiton,setShowLocation] =useState(false);
  const [resturant,setResturant] =useState();
  let route = useRouter();
  useEffect(()=>{
    loadLocation();
    loadReasturant();
  },[]);
  const loadLocation =async ()=>{
    let responnse = await fetch("http://localhost:3000/api/customer/location");
    responnse = await responnse.json();
    if(responnse.success){
      setLocaiton(responnse.result);

    }
  }
  const loadReasturant=async(params)=>{
    let url ="http://localhost:3000/api/customer";
    if(params?.location){
      url=url+"?location="+params.location;
    }
    else if(params?.resturant){
        url=url+"?resturant="+params.resturant
    }

    let responnse = await fetch(url);
    responnse = await responnse.json();
    if(responnse.success){
      setResturant(responnse.result);
     
    }
   
  }
  const setLocaitonHandler = (item)=>{
    setSelectItem(item);
    setShowLocation(false);
    loadReasturant({location:item});
  }
  console.log(resturant);
  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input_wrapper">
          <input value={selectItem} onClick={()=>{setShowLocation(true)}} type="text" className="select-input" placeholder="select place" />
          <ul className="location-list">
            {
             showLocaiton && location.map((item,index)=>{
                return(
                  <li onClick={()=>setLocaitonHandler(item)} key={index}>{item}</li>
                )
              })
            }
          </ul>
          <input type="text" className="search-input"
            onChange={(event)=>{loadReasturant({resturant:event.target.value})}}
          placeholder="Enter Food Or Resturant Name" />
        </div>
      </div>
      <div className="main-content">
      {
        resturant && resturant.map((item,index)=>{
          return(
            <div onClick={()=>route.push('explore/'+item.name+"?id="+item._id)} className="resturant-wrapper" key={index}>
              <div className="resturant-image-wrapper">
              <h3>  {item.name}</h3>
              <h5>contact: {item.contact}</h5>
                {/* <Image src={item.resturantImage} width={200} height={200} /> */}
              </div>
              <div className="resturant-info-wrapper">
                <h3>{item.email}</h3>
                <h3 style={{marginLeft:"30px"}}>{item.city}</h3>
                <h3 style={{marginLeft:"30px"}}>{item.address}</h3>
               
              </div>
            </div>
          )
        })
      }
      </div>
    </main>
  );
}
