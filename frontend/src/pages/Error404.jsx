import { useNavigate } from "react-router-dom";

import "@styles/Error404.scss";

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className = "error404-container">
            <h1>Oops!</h1>

            <h2>Looks like you're lost</h2>
            <h3>The page you were looking for is not available.</h3>

            <button className = "primary-btn" onClick = {() => {navigate(-1)}}>Return to Previous Page</button>
        </div>
            // <h1>error404 page</h1>
            // <h1>here's a btn to go back</h1>
            // <button onClick = {() => {navigate(-1)}}>go back!</button>
    )
}

export default Error404;