import { useState } from "react";
import Card from "react-credit-cards-2";

import Sidebar from "./Sidebar";
import DisplayHolder from "./SidebarPage";
import Popup from "./Popup";

import "../styles/Dashboard.css";
import "../styles/Activity.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";

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
    return (
        <Popup open = {open} setOpen = {setOpen}>
            <div>Add a Card</div>
        </Popup>
    );
}

const ActivityForm = ({open, setOpen}) => {
    return (
        <Popup open = {open} setOpen = {setOpen}>
            <h2>bailo</h2>
        </Popup>
    );
}

const Activity = () => {
    const [showCardsForm, setShowCardsForm] = useState(false);
    const [showActivityForm, setShowActivityForm] = useState(false);

    return (
        <>
            <Sidebar />
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

export default Activity;