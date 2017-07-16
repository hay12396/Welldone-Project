import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CategoryListRow = ({ category, onDelete }) => {
    return (
        <tr>
            <td><a href="#" onClick={() => { onDelete(category); }}>Delete</a></td>
            <td><Link to={'/category/' + category.id}>{category.name}</Link></td>
            <td>{category.name}</td>
        </tr>
    );
};

CategoryListRow.propTypes = {
    category: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default CategoryListRow;