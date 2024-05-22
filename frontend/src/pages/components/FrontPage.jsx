import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

import "@styles/components/FrontPage.scss";

const Layout = ({ className, children, excludeNav, excludeFt }) => {
    console.log(typeof excludeFt);
    excludeNav = (!excludeNav || excludeNav.toLowerCase() == "false") ? false : true;
    excludeFt = (!excludeFt || excludeFt.toLowerCase() == "false") ? false : true;
    const layoutClassName = "front-page-layout" + (excludeNav ? " no-nav" : "") + (excludeFt ? " no-footer" : "");
    const bodyClassName = "front-page-body" + (className ? " " + className : "");

    return (
        <div className = {layoutClassName}>
            {excludeNav ? null : <Navbar />}
            <div className = {bodyClassName}>
                { children } 
            </div>
            {excludeFt ? null : <Footer />}
        </div>
    )
}

export default Layout;

/*
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
*/