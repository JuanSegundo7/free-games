export const getPageNumbers = (
  totalPages: number,
  currentPage: number,
  siblingCount: number = 1
): (number | string)[] => {
  const totalNumbers = siblingCount + 5;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);
    let pages: (number | string)[] = [];

    if (currentPage > 1 + siblingCount) {
      pages.push(1);
      pages.push("...");
    } else {
      pages = [1];
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 1 - siblingCount) {
      pages.push("...");
      pages.push(totalPages);
    } else {
      pages.push(totalPages);
    }

    return pages;
  }

  return Array.from({ length: totalPages }, (_, index) => index + 1);
};
