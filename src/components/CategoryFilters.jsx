import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { categorysFetch } from '../services/fetchApi';

export default function CategoryFilters({ type, objectKey }) {
  const [categorys, setCategorys] = useState([]);
  const limit = 5;

  useEffect(() => {
    categorysFetch(type)
      .then((result) => setCategorys(result[objectKey]));
  }, [objectKey, type]);

  function restrictResult() {
    if (categorys.length < limit) {
      return categorys;
    }
    return categorys.slice(0, limit);
  }

  return (
    <section>
      { restrictResult().map((category) => (
        <button
          type="button"
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory}
        </button>
      ))}
    </section>
  );
}

CategoryFilters.propTypes = {
  objectKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
