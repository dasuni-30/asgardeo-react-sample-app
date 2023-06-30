import { getUserDetails, updateUserDetails } from '../api/user-info';
import { ChangeEvent, useEffect, useState } from 'react';
import $ from 'jquery'

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

const Profile: React.FunctionComponent = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
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
        mfa: JSON.parse(userInfo?.[SCHEMA]?.preferredMFAOption)?.authenticationOption});
      $("select[name='mfa']").val(JSON.parse(userInfo?.[SCHEMA]?.preferredMFAOption)?.authenticationOption);
    }
  },[ userInfo ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
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
      // Log error.
    } finally {
      // Navigate to the profile page. 
    }
    
    showNotification();
  };

  function showNotification() {
    var notification = document.getElementById('successNotification');
    notification?.classList.add('show');
    setTimeout(function() {
      notification?.classList.remove('show');
    }, 3000); // Adjust the timeout duration as needed
  }

  return (
    <>
      <div className='App-section'>
        <form onSubmit={handleSubmit}>
          <h3>User Profile</h3>
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
            </div>
            <br/>
            <div className='info-box'>
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
                    <option value='email-otp-authenticator'>Email OTP</option>
                    <option value='SMSOTP'>SMS OTP</option>
                    <option value='totp'>TOTP</option>
                  </select>
                </td>
              </tr>
            </div>
            <tr>
              <td colSpan={2} className='tr-padding tr-align-center'>
                <button type='submit' className='button'>Update</button>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='tr-padding tr-align-center'>
                <div className='notification tr-align-center' id='successNotification'>
                  <p className='p-description'>Submission successful!</p>
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
