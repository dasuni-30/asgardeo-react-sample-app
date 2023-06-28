import { FunctionComponent, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Page to display for 404.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const NotFoundPage: FunctionComponent = (): ReactElement => {

    const navigate = useNavigate();

    return (
        <>
            <h3>
                404: Page not found
            </h3>
            <button className="btn primary" onClick={() => { navigate("/") }}>Go back to home</button>
        </>
    );
};
