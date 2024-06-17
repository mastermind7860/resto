"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"


const EditFoodItems = (props) => {
 
    const [foodName, setFoodName] = useState("");
    const [foodPrice, setFoodPrice] = useState("");
    const [foodPath, setFoodPath] = useState("");
    const [foodDesc, setFoodDesc] = useState("");
    const [error, setError] = useState(false);
    const router=useRouter();

    useEffect(()=>{
        handleLoadFoodItem();
    },[])
    const handleLoadFoodItem=async() => {
        let response = await fetch("http://localhost:3000/api/resturant/food/edit/"+props.params.id);
        let responseData = await response.json();
        if(responseData.success){
            setFoodName(responseData.result.name)
            setFoodPrice(responseData.result.price)
            setFoodPath(responseData.result.img_path)
            setFoodDesc(responseData.result.description)
        }
  
    }
 
    
        const editFoodItemHandler = async () => {
            
            if (!foodName || !foodPrice || !foodPath || !foodDesc) {
                setError(true);
                return false;
            } else {
                setError(false);
            }
            console.log(foodName,foodPrice,foodPath,foodDesc);
            let response = await fetch("http://localhost:3000/api/resturant/food/edit/"+props.params.id,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:foodName,
                    price:foodPrice,
                    img_path:foodPath,
                    description:foodDesc,
                })
            });
            let responseData = await response.json();
            if(responseData.success){
                alert("Food Item Updated Successfully")
                router.push("../dashboard/")
            }


        }

  
   

    return(
        <>

         <div className="container">
            <h3>Edit Food Items</h3>
                <div className="button-wrapper">
                    <input type="text" placeholder="input food name" className="input-field" value={foodName} onChange={(event)=>{setFoodName(event.target.value)}}/>
                </div>
                {
                    error && !foodName && <p className="error-message">All fields are required</p>
                }
                <div className="button-wrapper">
                    <input type="text" placeholder="input food price" className="input-field" value={foodPrice} onChange={(event)=>{setFoodPrice(event.target.value)}}/>
                </div>
                {
                    error &&!foodPrice && <p className="error-message">All fields are required</p>
                }
                <div className="button-wrapper">
                    <input type="text" placeholder="input path" className="input-field" value={foodPath} onChange={(event)=>{setFoodPath(event.target.value)}}/>
                </div>
                {
                    error &&!foodPath && <p className="error-message">All fields are required</p>
                }
                <div className="button-wrapper">
                    <input type="text" placeholder="input food description" className="input-field" value={foodDesc} onChange={(event)=>{setFoodDesc(event.target.value)}}/>
                </div>
                {
                    error &&!foodDesc && <p className="error-message">All fields are required</p>
                }
                <div className="button-wrapper">
                    <button onClick={editFoodItemHandler} className="button">Edit Food Items</button>
                </div>
                <div className="button-wrapper">
                    <button  onClick={()=>{router.push('../dashboard')}} className="button">Back To Food Items List</button>
                </div>
         </div>
        </>
    )
    

}
export default EditFoodItems