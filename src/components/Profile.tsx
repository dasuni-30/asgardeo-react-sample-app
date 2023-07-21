import { getUserDetails, updatePassword, updateUserDetails } from '../api/user-info';
import { ChangeEvent, useEffect, useState } from 'react';
import $ from 'jquery'
import { useAuthContext } from '@asgardeo/auth-react';

interface FormValues {
  username?: string;
  email?: string;
  givenName?: string;
  lastName?: string;
  id?: string;
  mfa?: string;
}

const initialFormValues: FormValues = {
  username: '',
  email: '',
  givenName: '',
  lastName: '',
  id: '',
  mfa: ''
};
interface PasswordFormValues {
  currentPassword?: string;
  newPassword?: string;
}

const initialPasswordFormValues: PasswordFormValues = {
  currentPassword: '',
  newPassword: ''
};

/**
 * Profile component.
 */
const Profile: React.FunctionComponent = () => {

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [passwordFormValues, setpasswordFormValues] = useState<PasswordFormValues>(initialPasswordFormValues);
  const { signOut } = useAuthContext();
  const [ userInfo, setUserInfo ] = useState<any>();

  const SCHEMA: string=  'urn:scim:wso2:schema';
  
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
        mfa: userInfo?.[SCHEMA]?.preferredMFAOption != null && JSON.parse(userInfo?.[SCHEMA]?.preferredMFAOption)?.authenticationOption});

      if (userInfo?.[SCHEMA]?.preferredMFAOption != null ) {
        $("select[name='mfa']").val(JSON.parse(userInfo?.[SCHEMA]?.preferredMFAOption)?.authenticationOption);
      }
    }
  },[ userInfo ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setpasswordFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  function handleSelect(event: ChangeEvent<HTMLSelectElement>): void {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  }

  const handleSubmit = async (event: React.FormEvent) => {
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

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(passwordFormValues)
    try {
      updatePassword(
        passwordFormValues?.currentPassword,
        `DEFAULT/${userInfo?.userName?.split('/')[1]}`,
        passwordFormValues?.newPassword
      ).then((response: any) => {
        if (response.status && response.status === 200) {
          showNotification('Password update successful.');
        }
        signOut();
    })
    .catch((error: any) => {
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

  function showNotification(message: string) {
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
        <header className='App-header-sub-section'>
          <div>
              <h1>User Profile</h1>
              <p className='p-description'>View and update the user profile.</p>
          </div>
        </header>
        <form onSubmit={handleSubmit}>
          <table className='user-profile-table'>
          <div className='info-box'>
            <h3>Personal Info</h3>
            <p className='p-description'>Update your user profile information.</p>
              <tr>
                <td>
                  <label htmlFor='username'>Username:</label>
                </td>
                <td>
                  <label>{formValues?.username}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='userid'>User ID:</label>
                </td>
                <td>
                  <label>{formValues?.id}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='email'>Email:</label>
                </td>
                <td>
                  <label>{formValues?.email}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='givenName'>First Name:</label>
                </td>
                <td>
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
                <td>
                  <label htmlFor='lastName'>Last Name:</label>
                </td>
                <td>
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
              <tr>
                <td colSpan={2} className='tr-align-center'>
                  <h3>Security Methods</h3>
                  <p className='p-description'>Secure your account by setting two factor authentication.</p>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className='tr-align-center'>
                  <label>Second Factor Authentication: </label>
                  <select id='mfa' name='mfa' onChange={handleSelect}>
                    <option value='false'>None</option>
                    <option value='email-otp-authenticator'>Email OTP</option>
                    <option value='SMSOTP'>SMS OTP</option>
                    <option value='totp'>TOTP</option>
                  </select>
                </td>
              </tr>
              <tr>
              <td colSpan={2} className='tr-padding tr-align-center'>
                <button className='btn' type='submit'>Update</button>
              </td>
            </tr>
            </div>
          </table>
        </form>
        <form onSubmit={handlePasswordSubmit}>
        <table className='user-profile-table'>
        <div className='info-box'>
              <tr>
                <td colSpan={2} className='tr-align-center'>
                  <h3>Change Password</h3>
                  <p className='p-description'>Update your password regularly and make sure it's unique.</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='currentPassword'>Current Password:</label>
                </td>
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
                <label htmlFor='hint'>
                  Changing the password will result in the termination of the current session.
                  <br/>
                  You will have to login with the newly changed password.
                </label>
              </td>
              </tr>
              <tr>
              <td colSpan={2} className='tr-padding tr-align-center'>
                <button className='btn' type='submit'>Update</button>
              </td>
              </tr>
            </div>
            <tr>
              <td colSpan={2} className='tr-padding tr-align-center'>
                <div className='notification tr-align-center' id='successNotification'>
                  <p className='p-description' id='notificationDescription'>Submission successful!</p>
                </div>
              </td>
            </tr>
            </table>
        </form>
      </div>
    </>
  );
};

export default Profile;
