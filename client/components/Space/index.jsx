import React, { useMemo } from 'react';
import ClassNames from 'classnames';

import styles from './style.scss';

const Space = ({
  className,
  tag,
  style,
  block,
  size,
  direction,
  align,
  children,
  ...props
}) => {
  const curClass = useMemo(() => {
    const res = [styles.container, className];
    if (block) {
      res.push(styles.isBlock);
    }
    if (align === 'start') {
      res.push(styles.isAlignStart);
    }
    if (align === 'end') {
      res.push(styles.isAlignEnd);
    }
    if (align === 'center') {
      res.push(styles.isAlignCenter);
    }
    if (align === 'baseline') {
      res.push(styles.isAlignBaseline);
    }
    if (direction === 'horizontal') {
      res.push(styles.isDirectionHorizontal);
    }
    if (direction === 'vertical') {
      res.push(styles.isDirectionVertical);
    }

    return res;
  }, [className, direction, align]);

  return React.createElement(
    tag,
    {
      ...props,
      className: ClassNames(curClass),
      style: {
        ...style,
        '--space-gap': `${size}px`,
      },
    },
    children,
  );
};

Space.defaultProps = {
  tag: 'div',
  size: 20,
  direction: 'horizontal',
  align: 'center',
};

export default Space;
