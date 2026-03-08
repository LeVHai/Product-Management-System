import React from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

const BaseTable = ({ columns = [], dataSource = [], minWidth = 1000 }) => {
  const data = [
    { id: 1, name: "Nguyễn Văn A", permission: "Admin" },
    { id: 2, name: "Trần Văn B", permission: "User" },
    { id: 3, name: "Lê Văn C", permission: "Manager" },
    { id: 4, name: "Phạm Văn D", permission: "User" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
    { id: 5, name: "Hoàng Văn E", permission: "Admin" },
  ];
  return (
    <div className="h-full w-full border rounded-md ">
      <Table noWrapper className="min-w-[800px]" >
        <TableHeader className="bg-background sticky top-0 z-10">
          <TableRow>
            {columns.map((e) => {
              return <TableHead key={e?.key}>{e?.title}</TableHead>;
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {dataSource.map((row, rowIndex) => (
            <TableRow key={row._id || rowIndex}>
              {columns.map((col) => {
                if (col.render) {
                  return (
                    <TableCell key={col.key}>
                      {col.render(row[col.dataIndex], row, rowIndex)}
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={col.key}>{row[col.dataIndex]}</TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    //  {dataSource.map((row, rowIndex) => (
    //             <TableRow key={row._id || rowIndex}>
    //               {columns.map((col) => {
    //                 if (col.render) {
    //                   return (
    //                     <TableCell key={col.key}>
    //                       {col.render(row[col.dataIndex], row, rowIndex)}
    //                     </TableCell>
    //                   );
    //                 }

    //                 return (
    //                   <TableCell key={col.key}>
    //                     {row[col.dataIndex]}
    //                   </TableCell>
    //                 );
    //               })}
    //             </TableRow>
    //           ))}
    // <div className="h-full flex flex-col">
    //   <div style={{ minWidth }} className="flex-1 ">
    //   <Table className="h-full bg-amber-400" >
    //         <TableHeader className="sticky top-0 z-40 bg-white shadow-sm">
    //           <TableRow>
    //             {columns.map((col, index) => (
    //               <TableHead
    //                 key={col.key || col.dataIndex || index}
    //                 style={{ width: col.width }}
    //                 className="bg-white"
    //               >
    //                 {col.title}
    //               </TableHead>
    //             ))}
    //           </TableRow>
    //         </TableHeader>
    //         <TableBody >
    //           {dataSource.map((record, rowIndex) => (
    //             <TableRow
    //               key={rowIndex}
    //               className="hover:bg-muted/50 transition-colors"
    //             >
    //               {columns.map((col, colIndex) => (
    //                 <TableCell
    //                   key={col.key || col.dataIndex || colIndex}
    //                   style={{ width: col.width }}
    //                 >
    //                   {record[col.dataIndex]}
    //                 </TableCell>
    //               ))}
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //   </div>

    //   {/* PAGINATION */}
    //   <div className="border-t p-3 bg-white">
    //     Pagination
    //   </div>

    // </div>
  );
};

export default BaseTable;
