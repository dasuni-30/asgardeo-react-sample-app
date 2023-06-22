import { FunctionComponent, ReactElement } from "react";
import Copy from "../components/copy/copy";

/**
 * Home page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const ResourcesPage: FunctionComponent = (): ReactElement => {

    return (
    <div className="App-section">
        <h1>External API</h1>
        <Copy></Copy>
    </div>
    );
};
