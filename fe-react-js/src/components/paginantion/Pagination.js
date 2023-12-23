function Pagination({ currentPage, length, setCurrentPage }) {
  return (
    <div className="absolute join right-[42px] bottom-2">
      <button className="join-item btn" disabled={currentPage <= 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
        «
      </button>
      <div className="join-item btn">
        Page{' '}
        <input
          className="px-1 w-10 h-6 text-right"
          value={currentPage}
          onChange={(e) => {
            setCurrentPage(+e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
              if (currentPage < 1 || currentPage > length) {
                document.getElementById('modal_error_set_page').showModal();
                setCurrentPage(length);
              }
              if (currentPage < 1) {
                document.getElementById('modal_error_set_page').showModal();
                setCurrentPage(1);
              }
            }
          }}
        />
        / {length}
      </div>
      <dialog id="modal_error_set_page" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Error!</h3>
          <p className="py-4">Can't set page number</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <button className="join-item btn" disabled={currentPage >= length} onClick={() => setCurrentPage((prev) => prev + 1)}>
        »
      </button>
    </div>
  );
}
export default Pagination;
