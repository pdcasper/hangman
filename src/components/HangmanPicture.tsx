import { render } from '@testing-library/react';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';

interface PictureProperties {
    errorCont: number
}
export function Picture(props: PictureProperties) {
    return(
        <React.Fragment>
            <span>Errores {props.errorCont}</span>
            <img src={logo}></img>
        </React.Fragment>
    )
}

