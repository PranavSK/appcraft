import type { Root } from "@radix-ui/react-slider";
import type { ComponentPropsWithoutRef, ComponentType } from "react";

import type { sizeOpts } from "./slider.variants";

export interface MarkProps {
  mark: number;
  isCurrent?: boolean;
  size?: SliderProps["size"];
  orientation?: SliderProps["orientation"];
  start: "left" | "right" | "top" | "bottom";
  offset: number;
  transformType: "translateX" | "translateY";
  isNegativeTransform: boolean;
}

export interface SliderProps
  extends Omit<
    ComponentPropsWithoutRef<typeof Root>,
    "defaultValue" | "value" | "onValueChange" | "onValueCommit"
  > {
  showFill?: boolean;
  size: (typeof sizeOpts)[number];
  marks?: number[];
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  onValueCommit?: (value: number) => void;
  markRenderer?: ComponentType<MarkProps>;
}
