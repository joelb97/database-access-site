import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import githubIcon from '../../assets/github-icon.png';
import databaseIcon from '../../assets/database-icon-white.png';

const Navbar = () => {
  return (
    <div>
        <Nav>
            <NavMenu>
                <NavLink to="/products" activeStyle>
                    <img src={databaseIcon}  className={'icon'}></img>
                    Products Database
                </NavLink>
                <NavLink to="/population" activeStyle>
                    <img src={databaseIcon}  className={'icon'}></img>
                    Population Database
                </NavLink>
                <a href='https://github.com/joelb97/database-access-site' className="github">
                    <img src={githubIcon}  className={'icon'}></img>
                </a>
            </NavMenu>
        </Nav>
    </div>
  );
};
  
export default Navbar;