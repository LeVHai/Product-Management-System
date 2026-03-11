import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectCategories = ({ value, onChange,...props }) => {
  
  const categories = [
    {
      _id: "1",
      name: "Quần",
    },
    {
      _id: "2",
      name: "Áo",
    },
    {
      _id: "3",
      name: "Váy",
    },
    {
      _id:"4",
      name:"Phụ kiện"
    },
    {
    _id:"5",
      name:"Giày"
    }
  ];
  return (
    <Select value={value} onValueChange={onChange} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Danh mục sản phẩm" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup >
          {categories.map((item) => (
            <SelectItem key={item._id} value={item._id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCategories;
