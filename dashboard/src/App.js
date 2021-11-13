import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
// import Invoice from './Invoice';
import Record from './components/Record';

function App() {
  return (
    <Router>
      <div className="Container">
      <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          {/* <Route path="/invoice/:id" component={Invoice}/> */}
          <Route path="/record/:id" component={Record} />
        </Switch>
      </div>
    </Router>  
  );
}

export default App;
