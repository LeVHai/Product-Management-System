import BaseTable from "@/components/ui/base_table";
import HeaderApp from "@/components/ui/header_app";
import { Input } from "@/components/ui/input";
import React, { use, useEffect, useRef, useState } from "react";
import ProductDetail from "./productInfo";
import { Eye, Handbag, Pencil, PlusCircle, Trash2 } from "lucide-react";
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
import { CATEGORIES, PRODUCT_STATUS } from "@/types";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";


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
  const refConfirmDelete = useRef();

  const loadData = async (lazy) => {
    setLoading(true);
    try {
      const res = await api.product_list(lazy);
      setProducts(res.data);
      setPagination(res.pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    setLoading(true)
    try {
      const res = await api.delete_product(id);
      console.log(res);
      if (res.success) {
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
    loadData(lazyParams);
  };
  /*columns table*/
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
      
      key: "category",
      render:(_,record)=> <span>{CATEGORIES[record?.category]}</span>
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
            {/* Delete */}
            <Tooltip>
              <TooltipTrigger asChild>
                <CustomButton
                  onClick={() => refConfirmDelete.current.delete(record._id)}
                  variant="link"
                  size="xs"
                >
                   <Trash2 className="w-4 h-4 text-red-600" />
                </CustomButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Xoá</p>
              </TooltipContent>
            </Tooltip>
           
          </TooltipProvider>
        </div>
      ),
    },
  ];
  /** */
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
          icon={<Handbag className="text-white size-7" />}
          title={"Danh sách sản phẩm"}
          rightTop={
            <div>
              <CustomButton size="sm" onClick={() => onCreate()}>
               <PlusCircle className="size-5 mr-2"/> Thêm sản phẩm
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
      <ConfirmDeleteDialog ref={refConfirmDelete} onDelete={onDelete}/>
    </>
  );
};

export default Products;
