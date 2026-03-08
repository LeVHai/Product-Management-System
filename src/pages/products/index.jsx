import { Modal } from "@/components/ui/add_product";
import BaseTable from "@/components/ui/base_table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeaderApp from "@/components/ui/header_app";
import { Input } from "@/components/ui/input";
import React from "react";
import ProductDetail from "./detail";
import { Eye, Handbag, Pencil, Sprout, Trash2 } from "lucide-react";
import PaginationPage from "@/components/pagination";
import { CustomButton } from "@/components/ui/CustomButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Products = () => {
  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tồn kho",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <div className="flex justify-end gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CustomButton variant="link" size="xs">
                  <Eye className="w-4 h-4" />
                </CustomButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Xem</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <CustomButton variant="link" size="xs">
                  <Pencil className="w-4 h-4" />
                </CustomButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sửa</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <CustomButton variant="link" size="xs">
                  <Trash2 className="w-4 h-4" />
                </CustomButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Xóa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];
  const products = [
    {
      _id: "65f1a001a1b2c3d4e5f60001",
      name: "Basic White T-Shirt",
      description: "Áo thun trắng cotton 100%",
      category: "T-Shirt",
      price: 199000,
      stockQuantity: 120,
      image: "https://picsum.photos/200?1",
      status: "active",
      createdAt: new Date("2025-01-01T08:00:00Z"),
      updatedAt: new Date("2025-01-05T10:00:00Z"),
    },
    {
      _id: "65f1a001a1b2c3d4e5f60002",
      name: "Black Hoodie Premium",
      description: "Hoodie nỉ cao cấp, form rộng",
      category: "Hoodie",
      price: 499000,
      stockQuantity: 45,
      image: "https://picsum.photos/200?2",
      status: "active",
      createdAt: new Date("2025-01-03T09:00:00Z"),
      updatedAt: new Date("2025-01-06T12:00:00Z"),
    },
    {
      _id: "65f1a001a1b2c3d4e5f60003",
      name: "Funny Cat Mug",
      description: "Ly sứ in hình mèo dễ thương",
      category: "Mug",
      price: 129000,
      stockQuantity: 200,
      image: "https://picsum.photos/200?3",
      status: "active",
      createdAt: new Date("2025-01-04T07:30:00Z"),
      updatedAt: new Date("2025-01-04T07:30:00Z"),
    },
    {
      _id: "65f1a001a1b2c3d4e5f60004",
      name: "iPhone 15 Clear Case",
      description: "Ốp lưng trong suốt chống sốc",
      category: "Phone Case",
      price: 99000,
      stockQuantity: 15,
      image: "https://picsum.photos/200?4",
      status: "inactive",
      createdAt: new Date("2025-01-02T11:00:00Z"),
      updatedAt: new Date("2025-01-07T14:00:00Z"),
    },
    {
      _id: "65f1a001a1b2c3d4e5f60005",
      name: "Oversize Graphic T-Shirt",
      description: "Áo thun form rộng in graphic",
      category: "T-Shirt",
      price: 249000,
      stockQuantity: 78,
      image: "https://picsum.photos/200?5",
      status: "active",
      createdAt: new Date("2025-01-08T10:00:00Z"),
      updatedAt: new Date("2025-01-08T10:00:00Z"),
    },
    {
      _id: "65f1a001a1b2c3d4e5f60005",
      name: "Oversize Graphic T-Shirt",
      description: "Áo thun form rộng in graphic",
      category: "T-Shirt",
      price: 249000,
      stockQuantity: 78,
      image: "https://picsum.photos/200?5",
      status: "active",
      createdAt: new Date("2025-01-08T10:00:00Z"),
      updatedAt: new Date("2025-01-08T10:00:00Z"),
    },
    {
      _id: "65f1a001a1b2c3d4e5f60005",
      name: "Oversize Graphic T-Shirt",
      description: "Áo thun form rộng in graphic",
      category: "T-Shirt",
      price: 249000,
      stockQuantity: 78,
      image: "https://picsum.photos/200?5",
      status: "active",
      createdAt: new Date("2025-01-08T10:00:00Z"),
      updatedAt: new Date("2025-01-08T10:00:00Z"),
    },
    {
      _id: "65f1a001a1b2c3d4e5f60005",
      name: "Oversize Graphic T-Shirt",
      description: "Áo thun form rộng in graphic",
      category: "T-Shirt",
      price: 249000,
      stockQuantity: 78,
      image: "https://picsum.photos/200?5",
      status: "active",
      createdAt: new Date("2025-01-08T10:00:00Z"),
      updatedAt: new Date("2025-01-08T10:00:00Z"),
    },
    {
      _id: "65f1a001a1b2c3d4e5f60005",
      name: "Oversize Graphic T-Shirt",
      description: "Áo thun form rộng in graphic",
      category: "T-Shirt",
      price: 249000,
      stockQuantity: 78,
      image: "https://picsum.photos/200?5",
      status: "active",
      createdAt: new Date("2025-01-08T10:00:00Z"),
      updatedAt: new Date("2025-01-08T10:00:00Z"),
    },
    {
      _id: "65f1a001a1b2c3d4e5f60005",
      name: "Oversize Graphic T-Shirt",
      description: "Áo thun form rộng in graphic",
      category: "T-Shirt",
      price: 249000,
      stockQuantity: 78,
      image: "https://picsum.photos/200?5",
      status: "active",
      createdAt: new Date("2025-01-08T10:00:00Z"),
      updatedAt: new Date("2025-01-08T10:00:00Z"),
    },
    {
      _id: "65f1a001a1b2c3d4e5f60005",
      name: "Oversize Graphic T-Shirt",
      description: "Áo thun form rộng in graphic",
      category: "T-Shirt",
      price: 249000,
      stockQuantity: 78,
      image: "https://picsum.photos/200?5",
      status: "active",
      createdAt: new Date("2025-01-08T10:00:00Z"),
      updatedAt: new Date("2025-01-08T10:00:00Z"),
    },
  ];
  return (
   <>
    <div className="flex flex-col h-full">
      <HeaderApp
        icon={<Handbag />}
        title={"Danh sách sản phẩm"}
        rightTop={
          <div>
            <CustomButton size="sm">Thêm sản phẩm</CustomButton>
          </div>
        }
        rightBottom={
          <div>
            <Input />
          </div>
        }
      />

      <div className="flex-1 overflow-auto">
        <BaseTable columns={columns} dataSource={products} />
      </div>
      <PaginationPage />
    </div>
    <ProductDetail/>
   </>
  );
};

export default Products;
