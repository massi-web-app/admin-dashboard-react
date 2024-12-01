import _ from 'lodash';
import {useSearchParams} from "react-router-dom";

export const Pagination = ({totalRecords, pageSize = 1}) => {
    const pages = Math.ceil(totalRecords / pageSize);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;

    const prevPage = () => {

        if (currentPage > 1) {
            setSearchParams({
                page: currentPage - 1
            });
        }
    }

    const nextPage = () => {

        if (currentPage < pages) {
            setSearchParams({
                page: currentPage + 1
            })
        }

    }

    return (
        <nav>
            <ul className="pagination pagination-lg">
                <li className={`page-item ${currentPage === 1 ? 'disabled opacity-50' : ''}`} onClick={prevPage}>
                    <a href="#" className="page-link">
                        قبلی
                    </a>
                </li>
                {
                    _.times(pages, (number) => (
                        <li key={`page${number + 1}`} className={`page-item ${number+1===currentPage ? 'active' : ''}`}
                            onClick={() => setSearchParams({page: number + 1})}>
                            <a href="#" className="page-link">
                                {number + 1}
                            </a>
                        </li>

                    ))
                }
                <li className={`page-item ${currentPage === pages ? 'disabled opacity-50' : ''}`} onClick={nextPage}>
                    <a href="#" className="page-link">
                        بعدی
                    </a>
                </li>
            </ul>
        </nav>
    )
}