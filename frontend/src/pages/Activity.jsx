import { useState, useEffect, act } from "react";
import Card from "react-credit-cards-2";

import Popup from "@components/Popup";
import DisplayHolder from "@components/DisplayHolder";

import "@styles/Activity.scss";
import "react-credit-cards-2/dist/es/styles-compiled.css";

/*
const LinkedCards = () => {
    let data;
    if (Math.random() < .5) {
        data = [];
    } else {
        data = [
            {"number": "5101", "name": "My Amazing Travel Card"},
            {"number": "4999", "name": "My Amazing Cash-back Card"},
            {"number": "3621", "name": "My Super Old Student Discover Card"},
            {"number": "3792", "name": "Not My Card"},
            {"number": "4213", "name": "Not My Card Too"},
            {"number": "4213", "name": "Not My Card Too"},
            {"number": "4213", "name": "Not My Card Too"},
            {"number": "4213", "name": "Not My Card Too"}
        ];
    }

    let cards;
    if (data.length === 0) {
        cards = (
            <div>You currently do not have any cards linked.</div>
        )
    } else {
        cards = [];
        for (let i = 0; i < data.length; i++) {
            cards.push(
                <Card
                    number = {data[i].number}
                    expiry = "****"
                    cvc = "***"
                    name = {data[i].name} />
            )
        }
    }

    return (
        <DisplayHolder className = {(data.length === 0 && "activity-no-linked-cards") || "activity-has-linked-cards"}>
            {cards}
        </DisplayHolder>
    )
}

const MyActivity = () => {
    let data;
    if (Math.random() < .5) {
        data = [];
    } else {
        data = [
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"},
            {"date": "10/24/24", "category": "Food", "merchant": "Dunkin'", "price": "$100.20"}
        ];
    }

    let acts;
    if (data.length === 0) {
        acts = (
            <div>There has been no recent activity within your linked cards.</div>
        )
    } else {
        acts = [];
        for (let i = 0; i < data.length; i++) {
            acts.push(
                <tr>
                    <td>{data[i].date}</td>
                    <td>{data[i].category}</td>
                    <td>{data[i].merchant}</td>
                    <td>{data[i].price}</td>
                </tr>
            );
        }
        acts = (
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Merchant</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {acts}
                </tbody>
            </table>
        );
    }

    return (
        <DisplayHolder className = {(data.length === 0 && "activity-no-activity") || "activity-has-activity"}>
            {acts}
        </DisplayHolder>  
    );
}

const CardsForm = ({open, setOpen}) => {
    const [state, setState] = useState({
        number: "", expiry: "", cvc: "", name: "", focus: ""
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (event) => {
        setState((prev) => ({ ...prev, focus: event.target.name }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Popup className = "linked-cards-form-popup" open = {open} setOpen = {setOpen}>
            <h1>Add a Card</h1>

            <div>
                <Card 
                    number = {state.number}
                    expiry = {state.expiry}
                    cvc = {state.cvc}
                    name = {state.name}
                    focused = {state.focus} />
                <form id = "linked-cards-form">
                    <input required type = "number" name = "number"
                        placeholder = "Card Number" value = {state.number}
                        onChange = {handleInputChange} onFocus = {handleInputFocus} />
                    <input required type = "text" name = "name"
                        placeholder = "Card Name" value = {state.name}
                        onChange = {handleInputChange} onFocus = {handleInputFocus} />
                    <input required type = "number" name = "cvc"
                        placeholder = "Card CVC" value = {state.cvc}
                        onChange = {handleInputChange} onFocus = {handleInputFocus} />
                    <input required type = "text" name = "expiry"
                        placeholder = "Card Expiry" value = {state.expiry}
                        onChange = {handleInputChange} onFocus = {handleInputFocus} />
                    
                    <button>Add Card</button>
                </form>
            </div>
        </Popup>
    );
}

const ActivityForm = ({open, setOpen}) => {
    return (
        <Popup className = "my-activity-form-popup" open = {open} setOpen = {setOpen}>
            <h1>Add Activity</h1>

            <div>
                <form>
                    <div className = "my-activity-form-field">
                        <label for = "my-activity-date">Date</label>
                        <input required type = "date" name = "my-activity-date" id = "my-activity-date" placeholder = "Date" />
                    </div>
                    <div className = "my-activity-form-field">
                        <label for = "my-activity-category">Category</label>
                        <select required name = "my-activity-category" id="my-activity-category">
                            <option value = "groceries"> Grocreries</option>
                            <option value = "bill"> Bill</option>
                            <option value = "food"> Food</option>
                        </select>
                    </div>
                    <div className = "my-activity-form-field">
                        <label for = "my-activity-merchant">Merchant</label>
                        <input required type = "text" name = "my-activity-merchant" id = "my-activity-merchant" placeholder = "Merchant" />
                    </div>
                    <div className = "my-activity-form-field">
                        <label for = "my-activity-price">Price</label>
                        <input required type = "number" name = "my-activity-price" id = "my-activity-price" placeholder = "Price" />
                    </div>

                    <button>Add Activity</button>
                </form>
            </div>
        </Popup>
    );
}

const Activity = () => {
    const [showCardsForm, setShowCardsForm] = useState(false);
    const [showActivityForm, setShowActivityForm] = useState(false);

    return (
        <>
            <div className = "sidebar-page activity-page">
                <DisplayHolder className = "linked-cards-display-holder">
                    <div class = "activity-holder-header">
                        <h1>My Linked Cards</h1>
                        <button onClick = {() => {setShowCardsForm(true)}}>
                            Add Card
                        </button>
                    </div>

                    <LinkedCards />
                </DisplayHolder>

                <DisplayHolder className = "activity-display-holder">
                    <div class = "activity-holder-header">
                        <h1>My Activity</h1>
                        <button onClick = {() => {setShowActivityForm(true)}}>
                            Add Activity
                        </button>
                    </div>

                    <MyActivity />
                </DisplayHolder>

                <CardsForm open = {showCardsForm} setOpen = {setShowCardsForm} />
                <ActivityForm open = {showActivityForm} setOpen = {setShowActivityForm} />
            </div>
        </>
    )
}
*/

