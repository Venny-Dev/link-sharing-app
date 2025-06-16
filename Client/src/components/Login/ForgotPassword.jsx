import { useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils/helpers";
import { useForgotPassword } from "../../reactQueryHooks/useAuth";
import Loader from "../Loader";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword, isLoading } = useForgotPassword();

  function onSubmit(e) {
    e.preventDefault();
    if (!email) {
      return toast.error("Email cannot be empty");
    }

    if (!validateEmail(email)) {
      return toast.error("Please provide a valid email");
    }

    // console.log(email);
    forgotPassword({ email });
  }
  return (
    <div className=" mt-28">
      <p>Please input the email associated with your account.</p>
      <form action="" onSubmit={onSubmit}>
        <div className="relative w-full mt-3">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border py-[12px] pr-[16px] pl-[44px] rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl  w-full`}
            placeholder="example@email.com"
            disabled={isLoading}
          />
          <img src="/email-icon.svg" className="absolute top-[21px] left-3" />
        </div>

        <button
          className="bg-[#633CFF] text-white py-[11px] px-[27px] rounded-[8px] font-semibold text-[16px] leading-[24px] w-full text-center mt-[24px] flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : " Send reset password link"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
