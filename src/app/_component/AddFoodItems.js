import { useState } from "react"


const AddFoodItems = (props) => {
    const [foodName, setFoodName] = useState("");
    const [foodPrice, setFoodPrice] = useState("");
    const [foodPath, setFoodPath] = useState("");
    const [foodDesc, setFoodDesc] = useState("");
    const [error, setError] = useState(false);

    const addFoodItemHandler = async () => {
        if (!foodName || !foodPrice || !foodPath || !foodDesc) {
            setError(true);
            return false;
        } else {
            setError(false);
        }

        let restro_id;
        const resturantData = JSON.parse(localStorage.getItem("resturantUser"));

        if (resturantData) {
            restro_id = resturantData._id;
        }

        try {
            const response = await fetch("http://localhost:3000/api/resturant/food", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: foodName,
                    price: foodPrice,
                    img_path: foodPath,
                    description: foodDesc,
                    resto_id: restro_id
                })
            });

            const responseData = await response.json();
            console.log(responseData.success);

            if (responseData.success) {
                alert("Food item added successfully");
                setFoodName("");
                setFoodPrice("");
                setFoodPath("");
                setFoodDesc("");
                props.setAdItems(false);

            } else {
                alert("Failed to add food item. Please try again later.");
            }
        } catch (error) {
            console.error("Error occurred while adding food item:", error);
            alert("An error occurred while adding food item. Please try again later.");
        }
    };

  


    return(
        <>

         <div className="container">
            <h3>Add New Food Items</h3>
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
                    <button onClick={addFoodItemHandler} className="button">Add Food Items</button>
                </div>
         </div>
        </>
    )
    
}
export default AddFoodItems