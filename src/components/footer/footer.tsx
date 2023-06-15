import React from 'react';

type Card = {
    title: string;
    description: string;
    link: string;
};

const Footer: React.FC<{}> = () => {
    return (
        <div className="footer">
        <footer className="page-footer font-small blue">
            <div className="footer-copyright text-center py-3">© 2023 Copyright:
                <a href="https://wso2.com/"> WSO2.Inc</a>
            </div>
        </footer>
    </div>
        
    );
}

export default Footer;