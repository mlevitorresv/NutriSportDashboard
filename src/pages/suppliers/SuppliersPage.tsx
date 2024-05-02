import React, { useEffect, useState } from 'react'
import { SupplierInterface } from '../../interfaces/suppliersInterface';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../app/store';
import { getSupplierData, getSupplierError, getSupplierStatus } from '../../features/suppliers/suppliersSlice';
import { deleteSupplierToAPIThunk, getSupplierListFromAPIThunk } from '../../features/suppliers/suppliersThunk';
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


export const SuppliersPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const supplierListData = useAppSelector<SupplierInterface[]>(getSupplierData);
    const supplierListError = useAppSelector<string | undefined>(getSupplierError);
    const supplierListStatus = useAppSelector<string>(getSupplierStatus);
    const [supplierList, setSupplierList] = useState<React.JSX.Element[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('newest');
    const [spinner, setSpinner] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10;
    const [searchName, setSearchDescription] = useState<string>('')


    useEffect(() => {
        if (supplierListStatus === "idle")
            dispatch(getSupplierListFromAPIThunk())
        else if (supplierListStatus === "pending")
            setSpinner(true)
        else if (supplierListStatus === "fulfilled") {
            let components: React.JSX.Element[] = []
            let sortedList: SupplierInterface[] = supplierListData.slice()

            if (selectedSort === 'name')
                sortedList.sort((a: SupplierInterface, b: SupplierInterface) => a.name.localeCompare(b.name))
            if (selectedSort === 'postalcode')
                sortedList.sort((a: SupplierInterface, b: SupplierInterface) => (a.postalCode) - (b.postalCode))

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, sortedList.length);

            if (searchName.length > 0) {
                sortedList = sortedList.filter((supplier: SupplierInterface) => {
                    return supplier.name.toLowerCase().includes(searchName.toLowerCase())
                })
            }

            const paginatedList = sortedList.slice(startIndex, endIndex);
            paginatedList.forEach((supplier: SupplierInterface) => {
                components.push(
                    <TrStyled>
                        <td>
                            <PhotoDataDiv data={supplier.name} />
                        </td>
                        <td>
                            <PhotoDataDiv data={supplier.postalCode.toString()} />
                        </td>
                        <td>
                            <PhotoDataDiv data={supplier.phone} />
                        </td>
                        <td >
                            <PhotoDataDiv data={supplier.email} />
                        </td>
                        <td >
                            <PhotoDataDiv data={supplier.web} />
                        </td>
                        <td >
                            <PhotoDataDiv data={supplier.category} />
                        </td>
                        <td>
                            <PhotoDataDiv data={<TrashStyledIcon onClick={() => handleRemoveSupplier(supplier._id)} />} />
                        </td>
                    </TrStyled>
                )
            })
            setSpinner(false)
            setSupplierList(components)
        }
    }, [dispatch, supplierListData, supplierListStatus, selectedSort, currentPage, searchName])


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleRemoveSupplier = async (supplierId: string | undefined) => {
        try {
            if (supplierId) {
                await dispatch(deleteSupplierToAPIThunk(supplierId))
                toast.info('proveedor eliminado', {
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
            toast.error('No se pudo eliminar el proveedor', {
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
                    placeholder="Find by supplier's name"
                    onChange={(e) => setSearchDescription(e.target.value)}
                />
                <SelectStyled onChange={(e) => setSelectedSort(e.target.value)}>
                    <option value="name" selected>Name</option>
                    <option value="postalcode">PostalCode</option>
                </SelectStyled>
            </MenuStyled>

            {spinner ? <p>Loading...</p> :
                <TableGuestStyled className='rev'>
                    <TheadStyled>
                        <tr>
                            <th>Name</th>
                            <th>PostalCode</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Web</th>
                            <th>Category</th>
                        </tr>
                    </TheadStyled>

                    <tbody>
                        {supplierList}
                    </tbody>
                </TableGuestStyled>
            }
            <Tfooter
                currentPage={currentPage}
                onPageChanged={handlePageChange}
                items={(supplierListData as SupplierInterface[]).length}
                itemsPerPage={itemsPerPage}
            />
        </>
    )
}
