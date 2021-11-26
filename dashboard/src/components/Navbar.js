import { Link } from 'react-router-dom'; 

const Navbar = () => {
    return (  
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Smelly Story Dashboard</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Orders</Link>
          </li>
          <li className="navbar-item">
          <Link to="/productHome" className="nav-link">Products</Link>
          </li>
          <li className="navbar-item">
          <Link to="/promoHome" className="nav-link">Promos</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
}
 
export default Navbar;