import React from "react";
import Region, { RegionBottom, RegionTop } from "./region";
import { Card } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const Template = ({ header, content }) => {
  return (
    <div className="p-2">
      <div>
        <Card>
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <div>Icon</div>
              <h1 className="text-xl font-semibold">haha</h1>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row-reverse gap-2">
                <Button>Thêm sản phẩm</Button>
                <Button>Xuất file</Button>
              </div>

              <div className="flex flex-row-reverse gap-2">
                <Input placeholder="Tìm kiếm..." />
                <Input placeholder="Từ ngày" />
                <Input placeholder="Đến ngày" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã SP</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead className="text-right">Giá</TableHead>
                <TableHead className="text-right">Số lượng</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>SP001</TableCell>
                <TableCell>Bàn phím cơ</TableCell>
                <TableCell>Phụ kiện</TableCell>
                <TableCell className="text-right">500.000đ</TableCell>
                <TableCell className="text-right">20</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>SP002</TableCell>
                <TableCell>Chuột gaming</TableCell>
                <TableCell>Phụ kiện</TableCell>
                <TableCell className="text-right">300.000đ</TableCell>
                <TableCell className="text-right">35</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SP002</TableCell>
                <TableCell>Chuột gaming</TableCell>
                <TableCell>Phụ kiện</TableCell>
                <TableCell className="text-right">300.000đ</TableCell>
                <TableCell className="text-right">35</TableCell>
              </TableRow>
            </TableBody>
          </Table>
      </div>
    </div>
  );
};

export default Template;