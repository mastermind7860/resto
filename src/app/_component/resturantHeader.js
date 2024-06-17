"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const { default: Link } = require("next/link")


const ResturantHeader = ()=>{
    const [details,setDetails] =useState();
    const router=useRouter();
    const pathName=usePathname();
    useEffect(()=>{
        let data=localStorage.getItem("resturantUser");
        if(!data && pathName=="/resturant/dashboard"){
            router.push("/resturant")
        }
        else if(data && pathName=="/resturant"){
            router.push("/resturant/dashboard")
        }
        else{
            setDetails(JSON.parse(data))
        }
    },[])
    const logout=()=>{
        localStorage.removeItem("resturantUser")
        router.push("/resturant")
    }
    return(
        <>
           <div className="header-wrapper">
                <div className="logo">
                    <img style={{width:100}} src="https://s.tmimgcdn.com/scr/800x500/242400/food-delivery-custom-design-logo-template-2_242476-original.png" alt="" />
                </div>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    {
                        details && details.name?
                        <>
                        <button onClick={logout}>Logout</button>
                         <li><Link href="/">Profile</Link></li>
                        </>
                       :
                        <li>
                        <Link href="/">Login/Signup</Link>
                    </li>
                    }
                   
                  
                </ul>
           </div>
        </>
    )
}
export default ResturantHeader