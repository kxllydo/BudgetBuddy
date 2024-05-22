import { Link } from 'react-router-dom';

import Layout from "@components/FrontPage";

//import "@styles/Home.css"
import "@styles/Home.scss";

const Hom3e = () => {
    return (
        <Layout className = "home-container">
            <div className = "slogan">
                <h1>Track your spending, master your finances</h1>
                <p>With an easy interface, categorized expenses, and more, keeping record of your expenses never felt so easy</p>
                <br></br>
                <div className = "start">
                    <Link to = "/dashboard"> Get Started</Link>
                </div>
            </div>

            <div className = "demo">
                <img src="https://i.ibb.co/g44hqGF/Untitled-design-removebg-preview.png" height = "120%" alt = "dashboard"></img>
            </div>

            <div className = "filler-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum, elit ac ullamcorper scelerisque, magna augue pharetra quam, non molestie nisi ipsum nec libero. Nulla facilisi. Nam interdum, risus ut tempor sagittis, odio purus sodales felis, non condimentum enim ante sit amet felis. Duis vel elit vestibulum, tempor purus sit amet, dictum metus. Vivamus ultricies tristique metus, vel placerat mauris venenatis et. Integer id malesuada mi. Vivamus lobortis leo id libero gravida, non ullamcorper nisi feugiat. Duis sed magna ex. Nam sed sapien elit. Cras tempus libero quis magna cursus ullamcorper. Donec eget neque ultricies, pharetra ex nec, fringilla ex. Phasellus non nisi consequat, fermentum nunc non, varius nulla. Vivamus gravida, sapien eget fringilla consequat, nulla nisl rhoncus velit, sit amet feugiat justo turpis eget metus.

                Maecenas eget lacus vel lacus luctus dapibus sed at mauris. Morbi in leo in odio sollicitudin eleifend. Phasellus ac neque eget leo aliquam efficitur. Nam posuere turpis nec justo blandit, id pharetra libero bibendum. Fusce rutrum congue orci, at laoreet nulla. Nullam porta, purus ac interdum convallis, odio nunc dignissim nisl, vel consequat risus dui at libero. Morbi vehicula velit ac erat aliquam, et fermentum mauris luctus. Ut dictum felis vitae mauris eleifend, vel vehicula velit condimentum. Suspendisse potenti. Curabitur aliquet turpis a nulla sollicitudin, non ultricies arcu fringilla. Nulla facilisi.

                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed consequat, lorem a laoreet rhoncus, metus leo blandit eros, eget luctus libero velit nec tortor. Fusce vitae suscipit tortor. Integer gravida risus sed erat posuere tincidunt. Nam non risus arcu. Mauris vel mi nec est dapibus pretium. Cras commodo nibh vitae metus iaculis feugiat. Integer tincidunt mi vel velit gravida, eu facilisis ligula rutrum. Nulla sed nisi in enim lobortis efficitur.

                Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas pulvinar nunc nec est fermentum, vitae scelerisque lectus bibendum. Vivamus nec vestibulum velit. Phasellus tempor, sapien a mattis convallis, turpis sapien maximus nisl, ut rhoncus justo turpis sed magna. Vestibulum non dapibus mi. Nam nec dapibus justo. Integer ac neque condimentum, volutpat quam vitae, viverra lacus. Donec auctor libero at est rutrum, vel auctor elit efficitur. Sed in odio non magna pharetra varius.

                In hac habitasse platea dictumst. Sed eget scelerisque urna. Mauris consectetur commodo quam, nec viverra eros ultricies vel. Integer nec scelerisque nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam nec convallis odio. Etiam posuere, mi eu consequat scelerisque, odio elit aliquam nunc, nec vehicula justo enim nec enim. Vivamus vehicula velit quis nulla aliquam, at eleifend odio tincidunt. Nullam volutpat lectus et turpis ullamcorper, in congue lacus tempus. Ut rhoncus purus nec enim fermentum, nec rhoncus elit tristique. Sed nec lacus leo. Sed nec ipsum ac enim suscipit rhoncus. Curabitur condimentum consequat purus, eget dictum urna sodales nec. Phasellus vel rhoncus metus. Nunc suscipit nisl a justo accumsan lobortis. Donec at dictum nulla. Cras a mi euismod, tincidunt felis ut, scelerisque urna.
            </div>
        </Layout>
    )
}

