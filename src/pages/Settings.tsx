import { FunctionComponent, ReactElement } from 'react';

/**
 * Settings page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const Settings: FunctionComponent = (): ReactElement => {

  return (
    <div className='App-section'>
      <header className='App-header-sub-section'>
        <div>
          <h1>Settings</h1>
          <p className='p-description'>Hello</p>
        </div>
      </header>
    </div>
  );
};
