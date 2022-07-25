import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { HiOutlineLogin } from "react-icons/hi";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    checkbox: false,
  });
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    toast.loading("Loading...");
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        checkbox: formData.checkbox,
      }),
    });
    const data = await res.json();
    if (data.success) {
      toast.dismiss();
      toast.success(data.message);
      // redirect to home page
      router.push("/");
    } else {
      toast.dismiss();
      toast.error(data.message);
    }
  }
  return (
    <div className="w-full md:w-full mx-auto md:mx-0">
      <div className="bg-white px-16 py-10 flex flex-col w-full rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
          To Continue
        </h2>
        <p className="text-gray-500 text-left mb-5">
          We need your Name &amp; Email
        </p>
        <form className="w-[20rem]">
          <div className="flex flex-col mb-8 w-full mt-5">
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
            />
          </div>
          <div className="flex flex-col mb-8 w-full mt-5">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
            />
          </div>
          <div id="button" className="flex flex-col w-full my-5">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-4 bg-green-600 rounded-lg text-green-100"
            >
              <div className="flex flex-row items-center justify-center">
                <div className="mr-2">
                  <HiOutlineLogin className="text-2xl" />
                </div>
                <div className="font-bold">Log In</div>
              </div>
            </button>
            <div className="flex justify-evenly mt-5">
              <div className="flex w-full items-center justify-start gap-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.checkbox}
                  onChange={(e) =>
                    setFormData({ ...formData, checkbox: !formData.checkbox })
                  }
                  className="form-checkbox h-4 w-4 text-green-500"
                />
                <label htmlFor="remember" className="text-gray-500">
                  Remember me
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
