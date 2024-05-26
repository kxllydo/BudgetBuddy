import "@styles/components/DisplayHolder.scss";

const DisplayHolder = ({children, className}) => {
    if (className)
        className = " " + className;
    else
        className = "";

    return (
        <div className = {"display-container" + className}>
            {children}
        </div>
    )
}

export default DisplayHolder;