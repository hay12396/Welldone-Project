import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const locations = [
  {
    id: "address-1",
    name: "address-1",
    address: "Sample address",
    longitude: '34.8',
    latitude: '32.0',
    categories: ['category-2']
  },
  {
    id: "address-2",
    name: "address-2",
    address: "Sample address",
    longitude: '34.6',
    latitude: '32.0',
    categories: ['category-1']
  },
  {
    id: "2address-3",
    name: "address-3",
    address: "Sample address",
    longitude: '34.7',
    latitude: '32.0',
    categories: ['category-1']
  },
  {
    id: "1address-4",
    name: "address-4",
    address: "Sample address",
    longitude: '34.68',
    latitude: '32.0',
    categories: ['category-2']
  }
];

const generateId = (location) => {
  return location.name.toLowerCase() + '-' + new Date().getTime();
};

class LocationApi {
  static getAllLocations() {
    return new Promise((resolve/*, reject*/) => {
      setTimeout(() => {
        resolve(Object.assign([], locations));
      }, delay);
    });
  }

  static saveLocation(location) {
    location = Object.assign({}, location);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minLocationPropLength = 1;
        if (location.name.length < minLocationPropLength) {
          reject(`Please enter the name.`);
        }

        if (location.address.length < minLocationPropLength) {
          reject(`Please enter the address.`);
        }

        if (location.longitude.length < minLocationPropLength) {
          reject(`Please enter the longitude.`);
        }

        if (location.latitude.length < minLocationPropLength) {
          reject(`Please enter the latitude.`);
        }

        if (location.categories.length <= 0) {
          reject(`Please select a category.`);
        }

        if (location.id) {
          const existingLocationIndex = locations.findIndex(l => l.id == location.id);
          locations.splice(existingLocationIndex, 1, location);
        } else {
          location.id = generateId(location);

          locations.push(location);
        }

        resolve(location);
      }, delay);
    });
  }

  static deleteLocation(locationId) {
    return new Promise((resolve/*, reject*/) => {
      setTimeout(() => {
        const indexOfLocationToDelete = locations.findIndex(location => {
          location.id == locationId;
        });
        locations.splice(indexOfLocationToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default LocationApi;