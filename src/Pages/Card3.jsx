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
            <div id="tab-1" onClick={() => navigate('/')} className="tab-item tab-border">
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
      
           {/* Tab Content 3  */}
             <div id="tab-3-content" className="tab-content-item">
                <div className="text-center">
                    <p className="text-lg">
                        Choose one plan and watch everything on Netflix.
                    </p>
                    <a href="#" className="btn btn-lg">Watch Free For 30 Days</a>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Basic</th>
                            <th>Standard</th>
                            <th>Premium</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Monthly price after free month ends on 6/19/19</td>
                            <td>$8.99</td>
                            <td>$12.99</td>
                            <td>$15.99</td>
                        </tr>
                        <tr>
                            <td>HD Available</td>
                            <td><i className="fas fa-times"></i></td>
                            <td><i className="fas fa-check"></i></td>
                            <td><i className="fas fa-check"></i></td>
                        </tr>
                        <tr>
                            <td>Ultra HD Available</td>
                            <td><i className="fas fa-times"></i></td>
                            <td><i className="fas fa-times"></i></td>
                            <td><i className="fas fa-check"></i></td>
                        </tr>
                        <tr>
                            <td>Screens you can watch on at the same time</td>
                            <td>1</td>
                            <td>2</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>Watch on your laptop, TV, phone and tablet</td>
                            <td><i className="fas fa-check"></i></td>
                            <td><i className="fas fa-check"></i></td>
                            <td><i className="fas fa-check"></i></td>
                        </tr>
                        <tr>
                            <td>Unlimited movies and TV shows</td>
                            <td><i className="fas fa-check"></i></td>
                            <td><i className="fas fa-check"></i></td>
                            <td><i className="fas fa-check"></i></td>
                        </tr>
                        <tr>
                            <td>Cancel anytime</td>
                            <td><i className="fas fa-check"></i></td>
                            <td><i className="fas fa-check"></i></td>
                            <td><i className="fas fa-check"></i></td>
                        </tr>
                        <tr>
                            <td>First month free</td>
                            <td><i className="fas fa-check"></i></td>
                            <td><i className="fas fa-check"></i></td>
                            <td><i className="fas fa-check"></i></td>
                        </tr>
                    </tbody>
                </table>
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
	border-bottom: 3px solid #3d3d3d;
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

.tab-border {
	border-bottom: var(--primary-color) 4px solid;
}

/* Tab Content */
.tab-content {
	padding: 3rem 0;
	background: #000;
	color: #fff;
}


#tab-3-content .tab-3-content-top {
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-gap: 1rem;
	justify-content: center;
	align-items: center;
}

#tab-3-content .tab-3-content-bottom {
	margin-top: 2rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 2rem;
	text-align: center;
  img{
    width: 100%;
  }
}

#tab-3{
  border-bottom: 4px solid #b30009;
}
/* Container */
.container {
	max-width: 63%;
	margin: auto;
	overflow: hidden;
	padding: 0 2rem;
  font-size: 0.9rem;
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

#tab-2-content .tab-2-content-bottom {
	margin-top: 2rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 2rem;
	text-align: center;
}

.table {
	width: 100%;
	margin-top: 2rem;
	border-collapse: collapse;
	border-spacing: 0;
}

.table thead th {
	text-transform: uppercase;
	padding: 0.8rem;
}

.table tbody {
	display: table-row-group;
	vertical-align: middle;
	border-color: inherit;
}

.table tbody tr td {
	color: #999;
	padding: 0.8rem 1.2rem;
	text-align: center;
}

.table tbody tr td:first-child {
	text-align: left;
}

.table tbody tr:nth-child(odd) {
	background: #222;
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