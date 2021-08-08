
import React from 'react';
import { Field, ErrorMessage } from 'formik';

const Select = (props) => {
    const { label, name, parentClass, dropdownIcon, options, required, typeYearDropDown, ...rest } = props;
    const id = Math.floor(Math.random() * Math.floor(1000));

    // For Year Select DropDown Field 
    const [years, setYears] = React.useState({
        max: new Date().getFullYear(),
        min: new Date().getFullYear() - 10
    });
    let yearsArr = [];
    for (var i = years.min; i <= years.max; i++) {
        yearsArr.unshift(i);
    }
    // ----------------------------------
    return (
        <div className={parentClass}>
            {label && <label htmlFor={`${id}-${name}`}>{label} {required && <span className="text-danger">*</span>}</label>}
            <Field component="select" id={`${id}-${name}`} name={name} {...rest}>
                {typeYearDropDown ?
                    <React.Fragment>
                        <option value="" defaultValue disabled>{props.placeholder}</option>
                        {yearsArr.map(year => <option key={year} value={year}>{year}</option>)}
                    </React.Fragment> :
                    options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>{option.key}</option>
                        )
                    })
                }
            </Field>
            <small className="text-danger"><ErrorMessage name={name} /></small>
        </div>
    )
}
export default Select;