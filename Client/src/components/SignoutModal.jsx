import { useAuth } from "../contexts/AuthContext";
import { useLogout } from "../reactQueryHooks/useAuth";

import Button from "./Button";
import Loader from "./Loader";

function SignoutModal() {
  const { setIsSigningOut } = useAuth();
  const { logout, isLoggingOut } = useLogout();

  return (
    <div className=" absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-32 bg-white rounded-[8px] text-center flex items-center justify-center z-10 flex-col gap-4 ">
      <p className="text-[#737373]">Are you sure to sign out?</p>
      <div className="flex gap-4 ">
        <Button
          className="bg-white text-[#633CFF] border border-[#633CFF]   "
          onClick={() => setIsSigningOut(false)}
        >
          No
        </Button>
        <Button
          className=" text-white flex items-center justify-center"
          onClick={logout}
        >
          {isLoggingOut ? <Loader /> : " Yes"}
        </Button>
      </div>
    </div>
  );
}

export default SignoutModal;
