import BLUE_THEME from '../images/blue-theme.png'
import ORANGE_THEME from '../images/orange-theme.png'
/**
 * Settings page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */

// Get the root element
var r = document.querySelector(':root');

// Create a function for setting a variable value
function changeThemetoBlue() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty('--primary', '#1591EB');
}

// Create a function for setting a variable value
function changeThemetoOrange() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty('--primary', '#FF7300');
}
export const Settings = () => {

  return (
    <div className='App-section'>
      <header className='App-header-sub-section'>
        <h1>Settings</h1>
        <p className='p-description'>Manage the theme related settings of the application.</p>
      </header>
        <div className="table-container">
          <table className="one-column-table">
            <h3>Change Theme Color</h3>
            <p className='p-description justified-text'>
              Customize the theme color of the application user interfaces by switching between the following buttons.
            </p>
            <tr>
            <div className='row'>
              <div className='column'>
                <div className='card theme-card-height'>
                  <div className="card-container-theme">
                    <img className="theme-image" alt='react-logo' src={BLUE_THEME}/>
                    <button type="button" className="btn btn-margin-top" onClick={changeThemetoBlue}>Update to Blue</button>
                  </div>
                </div>
              </div>
              <div className='column'>
                <div className='card theme-card-height'>
                  <div className="card-container-theme">
                    <img className="theme-image" alt='react-logo' src={ORANGE_THEME}/>
                    <button type="button" className="btn-outline btn-margin-top" onClick={changeThemetoOrange}>Revert to Orange</button>
                  </div>
                </div>
              </div>
            </div>
            </tr>
            <tr>
              <td colSpan={2} className='tr-padding tr-align-center'>
                <div className='notification tr-align-center' id='successNotification'>
                  <p className='p-description' id='notificationDescription'>Submission successful!</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
  );
};
