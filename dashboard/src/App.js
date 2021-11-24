import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import OrderHome from './components/Order/OrderHome'
import ProductHome from './components/Product/ProductHome'
import OrderEdit from './components/Order/OrderEdit';
import PromoHome from './components/Promo/PromoHome';

function App() {
  return (
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
    </Router>  
  );
}

export default App;
