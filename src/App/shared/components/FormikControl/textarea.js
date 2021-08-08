import React from 'react';
import { Field, ErrorMessage } from 'formik';
const Textarea = (props) => {
    const { label, name, parentClass, required, ...rest } = props;
    const id = Math.floor(Math.random() * Math.floor(1000));
    return (
        <div className={parentClass}>
            {label && <label htmlFor={`${id}-${name}`}>{label} {required && <span className="text-danger">*</span>}</label>}
            <Field component="textarea" id={`${id}-${name}`} name={name} style={{ height: '100px' }} {...rest} />
            <small className="text-danger"><ErrorMessage name={name} /></small>
        </div>
    )
}
export default Textarea;