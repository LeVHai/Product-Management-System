import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const SelectCategories = ({onChange,...props}) => {
  return (
    <Select  onValueChange={(value) => onChange(value)} {...props}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Danh mục sản phẩm" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
      <SelectItem value="system">System</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
  )
}

export default SelectCategories