import { useMutation, useQuery } from "react-query";
import {
  signup as signupApi,
  login as loginApi,
  verifyEmail,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
  logout as logoutApi,
} from "../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isSigningUp };
}

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      // console.log(data);
      toast.success(data.message);
      navigate("/app");
    },

    onError(err) {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { login, isLoggingIn };
}

export function useVerifyEmail(token) {
  const navigate = useNavigate();

  const { isLoading: isVerifying } = useQuery({
    queryKey: ["user"],
    queryFn: () => verifyEmail(token),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message);
      navigate("/signup");
    },
  });

  return isVerifying;
}

export function useForgotPassword() {
  const navigate = useNavigate();
  const { mutate: forgotPassword, isLoading } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { forgotPassword, isLoading };
}

export function useResetPassword() {
  const navigate = useNavigate();

  const { mutate: resetPassword, isLoading: isResetting } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      console.log(data);
      navigate("/login");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
      navigate("/login");
    },
  });

  return { resetPassword, isResetting };
}

export function useLogout() {
  const navigate = useNavigate();
  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/login");
      toast.success("Logged out successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logout };
}
