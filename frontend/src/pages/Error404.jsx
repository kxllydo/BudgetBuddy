import { useNavigate } from "react-router-dom";

import "@styles/Error404.scss";

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1>error404 page</h1>
            <h1>here's a btn to go back</h1>
            <button onClick = {() => {navigate(-1)}}>go back!</button>
        </>
    )
}

export default Error404;