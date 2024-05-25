import { Link } from "react-router-dom";

import { PATHS } from "@/App";

import "@styles/Home.scss";

const Home = () => {
    return (
        <div className = "home-container">
            <section className = "hero-section">
                <div className = "left">
                    <h1><span>Track Your Spending,</span>Master Your Finances</h1>
                    <p>With easy interfaces, categorized expenses, and more, keeping record of your expenses has never been easier.</p>
                    <Link className = "primary-btn" to = {PATHS.DashboardPage}>Get Started</Link>
                </div>

                <div className = "right">
                    <img src={require("@images/home-hero2.png")} alt="dashboard" />
                </div>
            </section>

            <section className = "another-section">
                <h1>some other section..</h1>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum, elit ac ullamcorper scelerisque, magna augue pharetra quam, non molestie nisi ipsum nec libero. Nulla facilisi. Nam interdum, risus ut tempor sagittis, odio purus sodales felis, non condimentum enim ante sit amet felis. Duis vel elit vestibulum, tempor purus sit amet, dictum metus. Vivamus ultricies tristique metus, vel placerat mauris venenatis et. Integer id malesuada mi. Vivamus lobortis leo id libero gravida, non ullamcorper nisi feugiat. Duis sed magna ex. Nam sed sapien elit. Cras tempus libero quis magna cursus ullamcorper. Donec eget neque ultricies, pharetra ex nec, fringilla ex. Phasellus non nisi consequat, fermentum nunc non, varius nulla. Vivamus gravida, sapien eget fringilla consequat, nulla nisl rhoncus velit, sit amet feugiat justo turpis eget metus.

                Maecenas eget lacus vel lacus luctus dapibus sed at mauris. Morbi in leo in odio sollicitudin eleifend. Phasellus ac neque eget leo aliquam efficitur. Nam posuere turpis nec justo blandit, id pharetra libero bibendum. Fusce rutrum congue orci, at laoreet nulla. Nullam porta, purus ac interdum convallis, odio nunc dignissim nisl, vel consequat risus dui at libero. Morbi vehicula velit ac erat aliquam, et fermentum mauris luctus. Ut dictum felis vitae mauris eleifend, vel vehicula velit condimentum. Suspendisse potenti. Curabitur aliquet turpis a nulla sollicitudin, non ultricies arcu fringilla. Nulla facilisi.

                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed consequat, lorem a laoreet rhoncus, metus leo blandit eros, eget luctus libero velit nec tortor. Fusce vitae suscipit tortor. Integer gravida risus sed erat posuere tincidunt. Nam non risus arcu. Mauris vel mi nec est dapibus pretium. Cras commodo nibh vitae metus iaculis feugiat. Integer tincidunt mi vel velit gravida, eu facilisis ligula rutrum. Nulla sed nisi in enim lobortis efficitur.

                Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas pulvinar nunc nec est fermentum, vitae scelerisque lectus bibendum. Vivamus nec vestibulum velit. Phasellus tempor, sapien a mattis convallis, turpis sapien maximus nisl, ut rhoncus justo turpis sed magna. Vestibulum non dapibus mi. Nam nec dapibus justo. Integer ac neque condimentum, volutpat quam vitae, viverra lacus. Donec auctor libero at est rutrum, vel auctor elit efficitur. Sed in odio non magna pharetra varius.

                In hac habitasse platea dictumst. Sed eget scelerisque urna. Mauris consectetur commodo quam, nec viverra eros ultricies vel. Integer nec scelerisque nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam nec convallis odio. Etiam posuere, mi eu consequat scelerisque, odio elit aliquam nunc, nec vehicula justo enim nec enim. Vivamus vehicula velit quis nulla aliquam, at eleifend odio tincidunt. Nullam volutpat lectus et turpis ullamcorper, in congue lacus tempus. Ut rhoncus purus nec enim fermentum, nec rhoncus elit tristique. Sed nec lacus leo. Sed nec ipsum ac enim suscipit rhoncus. Curabitur condimentum consequat purus, eget dictum urna sodales nec. Phasellus vel rhoncus metus. Nunc suscipit nisl a justo accumsan lobortis. Donec at dictum nulla. Cras a mi euismod, tincidunt felis ut, scelerisque urna.

            </section>
        </div>
    )
}
 
export default Home;