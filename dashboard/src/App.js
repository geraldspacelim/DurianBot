import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import ProductHome from './components/Product/ProductHome'
// import Invoice from './Invoice';
import EditOrder from './components/EditOrder';

function App() {
  return (
    <Router>
      <div className="Container">
      <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          {/* <Route path="/invoice/:id" component={Invoice}/> */}
          <Route path="/editOrder/:id" component={EditOrder} />
          <Route path="/productHome" exact component={ProductHome}/>
        </Switch>
      </div>
    </Router>  
  );
}

export default App;
