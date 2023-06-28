import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../Components/Backgroundimge";
import Footer from "../Components/Footer";
import Header from "../Components/Heder";
import { firebaseAuth } from "../Utils/Firebase-confing";
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          {showPassword && <button onClick={handleSignIn}>Log In</button>}
        </div>
      </div>
      <section className="tabs">
        <div className="container">
            <div id="tab-1"  className="tab-item tab-border">
                <i className="fas fa-door-open fa-3x"></i>
                <p className="hide-sm">Cancel at any time</p>
            </div>
            <div id="tab-2" onClick={() => navigate('/card2')} className="tab-item">
                <i className="fas fa-tablet-alt fa-3x"></i>
                <p className="hide-sm">Watch anywhere</p>
            </div>
            <div id="tab-3" onClick={() => navigate('/card3')} className="tab-item">
                <i className="fas fa-tags fa-3x"></i>
                <p className="hide-sm">Pick your price</p>
            </div>
        </div>
    </section>
    <section className="tab-content">
        <div className="container">                                                     
             {/* Tab Content 1  */}
            <div id="tab-1-content" className="tab-content-item show">
                <div className="tab-1-content-inner">
                    <div>
                        <p className="text-lg">
                            If you decide Netflix isn't for you - no problem. No commitment.
                            Cancel online anytime.
                        </p>
                        <a href="#" className="btn btn-lg">Watch Free For 30 Days</a>
                    </div>
                    <img src="https://i.ibb.co/J2xDJV7/tab-content-1.png" alt="" />
                </div>
            </div>

        </div>
    </section>
    <Footer/>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }




/* Tabs */
.tabs {
	background: var(--dark-color);
	padding-top: 1rem;
	border-right: none;
}

.tabs .container {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 1rem;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.tabs p {
	font-size: 1.2rem;
	padding-top: 0.5rem;
}

.tabs .container > div {
	padding: 1.5rem 0;
  
	
}

.tabs .container > div:hover {
	color: #fff;
	cursor: pointer;
}


/* Tab Content */
.tab-content {
	padding: 3rem 0;
	background: #000;
	color: #fff;
}

/* Hide initial content */
#tab-1-content{
   img{
    width: 63vh;
   }
}
#tab-1{
  border-bottom: 4px solid #b30009;
}



#tab-1-content .tab-1-content-inner {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 2rem;
	align-items: center;
	justify-content: center;
}



/* Container */
.container {
	max-width: 63%;
	margin: auto;
	overflow: hidden;
	padding: 0 2rem;
}

/* Text Styles */
.text-xl {
	font-size: 2rem;
}

.text-lg {
	font-size: 1.8rem;
	margin-bottom: 1rem;
}

.text-md {
	margin-bottom: 1.5rem;
	font-size: 1.2rem;
}

.text-center {
	text-align: center;
}

.text-dark {
	color: #999;
}

/* Buttons */
.btn {
	display: inline-block;
	background: var(--primary-color);
	color: #fff;
	padding: 0.4rem 1.3rem;
	font-size: 1rem;
	text-align: center;
	border: none;
	cursor: pointer;
	margin-right: 0.5rem;
	transition: opacity 0.2s ease-in;
	outline: none;
	box-shadow: 0 1px 0 rgba(0, 0, 0, 0.45);
	border-radius: 2px;
}

.btn:hover {
	opacity: 0.9;
}

.btn-rounded {
	border-radius: 5px;
}

.btn-xl {
	font-size: 2rem;
	padding: 1.5rem 2.1rem;
	text-transform: uppercase;
}

.btn-lg {
	font-size: 1rem;
	padding: 0.6rem 1.3rem;
	text-transform: uppercase;
  background-color: red;
  text-decoration: none;
}

.btn-icon {
	margin-left: 1rem;
}



  
`;

export default Signup