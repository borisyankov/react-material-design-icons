import React from 'react';

const style = {
   display: 'inline-block',
   // color: svgIcon.color,
   // fill: this.state.hovered ? onColor : offColor,
   height: 24,
   width: 24,
   userSelect: 'none',
   // transition: transitions.easeOut(),
 };

export default ({
    children,
    color,
    className,
    ...rest,
}) => (
    <svg
        fill={color}
        className={['react-material-design-icon', className].join(' ')}
        style={style}
        {...rest}
    >
        {children}
    </svg>
);
