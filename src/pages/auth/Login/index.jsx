import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 min-h-screen">
      <div className="lg:col-span-7 flex items-center justify-center p-6">
        <div className="w-[500px]">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-4">Welcome back</h1>
            <h1 className="text-2xl font-semibold">Đăng nhập vào hệ thống</h1>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label>Tài khoản</Label>
              <Input type="account" className="border" placeholder="Tên tài khoản" />
            </div>

            <div className="space-y-2">
              <Label>Mật khẩu</Label>
              <Input type="password" placeholder="Mật khẩu" />
            </div>

            <Button className="w-full mt-2">Đăng nhập</Button>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex lg:col-span-3 bg-blue-600 text-white items-center justify-center">
        2
      </div>
    </div>
  );
}
