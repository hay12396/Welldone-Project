import * as categoryActions from '../../actions/categoryActions';
import { addBtn, topWrapper } from '../styles/SharedStyles';
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import CategoryList from './CategoryList';
import { connect } from 'react-redux';
import toastr from 'toastr';

class CategoriesPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    deleteCategory(category) {
        let categoryLocations = this.props.locations.filter((location) => {
            for (let i = 0; i < location.categories.length; i++) {
                if (location.categories[i] == category.id)
                    return true;
            }

            return false;
        });

        if (categoryLocations.length > 0) {//this category has locations under it.
            toastr.error('Can not delete a category that has locations under it..');
            return;
        }

        this.props.actions.deleteCategory(category)
            .then(() => {
                toastr.success('Category deleted.');
            }).catch((error) => {
                toastr.error(error);
            });
    }

    redirectToAddCategoryPage(event) {
        event.preventDefault();
        browserHistory.push('/category');
    }


    render() {
        return (
            <div>
                <div className="p16" style={topWrapper}>
                    <h1 className="m0">Categories</h1>
                    <input type="submit"
                        value="+"
                        className="btn btn-primary" style={addBtn}
                        onClick={this.redirectToAddCategoryPage} />
                </div>
                <div className="p16">
                    {this.props.categories.length > 0 &&
                        <CategoryList categories={this.props.categories} onDelete={this.deleteCategory} />}
                </div>
            </div>
        );
    }
}

CategoriesPage.propTypes = {
    categories: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(rootReducer/*, props*/) {
    let sortedCategories = [...rootReducer.categories]
        .sort((a, b) => { return a.name.localeCompare(b.name); });
    return {
        categories: sortedCategories,
        locations: rootReducer.locations
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(categoryActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);