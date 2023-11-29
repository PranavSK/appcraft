import { ReactNode, SVGAttributes } from 'react';

export interface AnimatedWeighingScaleProps extends SVGAttributes<SVGSVGElement> {
  leftValue: number;
  rightValue: number;
  maxValueDifference: number;
  comparisonType?: 'inequality' | 'comparison';
  checkStatus?: 'default' | 'correct' | 'incorrect';
  leftPanContent?: ReactNode;
  leftPanLabel?: ReactNode;
  rightPanContent?: ReactNode;
  rightPanLabel?: ReactNode;
}
