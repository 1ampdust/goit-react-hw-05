import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './SearchBar.module.css';
import { toast } from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    const formattedSearch = values.search.trim().toLowerCase();
    if (formattedSearch !== '') {
      onSubmit(formattedSearch);
      actions.resetForm();
    } else {
      toast.error('Enter your search term!');
    }
  };

  return (
    <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form className={css.searchForm}>
          <button className={css.searchButton} type="submit">
            Search
          </button>
          <Field
            className={css.searchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
          />
          <ErrorMessage name="search" component="div" className={css.error} />
          {errors.search && touched.search ? (
            <div className={css.error}>{errors.search}</div>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
