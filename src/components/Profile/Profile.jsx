import React from "react";
import { Image } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import "./Profile.css";

const Profile = () => {
<<<<<<< HEAD
  const { user } = useContext(UserContext);
  console.log(user)
=======
  const { user } = useAuth();

>>>>>>> 24cce2f6256f9794491381b2b468e5e04913e903
  if (!user) {
    // redirect to main page
    console.log("no user");
    return <></>;
  }

  return (
    <>
      <div className="info-container">
        <div className="user-card">
          <Image src={user.profilePic} roundedCircle width={125} alt="avatar" />
          <p className="user-name">{user.name}</p>
          <em className="user-email">{user.email}</em>
        </div>
      </div>
      {/* {user && user.userId === userData.userId ? (
        <div className="user-jobs">JOBS</div>
      ) : (
        <div />
      )} */}
    </>
  );
};

export default Profile;
