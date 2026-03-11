import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { forwardRef, useImperativeHandle, useState } from "react";
import { CustomButton } from "../ui/CustomButton";

const ConfirmDeleteDialog = forwardRef(({ onDelete }, ref) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  useImperativeHandle(ref, () => ({
    delete: (id) => {
      setId(id);
      setOpen(true);
    },
  }));

  const handleDelete = (id)=>{
    onDelete(id)
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa sản phẩm</AlertDialogTitle>
          <AlertDialogDescription>
            Không thể hoàn tác hành động này. Sản phẩm sẽ bị xóa vĩnh viễn.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Đóng</AlertDialogCancel>

          <CustomButton
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(id)}
            
          >
            Xóa
          </CustomButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default ConfirmDeleteDialog;
