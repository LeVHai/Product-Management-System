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
import { CircleAlert, EyeClosed, Info, Save, SaveIcon } from "lucide-react";
import { forwardRef, useRef, useState } from "react";
import { useNavigate } from "react-router";
const ProductDetail = forwardRef(({ reload }, ref) => {
  return (
    <Dialog>
      <DialogContent className="max-h-[min(600px,80vh)] min-w-[800px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <ProductFormDetail />
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <CustomButton size="sm" variant="secondary">
              Quay lại
            </CustomButton>
          </DialogClose>
          <CustomButton size="sm">Lưu</CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
export default ProductDetail;
const ProductFormDetail = forwardRef(() => {
  return (
    <div className="flex gap-3 mt-3">
      <Card className="flex-3/5">
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
                  <Input type="text" required placeholder="Tên sản phẩm" />
                </Field>
              </div>
              <div className="col-span-full sm:col-span-3">
                <Field className="gap-2">
                  <FieldLabel htmlFor="last-name">
                    Danh mục sản phẩm
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                  <SelectCategories />
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
                  />
                </Field>
              </div>
              <div className="col-span-full sm:col-span-3">
                <Field className="gap-2">
                  <FieldLabel htmlFor="address">Giá sản phẩm</FieldLabel>
                  <Input type="text" placeholder="Giá sản phẩm" />
                </Field>
              </div>
              <div className="col-span-full sm:col-span-3">
                <Field className="gap-2">
                  <FieldLabel htmlFor="city">Trạng thái</FieldLabel>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="light">Kinh doanh</SelectItem>
                        <SelectItem value="dark">Ngừng kinh doanh</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex-2/5">
        <Card>
          <div className="col-span-full sm:col-span-3">
            <div className="font-medium mb-2">Ảnh sản phẩm</div>

            <div className="flex gap-2 h-40">
              <div className="flex-1">
                <UploadFile className="h-full" />
              </div>
              <div className="flex-1 bg-amber-400">3434</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Info className="h-7 w-7 text-muted-foreground mt-0.5" />
            <p className="text-muted-foreground">
              Bạn cần ít nhất{" "}
              <span className="font-medium text-foreground">1 hình ảnh</span>.
              Hãy chú ý đến chất lượng của những bức ảnh bạn thêm vào.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
});
