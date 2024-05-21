import "../styles/TestingLogin.css";

import Navbar from "./Navbar";

const tlogin = () => {
    const form = document.querySelector("#tlogin");
    const data = {};
    data["username"] = form.username.value;
    data["password"] = form.password.value;
    fetch("http://127.0.0.1:5000/testing-login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(data => {
        data.json();
    }).then(data => {
        console.log(data);
    })
}

const tsignup = () => {

}

const TestingLogin = () => {
    return (
        <>
            <Navbar />
            <div className = "bodyody">
                <form id = "tlogin">
                    <h1>login</h1>

                    <label htmlFor = "username">enter username</label>
                    <input required type = "text" name = "username" id = "username" placeholder = "enter username"/>
                    <br />
                    <label htmlFor = "password">enter password</label>
                    <input required type = "password" name = "password" id = "password" placeholder = "enter password" />
                
                    <button type = "button" onClick = {tlogin}>login</button>
                </form>

                <hr />

                <form>
                    <h1>signup</h1>

                    <label htmlFor = "username2">enter username</label>
                    <input required type = "text" name = "username2" id = "username2" placeholder = "enter username"/>
                    <br />
                    <label htmlFor = "password2">enter password</label>
                    <input required type = "password" name = "password2" id = "password2" placeholder = "enter password" />

                    <button type = "button" >register</button>
                </form>
            </div>
        </>
    )
}

export default TestingLogin;