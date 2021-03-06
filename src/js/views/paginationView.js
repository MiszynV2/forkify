import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElements = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElements.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //.page1 and there other pages
    if (curPage === 1 && numPages > 1) {
      return `
          <div class="btn--inline--invisible"></div>
          <button data-goto="${
            curPage
          }" class="btn--inline--middle pagination__btn--middle">
            <span>Page  ${curPage}</span>
          </button>         
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page  ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;        
          
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${
            curPage
          }" class="btn--inline--middle">
            <span>Page  ${curPage}</span>
          </button>
          <div class="btn--inline--invisible"></div>`;
    }
    //other page
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }"class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage
        }" class="btn--inline--middle">
          <span>Page  ${curPage}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page  ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        `;
    }
    //.page1 and there arent other pages
    return '';
  }
}
export default new paginationView();
