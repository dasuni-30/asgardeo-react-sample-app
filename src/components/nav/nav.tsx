import React from 'react';
import styles from './Nav.module.css';
import * as data from './links.json';
import ASGARDEO_LOGO from "../../images/asgardeo-logo-transparent.png";
import routesConfig from '../../configs/routes-config';
import { useNavigate } from 'react-router-dom';
const linksString = JSON.stringify(data);
const links = JSON.parse(linksString).links;

type Link = {
    label: string;
    href: string;
};

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
    
    return (
        <div className={styles['links-container']}>
            {links.map((link: Link) => {
                return (
                    <div key={link.href} className={styles['link']}>
                        <a href={link.href}>
                            {link.label}
                        </a>
                    </div>
                )
            })}
        </div>
    )
};

const Nav: React.FC<{}> = () => {
    const navigate = useNavigate();
    const routeChange = () =>{ 
    let path = routesConfig.profile; 
    navigate(path);
  }
    return (
        <nav className={styles.navbar}>
            <div className={styles['logo-container']}>
            <div onClick={() => navigate(routesConfig.home)}><img alt="react-logo" src={ ASGARDEO_LOGO } className="react-logo-image"/></div>
            <button onClick={routeChange}>Profile</button>
            </div>
            <Links links={links} />
        </nav>
    )
}

export default Nav;