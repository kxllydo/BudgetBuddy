import "@styles/components/Popup.scss";

const Popup = ({children, className, open, setOpen}) => {
    if (className)
        className = " " + className;
    else
        className = "";

    return (
        <>
            <div
                className = {"popup-background" + className + (open && " show")}
                onClick = {() => {setOpen(false);}}>
                <div onClick = {(event) => {event.stopPropagation()}} className = "popup">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Popup;