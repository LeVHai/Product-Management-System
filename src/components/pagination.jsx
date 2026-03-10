import { useId } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PaginationPage = ({
  page,
  totalPage,
  limit,
  onPageChange,
  onLimitChange,
}) => {
  const id = useId();

  const generatePages = () => {
    const pages = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (page <= 3) {
      return [1, 2, 3, "...", totalPage];
    }

    if (page >= totalPage - 2) {
      return [1, "...", totalPage - 2, totalPage - 1, totalPage];
    }

    return [1, "...", page - 1, page, page + 1, "...", totalPage];
  };

  const pages = generatePages();

  return (
    <div className="flex w-full items-center justify-between gap-6 max-sm:justify-center">
      {/* limit */}
      <div className="flex shrink-0 items-center gap-3">
        <Label htmlFor={id}>Số hàng mỗi trang</Label>

        <Select
          value={String(limit)}
          onValueChange={(v) => onLimitChange(Number(v))}
        >
          <SelectTrigger id={id} className="w-fit">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* page info */}
      <div className="text-sm text-muted-foreground">
        Trang {page}/{totalPage}
      </div>

      {/* pagination */}
      <div>
        <Pagination className="w-fit">
        <PaginationContent>
          {/* prev */}
          <PaginationItem>
            <PaginationLink
              size="icon"
              onClick={() => page > 1 && onPageChange(page - 1)}
            >
              <ChevronLeftIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>

          {pages.map((p, i) =>
            p === "..." ? (
              <PaginationItem key={i}>
                <PaginationLink />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === page}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          {/* next */}
          <PaginationItem>
            <PaginationLink
              size="icon"
              onClick={() => page < totalPage && onPageChange(page + 1)}
            >
              <ChevronRightIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </div>
    </div>
  );
};

export default PaginationPage;
