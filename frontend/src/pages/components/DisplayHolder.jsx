import "@styles/components/DisplayHolder.scss";

const DisplayHolder = ({children, id, className}) => {
    if (className)
        className = " " + className;
    else
        className = "";

    return (
        <div id = {id} className = {"display-container" + className}>
            {children}
        </div>
    )
}

export default DisplayHolder;