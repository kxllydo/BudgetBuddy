import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

import "@styles/components/FrontPage.css";

const LayoutBodyContainer = ({ className, children }) => {
    if (className)
        className = " " + className;

    return (
        <div className = {"front-page-body" + className}>
            { children }
        </div>
    )
}

const LayoutWithFooter = ({ className, children }) => {
    return (
        <>
            <Navbar />
            <LayoutBodyContainer className = {className}>{ children }</LayoutBodyContainer>
            <Footer />
        </>
    )
}

const LayoutWithoutFooter = ({ className, children }) => {
    return (
        <>
            <Navbar />
            <LayoutBodyContainer className = {className}>{ children }</LayoutBodyContainer>
        </>
    )
}

const LayoutWithoutNavbar = ({ className, children }) => {
    return (
        <LayoutBodyContainer className = {className}>{ children }</LayoutBodyContainer>
    );
}

const Layout = LayoutWithFooter;
export default Layout;
export { LayoutWithFooter, LayoutWithoutFooter, LayoutWithoutNavbar };