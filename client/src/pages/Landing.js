import mainImg from "../assets/images/main.svg";
import { Logo } from "../components";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link, Navigate } from "react-router-dom";
import React from "react";
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const { user } = useAppContext();
  return (
    <React.Fragment>
      {user && <Navigate to="/" />}
      <Wrapper>
        <main>
          <nav>
            <Logo />
          </nav>
          <div className="container page">
            <div className="info">
              <h1>
                Job <span>Tracking </span> App
              </h1>
              <p>
                I'm baby selvage PBR&B four dollar toast, chia offal kickstarter
                you probably haven't heard of them. Cloud bread glossier unicorn
                knausgaard tilde messenger bag. Truffaut poke raw denim fashion
                axe palo santo mustache, everyday carry woke microdosing VHS
                brunch fanny pack.
              </p>
              <Link to="/register" className="btn  btn-hero">
                Login/Register
              </Link>
            </div>
            <div>
              <img src={mainImg} alt="job hunt" className="img main-img" />
            </div>
          </div>
        </main>
      </Wrapper>
    </React.Fragment>
  );
};

export default Landing;
