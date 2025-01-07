"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { MapPin, Mail, Clock, Shield, Truck, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

interface AnimatedNumberProps {
  end: number;
  duration?: number;
}

function AnimatedNumber({ end, duration = 2000 }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
}

interface Stat {
  number?: number;
  suffix?: string;
  text?: string;
  label: string;
}

export default function AboutPage() {
  const stats: Stat[] = [
    { number: 1000, suffix: "+", label: "Clientes Satisfechos" },
    { number: 500, suffix: "+", label: "Productos Apple" },
    { text: "24/7", label: "Soporte al Cliente" },
    { number: 100, suffix: "%", label: "Garantía de Autenticidad" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Calidad Garantizada",
      description:
        "Todos nuestros productos son 100% originales con garantía oficial Apple.",
    },
    {
      icon: Truck,
      title: "Envío Gratuito",
      description: "Envío gratis a todo Chile en todos nuestros productos.",
    },
    {
      icon: BadgeCheck,
      title: "Servicio Premium",
      description: "Atención personalizada y soporte técnico especializado.",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "Fundación de Nytek",
      description:
        "Iniciamos nuestro viaje como distribuidor autorizado de productos Apple.",
    },
    {
      year: "2021",
      title: "Expansión Digital",
      description:
        "Lanzamiento de nuestra plataforma de e-commerce para llegar a todo Chile.",
    },
    {
      year: "2022",
      title: "Centro de Servicio",
      description:
        "Apertura de nuestro centro de servicio técnico especializado.",
    },
    {
      year: "2023",
      title: "Líder del Mercado",
      description:
        "Nos convertimos en uno de los principales distribuidores Apple en Chile.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Transformando la
                <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  {" "}
                  experiencia Apple{" "}
                </span>
                en Chile
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                En Nytek, nos dedicamos a ofrecer la mejor experiencia en
                productos Apple, combinando calidad premium, precios
                competitivos y un servicio excepcional que nos distingue en el
                mercado chileno.
              </p>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square overflow-hidden bg-gradient-to-tr  rounded-[2rem] from-gray-800 to-gray-700 p-8 shadow-2xl"
              >
                <Image
                  src="/logo_completo_nytek.webp"
                  alt="Nytek Logo"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-amber-400 to-yellow-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.text ? (
                    stat.text
                  ) : stat.number ? (
                    <>
                      <AnimatedNumber end={stat.number} />
                      {stat.suffix}
                    </>
                  ) : null}
                </div>
                <div className="text-lg text-gray-800 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nos comprometemos a ofrecer la mejor experiencia de compra con
              productos Apple auténticos y un servicio al cliente excepcional.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <Card className="p-8 h-full bg-gray-50 hover:shadow-xl transition-all duration-300 border-gray-200">
                  <div className="rounded-full bg-amber-100 w-16 h-16 flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Nuestra Historia
          </h2>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-12 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center text-gray-900 font-bold text-xl">
                    {item.year}
                  </div>
                  {index !== timeline.length - 1 && (
                    <div className="w-1 h-full bg-amber-200 mt-4" />
                  )}
                </div>
                <div className="flex-1 pt-2 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Contáctanos</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: MapPin, title: "Ubicación", info: "Santiago, Chile" },
                { icon: Mail, title: "Email", info: "contacto@nytek.cl" },
                {
                  icon: Clock,
                  title: "Horario",
                  info: "Lun - Dom: 9:00 - 21:00",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gray-800 rounded-xl hover:shadow-xl transition-all duration-300"
                >
                  <div className="rounded-full bg-amber-400 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.info}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
