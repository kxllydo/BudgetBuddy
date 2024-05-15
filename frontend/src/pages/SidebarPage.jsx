import "../styles/SidebarPage.css";

const DisplayHolder = ({children}) => {
    return (
        <div className = "display-container">
            {children}
        </div>
    )
}

export default DisplayHolder;