const fetchActivity = (setData) => {
    fetch("/get-data", {
        method: "GET",
        credentials: "include",
    }).then(async response => {
        if (!response.ok)
            throw new Error("Failed to fetch activity.");

        let data = await response.json();
        setData(data);
    }).catch(error => {
        console.log(error);
    });
}

const fetchCategories = (setCategories) => {
    fetch("/display-categories", {
        method: "GET",
        credentials: "include",
    }).then(async response => {
        if (!response.ok)
            throw new Error("Failed to fetch categories.");

        let data = await response.json(); 
        data = data["categories"]; 
        setCategories(data);
    }).catch(error => {
        console.log(error);
    });
}

const MyActivity = ({ data, setData }) => {
    let acts;

    if (data.length === 0) {
        acts = (<div>There has been no recent activity within your linked cards.</div>);
    } else {
        acts = [];
        for (let i = 0; i < data.length; i++) {
            acts.push(
                <tr data-serial = {data[i][0]} onClick = {(event) => {setData(event.currentTarget);}}>
                    <td act-col = "act_date">
                        {data[i][1].replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1")}
                    </td>
                    <td act-col = "category">
                        {data[i][2].charAt(0).toUpperCase() + data[i][2].slice(1)}
                    </td>
                    <td act-col = "merchant">
                        {data[i][3]}
                        </td>
                    <td act-col = "price">
                        {"$" + data[i][4].toFixed(2)}
                    </td>
                </tr>
            )
        }

        acts = (
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Merchant</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{acts}</tbody>
            </table>
        )
    }

    return (
        <DisplayHolder className = {(data.length === 0 && "activity-no-activity") || "activity-has-activity"}>
            {acts}
        </DisplayHolder>
    );
}

const MyActivityPopup = ({ open, setOpen, data, setData }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories(setCategories);
    }, []);

    useEffect(() => {
        if (!open) {
            document.querySelector("#my-activity-form").reset();
            setData(null);
        }
    }, [open]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = document.querySelector("#my-activity-form");
        const activityData = new FormData(form);
        
        fetch(data && "/edit-data" || "/add-data", {
            method: "POST",
            body: activityData,
            credentials: "include"
        }).then(response => {
            if (response.ok) {
                setOpen(false);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Popup className = "my-activity-form-popup" open = {open} setOpen = {setOpen}>
            <h1>{data && "Edit" || "Add"} Activity</h1>

            <div>
                <form id = "my-activity-form" onSubmit = {handleSubmit}>
                    <div className = "my-activity-form-field">
                        <label htmlFor = "my-activity-date">Date</label>
                        <input required type = "date" name = "my-activity-date" id = "my-activity-date" placeholder = "Date" defaultValue = {data && data.children[0].innerText.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2")} />
                    </div>
                    <div className = "my-activity-form-field">
                        <label htmlFor = "my-activity-category">Category</label>
                        <select required name = "my-activity-category" id="my-activity-category">
                            {!data && <option value = "" hidden selected>Choose a category</option>}
                            {categories.map(category => <option selected = {data && data.children[1].innerText == category && "true" || "false"} value = {category.split(" ").join("-")}>{category}</option>)}
                        </select>
                    </div>
                    <div className = "my-activity-form-field">
                        <label htmlFor = "my-activity-merchant">Merchant</label>
                        <input required type = "text" name = "my-activity-merchant" id = "my-activity-merchant" placeholder = "Merchant" defaultValue = {data && data.children[2].innerText} />
                    </div>
                    <div className = "my-activity-form-field">
                        <label htmlFor = "my-activity-price">Price</label>
                        <input required type = "number" name = "my-activity-price" id = "my-activity-price" placeholder = "Price" defaultValue = {data && parseFloat(data.children[3].innerText.slice(1))} />
                    </div>
                    {
                        data && (
                            <div className = "my-activity-form-field hidden">
                                <input type = "hidden" name = "my-activity-id" id = "my-activity-id" defaultValue = {data && data.dataset.serial} />
                            </div>
                        )
                    }
                    {
                        data && (
                            <div className = "my-activity-form-field">
                                <label htmlFor = "my-activity-delete">Would you like to delete this activity?</label>
                                <input type = "checkbox" name = "my-activity-delete" id = "my-activity-delete" defaultValue = {false} />
                            </div>
                        )
                    }

                    <button>{data && "Edit" || "Add"} Activity</button>
                </form>
            </div>
        </Popup>
    );
}

const Activity = () => {
    const [data, setData] = useState([]);

    const [showMyActivityPopup, setMyActivityPopup] = useState(false);
    const [presetActivityData, setPresetActivityData] = useState(null);

    useEffect(() => {
        if (!showMyActivityPopup)
            fetchActivity(setData);
    }, [null, showMyActivityPopup]);

    useEffect(() => {
        if (presetActivityData)
            setMyActivityPopup(true);

        if (presetActivityData) {
            console.log(presetActivityData);
            console.log(presetActivityData.children);
            console.log(presetActivityData.children[0].innerText);
            console.log(presetActivityData.children);
        }
    }, [presetActivityData]);

    return (
        <div className = "activity-page">
            <DisplayHolder className = "linked-cards-display-holder">
                <div className = "activity-holder-header">
                    <h1>My Linked Cards</h1>
                    <button>Add Card</button>
                </div>
            </DisplayHolder>

            <DisplayHolder className = "activity-display-holder">
                <div className = "activity-holder-header">
                    <h1>My Activity</h1>
                    <button onClick = {() => setMyActivityPopup(true)}>Add Activity</button>
                </div>

                <MyActivity data = {data} setData = {setPresetActivityData}/>
            </DisplayHolder>

            <MyActivityPopup open = {showMyActivityPopup} setOpen = {setMyActivityPopup} data = {presetActivityData} setData = {setPresetActivityData}/>
        </div>
    );
}

export default Activity;