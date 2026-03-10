import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/CustomButton";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import UploadFile from "@/components/ui/UploadFile";
import { CircleAlert, EyeClosed, Info, Save, SaveIcon, X } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Await, useNavigate } from "react-router";
import { ACTION_TYPE, PRODUCT_STATUS } from "@/types";
import _ from "lodash";
import api from "@/services/api";
const ProductDetail = forwardRef(({ reload }, ref) => {
  const defaultProduct = {
    category: "",
    description: "",
    image: "",
    name: "",
    price: 0,
    quantity: 0,
    status: "active",
  };
  const defaultError = {
    category: "",
    description: "",
    image: "",
    name: "",
    price: "",
    quantity: "",
    status: "",
  };
  const [action, setAction] = useState("");

  const [data, setData] = useState(defaultProduct);

  const [errors, setErrors] = useState(defaultError);

  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [blobURL, setBlobURL] = useState("");

  useImperativeHandle(ref, () => ({
    create: () => {
      setAction(ACTION_TYPE.CREATE);
      setData(defaultProduct);
      setIsOpen(true);
    },
    update: (data) => {
      setAction(ACTION_TYPE.UPDATE);
      setData(data);
      setIsOpen(true);
    },
  }));

  const closeModal = () => {
    setIsOpen(false);
    setData(defaultProduct);
    setErrors(defaultError);
    deleteBlobImage();
  };

  /*delete img and blob url img*/
  const deleteBlobImage = () => {
    if (blobURL) {
      URL.revokeObjectURL(blobURL);
    }
    setBlobURL("");
    setData((prev) => ({ image: "", ...prev }));
  };

  /*Validate input*/
  const performValidate = async (props, _currentParam) => {
    let _errors = _.cloneDeep(errors);
    let _setParam = _currentParam ? _currentParam : param;
    if (props.length === 0) {
      for (const property in _errors) {
        props.push(property);
      }
    }
    props.forEach((prop) => {
      switch (prop) {
        case "name":
          _errors[prop] = null;
          if (!_setParam[prop]) {
            _errors[prop] = "Dữ liệu không được bỏ trống";
          }
          break;

        case "category":
          _errors[prop] = null;
          if (!_setParam[prop]) {
            _errors[prop] = "Dữ liệu không được bỏ trống";
          }
          break;

        case "description":
          _errors[prop] = null;
          if (!_setParam[prop]) {
            _errors[prop] = "Dữ liệu không được bỏ trống";
          }
          break;

        case "image":
          _errors[prop] = null;
          if (!_setParam[prop]) {
            _errors[prop] = "Dữ liệu không được bỏ trống";
          }
          break;

        case "price":
          _errors[prop] = null;
          if (!_setParam[prop]) {
            _errors[prop] = "Dữ liệu không được bỏ trống";
          }
          break;

        case "quantity":
          _errors[prop] = null;
          if (!_setParam[prop]) {
            _errors[prop] = "Dữ liệu không được bỏ trống";
          }
          break;

        case "status":
          _errors[prop] = null;
          if (!_setParam[prop]) {
            _errors[prop] = "Dữ liệu không được bỏ trống";
          }
          break;
        default:
          break;
      }
    });
    setErrors(_errors);
    let isValid = true;
    for (const key in _errors) {
      if (_errors[key]) {
        isValid = false;
      }
    }
    return isValid;
  };
  const onChange = (value, field) => {
    const _param = _.cloneDeep(data);
    _param[field] = value;
    setData(_param);
    performValidate([field], _param);
  };
  /*end*/

  /* Change value input */
  const onChangeName = (e) => {
    onChange(e.target.value, "name");
  };
  const onChangeCategory = (e) => {
    onChange(e, "category");
  };
  const onChangeDescription = (e) => {
    onChange(e.target.value, "description");
  };
  const onChangeImage = (e) => {
    onChange(e.file, "image");
    setBlobURL(e.url);
    console.log(e);
  };
  const onChangePrice = (e) => {
    onChange(e.target.value, "price");
  };
  const onChangeQuantity = (e) => {
    onChange(e.target.value, "quantity");
  };
  const onChangeStatus = (e) => {
    onChange(e, "status");
  };
  /*end*/

  /* Submit data */
  const submitProduct = async () => {
    const payload = _.omit(_.cloneDeep(data), ["_id"]);
    const isValid = await performValidate([], payload);
    if (!isValid) return;
    setIsLoading(true);
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

    try {
      if (action === ACTION_TYPE.CREATE) {
        const res = await api.create_product(formData);
        if (res.success) {
          closeModal();
          reload();
        }
      } else {
        const res = await api.update_product(formData, data._id);
        if (res.success) {
          closeModal();
          reload();
        }
      }
    } catch (error) {
      console.error("Lỗi:", error);
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
                          type="text"
                          required
                          placeholder="Tên sản phẩm"
                          value={data.name}
                          onChange={(e) => onChangeName(e)}
                        />
                      </Field>
                    </div>
                    <div className="col-span-full sm:col-span-3">
                      <Field className="gap-2">
                        <FieldLabel htmlFor="last-name">
                          Danh mục sản phẩm
                          <span className="text-red-500">*</span>
                        </FieldLabel>
                        <SelectCategories
                          value={data.category}
                          onChange={(e) => onChangeCategory(e)}
                        />
                      </Field>
                    </div>
                    <div className="col-span-full">
                      <Field className="gap-2">
                        <FieldLabel htmlFor="email">
                          Mô tả sản phẩm
                          <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Textarea
                          id="workspace-description"
                          name="workspace-description"
                          rows={4}
                          value={data.description}
                          onChange={(e) => onChangeDescription(e)}
                        />
                      </Field>
                    </div>
                    <div className="col-span-full sm:col-span-3">
                      <Field className="gap-2">
                        <FieldLabel htmlFor="address">Giá sản phẩm</FieldLabel>
                        <Input
                          type="text"
                          placeholder="Giá sản phẩm"
                          value={data.price}
                          onChange={(e) => onChangePrice(e)}
                        />
                      </Field>
                    </div>
                    <div className="col-span-full sm:col-span-3">
                      <Field className="gap-2">
                        <FieldLabel htmlFor="city">Số lượng</FieldLabel>

                        <Input
                          placeholder="Số lượng"
                          value={data.quantity}
                          onChange={(e) => onChangeQuantity(e)}
                          type="number"
                        />
                      </Field>
                    </div>
                    <div className="col-span-full">
                      <Field className="gap-2">
                        <FieldLabel htmlFor="city">Trạng thái</FieldLabel>
                        <Select
                          value={data.status}
                          onValueChange={(e) => onChangeStatus(e)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Trạng thái" />
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
                      <UploadFile
                        className="h-full"
                        onChange={(e) => onChangeImage(e)}
                      />
                    </div>

                    <div className="md:h-auto  relative flex-1 w-full border rounded-md flex items-center justify-center overflow-hidden">
                      {blobURL || data.image ? (
                        <>
                          <img
                            src={blobURL || data.image}
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
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <CustomButton size="sm" variant="secondary">
              Quay lại
            </CustomButton>
          </DialogClose>
          <CustomButton size="sm" onClick={() => submitProduct()}>
            Lưu
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
export default ProductDetail;
