import React from 'react';
import { Field, ErrorMessage } from 'formik';

const File = (props) => {
    const { label, parentClass, className, accept, name, multiple, required } = props;
    const id = Math.floor(Math.random() * Math.floor(1000));
    return (
        <div className={parentClass}>
            {label && <label htmlFor={`${id}-${name}`}>{label} {required && <span className="text-danger">*</span>} </label>}
            <Field name={name}>
                {(data) => {
                    let { form } = data;
                    return <input type="file" name={name} className={className} accept={accept} onChange={event => {
                        if (multiple) {
                            form.setFieldValue(name, Object.values(event.currentTarget.files));
                        } else {
                            form.setFieldValue(name, event.currentTarget.files[0]);
                        }
                        form.setFieldTouched(name);
                    }} multiple={multiple} />

                }}
            </Field>
            <small className="text-danger">
                <ErrorMessage name={name} />
            </small>
        </div>
    )
}

export default File;