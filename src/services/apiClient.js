import axios from "axios";
import userStore from "@/store/userStore";
import { toast } from "sonner";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 50000,
  withCredentials: true,
});

var isRefreshToken = false;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//Delay call rq
const waitRefreshToken = async () => {
  if (!isRefreshToken) return;
  await delay(500);
  return await waitRefreshToken();
};

//Call refresh token
const handleRefreshToken = async () => {
  if (isRefreshToken) return waitRefreshToken();
  isRefreshToken = true;
  await apiClient.post("/user/refresh-token");
  isRefreshToken = false;
};

apiClient.interceptors.response.use(
  (res) => {
    if (!res.data) throw new Error("Lỗi");
    const { data, success } = res.data;
    const hasSuccess = success && res.status === 200;
    if (hasSuccess) {
      console.log(data);
      return res.data;
    }
    // throw new Error(message || t('sys.api.apiRequestFailed'));
  },
  async (error) => {
    const { response, message } = error || {};
    const errMsg = response?.data?.message || message || "Lỗi";
    const status = response?.status;
    
    if (status === 401) {
      try {
        const config = error.config;
        console.log(config);
        if (config.url.includes("/refresh-token")) {
          return Promise.reject(error);
        }
        await handleRefreshToken();
        return apiClient(config);
      } catch (error) {
        userStore.getState().actions.clearUserInfo();
        toast.error("Phiên đăng nhập đã hết hạn");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    if (status === 404) {
      console.log(error.response);
      
      toast.error(error.response.data.message);
      window.location.href = "/404";
    }
    if (status === 500) {
      toast.error("Lỗi server (500)");
    }
    if (!status) {
      toast.error("Không kết nối được server");
    }
    return Promise.reject(errMsg);
  },
);

export default apiClient;
