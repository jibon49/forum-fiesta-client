
import { useState, useEffect } from 'react';

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(0);
  const numberOfPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < numberOfPages - 1) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage, data]);

  return {
    currentPage,
    setCurrentPage,
    paginatedData,
    handlePrevious,
    handleNext,
    numberOfPages,
  };
};

export default usePagination;
