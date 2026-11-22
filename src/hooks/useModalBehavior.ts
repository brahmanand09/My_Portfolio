"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Options {
  /** Extra key handlers while the modal is open (e.g. ArrowLeft / ArrowRight). */
  onKeyDown?: (event: KeyboardEvent) => void;
}

/**
 * Shared accessible-modal behaviour:
 * - locks body scroll while open
 * - closes on Escape
 * - traps Tab focus inside the dialog
 * - moves focus into the dialog on open and restores it on close
 */
export function useModalBehavior(
  isOpen: boolean,
  onClose: () => void,
  dialogRef: RefObject<HTMLElement | null>,
  options: Options = {},
) {
  // Keep latest callbacks in refs so the effect only re-runs on open/close.
  const onCloseRef = useRef(onClose);
  const onKeyDownRef = useRef(options.onKeyDown);

  useEffect(() => {
    onCloseRef.current = onClose;
    onKeyDownRef.current = options.onKeyDown;
  });

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Wait a frame so the portal content is mounted before focusing.
    const frame = requestAnimationFrame(() => {
      const dialog = dialogRef.current;
      const first = dialog?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? dialog)?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      onKeyDownRef.current?.(event);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, dialogRef]);
}
