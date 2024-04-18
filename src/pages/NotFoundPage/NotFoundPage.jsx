import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <p>The page you are looking for does not exist</p>
      <button>
        <Link to="/">Go home</Link>
      </button>
    </div>
  );
};

export default NotFoundPage;