import React from "react";

const InputFieldForm = ({
  isProcessing = false,
  className = "",
  placeholder = "",
  name = "",
  required = true,
  renderFooter = () => null,
  value=""
}: any) => {
  const [passwordField, $passwordField] = React.useState<any | null>({
    type: "password",
    icon: "eye-off.svg",
    alt: "show",
  });
  const [toggle, setToggle] = React.useState(false);

  const toggleShowHide = () => {
    setToggle((pToggle: boolean) => !pToggle);
  };

  React.useEffect(() => {
    if (toggle) {
      $passwordField({
        type: "text",
        icon: "eye.svg",
        alt: "hide",
      });
    } else {
      $passwordField({
        type: "password",
        icon: "eye-off.svg",
        alt: "show",
      });
    }
  }, [toggle]);

  return (
    <div className="input-group">
      <input
        type={passwordField.type}
        className={`form-control ${className}`}
        placeholder={placeholder}
        name={name}
        autoFocus
        required={required}
        readOnly={isProcessing}
        value={value}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => toggleShowHide()}
        >
          <img
            src={`/assets/icons/${passwordField.icon}`}
            height="14px"
            alt={passwordField.alt}
          />
        </button>
        {renderFooter()}
      </div>
    </div>
  );
};

export default InputFieldForm;
