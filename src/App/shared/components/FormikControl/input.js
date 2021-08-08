import React from 'react';
import { Field, ErrorMessage } from 'formik';

const Input = (props) => {
    const { label, parentClass, name, required, ...rest } = props;
    const id = Math.floor(Math.random() * Math.floor(1000));
    return (
        <div className={parentClass}>
            {label && <label htmlFor={`${id}-${name}`}>{label} {required && <span className="text-danger">*</span>} </label>}
            <Field id={`${id}-${name}`} name={name} {...rest} />
            <small className="text-danger"><ErrorMessage name={name} /></small>
        </div>
    )
}

export default Input;