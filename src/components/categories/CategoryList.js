import React, { PropTypes } from 'react';
import CategoryListRow from './CategoryListRow';

const CategoryList = ({ categories, onDelete }) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Delete</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(
                        (category) =>
                            <CategoryListRow key={category.id} category={category} onDelete={onDelete} />
                    )}
                </tbody>
            </table >
        </div>
    );
};

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default CategoryList;