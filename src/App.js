import { GlobalStyle } from "./styles/Global.style";
import NavContainer from "./components/Navbar";
import HeroContainer from "./components/Hero";
import AboutCards from "./components/AboutCards";
import AboutHero from "./components/AboutHero";
import HeroSection2 from "./components/HeroSection2";
import ProductShowcase from "./components/ProductShowcase";
import heroSection2 from "./images/heroSection2.jpg";
import backtobasics from "./images/backtobasics.jpg";
import footer from "./images/footer.jpg";
import Footer from "./components/Footer";
import Shop from "./components/Shop/Shop";
import Product from "./components/Shop/Product";
import ScrollTop from "./components/Utils/ScrollTop";
import NotFound from "./NotFound";
import { AnimatedSwitch } from "react-router-transition";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";

function App() {
  return (
    <Router>
      <div className="App">
        <GlobalStyle whiteColor />
        <ScrollTop />
        <AnimatedSwitch
          runOnMount={true}
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        >
          <Route exact path="/">
            <NavContainer
              position="absolute"
              logoColor="white"
              rightIcons="white"
              leftIcons="white"
              color="white"
              itemHoverLineColor="white"
              mobileMenuBackground="#363636"
            />
            <HeroContainer />
            <AboutCards />
            <AboutHero />
            <HeroSection2
              bgimg={heroSection2}
              height="668px"
              title="Classic Perfection"
              text="Each piece is lovingly handmade in our studio warehouse."
              buttontext="PURCHASE NOW"
            />
            <ProductShowcase />

            <HeroSection2
              bgimg={backtobasics}
              height="400px"
              title="Back to Basics"
              text="Simple designs and extremely sturdy quality is what we go for. Over 24 collections, suited for everyone."
              buttontext="BROWSE NOW"
            />
            <Footer bgimg={footer} width="80%" />
          </Route>

          <Route exact path="/shop">
            <NavContainer
              position="absolute"
              logoColor="black"
              rightIcons="black"
              leftIcons="black"
              color="black"
              itemHoverLineColor="black"
              mobileMenuBackground="white"
              mobileMenuItemColor="black"
            />
            <Shop />
            <Footer bgimg={footer} width="60%" />
          </Route>

          <Route exact path="/shop/product/:id">
            <NavContainer
              position="absolute"
              logoColor="black"
              rightIcons="black"
              leftIcons="black"
              color="black"
              itemHoverLineColor="black"
              mobileMenuBackground="white"
              mobileMenuItemColor="black"
            />
            <Product />
            <Footer bgimg={footer} width="60%" />
          </Route>

          <Route path="*" component={NotFound} />
        </AnimatedSwitch>
      </div>
      <CookieConsent
        // debug={true}
        buttonText="OK"
        cookieName="cookie-consent"
        sameSite="strict"
        style={{ background: "#ffffff", color: "black", padding: "0 2em" }}
        buttonStyle={{
          color: "black",
          background: "#ffffff",
          border: "1px solid black",
          fontSize: "1rem",
          minWidth: "150px",
          padding: "10px",
          fontWeight: "bold",
        }}
        expires={60}
      >
        This page uses cookies to provide necessary site functionality and
        improve your experience. By using this website, you agree to our privacy
        policy and our cookie policy.
      </CookieConsent>
    </Router>
  );
}

export default App;
