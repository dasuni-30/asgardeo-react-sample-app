import { getUserDetails, updateUserDetails } from "../../api/user-info";
import { useEffect, useState } from "react";

interface FormValues {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
}

const initialFormValues: FormValues = {
  name: '',
  email: '',
  firstName: '',
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
        name: userInfo?.userName?.split("/")[1],
        email: userInfo?.emails[0],
        firstName: userInfo?.name?.firstName,
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
      name: { familyName: formValues.lastName, firstName: formValues.firstName },
    };
    updateUserDetails(_formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>
        <strong>User Profile</strong> 
      </h3>
      <table className="user-profile-table">
        <tr>
          <td>
            <label htmlFor="name">Name:</label>
          </td>
          <td>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues?.name}
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
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="name">First Name:</label>
          </td>
          <td>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formValues?.firstName}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="name">Last Name:</label>
          </td>
          <td>
            <input
              type="text"
              id="firstName"
              name="lastName"
              value={formValues?.lastName}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <button type="submit">Submit</button>
        </tr>
      </table>
    </form>
  );
};

export default Profile;
