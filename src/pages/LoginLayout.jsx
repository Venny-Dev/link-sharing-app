import "react-toastify/dist/ReactToastify.css";

import { Link, Outlet, useLocation } from "react-router-dom";

function LoginCreateAccount() {
  const location = useLocation();

  return (
    <div className="font-sans h-full  md:py-[20px]  md:bg-[#D9D9D9] w-full relative">
      <div className=" max-w-[476px] max-h-[709px]  m-auto p-[32px] md:p-[40px] ">
        <header className="flex items-center justify-start md:justify-center gap-[7.5px]">
          <img src="/Vector.png" alt="logo" className="w-[33px] h-[33px]" />
          <p className="font-bold text-4xl text-[#333333]">devlinks</p>
        </header>

        <div className="bg-white max-w-[476px]  m-auto  md:p-[40px] rounded-[8px] md:mt-[51px] mb-10">
          <Outlet />

          {location.pathname === "/login" && (
            <p className="text-center w-[200px] m-auto text-[16px] mt-[24px]">
              Dont have an account?
              <Link to="signup">
                <button className="text-[#633CFF]">Create account</button>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginCreateAccount;
