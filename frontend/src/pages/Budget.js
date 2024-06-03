import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import "@styles/Budget.css";



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

    const capHandler = async (event) => {
        event.preventDefault();
        const form = document.querySelector("#cap-adder");
        const capData = new FormData(form);
        try {
            const response = await fetch ("/add-cap", {
                method: 'POST',
                body: capData,
                credentials: 'include',
            });
            if (!response.ok){
                throw new Error('Failed to add cap');
            }
            exitHandler();
            } catch (error) {
                console.error ('Error adding cap: ', error);
                alert ('Cap for that category already exists! Try editing instead');
            }


        for (const entry of capData.entries()) {
            console.log(entry[0], entry[1]);
        }
    };

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

    const editCap = async (event) =>{
        event.preventDefault();
        const form = document.getElementById('edit-cap');
        const editData = new FormData(form);
        try{
            const response = await fetch ('/edit-cap', {
                method: 'POST',
                credentials: 'include',
                body: editData,
            });
            if (!response.ok){
                throw new Error ('Failed to edit cap');
            }
            exitHandler();
        } catch (error) {
            console.error('Error editing cap:', error);
            alert("Cap doesn't exist. Try adding a cap first");
        }
    };

    const editCategory = async (event) =>{
        event.preventDefault();
        const form = document.getElementById('edit-category')
        const categoryData = new FormData(form)
        try{
            const response = await fetch ('/edit-category', {
                method: 'POST',
                credentials: 'include',
                body: categoryData,
            });
            if (!response.ok){
                throw new Error ('Failed to edit category')
            }
            exitHandler();
        } catch (error) {
            console.error ('Error editing category', error);
            alert('There is already an existing category with that name. Try a different name');
        }
    }
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
            <form id = "edit-cap"> 
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
                    <button type="submit" value="Submit" className="popup-submit" onClick={editCap} >Submit</button>
                    <button type="button" className="popup-exit" onClick={exitHandler}>Exit</button>
                </div>
            </form>
        )}

        { state == "category" && (
            <form id = "edit-category"> 
                <div className="format-option-pair">
                    <label htmlFor="old-category" className="budget-popup-label">Old Category Name:</label>
                    <select name="old-category" className="choices" id="cap-categories" onChange={categoryPicker}>
                            {categories.map((category, index) => (
                                <option value = {category}>{category}</option>
                            ))}
                    </select>
                </div>
                <div className='format-option-pair'>
                    <label htmlFor = "new-category" className='budget-popup-label'>New Category Name:</label>
                    <input name='new-category' text='number' className='change-form-input'/>
                </div>

                <div className="popup-submit-div">
                    <button type="submit" value="Submit" className="popup-submit" onClick={editCategory}
                   >Submit</button>
                    <button type="button" className="popup-exit" onClick={exitHandler}>Exit</button>
                </div>
            </form>
        )}
        </div>
    )
};

const ChangeForm = ({categories}) => {
    const [picked, setPicked] = useState("");
    const [edit, setEdit] = useState ("add");

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
                    <label htmlFor="add" style = {{marginRight: "20px"}}>Add</label>
                    <input type="radio" id="delete" name="edit-type" value="delete" />  
                    <label htmlFor="delete" style = {{marginRight: "20px"}}>Delete</label>
                    <input type="radio" id="edit" name="edit-type" value="edit" />  
                    <label htmlFor="edit" >Edit</label>
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

const CategoryProgressBar = ({categories}) => {
    const [closed, setClosed] = useState(false);
    const [percent, setPercent] = useState({});
    const [cap, setCap] = useState({});
    const [spent, setSpent] = useState({});
    const [color, setColor] = useState({});

    const openForm = () => {
        var popupForm = document.getElementById("category-form-background");
        if (popupForm.style.display = 'none'){
            setClosed(true);
        };
    }

    const fillDict = async (type) => {
        if (type == 'color'){
            try{
                const results = await Promise.all (categories.map(category => getColor (category)));
                const colors = results.reduce((acc, { category, color }) => {
                    acc[category] = color;
                    return acc;
                }, {});
                setColor(colors);
            } catch (error) {
                console.error ('error!!');
            };
        } else {
            try {
                const results = await Promise.all(categories.map(category => stats(category)));
                if (type == 'percent'){
                    const percentages = results.reduce((acc, { category, percent }) => {
                        acc[category] = percent;
                        return acc;
                    }, {});
                    setPercent(percentages);
                }else if (type == 'cap'){
                    const caps = results.reduce((acc, { category, cap }) => {
                        acc[category] = cap;
                        return acc;
                    }, {});
                    setCap(caps);
                }else if (type == 'spent'){
                    const spents = results.reduce((acc, { category, spent }) => {
                        acc[category] = spent;
                        return acc;
                    }, {});
                    setSpent(spents);
                };
            } catch (error) {
                console.error('Error filling percentages:', error);
            }
        }
    };

    const stats = async (category) => {
        try {
            const url = `/get-${category}-percentage`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch percentage data');
            }

            const data = await response.json();
            return { category, percent: data.percent, cap: data.cap, spent: data.spent };
        } catch (error) {
            console.error('Error fetching percentage data:', error);
            return { category, percent: 0 }; 
        }
    };

    const getColor = async (category) => {
        try {
            const url = `/${category}-colors`;
            const response = await fetch (url, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok){
                throw new Error ('Failed to fetch color data');
            }
            const data = await response.json();
            console.log(data.color);
            return {category, color: data.color};
        }catch (error) {
            console.error('Error:', error);
        };
    };

   
    useEffect(() => {
        fillDict('percent');
        fillDict('spent');
        fillDict('cap');
        fillDict('color');
    }, [categories])

    console.log(color);

    return (
        <div>
            {categories.map((category, index) => (
                <div>
                    <p style = {{marginLeft :'13px'}}>{category}</p>
                    <div className="total-bar">
                        <div className="progress-bar" id={category} style={{'width' : `${percent[category]}%`, 'backgroundColor' : `${color[category]}`}}>
                        </div>
                    </div>
                    <div className='bar-info'>
                    {spent[category] === 'unset' ? (
                        <p style={{fontSize : '13px'}}>Unset</p>
                    ) : (
                        <p style = {{'font-size' : '13px', float: 'right', margin:'none', padding: '0'}}>$ {spent[category]} / {cap[category]}</p>
                    )}
                    </div>
                </div>
            ))}
        </div>
    );
};
    
const BudgetCategories = ({categories}) => {
    const [closed, setClosed] = useState(false)

    const popupForm = () => {
        var popupForm = document.getElementById("category-form-background");
        if (popupForm.style.display = 'none'){
            setClosed(true)
            popupForm.style.display = 'block';
        }
    }

    return(
        <div className="budget-summary">

           <ChangeForm categories={categories} />
            <div className="budget-category-header">
                <h1> Budget by Category</h1>
                <div className = "category-button">
                    <button id = "add-category" onClick = {popupForm}>Edit</button>
                </div>
            </div>

            <div id="categories">
                <CategoryProgressBar categories={categories}/>
            </div>
        </div>
    )
};


const Budget = () =>{
    const [data, setData] = useState({});
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = await fetch("/display-categories", {
                method: 'GET',
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            
            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchCategories =  async() =>{
            await getCategories();
        }
        fetchCategories();
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
                <BudgetCategories categories={categories} />
            </div>
            
         </div>
    );
};

export {ProgressPie, BudgetCategories, ChangeForm, AddForm, DeleteForm, CategoryProgressBar};
export default Budget;
