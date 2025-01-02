import { ProductForm } from "@/components/admin/ProductForm";
import { ProductTable } from "@/components/admin/ProductTable";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { BrandForm } from "@/components/admin/BrandForm";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Panel de Administración
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Agregar Nuevo Producto
            </h2>
            <ProductForm />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Agregar Nueva Categoría
            </h2>
            <CategoryForm />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Agregar Nueva Marca
            </h2>
            <BrandForm />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Productos Existentes
            </h2>
            <ProductTable />
          </div>
        </div>
      </div>
    </div>
  );
}
