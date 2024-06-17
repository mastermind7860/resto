import { useRouter } from "next/navigation";
import { useState } from "react"

const ResturantLogin = ()=>{
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState(false);
    const router=useRouter();
    const loginHandle=async()=>{
        console.log(email,password)
        if(!email||!password){
            setError(true);
            return false
        }
        else{
            setError(false);
        }
     
        let response=await fetch("http://localhost:3000/api/resturant",
            {
                method: "POST",
                body: JSON.stringify({email,password,login:true})
            })
            response=await response.json();
            if(response.success){
                alert("Login successfull")
                const {result}=response;
                delete result.password;
                localStorage.setItem("resturantUser",JSON.stringify(result))
                router.push("/resturant/dashboard")
    
            }
    }
   
    return(
        <>
            <h3>Resturant Login</h3>
            <div className="button-wrapper">
                <input type="text" placeholder="input email address" className="input-field" value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
            </div>
            {
                error&&!email &&<p className="error-message">Please fill all the fields</p>
            }
            <div className="button-wrapper">
                <input type="password" placeholder="input password " className="input-field" value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
            </div>
            {
                error&&!password &&<p className="error-message">Please fill all the fields</p>
            }
            <div className="button-wrapper">
                <button onClick={loginHandle} className="button">Login</button>
            </div>
        </>
    )
}
export default ResturantLogin