import React from "react";

import classes from './Button.module.css'

const Button = props => {
    return <button className={classes['button-86']} onClick={props.onClick}>
        {props.children}
    </button>
};

export default Button;