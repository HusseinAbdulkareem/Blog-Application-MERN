import "./pagination.css";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="page previous"
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {generatedPages.map((page) => (
        <div
          className={currentPage === page ? "page active" : "page"}
          onClick={() => setCurrentPage(page)}
          key={page}
        >
          {page}
        </div>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === pages}
        className="page next"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
