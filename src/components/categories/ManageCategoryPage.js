import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoryActions from '../../actions/categoryActions';
import CategoryForm from './CategoryForm';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

class ManageCategoryPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            category: Object.assign({}, this.props.category),
            errors: {},
            saving: false
        };

        this.updateCategoryState = this.updateCategoryState.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //safety check (if) because React may call this function when he thinks that the props have changed again.
        //Which is randomally for us (we don't know if and when that might happen)
        if (this.state.category.id !== nextProps.category.id) {
            this.setState({ category: Object.assign({}, nextProps.category) });
        }
    }

    updateCategoryState(event) {
        const field = event.target.name;
        let category = Object.assign({}, this.state.category);
        category[field] = event.target.value;
        return this.setState({ category: category });
    }

    saveCategory(event) {
        event.preventDefault();
        let valid = true;
        let errors = {};
        if (this.state.category.name.length < 3) {
            errors.name = "Name must be atleast 3 characters.";
            valid = false;
        }

        if (!valid) {
            this.setState({ errors: errors });
            return;
        }

        this.setState({ saving: true });
        this.props.actions.saveCategory(this.state.category)
            .then(() => {
                this.setState({ saving: false });
                browserHistory.push('/categories');
                toastr.success('Changes saved.');
            }).catch((error) => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    render() {
        return (
            <CategoryForm
                onChange={this.updateCategoryState}
                category={this.state.category}
                errors={this.state.errors}
                onSave={this.saveCategory}
                saving={this.state.saving} />
        );
    }
}

ManageCategoryPage.propTypes = {
    category: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function getCategoryById(categories, id) {
    const filteredCategories = categories.filter(category => category.id === id);
    if (filteredCategories.length > 0) return filteredCategories[0];
    return null;
}

function mapStateToProps(rootReducer, props) {
    let category = {};
    if (props.params.categoryId && rootReducer.categories.length > 0) {
        category = getCategoryById(rootReducer.categories, props.params.categoryId);
    }
    else {
        category = { id: '', name: '' };
    }

    return {
        category: category,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(categoryActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategoryPage);