import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignup } from "../../reactQueryHooks/useAuth";
import { validateEmail } from "../../utils/helpers";
import Loader from "../Loader";

function CreateAccount() {
  const { register, handleSubmit, formState, setError } = useForm();
  const { signup, isSigningUp } = useSignup();

  const errors = formState.errors;

  function onSubmit(data) {
    if (data.password !== data.passwordConfirm) {
      return setError("passwordConfirm", { message: "Passwords do not match" });
    }
    // console.log(data);
    signup(data);
  }

  return (
    <div className="">
      <form
        noValidate
        className="mt-[40px] md:mt-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="font-bold text-2xl text-[#333333]">Create account</h1>
          <p className="mt-[8px] text-[#737373] text-base font-sans">
            Let’s get you started sharing your links!
          </p>
        </div>
        <div className="flex flex-col relative mt-[40px]">
          <label className="text-[#333333]  font-[400] text-[12px] leading-[18px]">
            Email address
          </label>
          <input
            type="email"
            className={`border py-[12px] pr-[16px] pl-[44px] rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl  ${errors.email ? "border-[#FF3939]" : ""}`}
            placeholder="e.g. alex@email.com"
            disabled={isSigningUp}
            {...register("email", {
              required: "Please enter your email",
              validate: (value) => validateEmail(value) || "Invalid email",
            })}
          />
          <img src="/email-icon.svg" className="absolute top-[41px] left-3" />
          {errors.email && (
            <p className="text-[#FF3939] font-normal text-[12px] leading-[18px] absolute right-1 top-[39px]">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col relative mt-[24px]">
          <label className="text-[#333333] font-[400] text-[12px] leading-[18px]">
            Create password
          </label>
          <input
            type="password"
            className={`border py-[12px] pr-[16px] pl-[44px] rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl  ${errors.password ? "border-[#FF3939]" : ""}`}
            placeholder="At least 8 characters"
            disabled={isSigningUp}
            {...register("password", {
              required: "Please enter your password",
            })}
          />
          <img src="/lock-key.svg" className="absolute top-[40px] left-3" />
          {errors.password && (
            <p className="text-[#FF3939] font-normal text-[12px] leading-[18px] absolute right-1 top-[39px]">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col relative mt-[24px] ">
          <label className="text-[#333333] font-[400] text-[12px] leading-[18px]">
            Confirm password
          </label>
          <input
            type="password"
            className={`border py-[12px] pr-[16px] pl-[44px] rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl  ${errors.passwordConfirm ? "border-[#FF3939]" : ""}`}
            disabled={isSigningUp}
            placeholder="At least 8 characters"
            {...register("passwordConfirm", {
              required: "Please confirm your password",
            })}
          />
          <img src="/lock-key.svg" className="absolute top-[40px] left-3" />
          {errors.passwordConfirm && (
            <p className="text-[#FF3939] font-normal text-[12px] leading-[18px] absolute right-1 top-[39px]">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>
        <p className="text-[#333333] font-[400] text-[12px] leading-[18px] mt-[24px] mb-[24px]">
          Password must contain at least 8 characters
        </p>
        <button
          className="bg-[#633CFF] text-white py-[11px] px-[27px] rounded-[8px] font-semibold text-[16px] leading-[24px] w-full text-center relative flex items-center justify-center"
          disabled={isSigningUp}
        >
          {isSigningUp ? <Loader /> : " Create new account"}
        </button>
      </form>

      <p className="text-center w-[200px] m-auto text-[16px] mt-[24px] text-[#ad9c9c]">
        Already have an account?
        <Link to="/login">
          <button className="text-[#633CFF]">Login</button>
        </Link>
      </p>
    </div>
  );
}

export default CreateAccount;
