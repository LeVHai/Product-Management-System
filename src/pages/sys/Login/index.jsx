import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import image from "@/assets/image.png";
import bgr from "@/assets/image/bgr.jpg";
import { CustomButton } from "@/components/ui/CustomButton";
import { useState } from "react";
import { cloneDeep } from "lodash";
import api from "@/services/api";
import { useNavigate } from "react-router";
import { useUserActions } from "@/store/userStore";

const Login = () => {
  const defaultValue = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(defaultValue);
  const [error, setError] = useState(defaultValue);
  const navigate = useNavigate();
  const onChangeData = (prop, value) => {
    let _data = cloneDeep(data);

    _data[prop] = value;
    validateData([prop], _data);
    setData(_data);
  };

  const validateData = (prop, _data) => {
    let _error = cloneDeep(error);
    let requiredFields = prop.length > 0 ? prop : Object.keys(_data);
    let _prop = requiredFields;
    for (const field of _prop) {
      switch (field) {
        case "email":
          _error[field] = "";
          if (!_data[field]) {
            _error[field] = "Tài khoản không được bỏ trống!";
          }
          break;
        case "password":
          _error[field] = "";
          if (!_data[field]) {
            _error[field] = "Mật khẩu không được bỏ trống";
          }
          break;
        default:
          break;
      }
    }

    setError(_error);
    let count = 0;
    for (const key in _error) {
      if (_error[key]) {
        count++;
      }
    }
    return count;
  };
  const renderError = (field) => {
    if (error[field]) {
      return (
        <span className="absolute left-0  top-full mt-1 text-red-500 text-xs">
          {error[field]}
        </span>
      );
    }
  };
  const onChangeEmail = (e) => {
    onChangeData("email", e.target.value);
  };
  const onChangePassword = (e) => {
    onChangeData("password", e.target.value);
  };

  const onSubmit = async () => {
    let validate = validateData([], data);
    if (validate) return;
    try {
      const res = await api.login(data);
      if (res.success) {
        navigate("/", { replace: true });
      }
    } catch (err) {
      const errors = err.data?.error;
      if (errors) {
        Object.keys(errors).forEach((key) => {
          setError((prev) => ({
            ...prev,
            [key]: errors[key].msg,
          }));
        });
      }
    }
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: `url(${bgr})`,
      }}
    >
      <div
        className="flex w-full max-w-4xl h-[80vh]  rounded-2xl overflow-hidden
        bg-background"
      >
        {/* <div
        className="flex w-full max-w-4xl rounded-2xl overflow-hidden
        bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
      > */}
        <div className="flex w-full md:w-1/2 p-6 md:p-10">
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold ">Welcome Back</h3>
              <p className="text-sm ">
                Nhập thông tin đăng nhập của bạn để truy cập vào tài khoản
              </p>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <Label className="mb-2">Email</Label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  onChange={(e) => onChangeEmail(e)}
                />
                {renderError("email")}
              </div>
              <div className="relative">
                <Label className="mb-2">Mật khẩu</Label>
                <Input
                  type="password"
                  placeholder="********"
                  onChange={(e) => onChangePassword(e)}
                />
                {renderError("password")}
              </div>
              <CustomButton
                size="sm"
                className="w-full mt-4"
                onClick={() => onSubmit()}
              >
                Đăng nhập
              </CustomButton>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-6">
          <img src={image} className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Login;
