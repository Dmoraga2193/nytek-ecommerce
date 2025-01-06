import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const categories = [
  { name: "iPhone", href: "/categoria/iphone" },
  { name: "MacBooks", href: "/categoria/macbooks" },
  { name: "iPads", href: "/categoria/ipads" },
  { name: "Accesorios", href: "/categoria/accesorios" },
];

const quickLinks = [
  { name: "Sobre Nosotros", href: "/about" },
  { name: "Contacto", href: "/contacto" },
];

const paymentMethods = [
  "/footer/visa.png",
  "/footer/mastercard.png",
  "/footer/mercadopago.png",
  "/footer/paypal.svg",
];

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo_nytek.jpeg"
                alt="Nytek Logo"
                width={40}
                height={40}
              />
              <Image
                src="/logo.png"
                alt="Nytek Logo"
                width={120}
                height={120}
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tu destino tecnológico de confianza. Ofrecemos los últimos
              productos Apple con garantía y servicio excepcional.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Categorías
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Contacto
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Radal #1015 Quinta Normal, Santiago, Chile</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+56 2 2345 6789</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>contacto@nytek.cl</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Payment Methods - Now First */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-gray-900">
                Medios de pago:
              </h4>
              <div className="flex items-center gap-4 w-full max-w-[280px]">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="relative h-10 w-[80px]">
                    <Image
                      src={method}
                      alt="Payment method"
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Copyright - Now Second */}
            <p className="text-sm text-gray-600 text-right">
              © {new Date().getFullYear()} Nytek. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
