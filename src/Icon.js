import React from 'react';

const style = {
   display: 'inline-block',
   height: 16,
   width: 16,
};

export default ({
    children,
    color,
    className,
    ...rest,
}) => (
    <svg
        fill={color}
        viewBox="0 0 24 24"
        className={['react-material-design-icon', className].join(' ')}
        style={style}
        {...rest}
    >
        {children}
    </svg>
);
