"use client";

import { motion } from "framer-motion";
import { FaCode, FaMobileScreen, FaServer } from "react-icons/fa6";
import { services } from "@/data/portfolio";
import { Tilt3D } from "@/components/ui/Tilt3D";
import type { Service } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const iconMap = {
  code: FaCode,
  layout: FaCode,
  mobile: FaMobileScreen,
  server: FaServer,
} as const;

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 52, rotateX: 8, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay: index * 0.15, ease: EASE }}
      style={{ transformOrigin: "bottom center" }}
    >
      <Tilt3D maxTilt={8}>
        <article className="card-surface card-depth group h-full">
          <div className="card-icon-wrap transition-transform duration-300 group-hover:scale-110">
            <Icon aria-hidden />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
            {service.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted">{service.description}</p>
        </article>
      </Tilt3D>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="section-block-alt scene-3d">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="section-eyebrow">Services</span>
          <h2 className="section-title text-3d mt-3">What I Do</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Full stack solutions — scalable backends, secure APIs, and polished frontends
            built for production.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
