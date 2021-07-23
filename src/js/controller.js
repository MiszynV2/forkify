import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import { TIMEOUT_MILISEC } from './config.js';
//import View from './View.js'
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) {
      return;
    }
    

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultPage());

    //0) render bookmarks
    bookmarksView.render(model.state.bookmarks);

    //1

    await model.loadRecipe(id);
    //(2)Rendering recipe
    recipeView.render(model.state.recipe);
    //3) updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1. get search query
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    //resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultPage(1));

    //render pagination button
    paginationView.render(model.state.search);
  } catch (err) {}
};
const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));

  //render pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Uptade the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //2) update recipe view
  recipeView.update(model.state.recipe);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    //upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    //render bookmark viev
    bookmarksView.render(model.state.bookmarks)

    //change id in the URL;

    window.history.pushState(null,'',`#${model.state.recipe.id}`)

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, TIMEOUT_MILISEC);
  } catch (err) {
    console.error('BOOM', err);
    addRecipeView.renderError(err);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
