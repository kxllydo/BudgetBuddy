import "../styles/Budget.css";
import Sidebar from "./Sidebar";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import React, { useState } from 'react';


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


function progressBar (width){
    const firstBar = document.createElement("div");
    firstBar.className = "progress-bar";
    firstBar.style.width = width;
    const totalBar = document.getElementsByClassName("total-bar");
    totalBar.appendChild(firstBar);
}

const BudgetCategories = () => {
    return(
        <div className="budget-summary">
            <div className="budget-category-header">
                <h1> Budget by Category</h1>
                <div className = "category-button">
                    <button id = "add-category" onclick = "addCategory()">Add Category</button>
                </div>
            </div>
     
            <div className="categories">
                <div className="budget-category">
                    <p>Food</p>
                    <div className = "total-bar">
                        <div className = "progress-bar">
                            <br></br>
                        </div>
                    </div>
                </div>
                <div className="budget-category">
                    <p>Transportation</p>
                    <div className = "total-bar">
                        <div className = "progress-bar">
                            <br></br>
                        </div>
                    </div>
                </div>
                <div className="budget-category">
                    <p>Utilities</p>
                    <div className = "total-bar">
                        <div className = "progress-bar">
                            <br></br>
                        </div>
                    </div>
                </div>
                <div className="budget-category">
                    <p>Shopping</p>
                    <div className = "total-bar">
                        <div className = "progress-bar">
                            <br></br>
                        </div>
                    </div>
                </div>
                <div className="budget-category">
                    <p>Travel</p>
                    <div className = "total-bar">
                        <div className = "progress-bar">
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


const AddCategoryForm = () => {
    const [state, setState] = useState("goal");

    const optionHandler = (event) => {
        const selectedState = event.target.value;
        setState(selectedState);
    };

    return (
        <div id="category-form-container">
            <div className="format-option-pair">
                <label htmlFor="choices" className = "budget-popup-label" id ="add-a" style = {{marginTop: "5%"}}>Add</label>
                <select name="budget-popup" className="choices" id = "choices" onChange={optionHandler}>
                    <option value="goal">Goal</option>
                    <option value="category">Category</option>
                </select>
            </div>

            { state === "goal" && (
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
                <input type="submit" value="Submit" className = "popup-submit"/>
                </div>
            )}

            
            {state == "category" && (
            <div>
                <div className="format-option-pair">
                    <label htmlFor="category-input" className = "budget-popup-label">Category Name:</label>
                    <input type = "text" id = "category-input" name = "category-input"></input>
                </div>
                <input type="submit" value="Submit" className= "popup-submit" />
            </div>
            )}
        </div>
    );
};

const Budget = () =>{
    return (
        <div className = "budget-page">
            <Sidebar />
            <div className = "budget-body">
                <div className="progress-tracker">
                <h1 className = "goals"> Goal: Spend Less than 1k </h1>
                    <ResponsiveContainer>
                        <ProgressPie />
                    </ResponsiveContainer>
                </div>
                <BudgetCategories />
                <AddCategoryForm />
            </div>
            
         </div>
    );
};

export {ProgressPie, BudgetCategories, AddCategoryForm};
export default Budget;
