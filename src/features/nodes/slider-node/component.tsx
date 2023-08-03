import { cva } from "class-variance-authority";
import { useAtom, useAtomValue } from "jotai";
import { type FC, useCallback, useMemo } from "react";
import { find, keys, mapKeys } from "remeda";

import { useAppletStoreBoundFunction } from "#/features/applet";
import { ChildrenNode } from "#/features/nodes/common";
import { type MarkProps, Slider } from "#/features/ui/slider";
import { Widget } from "#/features/ui/widget";
import { approxeq, getProgress, range } from "#/lib/math";
import { cn } from "#/lib/utils";

import type { NodeProps } from "../node.types";
import { sliderFamily, valueFamily } from "./store";

const markVariants = cva("absolute z-10 rounded-full bg-primary/60", {
  variants: {
    orientation: {
      horizontal: "top-1 h-2 w-[0.125rem]",
      vertical: "h-[0.125rem] w-full",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const markLabelVariants = cva("relative min-h-fit min-w-fit", {
  variants: {
    orientation: {
      horizontal: "left-1/2 -translate-x-1/2 -translate-y-10",
      vertical: "top-1/2 -translate-y-1/2",
    },
    status: {
      active: "font-extrabold",
      inactive: "font-normal text-muted-foreground",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    status: "active",
  },
});

const getMarkRenderer = (marks: Record<number, string>) => {
  const Mark: FC<MarkProps> = ({
    mark,
    isCurrent,
    orientation,
    start,
    offset,
    transformType,
    isNegativeTransform,
  }) => {
    return (
      <div
        key={mark}
        className={cn(markVariants({ orientation }))}
        style={{
          [start]: `calc(${mark}% + ${offset}px)`,
          transform: `${transformType}(${isNegativeTransform ? "-" : ""}50%)`,
        }}
      >
        <div
          className={cn(
            markLabelVariants({ orientation, status: isCurrent ? "active" : "inactive" }),
          )}
        >
          {find(Object.entries(marks), ([key]) => approxeq(mark, Number(key)))?.[1] ?? mark}
        </div>
      </div>
    );
  };
  return Mark;
};

export const Component: FC<NodeProps> = ({ id, className }) => {
  const {
    min,
    max,
    step,
    marks,
    onValueChange,
    onValueCommit,
    rowStart,
    rowEnd,
    columnStart,
    columnEnd,
  } = useAtomValue(sliderFamily(id));
  const [value, setValue] = useAtom(valueFamily(id));

  const orientation =
    Math.abs(rowEnd - rowStart) > Math.abs(columnEnd - columnStart) ? "vertical" : "horizontal";
  const [markValues, markRenderer] = useMemo(() => {
    let markValues: number[] = [];
    let marksMap: Record<number, string> = {};
    if (marks) {
      if (marks.toLowerCase() === "all") {
        markValues = range(max, min, step);
        marksMap = Object.fromEntries(
          markValues.map((val) => [
            getProgress(val, min, max) * 100,
            Math.round(val) !== val ? val.toFixed(1) : val.toString(),
          ]),
        );
      } else {
        marksMap = JSON.parse(marks);
        markValues = keys(marksMap).map((key) => Number(key));
      }
    }
    return [
      markValues,
      getMarkRenderer(mapKeys((key) => getProgress(Number(key), min, max) * 100)(marksMap)),
    ];
  }, [marks, max, min, step]);
  const onValueChangeImpl = useAppletStoreBoundFunction("value", onValueChange ?? "");
  const onValueCommitImpl = useAppletStoreBoundFunction("value", onValueCommit ?? "");

  const handleValueChange = useCallback(
    (value: number) => {
      setValue(value);
      onValueChangeImpl(value);
    },
    [onValueChangeImpl, setValue],
  );

  const handleValueCommit = useCallback(
    (value: number) => {
      onValueCommitImpl(value);
    },
    [onValueCommitImpl],
  );

  return (
    <Widget
      {...{ rowStart, rowEnd, columnStart, columnEnd }}
      className={cn(className, "flex flex-col items-center justify-around p-2")}
    >
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        orientation={orientation}
        className={cn("mb-4", marks && marks.length > 0 ? "mt-8" : "mt-4")}
        size="lg"
        marks={markValues}
        markRenderer={markRenderer}
        showFill={false}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
      />
      <div className="text-center">
        <ChildrenNode id={id} />
      </div>
    </Widget>
  );
};
