
import React from 'react';
import { Field, ErrorMessage } from 'formik';


const Checkbox = (props) => {
    const { label, required, options, parentClass, name, ...rest } = props;
    const id = Math.floor(Math.random() * Math.floor(1000));
    return (
        <>
            <div className={parentClass}>
                {label && <label>{label} {required && <span className="text-danger">*</span>}</label>}
                <br />
                <Field name={name} {...rest} >
                    {
                        (data) => {
                            const { field } = data;
                            return (
                                options.map((option, index) => {
                                     return <>
                                     <input type="checkbox" name={name} {...field} value={option.value} onChange={evt => {
                                        // let fieldValue = [...field.value];
                                        // if (field.value.includes(option.value)) {
                                        //     var index = fieldValue.indexOf(evt.target.value);
                                        //     if (index > -1) {
                                        //         fieldValue.splice(index, 1);
                                        //     }
                                        // } else {
                                        //     fieldValue.push(evt.target.value);
                                        // }
                                        // data.form.setFieldValue(
                                        //     name,
                                        //     Array.from(new Set(fieldValue))
                                        // )
                                    }
                                    } checked={field.value?.includes(option.value)} />
                                    {option.key}
                                    </>
                                })
                            )
                        }
                    }
                </Field>
            </div>
            <small className="text-danger"><ErrorMessage name={name} /></small>
        </>
    )
}

export default Checkbox;
