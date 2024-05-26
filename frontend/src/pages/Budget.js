import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import "@styles/Budget.css";

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
    const [visible, setVisible] = useState();

    const optionHandler = (event) => {
        const selectedState = event.target.value;
        setState(selectedState);
    };

    const newCategory = (event) => {
        setCategory(event.target.value);
    }

    const exitHandler = () => {
        var popupForm = document.getElementById("category-form-background");
        popupForm.style.display = 'none';
    }

    const submitHandler = () => {
        var popupForm = document.getElementById("category-form-background");
        popupForm.style.display = 'none';

        if (category != ''){
            setVisible(true);
            const parent = document.getElementById("categories");
            const budgetCategoryDiv = document.createElement('div');
            budgetCategoryDiv.className = 'budget-category';

            const pElement = document.createElement('p');
            const title = category.charAt(0).toUpperCase() + category.slice(1);
            pElement.textContent = title;

            const totalBarDiv = document.createElement('div');
            totalBarDiv.className = 'total-bar';

            const progressBarDiv = document.createElement('div');
            progressBarDiv.className = 'progress-bar';

            const brElement = document.createElement('br');
            progressBarDiv.appendChild(brElement);
            totalBarDiv.appendChild(progressBarDiv);
            budgetCategoryDiv.appendChild(pElement);
            budgetCategoryDiv.appendChild(totalBarDiv);
            parent.appendChild(budgetCategoryDiv);
        }
        setCategory('');
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
            <div>
                <div className="format-option-pair">
                    <label htmlFor="category-input" className = "budget-popup-label">Category Name:</label>
                    <input type = "text" id = "category-input" name = "category-input" onChange={newCategory} required></input>
                </div>
                <div className="popup-submit-div">
                    <input type="submit" value="Submit" className = "popup-submit" onClick={submitHandler}/>
                    <button type = "button" value = "quit" className = "popup-exit" onClick = {exitHandler}>Exit</button>

                </div>
            </div>
            )}
        </div>
        </div>
    );
};

const CategoryProgressBar = ({name}) => {

    const title = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <div className="budget-category">
            <p>{title}</p>
            <div className = "total-bar">
                <div className = "progress-bar">
                    <br></br>
                </div>
            </div>
        </div>
    )
}
    
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
                <CategoryProgressBar name="groceries"/>
                <CategoryProgressBar name="transportation"/>
                <CategoryProgressBar name="utilities"/>
                <CategoryProgressBar name="shopping"/>
                <CategoryProgressBar name="travel"/>
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
