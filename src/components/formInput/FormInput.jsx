import "./FormInput.scss";

const FormInput = ({ label, ...otherAttributeProps }) => {
  // console.log({ ...otherAttributeProps });
  return (
    <div className="group">
      <input className="form-input" {...otherAttributeProps} />

      {label && (
        <label
          // if input field is empty don't show labels
          className={`${
            otherAttributeProps.value.length > 0 ? "shrink" : null
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