const Home = () => (
    <Layout className="home-page">
        <section className="hero-section">
            <div className="left-side">
                <h1>Track Your Spending, Master Your Finances</h1>
                <p>With easy interfaces, categorized expenses, and more, keeping record of your expenses has never been easier.</p>
            </div>

            <div className="right-side">
                <img src={require("@images/home-hero.png")} alt="dashboard" />
            </div>
        </section>

        <section>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum, elit ac ullamcorper scelerisque, magna augue pharetra quam, non molestie nisi ipsum nec libero. Nulla facilisi. Nam interdum, risus ut tempor sagittis, odio purus sodales felis, non condimentum enim ante sit amet felis. Duis vel elit vestibulum, tempor purus sit amet, dictum metus. Vivamus ultricies tristique metus, vel placerat mauris venenatis et. Integer id malesuada mi. Vivamus lobortis leo id libero gravida, non ullamcorper nisi feugiat. Duis sed magna ex. Nam sed sapien elit. Cras tempus libero quis magna cursus ullamcorper. Donec eget neque ultricies, pharetra ex nec, fringilla ex. Phasellus non nisi consequat, fermentum nunc non, varius nulla. Vivamus gravida, sapien eget fringilla consequat, nulla nisl rhoncus velit, sit amet feugiat justo turpis eget metus.

                Maecenas eget lacus vel lacus luctus dapibus sed at mauris. Morbi in leo in odio sollicitudin eleifend. Phasellus ac neque eget leo aliquam efficitur. Nam posuere turpis nec justo blandit, id pharetra libero bibendum. Fusce rutrum congue orci, at laoreet nulla. Nullam porta, purus ac interdum convallis, odio nunc dignissim nisl, vel consequat risus dui at libero. Morbi vehicula velit ac erat aliquam, et fermentum mauris luctus. Ut dictum felis vitae mauris eleifend, vel vehicula velit condimentum. Suspendisse potenti. Curabitur aliquet turpis a nulla sollicitudin, non ultricies arcu fringilla. Nulla facilisi.

                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed consequat, lorem a laoreet rhoncus, metus leo blandit eros, eget luctus libero velit nec tortor. Fusce vitae suscipit tortor. Integer gravida risus sed erat posuere tincidunt. Nam non risus arcu. Mauris vel mi nec est dapibus pretium. Cras commodo nibh vitae metus iaculis feugiat. Integer tincidunt mi vel velit gravida, eu facilisis ligula rutrum. Nulla sed nisi in enim lobortis efficitur.

                Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas pulvinar nunc nec est fermentum, vitae scelerisque lectus bibendum. Vivamus nec vestibulum velit. Phasellus tempor, sapien a mattis convallis, turpis sapien maximus nisl, ut rhoncus justo turpis sed magna. Vestibulum non dapibus mi. Nam nec dapibus justo. Integer ac neque condimentum, volutpat quam vitae, viverra lacus. Donec auctor libero at est rutrum, vel auctor elit efficitur. Sed in odio non magna pharetra varius.

                In hac habitasse platea dictumst. Sed eget scelerisque urna. Mauris consectetur commodo quam, nec viverra eros ultricies vel. Integer nec scelerisque nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam nec convallis odio. Etiam posuere, mi eu consequat scelerisque, odio elit aliquam nunc, nec vehicula justo enim nec enim. Vivamus vehicula velit quis nulla aliquam, at eleifend odio tincidunt. Nullam volutpat lectus et turpis ullamcorper, in congue lacus tempus. Ut rhoncus purus nec enim fermentum, nec rhoncus elit tristique. Sed nec lacus leo. Sed nec ipsum ac enim suscipit rhoncus. Curabitur condimentum consequat purus, eget dictum urna sodales nec. Phasellus vel rhoncus metus. Nunc suscipit nisl a justo accumsan lobortis. Donec at dictum nulla. Cras a mi euismod, tincidunt felis ut, scelerisque urna.
            </div>
        </section>
    </Layout>
)
 
export default Home;