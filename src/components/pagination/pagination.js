import React from 'react';
import styles from './pagination.module.css'

function Pagination({setPage, page, dataCars}) {
    return (
      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1} type="button">Prev</button>
        <button onClick={() => setPage(page + 1)} disabled={dataCars.length < 5} type="button">Next</button>
      </div>
    );
}

export default Pagination;