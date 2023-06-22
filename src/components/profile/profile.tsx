import { getUserDetails, updateUserDetails } from "../../api/user-info";
import { useEffect, useState } from "react";
import SecurityMethod from "../security-method/security-method";

interface FormValues {
  username: string;
  email: string;
  givenName: string;
  lastName: string;
  id: string;
}

const initialFormValues: FormValues = {
  username: '',
  email: '',
  givenName: '',
  lastName: '',
  id: ''
};

const Profile: React.FunctionComponent = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [ userInfo, setUserInfo ] = useState<any>();

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
    if (userInfo) {
      setFormValues({
        username: userInfo?.userName?.split("/")[1],
        email: userInfo?.emails[0],
        givenName: userInfo?.name?.givenName,
        lastName: userInfo?.name?.familyName,
        id: userInfo?.id});
      console.log(formValues);
    }
  },[userInfo]);

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
      <div className="App-section">
        <form onSubmit={handleSubmit}>
          <h3>User Profile</h3>
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
              <td colSpan={2} className="tr-padding ">
              <button type="submit">Submit</button>
              </td>
            </tr>
          </table>
          <div className="notification" id="successNotification">
            <p className='p-description'>Submission successful!</p>
          </div>
        </form>
      </div>
    <SecurityMethod/>
    </>
  );
};

export default Profile;
