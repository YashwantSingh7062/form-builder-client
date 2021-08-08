
import React from 'react';
import { Field, ErrorMessage } from 'formik';

const Radio = (props) => {
    const { label, required, options, onClick, parentClass, name, ...rest } = props;
    const id = Math.floor(Math.random() * Math.floor(1000));
    return (
        <div className={parentClass}>
            {label && <label>{label} {required && <span className="text-danger">*</span>}</label>}
            <fieldset className="service-select-content">
                <Field name={name} {...rest}>
                    {
                        ({ field }) => {
                            return (
                                options.map((option, index) => {
                                    return (
                                        <React.Fragment key={option.value + index}>
                                            <input type="radio" name={name} id={`${id}-${name}-${index}`} {...field} value={option.value} checked={option.value === field.value} onClick={() => onClick && onClick()} />
                                            <label htmlFor={`${id}-${name}-${index}`}>{option.key}</label>
                                        </React.Fragment>
                                    )
                                })
                            )
                        }
                    }
                </Field>
            </fieldset>
            <small className="text-danger"><ErrorMessage name={name} /></small>
        </div>
    )
}


export default Radio;
