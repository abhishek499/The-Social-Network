import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

import "./registerInputs.style.css";
export default function RegisterInput(props) {
  const [field, meta] = useField(props);
  const view1 = useMediaQuery({
    query: "(min-width: 529px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div className="input_wrap register_input_wrap">
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        style={{
          width: `${
            view1 && (field.name === "first_name" || field.name === "last_name")
              ? "100%"
              : view1 && (field.name === "email" || field.name === "password")
              ? "370px"
              : "300px"
           }`,
        }}
        type={field.type}
        name={field.name}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && <i className="error_icon" />}
      <div className="error_message">
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </div>
    </div>
  );
}
