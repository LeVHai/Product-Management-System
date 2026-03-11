import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/CustomButton";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectCategories from "@/components/ui/select_categorie";
import { Textarea } from "@/components/ui/textarea";
import UploadFile from "@/components/ui/UploadFile";
import {
  CircleAlert,
  EyeClosed,
  Info,
  LoaderIcon,
  Save,
  SaveIcon,
  X,
} from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { ACTION_TYPE, PRODUCT_STATUS } from "@/types";
import _ from "lodash";
import api from "@/services/api";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
const ProductDetail = forwardRef(({ reload }, ref) => {
  const defaultProduct = {
    category: "",
    description: "",
    image: "",
    name: "",
    price: 0,
    quantity: 0,
    status: PRODUCT_STATUS.ACTIVE,
  };

  const [action, setAction] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [blobURL, setBlobURL] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    ...defaultProduct,
  });

  useImperativeHandle(ref, () => ({
    create: () => {
      setAction(ACTION_TYPE.CREATE);
      setIsOpen(true);
      reset(defaultProduct);
    },
    update: (data) => {
      setAction(ACTION_TYPE.UPDATE);
      setIsOpen(true);
      reset(data);
      setBlobURL(data.image);
    },
  }));

  const closeModal = () => {
    setIsOpen(false);
    deleteBlobImage();
    reset();
  };

  /*delete img and blob url img*/
  const deleteBlobImage = () => {
    if (blobURL) {
      URL.revokeObjectURL(blobURL);
    }
    setBlobURL("");
  };

  /* Submit data */
  const submitProduct = async (formValues) => {
    const payload = _.omit(_.cloneDeep(formValues), ["_id"]);

    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (key === "image") {
        if (value instanceof File) {
          formData.append("image", value);
        }
      } else {
        formData.append(key, value);
      }
    });

    setIsLoading(true);

    try {
      if (action === ACTION_TYPE.CREATE) {
        const res = await api.create_product(formData);
        if (res.success) {
          toast.success(res.message);
          closeModal();
          reload();
        }
      } else {
        const res = await api.update_product(formData, formValues._id);
        if (res.success) {
          toast.success(res.message);
          closeModal();
          reload();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        } else {
          setIsOpen(true);
        }
      }}
    >
      <DialogContent className="max-h-[min(800px,90vh)] md:min-w-[900px] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {action === ACTION_TYPE.CREATE ? "Thêm mới" : "Cập nhật"} sản phẩm
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <form
            onSubmit={handleSubmit(submitProduct)}
            className="flex flex-col flex-1"
          >
            {/* Form product */}
            <div className=" lg:flex gap-3 m-1">
              <div className="flex-3/5">
                <div className="">
                  <h3 className="text-balance text-xl font-normal text-foreground dark:text-foreground">
                    Thông tin chung
                  </h3>
                  <p className="text-pretty mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                    Nhập thông tin cơ bản để tạo mới sản phẩm trong hệ thống.
                  </p>
                  <div className="mt-8">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                      <div className="col-span-full sm:col-span-3">
                        <Field className="gap-2">
                          <FieldLabel htmlFor="first-name">
                            Tên sản phẩm
                            <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Input
                            disabled={isLoading}
                            placeholder="Tên sản phẩm"
                            {...register("name", {
                              required: "Tên sản phẩm không được bỏ trống",
                            })}
                          />

                          {errors.name && (
                            <p className="text-red-500 text-sm">
                              {errors.name.message}
                            </p>
                          )}
                        </Field>
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <Field className="gap-2">
                          <FieldLabel htmlFor="last-name">
                            Danh mục sản phẩm
                            <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Controller
                            name="category"
                            control={control}
                            {...register("category", {
                              required: "Danh mục không được bỏ trống",
                            })}
                            render={({ field }) => (
                              <SelectCategories
                                disabled={isLoading}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          {errors.category && (
                            <p className="text-red-500 text-sm">
                              {errors.category.message}
                            </p>
                          )}
                        </Field>
                      </div>
                      <div className="col-span-full">
                        <Field className="gap-2">
                          <FieldLabel htmlFor="email">
                            Mô tả sản phẩm
                            <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Textarea
                            disabled={isLoading}
                            id="workspace-description"
                            name="workspace-description"
                            rows={4}
                            {...register("description")}
                          />
                        </Field>
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <Field className="gap-2">
                          <FieldLabel htmlFor="address">
                            Giá sản phẩm
                          </FieldLabel>
                          <Input
                            disabled={isLoading}
                            type="number"
                            {...register("price", {
                              required: "Giá không được bỏ trống",
                            })}
                          />
                          {errors.price && (
                            <p className="text-red-500 text-sm">
                              {errors.price.message}
                            </p>
                          )}
                        </Field>
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        <Field className="gap-2">
                          <FieldLabel htmlFor="city">Số lượng</FieldLabel>
                          <Input
                            disabled={isLoading}
                            type="number"
                            {...register("quantity", {
                              required: "Số lượng không được bỏ trống",
                            })}
                          />
                          {errors.quantity && (
                            <p className="text-red-500 text-sm">
                              {errors.quantity.message}
                            </p>
                          )}
                        </Field>
                      </div>
                      <div className="col-span-full">
                        <Field className="gap-2">
                          <FieldLabel htmlFor="city">Trạng thái</FieldLabel>
                          <Controller
                            name="status"
                            {...register("status", {
                              required: "Trạng thái ko được bỏ trống",
                            })}
                            control={control}
                            render={({ field }) => (
                              <Select
                                disabled={isLoading}
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value={PRODUCT_STATUS.ACTIVE}>
                                      Kinh doanh
                                    </SelectItem>

                                    <SelectItem value={PRODUCT_STATUS.INACTIVE}>
                                      Ngừng kinh doanh
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.status && (
                            <p className="text-red-500 text-sm">
                              {errors.status.message}
                            </p>
                          )}
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ******* */}
              {/* Right */}
              <div className="flex-2/5 md:mt-0 mt-5">
                <Card>
                  <div className="col-span-full sm:col-span-3">
                    <div className="font-medium mb-2">Ảnh sản phẩm</div>
                    <div className="flex flex-col md:flex-row gap-2 md:h-40">
                      <div className="flex-1">
                        <Controller
                          name="image"
                          control={control}
                          {...register("image", {
                            required: "Ảnh sản phẩm không được bỏ trống",
                          })}
                          render={({ field }) => (
                            <UploadFile
                              disabled={isLoading}
                              className="h-full"
                              onChange={(e) => {
                                setValue("image", e.file, {
                                  shouldValidate: true,
                                });
                                setBlobURL(e.url);
                              }}
                            />
                          )}
                        />
                      </div>

                      <div className="md:h-auto  relative flex-1 w-full border rounded-md flex items-center justify-center overflow-hidden">
                        {blobURL ? (
                          <>
                            <img
                              src={blobURL}
                              alt="preview"
                              className="w-full h-full object-cover"
                            />
                            <CustomButton
                              variant="outline"
                              className="absolute top-2 right-3 cursor-pointer"
                              size="xs"
                              onClick={() => deleteBlobImage()}
                            >
                              <X />
                            </CustomButton>
                          </>
                        ) : (
                          <span className="block md:my-0 my-10  text-sm text-muted-foreground">
                            Chưa có ảnh
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.image.message}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Info className="h-7 w-7 text-muted-foreground mt-0.5" />
                    <p className="text-muted-foreground">
                      Bạn cần ít nhất{" "}
                      <span className="font-medium text-foreground">
                        1 hình ảnh
                      </span>
                      . Hãy chú ý đến chất lượng của những bức ảnh bạn thêm vào.
                    </p>
                  </div>
                </Card>
              </div>
              {/* ******* */}
            </div>
            {/* End form product */}
            <DialogFooter>
              <DialogClose asChild>
                <CustomButton size="sm" variant="secondary">
                  Quay lại
                </CustomButton>
              </DialogClose>
              <CustomButton asChild type="submit">
                <Button disabled={isLoading}>
                  {isLoading && (
                    <LoaderIcon
                      aria-label="Loading"
                      className={"size-5 animate-spin"}
                    />
                  )}{" "}
                  {action === ACTION_TYPE.CREATE ? "Thêm" : "Cập nhật"}
                </Button>
              </CustomButton>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
});
export default ProductDetail;
