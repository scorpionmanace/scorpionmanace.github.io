import React from 'react';
import { cn } from '../ui/cn';

/** A strip of masking tape. Position it absolutely against what it holds. */
export const Tape: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => <span aria-hidden="true" className={cn('tape absolute block h-7 w-24', className)} style={style} />;

export default Tape;
