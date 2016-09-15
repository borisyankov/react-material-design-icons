import React from 'react';

const style = {
   display: 'inline-block',
   height: 24,
   width: 24,
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
