import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Sidebar from "@components/Sidebar";


import "@styles/Budget.css";

export const getCategories = async () => {
    try {
        const response = await fetch("/display-categories", {
            method: 'GET',
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const exitHandler = () => {
    var popupForm = document.getElementById("category-form-background");
    popupForm.style.display = 'none';
};



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

const AddForm = ({categories}) => {
    const [state, setState] = useState("category");
    const [category, setCategory] = useState("");
    const [picked, setPicked] = useState("");
    
    const optionHandler = (event) => {
        const selectedState = event.target.value;
        setState(selectedState);
    };

    const capHandler = (event) => {
        event.preventDefault();
        const form = document.querySelector("#cap-adder");
        const capData = new FormData(form);
        fetch ("/add-cap", {
            method: 'POST',
            body: capData,
            credentials: 'include',
        });

        for (const entry of capData.entries()) {
            console.log(entry[0], entry[1]);
        }
        var popupForm = document.getElementById("category-form-background");
        popupForm.style.display = 'none';
    }

    const categoryHandler = async (event) => {
        event.preventDefault();
        const form = document.querySelector("#category-adder");
        const categoryData = new FormData(form);
        
        try {
            const response = await fetch ("/add-category", {
                method: 'POST',
                body: categoryData,
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to add category');
            }
            exitHandler();
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Category already exists! Add a new one');
        }
    };
    

    const newCategory = (event) => {
        setCategory(event.target.value);
    };

    const categoryPicker = (event) => {
        setPicked(event.target.value);
        console.log(picked);
    };

    return (
        <div>
            <div className="format-option-pair">
            <label htmlFor="choices" className = "budget-popup-label" id ="add-a">Add</label>
            <select name="budget-popup" className="choices" id = "choices" onChange={optionHandler}>
                <option value="category">Category</option>
                <option value="cap">Cap</option>
            </select>
            </div>

            { state == "cap" && (
                <form id = "cap-adder"> 
                <div className="format-option-pair">
                <label htmlFor="expense-cap" className="budget-popup-label">Expense Cap:</label>
                <div className='before-money-input'>
                    <input type="number" className='change-form-input'id="expense-cap" name="expense-cap" />
                    </div>
                </div>

                <div className="format-option-pair">
                <label htmlFor="cap-categories" className="budget-popup-label">Category</label>
                <select name="cap-categories" className="choices" id="cap-categories" onChange={categoryPicker}>
                        {categories.map((category, index) => (
                            <option value = {category}>{category}</option>
                        ))}
                </select>
                </div>

            <div className="popup-submit-div">
            <button type="submit" value="Submit" className="popup-submit" onClick={capHandler} >Submit</button>
            <button type="button" className="popup-exit" onClick={exitHandler}>Exit</button>
            </div>
        </form> )}
    
            {state == "category" && (
            <form id = "category-adder">
                <div className="format-option-pair">
                    <label htmlFor="category-input" className = "budget-popup-label">Category Name:</label>
                    <input type = "text" id = "category-input" name = "category-input" className='change-form-input' onChange={newCategory} required></input>
                </div>
                <div className="popup-submit-div">
                    <button type="submit" value="Submit" className = "popup-submit" onClick={categoryHandler}>Submit</button>
                    <button type = "button" value = "quit" className = "popup-exit" onClick = {exitHandler}>Exit</button>
                </div>
            </form>
            )}
            </div>
            )
}

const DeleteForm = ({categories}) => {
    const [state, setState] = useState("category");
    const [picked, setPicked] = useState("");

    const optionHandler = (event) => {
        const selectedState = event.target.value;
        setState(selectedState);
    };

    const categoryPicker = (event) => {
        setPicked(event.target.value);
        console.log(picked);
    };

    const deleteCap = (event) => {
        event.preventDefault();
        const form = document.getElementById("cap-remover");
        const capData = new FormData(form);
        for (var pair of capData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        fetch ('/delete-cap', {
            method: 'POST',
            body: capData,
            credentials: 'include',
        });
        exitHandler();
    }

    const deleteCategory = (event) => {
        event.preventDefault();
        const form = document.getElementById("category-remover");
        const categoryData = new FormData(form);
        for (var pair of categoryData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        fetch ('/delete-category', {
            method: 'POST',
            body: categoryData,
            credentials: 'include',
        });
        exitHandler();
    }

    return (
        <div>
        <div className="format-option-pair">
            <label htmlFor="choices" className = "budget-popup-label" id ="add-a">Delete</label>
            <select name="budget-popup" className="choices" id = "choices" onChange={optionHandler}>
                <option value="category">Category</option>
                <option value="cap">Cap</option>
            </select>
            </div>
        
        { state == "cap" && (
            <form id = "cap-remover"> 
            <div className="format-option-pair">
                <label htmlFor="cap-category" className="budget-popup-label">Category</label>
                <select name="cap-category" className="choices" id="cap-categories" onChange={categoryPicker}>
                        {categories.map((category, index) => (
                            <option value = {category}>{category}</option>
                        ))}
                </select>
                </div>

                <div className="popup-submit-div">
                    <button type="submit" value="Submit" className="popup-submit" onClick={deleteCap}>Submit</button>
                    <button type="button" className="popup-exit" onClick={exitHandler}>Exit</button>
                </div>
            </form>
        )}

        { state == "category" && (
            <form id = "category-remover"> 
            <div className="format-option-pair">
                <label htmlFor="category" className="budget-popup-label">Category</label>
                <select name="category" className="choices" id="cap-categories" onChange={categoryPicker}>
                        {categories.map((category, index) => (
                            <option value = {category}>{category}</option>
                        ))}
                </select>
                </div>

                <div className="popup-submit-div">
                    <button type="submit" value="Submit" className="popup-submit" 
                    onClick={deleteCategory}>Submit</button>
                    <button type="button" className="popup-exit" onClick={exitHandler}>Exit</button>
                </div>
            </form>
        )}
        </div>
    )

}

const EditForm = ({categories}) => {
    const [state, setState] = useState("category");
    const [picked, setPicked] = useState("");

    const optionHandler = (event) => {
        const selectedState = event.target.value;
        setState(selectedState);
    };

    const categoryPicker = (event) => {
        setPicked(event.target.value);
        console.log(picked);
    };

    return (
        <div>
        <div className="format-option-pair">
            <label htmlFor="choices" className = "budget-popup-label" id ="add-a">Edit:</label>
            <select name="budget-popup" className="choices" id = "choices" onChange={optionHandler}>
                <option value="category">Category</option>
                <option value="cap">Cap</option>
            </select>
            </div>
        
        { state == "cap" && (
            <form id = "cap-remover"> 
                <div className="format-option-pair">
                    <label htmlFor="cap-category" className="budget-popup-label">Category:</label>
                    <select name="cap-category" className="choices" id="cap-categories" onChange={categoryPicker}>
                            {categories.map((category, index) => (
                                <option value = {category}>{category}</option>
                            ))}
                    </select>
                </div>
                <div className="format-option-pair">
                    <label htmlFor="new-cap" className="budget-popup-label">New Cap:</label>
                    <div className='before-money-input'>
                        <input name = 'new-cap' className='change-form-input' type='number' />
                    </div>
                </div>

                <div className="popup-submit-div">
                    <button type="submit" value="Submit" className="popup-submit" >Submit</button>
                    <button type="button" className="popup-exit" onClick={exitHandler}>Exit</button>
                </div>
            </form>
        )}

        { state == "category" && (
            <form id = "category-remover"> 
                <div className="format-option-pair">
                    <label htmlFor="category" className="budget-popup-label">Old Category Name:</label>
                    <select name="category" className="choices" id="cap-categories" onChange={categoryPicker}>
                            {categories.map((category, index) => (
                                <option value = {category}>{category}</option>
                            ))}
                </select>
                </div>
                <div className='format-option-pair'>
                    <label htmlfor = "new-category" className='budget-popup-label'>New Category Name:</label>
                    <input name='new-category' text='number' className='change-form-input'/>
                </div>

                <div className="popup-submit-div">
                    <button type="submit" value="Submit" className="popup-submit" 
                   >Submit</button>
                    <button type="button" className="popup-exit" onClick={exitHandler}>Exit</button>
                </div>
            </form>
        )}
        </div>
    )

}

const ChangeForm = () => {
    const [categories, setCategories] = useState([]);
    const [picked, setPicked] = useState("");
    const [edit, setEdit] = useState ("add");
    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        };
        fetchCategories();
    }, []);


    const editHandler = (event) => {
        const state = event.target.value;
        setEdit(state);
    }

    return (
        <div id = "category-form-background">
            <div id="category-form-container">
            <div className="format-option-pair">
                <form id = "edit-type" style = {{marginTop: "6%"}} onChange={editHandler}>
                    <input type="radio" id="add" name="edit-type" value="add"/>  
                    <label for="add" style = {{marginRight: "20px"}}>Add</label>
                    <input type="radio" id="delete" name="edit-type" value="delete" />  
                    <label for="delete" style = {{marginRight: "20px"}}>Delete</label>
                    <input type="radio" id="edit" name="edit-type" value="edit" />  
                    <label for="edit" >Edit</label>
                </form>
            </div>

            {edit == "add" &&
                <AddForm categories={categories}/>
            }

            {edit == "delete" && 
                <DeleteForm categories={categories}/>
            }

            {edit == "edit" &&
            <EditForm categories={categories}/>
        }
            </div>
        </div>
    )
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

           <ChangeForm />
            <div className="budget-category-header">
                <h1> Budget by Category</h1>
                <div className = "category-button">
                    <button id = "add-category" onClick = {popupForm}>Edit</button>
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

export {ProgressPie, BudgetCategories, ChangeForm as EditForm, AddForm, DeleteForm, CategoryProgressBar};
export default Budget;
