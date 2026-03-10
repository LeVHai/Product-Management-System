import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/services/api";

const PRODUCT_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const res = await api.getProduct(id);
    
    setProduct(res.data);
  };

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
        </Button>

        <h1 className="text-xl font-semibold">
          Chi tiết sản phẩm
        </h1>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Image */}
        <div className="border rounded-lg p-4 flex items-center justify-center">
          <img
            src={product.image}
            className="max-h-60 object-contain"
          />
        </div>

        {/* Info */}
        <div className="md:col-span-2 space-y-4">

          <div>
            <p className="text-sm text-muted-foreground">
              Tên sản phẩm
            </p>
            <p className="text-lg font-medium">
              {product.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Danh mục
            </p>
            <p>{product.category}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Giá
            </p>
            <p>{product.price} đ</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Số lượng
            </p>
            <p>{product.quantity}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Trạng thái
            </p>

            <Badge
              className={
                product.status === PRODUCT_STATUS.ACTIVE
                  ? "border-emerald-600/40 bg-emerald-600/10 text-emerald-500"
                  : "border-red-600/40 bg-red-600/10 text-red-500"
              }
            >
              {product.status === PRODUCT_STATUS.ACTIVE
                ? "Kinh doanh"
                : "Ngừng kinh doanh"}
            </Badge>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;