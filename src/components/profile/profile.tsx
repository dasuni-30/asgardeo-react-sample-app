import { getUserDetails, updateUserDetails } from "../../api/user-info";
import { useEffect, useState } from "react";

interface FormValues {
  username: string;
  email: string;
  givenName: string;
  lastName: string;
  id: string;
  mfa: string;
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

  const SCHEMA: string=  "urn:scim:wso2:schema";
 
    let element = document.getElementById("mfa");
    console.log(element?.innerHTML);
  
  // Get the user details.
  useEffect(() => {
    (async () => {
      try {
        const response = await getUserDetails();
        console.log(response);
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(userInfo);
    
    if (userInfo) {
      setFormValues({
        username: userInfo?.userName?.split("/")[1],
        email: userInfo?.emails[0],
        givenName: userInfo?.name?.givenName,
        lastName: userInfo?.name?.familyName,
        id: userInfo?.id,
        mfa: "option2"});
    }
  },[ userInfo ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formValues);
    let _formData = {
      ...userInfo,
      userName: `DEFAULT/${userInfo?.userName?.split("/")[1]}`,
      name: { familyName: formValues?.lastName, givenName: formValues?.givenName },
      [SCHEMA]: { ...userInfo?.[SCHEMA], preferredMFAOption: "{\"authenticationOption\":\"email-otp-authenticator\"}"}
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

  console.log("formValues: ", formValues);
  

  return (
    <>
      <div className="App-section">
        <form onSubmit={handleSubmit}>
          <h3>User Profile</h3>
          <p className="p-description">Update your user profile information.</p>
          <table className="user-profile-table">
            <tr>
              <td>
                <label htmlFor="username">Username:</label>
              </td>
              <td>
                <label>{formValues?.username}</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="userid">User ID:</label>
              </td>
              <td>
                <label>{formValues?.id}</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <label>{formValues?.email}
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="givenName">First Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="givenName"
                  name="givenName"
                  value={formValues?.givenName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="lastName">Last Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formValues?.lastName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <div className="notification tr-align-center" id="successNotification">
              <p className='p-description'>Submission successful!</p>
              </div>
            </tr>
            <br/>
            <tr>
              <td colSpan={2} className="tr-align-center">
            <h3>Security Methods</h3>
            <p className="p-description">Secure your account by setting two factor authentication.</p>
            </td>
            </tr>
            <tr>
            <td colSpan={2} className="tr-align-center">
            <label>Second Factor Authentication: </label>
            <select id="mfa" value={formValues?.mfa || ""}>
              <option value="">Select</option>
              <option value="option1">SMS OTP</option>
              <option value="option2">Email OTP</option>
              <option value="option3">TOTP</option>
            </select>
            </td>
            </tr>
            <tr>
              <td colSpan={2} className="tr-padding tr-align-center">
                <button type="submit">Submit</button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </>
  );
};

export default Profile;
