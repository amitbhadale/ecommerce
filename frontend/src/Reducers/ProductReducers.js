import { createReducer } from "@reduxjs/toolkit";
const intialState = {};

export const productReducer = createReducer(intialState, {
  addCategoryRequest: (state) => {
    state.loading = true;
  },
  addCategorySuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  addCategoryFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getCategoriesRequest: (state) => {
    state.loading = true;
  },
  getCategoriesSuccess: (state, action) => {
    state.loading = false;
    state.categories = action.payload;
  },
  getCategoriesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getCategoryDetailsRequest: (state) => {
    state.loading = true;
  },
  getCategoryDetailsSuccess: (state, action) => {
    state.loading = false;
    state.category = action.payload;
  },
  getCategoryDetailsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateCategoryRequest: (state) => {
    state.loading = true;
  },
  updateCategorySuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateCategoryFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteCategoryRequest: (state) => {
    state.loading = true;
  },
  deleteCategorySuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteCategoryFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //-------------------------------------------Product actions
  addProductRequest: (state) => {
    state.loading = true;
  },
  addProductSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  addProductFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getProductsRequest: (state) => {
    state.loading = true;
  },
  getProductsSuccess: (state, action) => {
    state.loading = false;
    state.products = action.payload.products;
    state.productCount = action.payload.count;
  },
  getProductsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getProductDetailsRequest: (state) => {
    state.loading = true;
  },
  getProductDetailsSuccess: (state, action) => {
    state.loading = false;
    state.product = action.payload;
  },
  getProductDetailsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateProductRequest: (state) => {
    state.loading = true;
  },
  updateProductSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateProductFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteProductRequest: (state) => {
    state.loading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteProductFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },

  clearMessage: (state) => {
    state.message = null;
  },
});
