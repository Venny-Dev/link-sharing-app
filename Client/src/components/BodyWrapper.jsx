import Loader from "./Loader";

function BodyWrapper({ children }) {
  // const { isLoading, isSigningOut } = useAuth();

  return (
    <div className="md:bg-[#D9D9D9]  min-h-screen pb-10 relative flex justify-center w-full">
      {children}
      {/* {isLoading && (
        <>
          <Loader />
          <div className="absolute inset-0 bg-gray-800 opacity-40 w-full h-full"></div>
        </>
      )} */}
      {/* {isSigningOut && (
        <div className="absolute inset-0 bg-black opacity-50"></div>
      )} */}
    </div>
  );
}

export default BodyWrapper;
