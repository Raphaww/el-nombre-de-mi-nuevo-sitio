import styled from '@emotion/styled';
import { Navbar } from 'react-bootstrap';

const StyledHeader = styled.header(({bannerFullScreen}) => ({
   ...bannerFullScreen && {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 2,
   }
}));

const Header = ({bannerFullScreen}) => {
   return (
      <StyledHeader bannerFullScreen={bannerFullScreen}>
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
      </StyledHeader>
   );
};

export default Header;
