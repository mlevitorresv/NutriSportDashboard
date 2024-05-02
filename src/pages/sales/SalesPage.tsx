import React, { useEffect, useState } from 'react'
import { SaleInterface } from '../../interfaces/salesInterface';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../app/store';
import { getSaleData, getSaleError, getSaleStatus } from '../../features/sales/salesSlice';
import { deleteSaleToAPIThunk, getSaleListFromAPIThunk } from '../../features/sales/salesThunk';
import { TrStyled } from '../../components/table/TrStyled';
import { PhotoDataDiv } from '../../components/common/PhotoDataDiv';
import { TrashStyledIcon } from '../../components/common/IconStyled';
import { toast } from 'react-toastify';
import { MenuStyled } from '../../components/common/MenuStyled';
import { InputStyled } from '../../components/common/InputStyled';
import { SelectStyled } from '../../components/table/SelectStyled';
import { TableGuestStyled } from '../../components/table/TableGuestStyled';
import { TheadStyled } from '../../components/table/TheadStyled';
import { Tfooter } from '../../components/table/Tfooter';
import { Spinner } from '../../components/spinner/Spinner';



export const SalesPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const saleListData = useAppSelector<SaleInterface[]>(getSaleData);
    const saleListError = useAppSelector<string | undefined>(getSaleError);
    const saleListStatus = useAppSelector<string>(getSaleStatus);
    const [saleList, setSaleList] = useState<React.JSX.Element[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('newest');
    const [spinner, setSpinner] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10;
    const [searchName, setSearchDescription] = useState<string>('')


    useEffect(() => {
        if (saleListStatus === "idle")
            dispatch(getSaleListFromAPIThunk())
        else if (saleListStatus === "pending")
            setSpinner(true)
        else if (saleListStatus === "fulfilled") {
            let components: React.JSX.Element[] = []
            let sortedList: SaleInterface[] = saleListData.slice()

            if (selectedSort === 'customer')
                sortedList.sort((a: SaleInterface, b: SaleInterface) => a.customer.localeCompare(b.customer))
            if (selectedSort === 'employee')
                sortedList.sort((a: SaleInterface, b: SaleInterface) => (a.employee.localeCompare(b.employee)))
            if (selectedSort === 'date')
                sortedList.sort((a: SaleInterface, b: SaleInterface) => new Date(a.date).getTime() - new Date(b.date).getTime())

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, sortedList.length);

            if (searchName.length > 0) {
                sortedList = sortedList.filter((sale: SaleInterface) => {
                    return sale.customer.toLowerCase().includes(searchName.toLowerCase())
                })
            }

            const paginatedList = sortedList.slice(startIndex, endIndex);
            paginatedList.forEach((sale: SaleInterface) => {
                components.push(
                    <TrStyled>
                        <td>
                            <PhotoDataDiv data={sale.customer} />
                        </td>
                        <td>
                            <PhotoDataDiv data={sale.employee} />
                        </td>
                        <td>
                            <PhotoDataDiv data={sale.products} />
                        </td>
                        <td >
                            <PhotoDataDiv data={sale.date.toString().split('T')[0]} />
                        </td>
                        <td >
                            <PhotoDataDiv data={sale.payMethod} />
                        </td>
                        <td >
                            <PhotoDataDiv data={sale.invoiceNumber.toString()} />
                        </td>
                        <td>
                            <PhotoDataDiv data={<TrashStyledIcon onClick={() => handleRemoveSale(sale._id)} />} />
                        </td>
                    </TrStyled>
                )
            })
            setSpinner(false)
            setSaleList(components)
        }
    }, [dispatch, saleListData, saleListStatus, selectedSort, currentPage, searchName])


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleRemoveSale = async (saleId: string | undefined) => {
        try {
            if (saleId) {
                await dispatch(deleteSaleToAPIThunk(saleId))
                toast.info('venta eliminada', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
        } catch (error) {
            console.log('error', error)
            toast.error('No se pudo eliminar la venta', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    }


    return (
        <>
            <MenuStyled>
                <InputStyled
                    type='secondary'
                    placeholder="Find by sale's customer"
                    onChange={(e) => setSearchDescription(e.target.value)}
                />
                <SelectStyled onChange={(e) => setSelectedSort(e.target.value)}>
                    <option value="customer" selected>Customer</option>
                    <option value="employee">Employee</option>
                    <option value="date">Date</option>
                </SelectStyled>
            </MenuStyled>

            {spinner ? <Spinner /> :
                <TableGuestStyled className='rev'>
                    <TheadStyled>
                        <tr>
                            <th>Customer</th>
                            <th>Employee</th>
                            <th>Products</th>
                            <th>Date</th>
                            <th>Pay Method</th>
                            <th>Invoice Number</th>
                        </tr>
                    </TheadStyled>

                    <tbody>
                        {saleList}
                    </tbody>
                </TableGuestStyled>
            }
            <Tfooter
                currentPage={currentPage}
                onPageChanged={handlePageChange}
                items={(saleListData as SaleInterface[]).length}
                itemsPerPage={itemsPerPage}
            />
        </>
    )
}
