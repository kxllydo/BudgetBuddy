import "@styles/components/Popup.scss";

const Popup = ({children, id, className, open, setOpen}) => {
    if (className)
        className = " " + className;
    else
        className = "";

    return (
        <>
            <div
                id = {id}
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