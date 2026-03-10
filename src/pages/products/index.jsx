import { Modal } from "@/components/ui/add_product";
import BaseTable from "@/components/ui/base_table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeaderApp from "@/components/ui/header_app";
import { Input } from "@/components/ui/input";
import React, { use, useEffect, useRef, useState } from "react";
import ProductDetail from "./productInfo";
import { Eye, Handbag, Pencil, Sprout, Trash2 } from "lucide-react";
import PaginationPage from "@/components/pagination";
import { CustomButton } from "@/components/ui/CustomButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import api from "@/services/api";
import PaginationRender from "@/components/pagination8";
import { useNavigate } from "react-router";
import { PRODUCT_STATUS } from "@/types";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [lazyParams, setLazyParams] = useState({
    page: 1,
    limit: 20,
    search: "",
  });
  const [pagination, setPagination] = useState({
    totalPage: 0,
    total: 0,
  });

  const [loading, setLoading] = useState(false);

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  const refDetail = useRef();

  useEffect(() => {
    const loadData = async (lazy) => {
      const res = await api.product_list(lazy);
      setProducts(res.data);
      setPagination(res.pagination);
    };
    loadData(lazyParams);
  }, [lazyParams]);

  const onView = (id) => {
    navigate(`/product/${id}`);
  };
  const onCreate = () => {
    refDetail.current.create();
  };
  const onEdit = (rowData) => {
    refDetail.current.update(rowData);
  };
  const onDelete = async (id) => {
    try {
      const res = await api.delete_product(id);
      if (res.success) {
        console.log(res);
        toast.success("Xóa sản phẩm thành công");
        onReload();
      }
    } catch (error) {
    } finally {
      setOpenDialogConfirm(false);
      setLoading(false);
    }
  };
  const onReload = async () => {
    const res = await api.product_list(lazyParams);
    setProducts(res.data);
    setPagination(res.pagination);
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      align: "center",
      width: 50,
      render: (_, __, index) => (
        <div>{(lazyParams.page - 1) * lazyParams.limit + index + 1}</div>
      ),
    },
    {
      title: "Hình ảnh",
      key: "image",
      render: (_, record) => (
        <img src={record.image} className="w-12 h-12 object-cover" />
      ),
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
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Trạng thái",
      key: "status",
      align: "center",
      render: (_, record) => {
        return (
          <Badge
            className={
              record.status === PRODUCT_STATUS.ACTIVE
                ? "border-emerald-600/40 bg-emerald-600/10 text-emerald-500"
                : "border-red-600/40 bg-red-600/10 text-red-500"
            }
          >
            {record.status === PRODUCT_STATUS.ACTIVE
              ? "Kinh doanh"
              : "Ngừng kinh doanh"}
          </Badge>
        );
      },
    },
    {
      title: "",
      key: "action",
      align: "center",
      fixed: "right",
      render: (val, record) => (
        <div className="flex justify-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CustomButton
                  onClick={() => {
                    onView(record._id);
                  }}
                  variant="link"
                  size="xs"
                >
                  <Eye className="w-4 h-4" />
                </CustomButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Xem</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <CustomButton
                  onClick={() => {
                    onEdit(record);
                  }}
                  variant="link"
                  size="xs"
                >
                  <Pencil className="w-4 h-4" />
                </CustomButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sửa</p>
              </TooltipContent>
            </Tooltip>
            <AlertDialog
              open={openDialogConfirm}
              onOpenChange={setOpenDialogConfirm}
            >
              <AlertDialogTrigger asChild>
                <Trash2 className="w-4 h-4 text-red-600" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xóa sản phẩm</AlertDialogTitle>
                  <AlertDialogDescription>
                    Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh
                    viễn mục đó khỏi tài khoản của bạn.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Đóng</AlertDialogCancel>

                  <CustomButton
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(record._id)}
                  >
                    Xóa
                  </CustomButton>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* <Tooltip>
              <TooltipTrigger asChild>
                <CustomButton
                  variant="link"
                  size="xs"
                  onClick={() => onDelete()}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </CustomButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Xóa</p>
              </TooltipContent>
            </Tooltip> */}
          </TooltipProvider>
        </div>
      ),
    },
  ];
  const onChangePage = (value, key) => {
    setLazyParams((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "limit" && { page: 1 }),
    }));
  };

  return (
    <>
      <Helmet>
        <title> Product</title>
      </Helmet>
      <div className="flex flex-col h-full">
        <HeaderApp
          icon={<Handbag />}
          title={"Danh sách sản phẩm"}
          rightTop={
            <div>
              <CustomButton size="sm" onClick={() => onCreate()}>
                Thêm sản phẩm
              </CustomButton>
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
        <div className="mt-2">
          <PaginationRender
            currentPage={lazyParams.page}
            totalPages={pagination.totalPage}
            paginationItemsToDisplay={10}
            onChangePage={onChangePage}
          />
        </div>
      </div>
      <ProductDetail ref={refDetail} reload={onReload} />
    </>
  );
};

export default Products;
