import delay from './delay';

const categories = [
  {
    id: 'category-1',
    name: 'category-1'
  },
  {
    id: 'category-2',
    name: 'category-2'
  },
  {
    id: 'category-3',
    name: 'category-3'
  }
];

const generateId = (category) => {
  return category.name.toLowerCase() + '-' + new Date().getTime();
};

class CategoryApi {
  static getAllCategories() {
    return new Promise((resolve/*, reject*/) => {
      setTimeout(() => {
        resolve(Object.assign([], categories));
      }, delay);
    });
  }

  static saveCategory(category) {
    category = Object.assign({}, category);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCategoryNameLength = 3;
        if (category.name.length < minCategoryNameLength) {
          reject(`Name must be at least ${minCategoryNameLength} characters.`);
        }

        if (category.id) {
          const existingCategoryIndex = category.findIndex(c => c.id == category.id);
          categories.splice(existingCategoryIndex, 1, category);
        } else {
          category.id = generateId(category);
          categories.push(category);
        }

        resolve(category);
      }, delay);
    });
  }

  static deleteCategory(categoryId) {
    return new Promise((resolve/*, reject*/) => {
      setTimeout(() => {
        const indexOfCategoryToDelete = categories.findIndex(category => {
          category.id == categoryId;
        });
        categories.splice(indexOfCategoryToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default CategoryApi;