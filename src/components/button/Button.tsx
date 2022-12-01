import { ButtonHTMLAttributes, FC } from "react";
import { BaseButton, LoadingSpinner } from "./ButtonStyle";

export enum BUTTON_TYPE_CLASSES {
  google = "google-sign-in",
  inverted = "inverted",
}

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
  return (
    <BaseButton
      // className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
      disabled={isLoading}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </BaseButton>
  );
};

export default Button;

// import {
//   BaseButton,
//   GoogleSignInButton,
//   InvertedButton,
// } from './button.styles';

// export const BUTTON_TYPE_CLASSES = {
//   base: 'base',
//   google: 'google-sign-in',
//   inverted: 'inverted',
// };

// const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
//   ({
//     [BUTTON_TYPE_CLASSES.base]: BaseButton,
//     [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
//     [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
//   }[buttonType]);

// const Button = ({ children, buttonType, ...otherProps }) => {
//   const CustomButton = getButton(buttonType);
//   return <CustomButton {...otherProps}>{children}</CustomButton>;
// };

// export default Button;
