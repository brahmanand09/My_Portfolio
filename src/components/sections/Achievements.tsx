"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { companyAchievements } from "@/data/portfolio";
import type { AchievementItem } from "@/types";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { useIsClient } from "@/hooks/useIsClient";
import { useModalBehavior } from "@/hooks/useModalBehavior";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Achievements() {
  const [activeCompanyId, setActiveCompanyId] = useState(
    companyAchievements[0]?.id ?? ""
  );
  const [selectedAchievement, setSelectedAchievement] =
    useState<AchievementItem | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [cardImageIndex, setCardImageIndex] = useState<Record<string, number>>({});
  const mounted = useIsClient();
  const dialogRef = useRef<HTMLDivElement>(null);

  const activeCompany =
    companyAchievements.find((c) => c.id === activeCompanyId) ??
    companyAchievements[0];

  const openModal = (item: AchievementItem, initialIndex = 0) => {
    setSelectedAchievement(item);
    setModalImageIndex(initialIndex);
  };

  const currentModalImages = selectedAchievement?.images?.length
    ? selectedAchievement.images
    : selectedAchievement
    ? [selectedAchievement.image]
    : [];

  const handlePrevModalImage = () => {
    setModalImageIndex((prev) =>
      prev === 0 ? currentModalImages.length - 1 : prev - 1
    );
  };

  const handleNextModalImage = () => {
    setModalImageIndex((prev) =>
      prev === currentModalImages.length - 1 ? 0 : prev + 1
    );
  };

  const closeModal = useCallback(() => setSelectedAchievement(null), []);

  useModalBehavior(selectedAchievement !== null, closeModal, dialogRef, {
    onKeyDown: (event) => {
      if (currentModalImages.length < 2) return;
      if (event.key === "ArrowLeft") handlePrevModalImage();
      if (event.key === "ArrowRight") handleNextModalImage();
    },
  });

  if (!activeCompany) return null;

  return (
    <section id="achievements" className="section-block scene-3d pt-4 pb-16 md:pt-6 md:pb-20">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center md:text-left"
        >
          <span className="section-eyebrow">Honors & Impact</span>
          <h2 className="section-title text-3d mt-3">Company Achievements & Awards</h2>
          <p className="mt-4 text-muted">
            Official performance honors, consecutive employee awards, and high-impact engineering milestones delivered across companies.
          </p>
        </motion.div>

        {/* Company Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-3">
          {companyAchievements.map((company) => {
            const isActive = company.id === activeCompanyId;
            return (
              <button
                key={company.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCompanyId(company.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? "border-primary bg-primary/15 text-primary-light shadow-lg shadow-primary/20 scale-[1.02]"
                    : "border-border bg-surface/60 text-muted hover:border-border-hover hover:text-foreground hover:bg-surface"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-primary text-bg font-extrabold"
                      : "bg-surface-elevated text-foreground"
                  }`}
                >
                  {company.logoText}
                </span>
                <div className="text-left">
                  <div className="font-semibold leading-tight">{company.name}</div>
                  <div className="text-[11px] opacity-70">{company.role}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Company Metadata Banner */}
        <motion.div
          key={activeCompany.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/70 bg-surface/40 p-4 sm:p-5 backdrop-blur-sm"
        >
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {activeCompany.name}
            </h3>
            <p className="text-xs text-muted mt-0.5">
              Role: <span className="font-medium text-foreground">{activeCompany.role}</span>
            </p>
          </div>
          <span className="inline-flex self-start sm:self-auto items-center text-xs font-medium text-subtle bg-surface-elevated px-3 py-1.5 rounded-lg border border-border">
            🗓️ {activeCompany.duration}
          </span>
        </motion.div>

        {/* Achievements Grid */}
        <div
          className={`mt-8 grid gap-6 ${
            activeCompany.achievements.length === 1
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {activeCompany.achievements.map((item, index) => {
            const hasMultipleImages = item.images && item.images.length > 1;
            const currentImgIdx = cardImageIndex[item.id] ?? 0;
            const currentImg =
              hasMultipleImages && item.images
                ? item.images[currentImgIdx]
                : item.image;
            // A lone card spans the full width, so lay it out side-by-side on desktop.
            const isWide = activeCompany.achievements.length === 1;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
              >
                <Tilt3D className="h-full">
                  <div
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-amber-500/35 bg-gradient-to-b from-surface-elevated to-surface transition-all duration-300 hover:border-amber-400/70 hover:shadow-2xl hover:shadow-amber-500/10 ${
                      isWide ? "lg:flex-row" : ""
                    }`}
                  >
                    {/* Image container */}
                    <div
                      className={`relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-black/40 ${
                        isWide ? "lg:w-1/2" : ""
                      }`}
                    >
                      <Image
                        src={currentImg}
                        alt={`${item.title} — photo ${currentImgIdx + 1}`}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                        sizes="(max-width: 768px) 100vw, 720px"
                        onClick={() => openModal(item, currentImgIdx)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated/95 via-black/20 to-transparent pointer-events-none" />

                      {/* Top Bar: Click to Zoom & Multi-Image Indicator */}
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        {hasMultipleImages && (
                          <span className="flex items-center gap-1 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                            📷 {item.images?.length} Photos
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => openModal(item, currentImgIdx)}
                          aria-haspopup="dialog"
                          aria-label={`Expand photos for ${item.title}`}
                          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md transition-all hover:bg-black"
                        >
                          🔍 Expand
                        </button>
                      </div>

                      {/* Multi-image thumbnail selector on card */}
                      {hasMultipleImages && item.images && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                          {item.images.map((thumb, idx) => (
                            <button
                              key={thumb}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCardImageIndex((prev) => ({
                                  ...prev,
                                  [item.id]: idx,
                                }));
                              }}
                              aria-label={`Show photo ${idx + 1} of ${item.images?.length}`}
                              aria-pressed={currentImgIdx === idx}
                              className={`h-8 w-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                currentImgIdx === idx
                                  ? "border-amber-400 scale-110 shadow-md"
                                  : "border-white/40 opacity-75 hover:opacity-100"
                              }`}
                            >
                              <Image src={thumb} alt="" width={32} height={32} className="h-full w-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Impact pill */}
                      <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                        <span className="inline-flex items-center rounded-lg bg-amber-600/95 px-2.5 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                          {item.impact}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div
                      className={`flex flex-1 flex-col p-5 sm:p-6 ${
                        isWide ? "lg:justify-center lg:p-8" : ""
                      }`}
                    >
                      <h4 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary-light">
                        {item.title}
                      </h4>
                      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>

                      {/* Tech Badges */}
                      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border/40 pt-4">
                        {item.tech.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedAchievement && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeModal}
                  className="absolute inset-0 bg-black/90 backdrop-blur-md"
                  aria-hidden
                />

                {/* Modal Container */}
                <motion.div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="achievement-modal-title"
                  tabIndex={-1}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-2xl max-h-[92vh]"
                >
                  {/* Close button */}
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-black/70 text-white transition-all hover:bg-black hover:text-primary-light shadow-md"
                    aria-label="Close details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="overflow-y-auto flex-1">
                    {/* Full view image container with object-contain */}
                    <div className="relative h-[55vh] min-h-[300px] max-h-[560px] w-full shrink-0 bg-black/80 flex items-center justify-center p-2">
                      <Image
                        src={currentModalImages[modalImageIndex] ?? selectedAchievement.image}
                        alt={`${selectedAchievement.title} — photo ${modalImageIndex + 1}`}
                        fill
                        priority
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 900px"
                      />

                      {/* Modal Navigation Arrows for multi-image */}
                      {currentModalImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={handlePrevModalImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white border border-white/20 transition-all hover:bg-black hover:scale-110"
                            aria-label="Previous photo"
                          >
                            ❮
                          </button>
                          <button
                            type="button"
                            onClick={handleNextModalImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white border border-white/20 transition-all hover:bg-black hover:scale-110"
                            aria-label="Next photo"
                          >
                            ❯
                          </button>
                        </>
                      )}
                    </div>

                    {/* Multi-image thumbnail strip inside modal */}
                    {currentModalImages.length > 1 && (
                      <div className="flex items-center justify-center gap-2 bg-black/60 p-3 border-b border-border/40">
                        {currentModalImages.map((img, idx) => (
                          <button
                            key={img}
                            type="button"
                            onClick={() => setModalImageIndex(idx)}
                            aria-label={`Show photo ${idx + 1} of ${currentModalImages.length}`}
                            aria-pressed={modalImageIndex === idx}
                            className={`relative h-12 w-16 overflow-hidden rounded-md border-2 transition-all cursor-pointer ${
                              modalImageIndex === idx
                                ? "border-amber-400 scale-105"
                                : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                          >
                            <Image src={img} alt="" width={64} height={48} className="h-full w-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="p-6 sm:p-8">
                      <span className="inline-block rounded-md bg-amber-500/90 px-3 py-1 text-xs font-bold text-white shadow">
                        {selectedAchievement.impact}
                      </span>
                      <h3
                        id="achievement-modal-title"
                        className="mt-3 text-xl font-bold text-foreground sm:text-2xl"
                      >
                        {selectedAchievement.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                        {selectedAchievement.description}
                      </p>

                      <div className="mt-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-subtle">
                          Highlights & Honors
                        </h4>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {selectedAchievement.tech.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary-light"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
