import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive"

import "./style.css";
export default function LoginInput(props) {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: "(min-width: 850px)"
  }) 
  
  return (
    <div className="input_wrap">
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && <i className="error_icon"/>}
      <div className="error_message" >
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </div>
    </div>
  );
}
