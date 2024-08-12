import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";

function BodyWrapper({ children }) {
  const { isLoading } = useAuth();
  return (
    <div className="md:bg-[#D9D9D9]  min-h-screen pb-24 relative flex justify-center w-full">
      {children}
      {isLoading && (
        <>
          <Loader />
          <div className="absolute inset-0 bg-gray-800 opacity-40 w-full h-full"></div>
        </>
      )}
    </div>
  );
}

export default BodyWrapper;
