import "../styles/Budget.css";
import Sidebar from "./Sidebar";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from "react";


const ProgressPie = () => {
    const data = [
        { name: 'Spent', value: 500},
        {name: 'Total', value:3000}
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return(
    <PieChart width={1000} height={180}>
    <Pie
        data={data}
        cx= "50%"
        cy={160}
        startAngle={180}
        endAngle={0}
        innerRadius={130}
        outerRadius={150}
        fill="#8884d8"
        paddingAngle={1}
        dataKey="value"
    >
        {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
    </Pie>
    </PieChart>
    )
};



const AddCategoryForm = () => {
    const [state, setState] = useState("goal");
    const [category, setCategory] = useState("");

    const optionHandler = (event) => {
        const selectedState = event.target.value;
        setState(selectedState);
    };

    const newCategory = (event) => {
        setCategory(event.target.value);
    };

    const exitHandler = () => {
        var popupForm = document.getElementById("category-form-background");
        popupForm.style.display = 'none';
    };

    const categoryHandler = (event) => {
        event.preventDefault();
        const form = document.querySelector("#category-adder");
        const categoryData = new FormData(form);
        fetch ("/add-category", {
            method: 'POST',
            body: categoryData,
            credentials: 'include',
        });
        var popupForm = document.getElementById("category-form-background");
        popupForm.style.display = 'none';
    };

    const goalHandler = (event) => {
        event.preventDefault();
        const goalData = new FormData(event.target);

    }
  
    return (
        <div id = "category-form-background">
            <div id="category-form-container">
            <div className="format-option-pair">
                <label htmlFor="choices" className = "budget-popup-label" id ="add-a" style = {{marginTop: "5%"}}>Add</label>
                <select name="budget-popup" className="choices" id = "choices" onChange={optionHandler}>
                    <option value="goal">Goal</option>
                    <option value="category">Category</option>
                </select>
            </div>

            { state === "goal" && (
            //     <div>
            // //     <form > 
            // //     {/* //onSubmit={goalHandler}> */}
            // //     <div className="format-option-pair">
            // //       <label htmlFor="expenseCap" className="budget-popup-label">Expense Cap:</label>
            // //       <input type="text" id="cap" name="expenseCap" />
            // //     </div>
        
            // //     <div className="format-option-pair">
            // //       <label htmlFor="cap-categories" className="budget-popup-label">Category</label>
            // //       <select name="category" className="choices" id="cap-categories">
            // //         <option value="groceries">Groceries</option>
            // //         <option value="bill">Bill</option>
            // //         <option value="food">Food</option>
            // //       </select>
            // //     </div>
        
            // //     <div className="popup-submit-div">
            // //       <input type="submit" value="Submit" className="popup-submit" />
            // //       <button type="button" className="popup-exit" onClick={exitHandler}>Exit</button>
            // //     </div>
            // //   </form>
                <div>
                    <div className="format-option-pair">
                        <label htmlFor="expenseCap" className = "budget-popup-label">Expense Cap:</label>
                        <input type="text" id="expenseCap" name="expenseCap" />
                    </div>

                    <div className="format-option-pair">
                        <label htmlFor="cap-categories" className = "budget-popup-label">Category</label>
                        <select name="cap-categories" className = "choices" id="cap-categories">
                            <label htmlFor="choices">Add a </label>
                            <option value = "groceries"> Grocreries</option>
                            <option value = "bill"> Bill</option>
                            <option value = "food"> Food</option>
                        </select>
                    </div>
                    <div className="popup-submit-div">
                    <input type="submit" value="Submit" className = "popup-submit"/>
                    <button type = "button" value = "quit" className = "popup-exit" onClick = {exitHandler}>Exit</button>
                    </div>
                </div>
                
            )}

            
            {state === "category" && (
            <form id = "category-adder">
                <div className="format-option-pair">
                    <label htmlFor="category-input" className = "budget-popup-label">Category Name:</label>
                    <input type = "text" id = "category-input" name = "category-input" onChange={newCategory} required></input>
                </div>
                <div className="popup-submit-div">
                    <button type="submit" value="Submit" className = "popup-submit" onClick={categoryHandler}>Submit</button>
                    <button type = "button" value = "quit" className = "popup-exit" onClick = {exitHandler}>Exit</button>
                </div>
            </form>
            )}
        </div>
        </div>
    );
};

const CategoryProgressBar = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        fetch("/display-categories", {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            return response.json(); // Resolve the promise to get JSON data
        })
        .then(data => {
            setCategories(data.categories); // Use the resolved JSON data
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div>
            {categories.map((category, index) => (
                <div key={index} className="budget-category">
                    <p>{category}</p>
                    <div className="total-bar">
                        <div className="progress-bar">
                            <br />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
    
const BudgetCategories = () => {
    const popupForm = () => {
        var popupForm = document.getElementById("category-form-background");
        if (popupForm.style.display = 'none'){
            popupForm.style.display = 'block';
        }
    }

    return(
        <div className="budget-summary">

           <AddCategoryForm />
            <div className="budget-category-header">
                <h1> Budget by Category</h1>
                <div className = "category-button">
                    <button id = "add-category" onClick = {popupForm}>Add Category</button>
                </div>
            </div>

            <div id="categories">
                <CategoryProgressBar />
            </div>
        </div>
    )
};



const Budget = () =>{
    const [data, setData] = useState({});
    useEffect(() => {
        fetch("http://127.0.0.1:5000/")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                console.log(data);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);


    return (
        <div className = "budget-page">
            <Sidebar />
            <div className = "budget-body sidebar-page">
                <div className="progress-tracker">
                    <h1 className = "goals"> Goal: Spend Less than 1k </h1>
                    <ResponsiveContainer>
                        <ProgressPie />
                    </ResponsiveContainer>
                </div>
                <BudgetCategories />
            </div>
            
         </div>
    );
};

export {ProgressPie, BudgetCategories, AddCategoryForm, CategoryProgressBar};
export default Budget;
