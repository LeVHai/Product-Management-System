import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import DarkModeButton from "@/components/ui/darkmode";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router";
import { LogOut, Settings, User } from "lucide-react";
import api from "@/services/api";
import { useUserActions } from "@/store/userStore";
import { useEffect, useState } from "react";

export default function MainLayout() {
  const navigate = useNavigate();

  const { clearUserInfo, setUserInfo } = useUserActions();

  const [data, setData] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  /*Get user*/

  const getUserInfo = async () => {
    const res = await api.getUser_info();
    if (res?.success) {
      setUserInfo(res.data);
      setData(res.data);
    }
  };

  /*Logout*/

  const logoutHandler = async () => {
    const res = await api.logout();
    console.log(res);
    console.log(res);
    
    if (res.data.success) {
      navigate("/login", { replace: true });
      clearUserInfo();
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className=" flex px-4 justify-between h-12 items-center gap-2 ">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger className="-ml-1" />
            {/* <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            /> */}
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
          <div className="flex gap-3 items-center">
            <DarkModeButton />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage src={data?.avatar} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" /> Thông tin cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Cài đặt
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={logoutHandler}
                >
                  <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex-1 w-full flex bg-[#F5F6FA] flex-col p-3 overflow-y-auto ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
