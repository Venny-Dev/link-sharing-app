import { useState } from "react";
import { useResetPassword } from "../../reactQueryHooks/useAuth";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "../Loader";

function ResetPassoword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { token } = useParams();

  const { resetPassword, isResetting } = useResetPassword();

  function onSubmit(e) {
    e.preventDefault();

    if (!password || !passwordConfirm) {
      return toast.error("Provide password and confirm your password");
    }
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }
    if (password !== passwordConfirm) {
      return toast.error("Passwords do not match");
    }
    // console.log(token);

    resetPassword(
      { token, data: { password, passwordConfirm } },
      {
        onSuccess: () => {
          setPasswordConfirm("");
          setPassword("");
        },
      }
    );
  }
  return (
    <div className="mt-28">
      <p>Reset Password</p>
      <form action="" onSubmit={onSubmit}>
        <div className="relative w-full mt-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border py-[12px] pr-[16px] pl-[44px] rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl  w-full`}
            placeholder="Enter your password"
          />
          <img src="/lock-key.svg" className="absolute top-[21px] left-3" />
        </div>
        <div className="relative w-full mt-3">
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className={`border py-[12px] pr-[16px] pl-[44px] rounded-[8px] mt-[4px] placeholder-opacity-[50%] focus:outline-none focus:border-[#633CFF] focus:shadow-xl  w-full`}
            placeholder="Confirm your password"
          />
          <img src="/lock-key.svg" className="absolute top-[21px] left-3" />
        </div>

        <button
          className="bg-[#633CFF] text-white py-[11px] px-[27px] rounded-[8px] font-semibold text-[16px] leading-[24px] w-full text-center mt-[24px] flex items-center justify-center"
          disabled={isResetting}
        >
          {isResetting ? <Loader /> : "Reset password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassoword;
