import axios from "axios";
import userStore from "@/store/userStore";
import { toast } from "sonner";
import api from "./api";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 50000,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];
var isRefreshToken = false;

function onRefreshed() {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb) {
  refreshSubscribers.push(cb);
}
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// apiClient.interceptors.response.use(
//   (res) => {
//     const response = res.data;
//     if (response.success) {
//       console.log(response,"ss");

//       return response;
//     }
//     toast.error(response.message || "Request failed");
//     return Promise.reject(response);
//   },

//   async (error) => {
//      if (!error.response) {
//       toast.error("Không thể kết nối tới sever");
//       return Promise.reject(error);
//     }
//     const status = error?.response?.status;
//     const originalRequest = error.config;
//     console.log("AXIOS ERROR:", error.response);

//     if (status === 401) {
//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           await api.refresh_token();
//           isRefreshing = false;
//           onRefreshed();
//         } catch (err) {
//           isRefreshing = false;
//           userStore.getState().actions.clearUserInfo();
//           toast.error("Phiên đăng nhập đã hết hạn");
//           window.location.href = "/login";
//           return Promise.reject(err);
//         }
//       }
//       return new Promise((resolve) => {
//         addRefreshSubscriber(() => {
//           resolve(apiClient(originalRequest));
//         });
//       });
//     }

//     if (status === 404) {
//       toast.error(error.response.message)
//     }

//     if (status === 500) {
//       toast.error("Lỗi server (500)");
//     }

//     if (!status) {
//       toast.error("Không kết nối được server");
//     }

//     return Promise.reject(error.response);
//   },
// );
const waitRefreshToken = async () => {
  if (!isRefreshToken) return;
  await delay(500);
  return await waitRefreshToken();
};

const handleRefreshToken = async () => {
  if (isRefreshToken) return waitRefreshToken();

  isRefreshToken = true;
console.log("okkkk");

  await apiClient.post("/user/refresh-token");

  isRefreshToken = false;
};
apiClient.interceptors.response.use(
  (res) => {
    console.log(res);

    if (!res.data) throw new Error("Lỗi");
    const { data, success } = res.data;
    const hasSuccess = data && success && res.status === 200;
    if (hasSuccess) {
      console.log(data);
      return res.data;
    }
    // throw new Error(message || t('sys.api.apiRequestFailed'));
  },
  async (error) => {
    const { response, message } = error || {};
    const errMsg = response?.data?.message || message || "Lỗi";
    console.log(errMsg);
    console.log(error);
    const status = response?.status;
    console.log(status);
    
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
