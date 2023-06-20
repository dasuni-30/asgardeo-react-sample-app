import { FunctionComponent, ReactElement } from "react";
import Cards from "../components/cards/cards";

/**
 * Home page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const HomePage: FunctionComponent = (): ReactElement => {

    return (
        <div className="App">
            <Cards></Cards>
        </div>
    );
};
