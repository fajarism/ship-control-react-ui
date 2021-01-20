import React from 'react'

export function FlexRow({children, style, className="", onClick = () => {}}) {
    return(
        <div className={className} onClick={() => onClick()} style={{
            display: 'flex',
            flexDirection: 'row',
            ...style
        }}>
            {children}
        </div>
    )
}