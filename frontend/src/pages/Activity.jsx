import { useState, useEffect, act } from "react";

import Popup from "@components/Popup";
import DisplayHolder from "@components/DisplayHolder";

import "@styles/Activity.scss";

/*
    TODO: Bug with both select components in popup.
*/

// fetch("/get-data/2024/05/act_date/true").then(async r => console.log(await r.json()));

const fetchActivity = (setData, viewData) => {
    console.log("***********************************************************");
    console.log(`/get-data/${viewData.date.getFullYear()}/${viewData.date.getMonth() + 1}/${viewData.order}/${viewData.asc}`)
    

    fetch(`/get-data/${viewData.date.getFullYear()}/${(viewData.date.getMonth() + 1).toString().padStart(2, "0")}/${viewData.order}/${viewData.asc}`, {
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
                <tr key = {i} data-serial = {data[i][0]} onClick = {(event) => {setData(event.currentTarget);}}>
                    <td>
                        {data[i][1].replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1")}
                    </td>
                    <td>
                        {data[i][2].charAt(0).toUpperCase() + data[i][2].slice(1)}
                    </td>
                    <td>
                        {data[i][3]}
                        </td>
                    <td>
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

        const fetchUrl = data && "/edit-data/" + activityData.get("my-activity-id") || "/add-data";
        const fetchMethod = (data && "my-activity-delete" in data && "DELETE") || "POST";
        
        fetch(fetchUrl, {
            method: fetchMethod,
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
                        <select required name = "my-activity-category" id = "my-activity-category" defaultValue = {data && data.children[1].innerText || ""}>
                            {!data && <option value = "" hidden disabled>Choose a category</option>}
                            {categories.map(category => <option key = {category} value = {category.split(" ").join("-")}>{category}</option>)}
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
                                <input type = "checkbox" name = "my-activity-delete" id = "my-activity-delete" defaultChecked = {false} />
                            </div>
                        )
                    }

                    <button className = "primary-btn">{data && "Edit" || "Add"} Activity</button>
                </form>
            </div>
        </Popup>
    );
}

const MyActivityViewDatePopup = ({ data, setData, open, setOpen }) => {
    useEffect(() => {
        if (!open) {
            const form = document.querySelector("#my-activity-view-data-form");
            form.reset();
        }
    }, [null, open])

    const handleSubmit = event => {
        event.preventDefault();

        const form = document.querySelector("#my-activity-view-data-form")
        const viewData = new FormData(form);

        const viewDate = viewData.get("my-activity-view-date");
        const viewOrder = viewData.get("my-activity-view-order");
        const viewOrder2 = viewData.get("my-activity-view-order2");

        setData({
            date: new Date(viewDate + "T00:00:00"),
            order: viewOrder,
            asc: viewOrder2 != null
        });
        setOpen(false);
    }

    return (
        <Popup className = "my-activity-form-popup" open = {open} setOpen = {setOpen}>
            <h1>Change My Activity View</h1>

            <form id = "my-activity-view-data-form" onSubmit={handleSubmit}>
                <div className = "my-activity-form-field">
                    <label htmlFor = "my-activity-view-date">Change View's Month</label>
                    <input required type = "date" id = "my-activity-view-date" name = "my-activity-view-date" defaultValue = {data.date.getFullYear() + "-" + (data.date.getMonth() + 1).toString().padStart(2, "0") + "-" + data.date.getDate().toString().padStart(2, "0")} />
                </div>

                <div className = "my-activity-form-field">
                    <label htmlFor = "my-activity-view-order">Change View's Order</label>
                    <select required id = "my-activity-view-order" name = "my-activity-view-order" defaultValue = {data.order}>
                        <option value = "act_date">Date</option>
                        <option value = "category">Category</option>
                        <option value = "merchant">Merchant</option>
                        <option value = "price">Price</option>
                    </select>
                </div>

                <div className = "my-activity-form-field">
                    <label htmlFor = "my-activity-view-order2">Check for Ascending</label>
                    <input type = "checkbox" id = "my-activity-view-order2" name = "my-activity-view-order2" defaultChecked = {data.asc}/>
                </div>

                <button className = "primary-btn" type = "submit">Save</button>
            </form>
        </Popup>
    );
}

const Activity = () => {
    const [data, setData] = useState([]);
    const [viewData, setViewData] = useState({date: new Date(), order: "act_date", asc: false});

    const [showDatePopup, setDatePopup] = useState(false);
    const [showMyActivityPopup, setMyActivityPopup] = useState(false); 
    const [presetActivityData, setPresetActivityData] = useState(null); // for clicking on <tr>

    useEffect(() => {
        if (!showMyActivityPopup && !showDatePopup)
            fetchActivity(setData, viewData);
    }, [null, showMyActivityPopup, showDatePopup]);

    useEffect(() => {
        if (presetActivityData)
            setMyActivityPopup(true);
    }, [presetActivityData]);

    return (
        <div className = "activity-page">
            <DisplayHolder className = "activity-display-holder">
                <div className = "activity-holder-header">
                    <h1>My Activity for <span id = "my-activity-view-date-display" onClick = {() => setDatePopup(true)}>{(viewData.date.getMonth() + 1).toString().padStart(2, "0") + "/" + viewData.date.getFullYear()}</span></h1>
                    <button className = "primary-btn" onClick = {() => setMyActivityPopup(true)}>Add Activity</button>
                </div>

                <MyActivity data = {data} setData = {setPresetActivityData}/>
            </DisplayHolder>

            <MyActivityPopup open = {showMyActivityPopup} setOpen = {setMyActivityPopup} data = {presetActivityData} setData = {setPresetActivityData}/>
            <MyActivityViewDatePopup data = {viewData} open = {showDatePopup} setOpen = {setDatePopup} setData = {setViewData} />
        </div>
    );
}

export default Activity;