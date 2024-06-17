import { useRouter } from "next/navigation";
import { useState } from "react"

const ResturantSignup = ()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [c_password,setC_password]=useState('');
    const [name,settName]=useState('');
    const [city,setCity]=useState('');
    const [address,setAddress]=useState('');
    const [contact,setConatact]=useState('');
    const [error,setError]=useState(false);
    const [passwordError,setPasswordError]=useState(false);
    const router=useRouter();
    const  handleSignUp=async()=>{
       
        if(password!==c_password){
            setPasswordError(true)
            return false
            
        }
        else{
            setPasswordError(false)
        }
        if(!email||!password||!c_password ||!name||!city||!address||!contact)
            {
                setError(true)
                return false
                
            }
            else{
                setError(false)
            }
            // return false
        console.log(email);
        let response=await fetch("http://localhost:3000/api/resturant",
            {
                method: "POST",
                body: JSON.stringify({email,password,name,city,address,contact})
            })
            response=await response.json();
        
        if(response.success){
            alert("signup successfull")
            const {result}=response;
            delete result.password;
            localStorage.setItem("resturantUser",JSON.stringify(result))
            router.push("/resturant/dashboard")

        }
    }
    return(
        <>
            <h1>Resturant Signup </h1>
            <div className="button-wrapper">
                <input type="email" placeholder="Enter your Email " className="input-field" value={email} onChange={(event)=>setEmail(event.target.value)}/>
            </div>
            {
                error && !email && <span style={{color:"red"}}>Email Is require</span>
            }
            <div className="button-wrapper">
                <input type="password" placeholder="input password " className="input-field" value={password} onChange={(event)=>setPassword(event.target.value)}/>
            </div>
            {
                     error && !password && <span style={{color:"red"}}>password Is require</span> 
            }
            {

           
                passwordError && <span style={{color:"red"}}>password does not match</span>
            }

            <div className="button-wrapper">
                <input type="password" placeholder="input confirm password " className="input-field" value={c_password} onChange={(event)=>setC_password(event.target.value)}/>
            </div>
            {
                error && !c_password && <span style={{color:"red"}}>password Is require</span>
            }
            {
                passwordError && <span style={{color:"red"}}>password does not match</span>
            }
            <div className="button-wrapper">
                <input type="text" placeholder="input resturant name" className="input-field" value={name} onChange={(event)=>settName(event.target.value)}/>
            </div>
            {
                error && !name && <span style={{color:"red"}}>resturant name Is require</span>
            }
            <div className="button-wrapper">
                <input type="text" placeholder="input city" className="input-field" value={city} onChange={(event)=>setCity(event.target.value)}/>
            </div>
            {
                error && !city && <span style={{color:"red"}}>city Is require</span>
            }
            <div className="button-wrapper">
                <input type="text" placeholder="input full address" className="input-field" value={address} onChange={(event)=>setAddress(event.target.value)}/>
            </div>
            {
                error && !address && <span style={{color:"red"}}>resturant address Is require</span>
            }
            <div className="button-wrapper">
                <input type="text" placeholder="input contact" className="input-field" value={contact} onChange={(event)=>setConatact(event.target.value)}/>
            </div>
            {
                error && !contact && <span style={{color:"red"}}>resturant contact Is require</span>
            }


            <div className="button-wrapper">
                <button className="button" onClick={handleSignUp}>SignUp</button>
            </div>
        </>
    )
}
export default ResturantSignup