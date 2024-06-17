import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const FooditemList =()=>{
    const [foodItemList,setFoodItemList]=useState();
    const route=useRouter();
    useEffect(()=>{
        loadFoodItems();
    },[]);
    const loadFoodItems=async()=>{
        const resturantdata=JSON.parse(localStorage.getItem("resturantUser"));
        const resto_id=resturantdata._id;
       let response=await fetch("http://localhost:3000/api/resturant/food/"+resto_id);
       response=await response.json();
       if(response.success){
        setFoodItemList(response.result)
       }
       else{
        alert("food item list not found")
       }

    }
    const deleteFoodItemList = async (id) => {
        console.log(id);
        try {
            let response = await fetch(`http://localhost:3000/api/resturant/food/${id}`, {
                method: "DELETE"
            });
           
            let responseData = await response.json(); // Corrected parsing JSON response
            console.log(responseData.success);
            if (responseData.success) {
                alert("food item list deleted");
                loadFoodItems();
            } else {
                alert("food item list not deleted");
            }
        } catch (error) {
            console.error("Error deleting food item list:", error);
            // Handle error here, e.g., show an error message to the user
        }
    }

    return(
        <div>
            <h1>Food Item List2</h1>
            <table>
                <thead>
                <tr>
                    <th>S.N</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Operation</th>
                </tr>
                </thead>
                <tbody>
                    {
                        foodItemList && foodItemList.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td><img src={item.img_path} alt="" /></td>
                                    <td><button onClick={()=>{deleteFoodItemList(item._id)}}>delete</button>
                                    <button onClick={()=>{route.push("dashboard/"+item._id)}}>Update</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            
              
            </table>
        </div>
    )
} 
export default FooditemList