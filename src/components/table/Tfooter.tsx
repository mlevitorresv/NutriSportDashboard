import React from 'react'
import ReactPaginate from 'react-paginate'
import { TfootStyled } from './TfootStyled';
import { TfooterPropsInterface } from '../../interfaces/componentsInterface';

export const Tfooter = (props: TfooterPropsInterface) => {
    const itemsPerPage = 10;
    const endIndex = Math.min(props.currentPage * itemsPerPage, props.items)

    const handleChangePage = (data) => {
        const selectedPage = data.selected +1;
        props.onPageChanged(selectedPage);
    }

    return (
        <TfootStyled>
            <p>Showing {endIndex} of {props.items} Data</p>
            <div className='container__pagination'>
                <ReactPaginate
                    pageCount={Math.ceil(props.items / props.itemsPerPage)}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={1}
                    onPageChange={handleChangePage}
                    containerClassName='pagination'
                    activeClassName='active'
                    forcePage={props.currentPage - 1}
                />
            </div>
        </TfootStyled>
    )
}
