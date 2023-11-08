import { useEffect, useState } from "react";
import useGetUser from "../../zustand/user";

import styles from "./AccountPage.module.scss";
import { useParams } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
  photo: string;
  info: string;
  username: string;
  birthday: string;
  email: string;
  phoneNumber: string;
  role: string;
  _id: string;
}

const UserPage = () => {
  const [userData, setUserData] = useState<User | undefined>();
  const { userWithId, getUserWithId, userSkills, getUserSkills } = useGetUser();
  const params = useParams();
  useEffect(() => {
    getUserWithId(params.id);
    setUserData(userWithId);
    getUserSkills(params.id);
  }, [getUserWithId, userWithId, params, getUserSkills]);
  return (
    <section className={styles.account}>
      <div className="container">
        <div className={styles.account__wrapper}>
          <div className={styles.account__wrapper_user}>
            <div>
              <h1>User</h1>
              <div>
                <img
                  src={`https://ap-portfolio-backend.up.railway.app/upload/${userData?.photo}`}
                  alt=""
                />
                <div>
                  <h3>
                    Fullname:{" "}
                    <span>
                      {userData?.firstName} {userData?.lastName}
                    </span>
                  </h3>
                  <p>
                    Username:{" "}
                    <span>
                      <i>{userData?.username}</i>
                    </span>
                  </p>
                  <p>
                    Birthday:{" "}
                    <span>
                      {userData?.birthday
                        ?.slice(0, 10)
                        .split("-")
                        .reverse()
                        .join(".")}
                    </span>
                  </p>
                  <p>
                    Role:{" "}
                    <span>
                      <i>{userData?.role}</i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h1>About</h1>
              <i>{userData?.info}</i>
            </div>
            <div>
              <h1>Contact</h1>
              <p>
                Email: <span>{userData?.email}</span>
              </p>
              <p>
                Phone number:{" "}
                <a href={`tel: ${userData?.phoneNumber}`}>
                  <span>
                    {userData?.phoneNumber?.slice(0, 4)}-
                    {userData?.phoneNumber?.slice(4, 6)}-
                    {userData?.phoneNumber?.slice(6, 9)}-
                    {userData?.phoneNumber?.slice(9, 11)}-
                    {userData?.phoneNumber?.slice(11, 13)}
                  </span>
                </a>
              </p>
            </div>
          </div>
          <div className={styles.account__wrapper_skills}>
            <h1>
              Skills <span></span>
            </h1>
            <div className={styles.account__wrapper_skills_wrapper}>
              {userSkills?.map((skill) => (
                <div
                  key={skill._id}
                  className={styles.account__wrapper_skills_wrapper_skill}
                >
                  <p>{skill.name}</p>
                  <div>
                    <span
                      style={{
                        width: `${skill.percent < 100 ? skill.percent : 100}%`,
                      }}
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.account__wrapper_educations}>
            <h1>
              Education <span></span>
            </h1>
            <div className={styles.account__wrapper_educations_wrapper}>
              <div
                className={styles.account__wrapper_educations_wrapper_education}
              >
                <h2>Bachelor of Science in Computer Science</h2>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
