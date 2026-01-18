"use client";

import React, { forwardRef, useState } from "react";
import { ToggleButtonProps } from "@/interfaces/toggleButton/toggleButtonInterface";

const sizeConfig = {
  sm: {
    width: 48,
    height: 24,
    knob: 20,
    translate: 24,
  },
  md: {
    width: 56,
    height: 28,
    knob: 24,
    translate: 28,
  },
  lg: {
    width: 64,
    height: 32,
    knob: 28,
    translate: 32,
  },
};

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      checked,
      defaultChecked = false,
      onChange,
      size = "md",
      disabled = false,
      id,
      className = "",
      "aria-label": ariaLabel = "toggle",
    },
    ref
  ) => {
    const isControlled = typeof checked === "boolean";
    const [internal, setInternal] = useState(defaultChecked);
    const isOn = isControlled ? checked : internal;

    const config = sizeConfig[size];

    const handleToggle = () => {
      if (disabled) return;
      const next = !isOn;
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    const handleKeyDown: React.KeyboardEventHandler = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    };

    return (
      <button
        id={id}
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        suppressHydrationWarning
        style={{
          width: config.width,
          height: config.height,
          backgroundColor: isOn ? "#6b21a8ce" : "#d1d5db",
          borderRadius: 9999,
          padding: 2,
          display: "inline-flex",
          alignItems: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          transition: "background-color 200ms ease-in-out",
          border: "none",
          outline: "none",
        }}
        className={className}
      >
        <span
          suppressHydrationWarning
          style={{
            width: config.knob,
            height: config.knob,
            backgroundColor: "#ffffff",
            borderRadius: 9999,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            transform: isOn ? `translateX(${config.translate}px)` : "translateX(0px)",
            transition: "transform 200ms ease-in-out",
          }}
        />
      </button>
    );
  }
);

ToggleButton.displayName = "ToggleButton";

export default ToggleButton;
