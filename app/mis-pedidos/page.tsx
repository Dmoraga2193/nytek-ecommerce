"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, User, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Importamos Image de next/image
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

// Tipos para los pedidos
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  items: OrderItem[];
  total: number;
}

// Datos de ejemplo - Reemplazar con datos reales de la API
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-05",
    status: "completed",
    items: [
      {
        id: "1",
        name: "iPhone 15 Pro Max 256GB",
        quantity: 1,
        price: 1299990,
        image: "/placeholder.svg",
      },
    ],
    total: 1299990,
  },
  {
    id: "ORD-002",
    date: "2024-01-06",
    status: "processing",
    items: [
      {
        id: "2",
        name: "MacBook Air M2",
        quantity: 1,
        price: 1499990,
        image: "/placeholder.svg",
      },
    ],
    total: 1499990,
  },
];

const statusMap = {
  pending: { label: "Pendiente", className: "bg-yellow-500" },
  processing: { label: "En Proceso", className: "bg-blue-500" },
  completed: { label: "Completado", className: "bg-green-500" },
  cancelled: { label: "Cancelado", className: "bg-red-500" },
};

export default function OrdersPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-[120px]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Mis Pedidos</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>

        <div className="grid md:grid-cols-[240px_1fr] gap-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Navegación</CardTitle>
              <CardDescription>Gestiona tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/mi-perfil">
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/mis-pedidos">
                  <Package className="w-4 h-4 mr-2" />
                  Mis Pedidos
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {mockOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">
                        Pedido #{order.id}
                      </CardTitle>
                      <CardDescription>
                        Realizado el {new Date(order.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className={statusMap[order.status].className}>
                      {statusMap[order.status].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 relative bg-muted rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Cantidad: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-lg">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/pedido/${order.id}`}>
                        Ver Detalles
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {mockOrders.length === 0 && (
              <Card>
                <CardContent className="py-8">
                  <div className="text-center">
                    <Package className="w-12 h-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No hay pedidos</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      No has realizado ningún pedido todavía.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/">Ir a Comprar</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
