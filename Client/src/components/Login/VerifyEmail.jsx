import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "../../reactQueryHooks/useAuth";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const isVerifying = useVerifyEmail(token);

  return (
    <div>
      {isVerifying && <p>Please hold on for your email to be verified...</p>}
      {!isVerifying && <p>Please wait a moment</p>}
    </div>
  );
}

export default VerifyEmail;
