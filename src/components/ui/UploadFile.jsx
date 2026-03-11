import { ImageUp, X } from "lucide-react";
import { useRef, useState } from "react";
// import { Button } from "@/components/ui/button"

const UploadFile = ({ className, onChange,...props }) => {
  // const [files, setFiles] = useState([])
  const inputRef = useRef(null);

  // const handleFileChange = (e) => {
  //   if (e.target.files) {
  //     setFiles(Array.from(e.target.files))
  //     onChange(Array.from(e.target.files))
  //   }
  // }

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = e.target.files[0];
      if (onChange) {
        const filesWithUrl = {
          file :selectedFiles,
          url: URL.createObjectURL(selectedFiles),
        }
        onChange(filesWithUrl);
      }
    }
  };

  // const removeFile = (index) => {
  //   setFiles(files.filter((_, i) => i !== index))
  // }

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full h-full  space-y-4">
      {/* Upload Box */}
      <div
        onClick={handleClick}
        className={`cursor-pointer rounded-xl border-2 border-dashed border-muted-foreground/30 
                   hover:border-primary transition-colors
                   min-h-32 flex flex-col items-center justify-center text-center px-4 ${className}`}
      >
        <ImageUp className="h-8 w-8 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">
          Kéo thả ảnh hoặc{" "}
          <span className="text-primary font-medium">chọn ảnh.</span>
        </p>
      </div>

      {/* Hidden Input */}
      <input
      {...props}
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* File List */}
      {/* {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md border p-2"
            >
              <span className="text-sm truncate">{file.name}</span>
              <Button
                size="icon"
                variant="ghost"
                type="button"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default UploadFile;
