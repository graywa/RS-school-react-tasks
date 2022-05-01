export const getFetchPage = (limitOnPage: number, currPage: number) =>
  Math.ceil((limitOnPage / 20) * currPage);
