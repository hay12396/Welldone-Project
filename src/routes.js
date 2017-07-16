import ManageCategoryPage from './components/categories/ManageCategoryPage';
import ManageLocationPage from './components/locations/ManageLocationPage';
import CategoriesPage from './components/categories/CategoriesPage';
import LocationsPage from './components/locations/LocationsPage';
import { Route, IndexRedirect } from 'react-router';
import Error404 from './components/Error404';
import App from './components/App';
import React from 'react';

export default (
    <Route path="/" component={App}>
        <IndexRedirect component={LocationsPage} to="locations"/>
        <Route path="locations" component={LocationsPage} />
        <Route path="location" component={ManageLocationPage} />
        <Route path="location/:locationId" component={ManageLocationPage} />
        <Route path="categories" component={CategoriesPage} />
        <Route path="category" component={ManageCategoryPage} />
        <Route path="category/:categoryId" component={ManageCategoryPage} />
        <Route path="*" component={Error404} />
    </Route>
);