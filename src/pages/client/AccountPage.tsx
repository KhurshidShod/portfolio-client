import { Fragment, useEffect, useState } from "react";
import useGetUser from "../../zustand/user";
import Img from "../../assets/images/NoUserPhoto.png";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Flex, Form, Input, Upload } from "antd";

import styles from "./AccountPage.module.scss";
import { onImageError } from "../../helpers/ImageErrorHandle";
import { useForm } from "antd/es/form/Form";

const { TextArea } = Input;

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

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AccountPage = () => {
  const [userData, setUserData] = useState<User | undefined>();
  const { user, getUser, getUserSkills, skills } = useGetUser();
  const [form] = Form.useForm();

  useEffect(() => {
    getUser();
    setUserData(user);
    getUserSkills(user?._id);
  }, [getUser, user, getUserSkills, userData]);

  return (
    <Fragment>
      <div className={styles.editModal}>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600, padding: "1rem", borderRadius: "15px" }}
        >
          <Flex
            wrap="wrap"
            justify="space-between"
            align="start"
            style={{ width: "100%" }}
            gap={10}
          >
            <Form.Item
              style={{
                width: "250px",
              }}
              label="Firstname"
              name="firstName"
              rules={[
                { required: true, message: "Please input your firstname!" },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              style={{
                width: "250px",
              }}
              label="Lastname"
              name="lastName"
              wrapperCol={{ offset: 0, span: 24 }}
              rules={[
                { required: true, message: "Please input your lastname!" },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              style={{
                width: "250px",
              }}
              label="Username"
              name="username"
              wrapperCol={{ offset: 0, span: 24 }}
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              style={{
                width: "250px",
              }}
              label="Email"
              name="email"
              wrapperCol={{ offset: 0, span: 24 }}
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              style={{
                width: "250px",
              }}
              label="Phone number"
              name="phoneNumber"
              wrapperCol={{ offset: 0, span: 24 }}
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              style={{
                width: "250px",
              }}
              label="Info"
              name="info"
              wrapperCol={{ offset: 0, span: 24 }}
              rules={[
                { required: true, message: "Please input your phone info!" },
              ]}
            >
              <TextArea
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              style={{
                width: "250px",
              }}
              label="Birthday"
              name="birthday"
              wrapperCol={{ offset: 0, span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your phone birthday!",
                },
              ]}
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 0, span: 24 }}
              style={{
                width: "100%",
              }}
            >
              <Button
                style={{
                  width: "100%",
                }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </div>
      <section className={styles.account}>
        <div className="container">
          <div className={styles.account__wrapper}>
            <div className={styles.account__wrapper_user}>
              <div>
                <h1>User</h1>
                <div>
                  <img
                    onError={(e) => onImageError(e, Img)}
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
                <button>Add skill</button>
              </h1>
              <div className={styles.account__wrapper_skills_wrapper}>
                {skills?.length ? (
                  skills?.map((skill) => (
                    <div
                      key={skill._id}
                      className={styles.account__wrapper_skills_wrapper_skill}
                    >
                      <p>{skill.name}</p>
                      <div>
                        <span
                          style={{
                            width: `${
                              skill.percent < 100 ? skill.percent : 100
                            }%`,
                          }}
                        ></span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No skills yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AccountPage;
