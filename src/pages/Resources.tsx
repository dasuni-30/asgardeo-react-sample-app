import { FunctionComponent, ReactElement } from 'react';
import APICall from '../components/APICall';

/**
 * Resources page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const Resources: FunctionComponent = (): ReactElement => {

    return (
        <div className='App-section'>
            <header className='App-header-sub-section'>
                <div>
                    <h1>External API</h1>
                    <p className='p-description'>Invoke an external API by clicking on the button below.</p>
                </div>
            </header>
            <APICall></APICall>
        </div>
    );
};
