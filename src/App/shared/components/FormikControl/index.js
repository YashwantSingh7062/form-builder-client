import React from "react";
import Input from "./input";
import Textarea from "./textarea";
import Select from "./select";
import Radio from "./radio";
import Checkbox from "./checkbox";
import File from './file';

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;

    case "textarea":
      return <Textarea {...rest} />;

    case "select":
      return <Select {...rest} />;

    case "radio":
      return <Radio {...rest} />;

    case "checkbox":
      return <Checkbox {...rest} />;

    case "file": return <File {...rest} />;
  }
};

export default FormikControl;
