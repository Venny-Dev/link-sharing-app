import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    loginData,
    setIsLoading,
    handleChange,
    setLoginData,
    loginErrors,
    setLoginErrors,
  } = useAuth();

  return (
    <div>
      <form
        className="mt-[40px] md:mt-0"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(loginData, setLoginErrors, navigate, setIsLoading);
        }}
      >
        <div>
          <h1 className="font-bold text-2xl text-[#333333]">Login</h1>
          <p className="mt-[8px] text-[#737373] text-base font-sans">
            Add your details below to get back into the app
          </p>
        </div>

        <div className="flex flex-col relative mt-[40px]">
          <label
            className={`text-[#333333]  font-[400] text-[12px] leading-[18px]  ${loginErrors.email ? "text-[#FF3939]" : ""}`}
          >
            Email address
          </label>
          <input
            type="email"
            className={`border py-[12px] pr-[16px] pl-[44px] rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl  ${loginErrors.email ? "border-[#FF3939]" : ""}`}
            placeholder="e.g. alex@email.com"
            value={loginData.email}
            onChange={(e) =>
              handleChange(e, setLoginData, loginData, loginErrors)
            }
          />
          <img src="/email-icon.svg" className="absolute top-[41px] left-3" />
          {loginErrors.email && (
            <p className="text-[#FF3939] font-normal text-[12px] leading-[18px] absolute right-1 top-[39px]">
              {loginErrors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col relative mt-[24px]">
          <label
            className={`text-[#333333] font-[400] text-[12px] leading-[18px]  ${loginErrors.password ? "text-[#FF3939]" : ""}`}
          >
            Password
          </label>
          <input
            type="password"
            className={`border py-[12px] pr-[16px] pl-[44px] rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl  ${loginErrors.password ? "border-[#FF3939]" : ""}`}
            placeholder="Enter your password"
            value={loginData.password}
            onChange={(e) =>
              handleChange(e, setLoginData, loginData, loginErrors)
            }
          />
          <img src="/lock-key.svg" className="absolute top-[40px] left-3" />
          {loginErrors.password && (
            <p className="text-[#FF3939] font-normal text-[12px] leading-[18px] absolute right-1 top-[39px]">
              {loginErrors.password}
            </p>
          )}
        </div>

        <button className="bg-[#633CFF] text-white py-[11px] px-[27px] rounded-[8px] font-semibold text-[16px] leading-[24px] w-full text-center mt-[24px]">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
