import { useUserInfo } from "@/store/userStore";
import { STORAGE_TYPE } from "@/types";
import { getItem } from "@/utils/storage";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const userInfo = getItem(STORAGE_TYPE.USER);

  if (userInfo) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
