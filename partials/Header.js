import { Navbar } from 'react-bootstrap';
const Header = () => {
   return (
      <header>
         <Navbar>
            <Navbar.Brand>Example</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
               <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                     <a className="nav-link">
                        About
                     </a>
                  </li>
               </ul>
            </Navbar.Collapse>
         </Navbar>
      </header>
   );
};

export default Header;
