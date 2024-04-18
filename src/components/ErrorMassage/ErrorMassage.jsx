import css from "./ErrorMassage.module.css";

const ErrorMessage = ({
  message = "Oops, something went wrong, please reload the page!",
}) => {
  return <p className={css.errorMassage}>{message}</p>;
};

export default ErrorMessage;