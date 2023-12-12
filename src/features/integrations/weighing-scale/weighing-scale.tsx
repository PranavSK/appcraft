import { animated, to, useSpring } from '@react-spring/web';
import { cva } from 'class-variance-authority';
import type { FC } from 'react';

import { clampValue } from '#/lib/math';

import { Bar, BarPivot, Base, Container, Pan, SignDisplay } from './parts';
import { AnimatedWeighingScaleProps } from './weighing-scale.types';

const MAX_ROTATION = 19;

const containerVariants = cva('relative rounded-md transition-colors', {
  variants: {
    checkStatus: {
      default: 'bg-[#F3F7FE]',
      correct: 'bg-[#F0FFF4]',
      incorrect: 'bg-[#FFF2F2]',
    },
  },
  defaultVariants: { checkStatus: 'default' },
});

export const WeighingScale: FC<AnimatedWeighingScaleProps> = ({
  leftValue,
  rightValue,
  maxValueDifference,
  comparisonType = 'comparison',
  checkStatus = 'default',
  leftPanLabel,
  leftPanContent,
  rightPanLabel,
  rightPanContent,
  className,
  ...props
}) => {
  const targetAngle =
    MAX_ROTATION * clampValue((rightValue - leftValue) / maxValueDifference, -1, 1);

  const sign =
    comparisonType === 'inequality'
      ? leftValue !== rightValue
        ? 'inequal'
        : 'equal'
      : leftValue > rightValue
      ? 'greater-than'
      : leftValue < rightValue
      ? 'less-than'
      : 'equal';

  const rotation = useSpring({
    from: { rotate: 0 },
    to: { rotate: targetAngle },
  });

  return (
    <Container
      className={containerVariants({ className, checkStatus })}
      data-testid="animated-weighing-scale"
      {...props}
    >
      <Base transform="translate(172.5 300)">
        <g transform="translate(167.5 -9)">
          <animated.g style={rotation}>
            <Bar transform="translate(-138.5)">
              <g transform="translate(-8)">
                <animated.g style={{ rotate: to(rotation.rotate, (val) => -val) }}>
                  <Pan transform="translate(-99.5 -67)" label={leftPanLabel}>
                    {leftPanContent}
                  </Pan>
                </animated.g>
              </g>
              <g transform="translate(276)">
                <animated.g style={{ rotate: to(rotation.rotate, (val) => -val) }}>
                  <Pan transform="translate(-99.5 -67)" label={rightPanLabel}>
                    {rightPanContent}
                  </Pan>
                </animated.g>
              </g>
            </Bar>
          </animated.g>
        </g>
        <SignDisplay transform="translate(145 -78)" checkStatus={checkStatus} sign={sign} />
        <BarPivot transform="translate(149.5 -18)" />
      </Base>
    </Container>
  );
};
