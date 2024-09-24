"use client";

import useProjectModal from "@/hooks/useProjectModal";
import { Project } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

interface ProjectModalInterface {
  title: string;
  body: React.ReactElement;
  disabled?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  body,
  isOpen,
  disabled,
  onClose,
}: ProjectModalInterface) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      className={`${
        isOpen
          ? "fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm"
          : "hidden"
      }`}
    >
      {isOpen && body}
    </div>
  );
}
