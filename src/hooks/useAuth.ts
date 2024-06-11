import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { SignupProps } from "@/pages/Signup";
import { useAuthStore } from "@/store/authStore"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";

export const useAuth = () => {
  const { storeLogin, storeLogout, isloggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const userLogin = (data: LoginProps) => {
    login(data).then((res) => {
      storeLogin(res.token);  // 상태 변화
      showAlert("로그인이 완료되었습니다.");
      navigate("/");
    }, (error) => {
      showAlert("로그인에 실패하였습니다.");
    })
  }

  const userSignup = (data: SignupProps) => {
    signup(data).then((res) => {
      showAlert("회원가입이 완료되었습니다.");
      navigate("/login");
    });
  }

  const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then(() => {
      showAlert("비밀번호가 초기화되었습니다.");
      navigate("/login");
    })
  }

  const [resetRequested, setResetRequested] = useState(false);

  const userResetRequest = (data: SignupProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    }); 
  }

  return { userLogin, userSignup, userResetPassword, userResetRequest, resetRequested };
}