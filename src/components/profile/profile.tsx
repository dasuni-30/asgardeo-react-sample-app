import { getUserDetails } from "../../api/user-info";
import { useEffect, useState } from "react";

function Profile() {
  const [ userInfo, setUserInfo ] = useState<any>();


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

    return (
          <div>
            <form>
              <h3>
                <strong>User Profile</strong> 
              </h3>
            <table className="user-profile-table ">
            <tr>
              <td><strong>Username:</strong></td>
              <td><input type="text" id="name" name="name" value={userInfo?.userName.split("/")[1]} required/></td>
            </tr>
            <tr>
            <td><strong>Email:</strong>{" "}</td>
            <td><input type="text" id="name" name="name" value={userInfo?.emails[0]}required/></td>
            </tr>
            <tr>
            <td><strong>First Name:</strong></td>
            <td><input type="text" id="name" name="name" required/></td>
            </tr>
            <tr>
            <td><strong>Last Name:</strong></td>
            <td><input type="text" id="name" name="name" value={userInfo?.name?.familyName} required/></td>
            </tr>
            </table>
            <input type="submit" value="Submit"/>
            </form>

      </div>
      
      );
    }

export default Profile;
