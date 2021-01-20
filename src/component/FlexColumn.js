import React from 'react'

export function FlexColumn({children, style, className="", onClick = () => {}}) {
    return(
        <div className={className} onClick={() => onClick()} style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            ...style
        }}>
            {children}
        </div>
    )
}