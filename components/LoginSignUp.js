import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { VscSettings } from "react-icons/vsc";
import { HiOutlineLogin } from "react-icons/hi";
import Login from "./Login";
import SignUp from "./SignUp";

const LoginSignUp = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <div>
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-2">
          <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
            <img
              src="https://i.imgur.com/Cyxskg2.png"
              alt="logo"
              className="w-[30rem] h-auto"
            />
          </div>
          <div className="flex text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
            <Tabs
              style={{
                border: "2px solid #e6e6e6",
                borderRadius: "80px",
                padding: "50px",
              }}
            >
              <TabList
                style={{
                  display: "flex",
                  gap: "1rem",
                  paddingBottom: "1rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Tab onClick={() => setTabIndex(0)}>
                  <span
                    className={`text-2xl pb-3 ${
                      tabIndex === 0
                        ? "border-b-2 border-black text-black"
                        : "text-gray-500"
                    }`}
                  >
                    Log In
                  </span>
                </Tab>
                <Tab onClick={() => setTabIndex(1)}>
                  <span
                    className={`text-2xl pb-3 ${
                      tabIndex === 1
                        ? "border-b-2 border-black text-black"
                        : "text-gray-500"
                    }`}
                  >
                    Sign up
                  </span>
                </Tab>
              </TabList>
              {/* CREATE A DIVIDER BETWEEN TABS */}
              <div className="border-b-2 border-gray-50 mx-20 pt-10"></div>
              <TabPanel
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <Login />
              </TabPanel>
              <TabPanel
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <SignUp />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
