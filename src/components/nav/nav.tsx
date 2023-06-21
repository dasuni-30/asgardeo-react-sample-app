import React, { useEffect, useState } from 'react';
import * as data from './links.json';
import ASGARDEO_LOGO from "../../images/asgardeo-logo-transparent.png";
import routesConfig from '../../configs/routes-config';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';

const linksString = JSON.stringify(data);
const links = JSON.parse(linksString).links;

type Link = {
    label: string;
    href: string;
};

const Links: React.FunctionComponent<{ links: Link[] }> = ({ links }) => {
    
    return (
        <>
            {links.map((link: Link) => {
                return (
                    <a href={link.href}>
                        {link.label}
                    </a>
                )
            })}
        </>
    )
};

const Nav: React.FunctionComponent<{}> = () => {
    const { state, signIn, signOut } = useAuthContext();
    const [ isResourcesAllowed, setIsResourcesAllowed ] = useState<boolean>();

    const navigate = useNavigate();

    const routeProfileChange = () =>{ 
        let path = routesConfig.profile; 
        navigate(path);
    }

    const routeResourcesChange = () =>{ 
        let path = routesConfig.resource; 
        navigate(path);
    }

    // Filter the cutsom scope from the allowed scopes.
    useEffect(() => {
        if (state.isAuthenticated && state?.allowedScopes?.includes("read_profile")) {
            setIsResourcesAllowed(true);
        } 
    }, [state]);

    return (
        <div className="navbar">
            <div className="left-panel">
                <div onClick={() => navigate(routesConfig.home)}>
                    <img alt="react-logo" src={ ASGARDEO_LOGO } className="react-logo-image"/>
                </div>
            </div>
            <div className="center-panel">
                <h3>Start Pack</h3>
            </div>
             <div className="right-panel">
                { 
                    state.isAuthenticated
                    && <a href="" onClick={routeProfileChange}>Profile</a>
                }
                <Links links={links} />
                {
                    isResourcesAllowed
                    && <a href="" onClick={routeResourcesChange}>Resources</a>
                }
                { state.isAuthenticated ? (
                    <button className='btn' onClick={() => signOut()}>Signout</button>
                ) : (
                    <>
                        <button className='btn' onClick={() => signIn()}>Signin</button>
                        <a href='https://accounts.asgardeo.io/t/dasuorg/accountrecoveryendpoint/register.do?client_id='>
                            <button className='btn'>Signup</button>
                        </a>
                    </>
                ) }
            </div>
        </div>
    )
}

export default Nav;
