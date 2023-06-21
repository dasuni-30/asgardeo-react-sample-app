import { getUserDetails, updateUserDetails } from "../../api/user-info";
import { useEffect, useState } from "react";

interface FormValues {
  username: string;
  email: string;
  givenName: string;
  lastName: string;
}

const initialFormValues: FormValues = {
  username: '',
  email: '',
  givenName: '',
  lastName: ''
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
        lastName: userInfo?.name?.familyName});
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formValues);
    let _formData = {
      ...userInfo,
      userName: `DEFAULT/${userInfo?.userName?.split("/")[1]}`,
      name: { familyName: formValues?.lastName, givenName: formValues?.givenName },
    };
    updateUserDetails(_formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Profile</h2>
      <table className="user-profile-table">
        <tr>
          <td>
            <label htmlFor="username">Name:</label>
          </td>
          <td>
            <input
              type="text"
              id="username"
              name="username"
              value={formValues?.username}
              readOnly
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="email">Email:</label>
          </td>
          <td>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues?.email}
              onChange={handleChange}
              readOnly
            />
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
          <td colSpan={2}>
          <button type="submit">Submit</button>
          </td>
        </tr>
      </table>
    </form>
  );
};

export default Profile;
