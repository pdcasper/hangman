import { render } from '@testing-library/react';
import React, {useState} from 'react';
import img00 from '../hang00.jpg';
import img01 from '../hang01.jpg';
import img02 from '../hang02.jpg';
import img03 from '../hang03.jpg';
import img04 from '../hang04.jpg';
import img05 from '../hang05.jpg';
import img06 from '../hang06.jpg';
import img07 from '../hang07.jpg';

interface PictureProperties {
    errorCont: number
}
export function Picture(props: PictureProperties) {
    const images =[img00, img01, img02, img03, img04, img05, img06, img07];
    
    return(
        <React.Fragment>
            <img src={images[props.errorCont]} style={{height: 300}}></img>
        </React.Fragment>
    )
}

