import { FunctionComponent, ReactElement } from 'react';
import Copy from '../components/Copy';

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
            <h3>API Call</h3>
            <p className='p-description'>Ping an API by clicking on the button below.</p>
            <Copy></Copy>
        </div>
    );
};
