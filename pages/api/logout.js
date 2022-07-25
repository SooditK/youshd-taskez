import cookie from "cookie";

export default async (req, res) => {
  // delete the cookies from the request;
  const cookies = req.headers.cookie;
  console.log("COKI", req.headers.cookie);
  if (!cookies) {
    res.status(400).json({
      success: false,
      message: "Please login first",
    });
  } else {
    // get the token from the cookies;
    let token = cookies.split(";");
    if (token) {
      token = token.find((c) => c.trim().startsWith("taskez="));
      if (!token) {
        context.res.writeHead(302, {
          Location: "/signin",
        });
      } else {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("taskez", token, {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
          })
        );
        res.status(200).json({
          success: true,
          message: "Logout Successful",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Please login first",
      });
    }
  }
};
