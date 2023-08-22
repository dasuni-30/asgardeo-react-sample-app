import { getUserDetails, updatePassword, updateUserDetails } from '../api/user-info';
import { ChangeEvent, useEffect, useState } from 'react';
import $ from 'jquery'
import { useAuthContext } from '@asgardeo/auth-react';
import USER_LOGO from '../images/user.png'

/**
 * Profile component.
 */
const Profile = () => {

  const [ formValues, setFormValues ] = useState();
  const [ passwordFormValues, setpasswordFormValues ] = useState();
  const { signOut } = useAuthContext();
  const [ userInfo, setUserInfo ] = useState();

  const SCHEMA =  'urn:scim:wso2:schema';
  
  // Get the user details.
  useEffect(() => {
    (async () => {
      try {
        const response = await getUserDetails();
        setUserInfo(response);
      } catch (error) {
        // Log the error.
      }
    })();
  }, []);

  useEffect(() => {
    if (userInfo) {
      setFormValues({
        username: userInfo?.userName?.split('/')[1],
        email: userInfo?.emails[0],
        givenName: userInfo?.name?.givenName,
        lastName: userInfo?.name?.familyName,
        id: userInfo?.id,
        mfa: userInfo?.[SCHEMA]?.preferredMFAOption != null && JSON.parse(userInfo?.[SCHEMA]?.preferredMFAOption)?.authenticationOption,
        profileUrl: userInfo?.profileUrl
      });

      if (userInfo?.[SCHEMA]?.preferredMFAOption != null ) {
        $("select[name='mfa']").val(JSON.parse(userInfo?.[SCHEMA]?.preferredMFAOption)?.authenticationOption);
      }
    }
  },[ userInfo ]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setpasswordFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  function handleSelect(event) {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let _formData = {
      ...userInfo,
      userName: `DEFAULT/${userInfo?.userName?.split('/')[1]}`,
      name: { familyName: formValues?.lastName, givenName: formValues?.givenName },
      [SCHEMA]: { ...userInfo?.[SCHEMA], preferredMFAOption: "{\"authenticationOption\":\""+ formValues?.mfa + "\"}"}
    };
    try {
      updateUserDetails(_formData);
    } catch (error) {
      showNotification('Error in updating the user details.');
    } finally {
      showNotification('User details update successful.');
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    console.log(passwordFormValues)
    try {
      updatePassword(
        passwordFormValues?.currentPassword,
        `DEFAULT/${userInfo?.userName?.split('/')[1]}`,
        passwordFormValues?.newPassword
      ).then((response) => {
        if (response.status && response.status === 200) {
          showNotification('Password update successful.');
        }
        signOut();
    })
    .catch((error) => {
      if (!error.response || error.response.status === 401) {
        showNotification('Error in updating the password.');
      }
    });

    } catch (error) {
      // Log error.
    } finally {
      // Navigate to the profile page. 
    }
  };

  function showNotification(message) {
    var notification = document.getElementById('successNotification');
    notification?.classList.add('show');
    $('#notificationDescription').text(message)
    setTimeout(function() {
      notification?.classList.remove('show');
    }, 3000); // Adjust the timeout duration as needed
  }

  return (
    <>
      <div className='App-section'>
        <div className="two-column-grid">
          <div className="column">
          <header className='App-header-sub-section'>
            <div>
              <div className="avatar-large">
                <img alt='react-logo' src={ formValues?.profileUrl ?? USER_LOGO} className='link-logo-image circular-image'/>
              </div>
              <h1>{`${formValues?.givenName} ${formValues?.lastName}`} </h1>
            </div>
            <tr>
              <td>
                <p className='p-description'>Username: {formValues?.username}</p>
                <p className='p-description'>User ID: {formValues?.id}</p>
              </td>
            </tr>
          </header>
          <form onSubmit={handlePasswordSubmit}>
            <div className='info-box'>
              <div className="table-container">
                <table className="one-column-table">
                  <h3>Change Password</h3>
                  <p className='p-description justified-text'>Update your password regularly and make sure it's unique.</p>
                  <tr>
                    <td>
                      <label htmlFor='currentPassword'>Current Password:</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type='password'
                        id='currentPassword'
                        name='currentPassword'
                        onChange={handlePasswordChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='newPassword'>New Password:</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type='password'
                        id='newPassword'
                        name='newPassword'
                        onChange={handlePasswordChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='tr-align-center'>
                      <label htmlFor='hint' className='label-hint'>
                        Changing the password will result in the termination of the current session.
                        You will have to login with the newly changed password.
                      </label>
                    </td>
                  </tr>
                  <button className='btn margin-top' type='submit'>Update</button>
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
          </form>
        </div>
        
        <div className="column">
          <form onSubmit={handleSubmit}>
            <div className='info-box'>
              <div className="table-container">
                <table className="one-column-table">
                  <h3>Personal Info</h3>
                  <p className='p-description justified-text'>Update your user profile information.</p>
                  <tr>
                    <td colSpan={2} className='tr-align-center'>
                      <label htmlFor='email'>Email:</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='tr-align-center'>
                      <input
                        type='text'
                        id='email'
                        name='email'
                        readOnly
                        value={formValues?.email}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='tr-align-center'>
                      <label htmlFor='givenName'>First Name:</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='tr-align-center'>
                      <input
                        type='text'
                        id='givenName'
                        name='givenName'
                        value={formValues?.givenName}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='tr-align-center'>
                      <label htmlFor='lastName'>Last Name:</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='tr-align-center'>
                      <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        value={formValues?.lastName}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <br/>
                  <h3>Security Methods</h3>
                  <p className='p-description justified-text'>Secure your account by setting two factor authentication.</p>
                  <tr>
                    <td colSpan={2} className='tr-align-center'>
                      <label>Second Factor Authentication: </label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className='tr-align-center'>
                      <select id='mfa' name='mfa' onChange={handleSelect}>
                        <option value='false'>None</option>
                        <option value='email-otp-authenticator'>Email OTP</option>
                        <option value='SMSOTP'>SMS OTP</option>
                        <option value='totp'>TOTP</option>
                      </select>
                    </td>
                  </tr>
                  <label htmlFor='hint'>
                    Changing the password will result in the termination of the current session.
                    You will need to log in again using the updated password.
                  </label>
                  <button className='btn margin-top' type='submit'>Update</button>
                </table>
              </div> 
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  );
};

export default Profile;
