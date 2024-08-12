import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import { signOutuser } from "../firebase/firebaseUtils";
import { useNavigate } from "react-router-dom";

function SignoutModal() {
  const navigate = useNavigate();
  const { setIsSigningOut, setIsLoading } = useAuth();

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
          className=" text-white "
          onClick={() => signOutuser(navigate, setIsLoading, setIsSigningOut)}
        >
          Yes
        </Button>
      </div>
    </div>
  );
}

export default SignoutModal;
