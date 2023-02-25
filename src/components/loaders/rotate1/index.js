import { useState } from 'react';
import style from './style.module.css'

const Rotate1 = ({height}) => {
    
    const [css] = useState({
        height: height ? height : ''
    })
    return (
        <>
            <div className={style.ldsDualRing} style={css}></div>
        </>
    );
}

export default Rotate1;