"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutUsPage() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-12">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8 order-2 md:order-1">
            <motion.h1
              variants={fadeInUp}
              className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500"
            >
              Sobre Nosotros
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-700 leading-relaxed"
            >
              En Nytek, nuestra pasión por la tecnología nos impulsa a ofrecer
              la mejor selección de productos Apple en Santiago, Chile. Creemos
              firmemente que la innovación y el diseño excepcional de Apple
              deben estar al alcance de todos, y nos esforzamos por brindar una
              experiencia de compra inigualable.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-700 leading-relaxed"
            >
              Nos distinguimos por ofrecer los precios más competitivos del
              mercado sin comprometer la calidad. Todos nuestros productos son
              100% auténticos y cuentan con la garantía oficial de Apple. Tu
              satisfacción es nuestra máxima prioridad, y nuestro equipo de
              expertos está siempre dispuesto a ayudarte a encontrar el producto
              perfecto que se adapte a tus necesidades.
            </motion.p>
          </div>

          <motion.div variants={fadeInUp} className="order-1 md:order-2">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 bg-white p-8">
              <Image
                src="/logo_completo_nytek.webp"
                alt="Nytek Logo"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">¿Por qué elegir Nytek?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Productos Auténticos",
                description:
                  "Garantizamos que todos nuestros productos son 100% originales y cuentan con la garantía oficial de Apple.",
                icon: "🛡️",
              },
              {
                title: "Mejores Precios",
                description:
                  "Ofrecemos los precios más competitivos del mercado sin comprometer la calidad de nuestros productos.",
                icon: "💰",
              },
              {
                title: "Expertos en Apple",
                description:
                  "Nuestro equipo de especialistas está siempre listo para asesorarte y ayudarte a encontrar el producto perfecto.",
                icon: "🍎",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
