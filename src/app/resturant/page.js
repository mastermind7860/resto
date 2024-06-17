'use client'
import { useState } from "react"
import ResturantLogin from "../_component/resturantLogin"
import ResturantSignup from "../_component/resturantSignup"
import ResturantHeader from "../_component/resturantHeader"
import './style.css'
import ResturantFooter from "../_component/resturantFooter"

const Resturant = ()=>{
    const [login,setLogin]=useState(true)
    const hello = ()=>{
        setLogin(!login)
    }
  return(
    <>
   <div className="container">
    <ResturantHeader/>
        <h1>Resturant login and SignUp Page</h1>
        {
            login?<ResturantLogin/>:<ResturantSignup/>
        }

        <div>
        <button className="button-link" onClick={hello}>
                {
                    login?"Do Not Have Account?Signup":" Already Have An Account ? Login"
                }
            
            </button>
        </div>
   </div>
   <ResturantFooter/>
    </>
  )
}
export default Resturant