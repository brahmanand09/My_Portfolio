"use client";

import { FaCode, FaMobileScreen, FaServer } from "react-icons/fa6";
import { services } from "@/data/portfolio";
import { Tilt3D } from "@/components/ui/Tilt3D";
import type { Service } from "@/types";

const iconMap = {
  code: FaCode,
  layout: FaCode,
  mobile: FaMobileScreen,
  server: FaServer,
} as const;

function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];

  return (
    <Tilt3D maxTilt={8}>
      <article className="card-surface card-depth group h-full">
        <div className="card-icon-wrap">
          <Icon aria-hidden />
        </div>
        <h3 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{service.description}</p>
      </article>
    </Tilt3D>
  );
}

export function Services() {
  return (
    <section id="services" className="section-block-alt scene-3d">
      <div className="container-main">
        <span className="section-eyebrow">Services</span>
        <h2 className="section-title text-3d">What I Do</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Full stack solutions — scalable backends, secure APIs, and polished frontends
          built for production.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
