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
                <strong>{"User "}</strong> Profile
              </h3>
            <p>
              <strong>Username:</strong>
              <input type="text" id="name" name="name" value={userInfo?.userName.split("/")[1]} required/>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <input type="text" id="name" name="name" value={userInfo?.emails[0]}required/>
            </p>
            <p>
            <strong>First Name:</strong>
            <input type="text" id="name" name="name" required/>
            </p>
            <p>
            <strong>Last Name:</strong>
            <input type="text" id="name" name="name" required/>
            </p>
            <input type="submit" value="Submit"/>
            </form>

      </div>
      
      );
    }

export default Profile;
