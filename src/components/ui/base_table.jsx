// import React from "react";
// import {
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
//   Table,
// } from "@/components/ui/table";

// const BaseTable = ({ columns = [], dataSource = [], minWidth = 1000 }) => {
//   const alignClass = {
//     left: "text-left",
//     center: "text-center",
//     right: "text-right",
//   };
//   return (
//     <div className="h-full w-full border rounded-md">
//       <Table noWrapper className="min-w-[800px] ">
//         <TableHeader className="bg-background sticky top-0 z-10">
//           <TableRow>
//             {columns.map((e) => {
//               return (
//                 <TableHead
//                   className={alignClass[e.align] || "text-left"}
//                   style={{ width: e?.width ? e.width : undefined }}
//                   key={e?.key}
//                 >
//                   {e?.title}
//                 </TableHead>
//               );
//             })}
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {dataSource.map((row, rowIndex) => (
//             <TableRow key={row._id || rowIndex}>
//               {columns.map((col) => {
//                 if (col.render) {
//                   return (
//                     <TableCell
//                       className={alignClass[col.align] || "text-left"}
//                       style={{ width: col?.width ? col.width : undefined }}
//                       key={col.key}
//                     >
//                       {col.render(row[col.dataIndex], row, rowIndex)}
//                     </TableCell>
//                   );
//                 }

//                 return (
//                   <TableCell
//                     className={alignClass[col.align] || "text-left"}
//                     style={{ width: col?.width ? col.width : undefined }}
//                     key={col.key}
//                   >
//                     {row[col.dataIndex]}
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>

//     //  {dataSource.map((row, rowIndex) => (
//     //             <TableRow key={row._id || rowIndex}>
//     //               {columns.map((col) => {
//     //                 if (col.render) {
//     //                   return (
//     //                     <TableCell key={col.key}>
//     //                       {col.render(row[col.dataIndex], row, rowIndex)}
//     //                     </TableCell>
//     //                   );
//     //                 }

//     //                 return (
//     //                   <TableCell key={col.key}>
//     //                     {row[col.dataIndex]}
//     //                   </TableCell>
//     //                 );
//     //               })}
//     //             </TableRow>
//     //           ))}
//     // <div className="h-full flex flex-col">
//     //   <div style={{ minWidth }} className="flex-1 ">
//     //   <Table className="h-full bg-amber-400" >
//     //         <TableHeader className="sticky top-0 z-40 bg-white shadow-sm">
//     //           <TableRow>
//     //             {columns.map((col, index) => (
//     //               <TableHead
//     //                 key={col.key || col.dataIndex || index}
//     //                 style={{ width: col.width }}
//     //                 className="bg-white"
//     //               >
//     //                 {col.title}
//     //               </TableHead>
//     //             ))}
//     //           </TableRow>
//     //         </TableHeader>
//     //         <TableBody >
//     //           {dataSource.map((record, rowIndex) => (
//     //             <TableRow
//     //               key={rowIndex}
//     //               className="hover:bg-muted/50 transition-colors"
//     //             >
//     //               {columns.map((col, colIndex) => (
//     //                 <TableCell
//     //                   key={col.key || col.dataIndex || colIndex}
//     //                   style={{ width: col.width }}
//     //                 >
//     //                   {record[col.dataIndex]}
//     //                 </TableCell>
//     //               ))}
//     //             </TableRow>
//     //           ))}
//     //         </TableBody>
//     //       </Table>
//     //   </div>

//     //   {/* PAGINATION */}
//     //   <div className="border-t p-3 bg-white">
//     //     Pagination
//     //   </div>

//     // </div>
//   );
// };

// export default BaseTable;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  {
    id: 101,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 59.99,
    rating: 4.5,
    stockQuantity: 120,
    supplier: "SoundTech Ltd",
    dateAdded: "2024-01-15",
  },
  {
    id: 102,
    name: "Yoga Mat",
    category: "Sports & Fitness",
    price: 25.0,
    rating: 4.8,
    stockQuantity: 200,
    supplier: "FitGear Inc",
    dateAdded: "2024-01-20",
  },
  {
    id: 103,
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 80.0,
    rating: 4.2,
    stockQuantity: 80,
    supplier: "HomeBrew Supplies",
    dateAdded: "2024-02-05",
  },
  {
    id: 104,
    name: "Running Shoes",
    category: "Sportswear",
    price: 70.0,
    rating: 4.6,
    stockQuantity: 150,
    supplier: "RunWell Co.",
    dateAdded: "2024-03-15",
  },
  {
    id: 105,
    name: "Smartwatch",
    category: "Electronics",
    price: 120.0,
    rating: 4.7,
    stockQuantity: 60,
    supplier: "TechTime",
    dateAdded: "2024-04-10",
  },
  {
    id: 106,
    name: "Gaming Mouse",
    category: "Electronics",
    price: 45.0,
    rating: 4.3,
    stockQuantity: 95,
    supplier: "GamePro Gear",
    dateAdded: "2024-04-22",
  },
  {
    id: 107,
    name: "Blender",
    category: "Kitchen Appliances",
    price: 55.0,
    rating: 4.4,
    stockQuantity: 110,
    supplier: "KitchenEssentials",
    dateAdded: "2024-05-05",
  },
  {
    id: 108,
    name: "Electric Kettle",
    category: "Kitchen Appliances",
    price: 30.0,
    rating: 4.1,
    stockQuantity: 130,
    supplier: "HomeEssentials",
    dateAdded: "2024-05-18",
  },
  {
    id: 109,
    name: "Office Chair",
    category: "Furniture",
    price: 150.0,
    rating: 4.6,
    stockQuantity: 50,
    supplier: "FurniPro",
    dateAdded: "2024-06-01",
  },
  {
    id: 110,
    name: "LED Desk Lamp",
    category: "Lighting",
    price: 20.0,
    rating: 4.5,
    stockQuantity: 210,
    supplier: "BrightLight",
    dateAdded: "2024-06-10",
  },
];

export default function BaseTable({ columns = [], dataSource = [], minWidth = 1000 }) {
 const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }; 
  return (
    <div className="grid w-full  [&>div]:rounded [&>div]:border">
      <Table>
        <TableHeader className="bg-background sticky top-0 z-10">
          <TableRow className="sticky top-0 bg-background *:whitespace-nowrap after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-border after:content-['']">
             {columns.map((e) => {
              return (
                <TableHead
                  className={alignClass[e.align] || "text-left"}
                  style={{ width: e?.width ? e.width : undefined }}
                  key={e?.key}
                >
                  {e?.title}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-hidden">
           {dataSource.map((row, rowIndex) => (
            <TableRow key={row._id || rowIndex}>
              {columns.map((col) => {
                if (col.render) {
                  return (
                    <TableCell
                      className={alignClass[col.align] || "text-left"}
                      style={{ width: col?.width ? col.width : undefined }}
                      key={col.key}
                    >
                      {col.render(row[col.dataIndex], row, rowIndex)}
                    </TableCell>
                  );
                }

                return (
                  <TableCell
                    className={alignClass[col.align] || "text-left"}
                    style={{ width: col?.width ? col.width : undefined }}
                    key={col.key}
                  >
                    {row[col.dataIndex]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
