import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import OrderHome from './components/Order/OrderHome'
import ProductHome from './components/Product/ProductHome'
import OrderEdit from './components/Order/OrderEdit';
import PromoHome from './components/Promo/PromoHome';
import LoginHome from './components/Login/LoginHome'
import { useState, useEffect } from 'react';
const axios = require('axios');

function App() {

  const [isLoggedIn, setIsloggedin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsloggedin(sessionStorage.getItem("isLoggedIn"))
  }, [])

  const login = details => {
    setIsLoading(true)
    axios.post("http://localhost:8080/api/v1/login/authenticate",  details, {
      "Content-Type": "application/json"
    }).then(res => {
      console.log(res.status)
      setIsLoading(false);
      if (res.status == 400) {
        alert("Wrong Credentials")
      } else {
       sessionStorage.setItem("isLoggedIn", true);
       setIsloggedin(true)
      }
    }).catch(err => {
      alert("Wrong Credentials")
    })
  }

  return (
    <>
      <div className="loader" hidden={!isLoading}></div>
      {isLoggedIn ? 
            <Router>
              <div className="Container">
              <Navbar/>
                <Switch>
                  <Route path="/" exact component={OrderHome}/>
                  <Route path="/editOrder/:id" component={OrderEdit} />
                  <Route path="/productHome" exact component={ProductHome}/>
                  <Route path="/promoHome" exact component={PromoHome}/>

                </Switch>
              </div>
            </Router>  :  <LoginHome login={login}/>
          }
    </>
    
  );
}

export default App;
