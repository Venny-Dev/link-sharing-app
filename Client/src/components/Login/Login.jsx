import { useForm } from "react-hook-form";
import { useLogin } from "../../reactQueryHooks/useAuth";
import { validateEmail } from "../../utils/helpers";
import Loader from "../Loader";
import { Link } from "react-router-dom";

function Login() {
  const { register, handleSubmit, formState, setError } = useForm();

  const { login, isLoggingIn } = useLogin();

  const errors = formState.errors;

  function onSubmit(data) {
    if (data.password.length < 8) {
      return setError("password", {
        message: "Password should be at least 8 characters",
      });
    }
    // console.log(data);
    login(data);
  }
  return (
    <div>
      <form
        className="mt-[40px] md:mt-0"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="font-bold text-2xl text-[#333333]">Login</h1>
          <p className="mt-[8px] text-[#737373] text-base font-sans">
            Add your details below to get back into the app
          </p>
        </div>

        <div className="flex flex-col relative mt-[40px]">
          <label
            className={`text-[#333333]  font-[400] text-[12px] leading-[18px]  ${errors.email ? "text-[#FF3939]" : ""}`}
          >
            Email address
          </label>
          <input
            type="email"
            className={`border py-[12px] pr-[16px] pl-[44px] rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl  ${errors.email ? "border-[#FF3939]" : ""}`}
            placeholder="e.g. alex@email.com"
            {...register("email", {
              required: "Please enter your email",
              validate: (value) => validateEmail(value) || "Invalid email",
            })}
            disabled={isLoggingIn}
          />
          <img src="/email-icon.svg" className="absolute top-[41px] left-3" />
          {errors.email && (
            <p className="text-[#FF3939] font-normal text-[12px] leading-[18px] absolute right-1 top-[39px]">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col relative mt-[24px]">
          <label
            className={`text-[#333333] font-[400] text-[12px] leading-[18px]  ${errors.password ? "text-[#FF3939]" : ""}`}
          >
            Password
          </label>
          <input
            type="password"
            className={`border py-[12px] pr-[16px] pl-[44px] rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl  ${errors.password ? "border-[#FF3939]" : ""}`}
            placeholder="Enter your password"
            {...register("password", {
              required: "Please enter your password",
            })}
            disabled={isLoggingIn}
          />
          <img src="/lock-key.svg" className="absolute top-[40px] left-3" />
          {errors.password && (
            <p className="text-[#FF3939] font-normal text-[12px] leading-[18px] absolute right-1 top-[39px]">
              {errors.password.message}
            </p>
          )}
        </div>
        <Link
          to={"/forgot-password"}
          className="text-[#633CFF] text-xs flex mt-1 justify-self-end"
        >
          Forgot password?
        </Link>

        <button
          className="bg-[#633CFF] text-white py-[11px] px-[27px] rounded-[8px] font-semibold text-[16px] leading-[24px] w-full text-center mt-[24px] flex items-center justify-center"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? <Loader /> : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
