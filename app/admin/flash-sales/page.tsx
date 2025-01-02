import { FlashSalesAdmin } from "@/components/admin/FlashSalesAdmin";

export default function FlashSalesAdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Administración de Ofertas Flash
      </h1>
      <FlashSalesAdmin />
    </div>
  );
}
