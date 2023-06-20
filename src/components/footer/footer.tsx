import React from 'react';

// Add the date.
let date: Date = new Date();  
let year = date.getFullYear();

const Footer: React.FunctionComponent<{}> = () => {
    return (
        <div className="footer">
            <footer className="page-footer font-small blue">
                <div className="footer-copyright text-center py-3">© {`${year}`} Copyright:
                    <a href="https://wso2.com/"> WSO2.Inc</a>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
