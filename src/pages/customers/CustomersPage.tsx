import React, { useEffect, useState } from 'react'
import { getCustomerData, getCustomerError, getCustomerStatus, getMensCustomer, getOthersCustomer, getWomensCustomer } from '../../features/customers/customersSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../app/store';
import { CustomerInterface } from '../../interfaces/customersInterface';
import { deleteCustomerToAPIThunk, getCustomerListFromAPIThunk } from '../../features/customers/customersThunk';
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
import { ListStyled } from '../../components/common/ListStyled';
import { ListElementStyled } from '../../components/common/ListElementStyled';


export const CustomersPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const customerListData = useAppSelector<CustomerInterface[]>(getCustomerData);
    const customerListMens = useAppSelector<CustomerInterface[]>(getMensCustomer);
    const customerListWomens = useAppSelector<CustomerInterface[]>(getWomensCustomer);
    const customerListOthers = useAppSelector<CustomerInterface[]>(getOthersCustomer);
    const customerListError = useAppSelector<string | undefined>(getCustomerError);
    const customerListStatus = useAppSelector<string>(getCustomerStatus);
    const [customerList, setCustomerList] = useState<React.JSX.Element[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('newest');
    const [spinner, setSpinner] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10;
    const [searchName, setSearchDescription] = useState<string>('')

    const [showMens, setShowMens] = useState<boolean>(false)
    const [showWomens, setShowWomens] = useState<boolean>(false)
    const [showOthers, setShowOthers] = useState<boolean>(false)


    useEffect(() => {
        if (customerListStatus === "idle")
            dispatch(getCustomerListFromAPIThunk())
        else if (customerListStatus === "pending")
            setSpinner(true)
        else if (customerListStatus === "fulfilled") {
            let components: React.JSX.Element[] = []
            let sortedList: CustomerInterface[] = []

            if (showMens)
                sortedList = customerListMens.slice()
            else if (showWomens)
                sortedList = customerListWomens.slice()
            else if (showOthers)
                sortedList = customerListOthers.slice()
            else
                sortedList = customerListData.slice()

            if (selectedSort === 'name')
                sortedList.sort((a: CustomerInterface, b: CustomerInterface) => a.name.localeCompare(b.name))
            if (selectedSort === 'ageOlder')
                sortedList.sort((a: CustomerInterface, b: CustomerInterface) => new Date(a.birth).getTime() - new Date(b.birth).getTime())
            if (selectedSort === 'ageMinor')
                sortedList.sort((a: CustomerInterface, b: CustomerInterface) => new Date(b.birth).getTime() - new Date(a.birth).getTime())


            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, sortedList.length);

            if (searchName.length > 0) {
                sortedList = sortedList.filter((customer: CustomerInterface) => {
                    return customer.name.toLowerCase().includes(searchName.toLowerCase())
                })
            }

            const paginatedList = sortedList.slice(startIndex, endIndex);
            paginatedList.forEach((customer: CustomerInterface) => {
                components.push(
                    <TrStyled title={'ID: ' + customer._id}>
                        <td>
                            <PhotoDataDiv data={customer.name} />
                        </td>
                        <td>
                            <PhotoDataDiv data={customer.email} />
                        </td>
                        <td>
                            <PhotoDataDiv data={customer.phone} />
                        </td>
                        <td >
                            <PhotoDataDiv data={customer.postalCode.toString()} />
                        </td>
                        <td >
                            <PhotoDataDiv data={customer.birth.toString().split('T')[0]} />
                        </td>
                        <td >
                            <PhotoDataDiv data={customer.gender} />
                        </td>
                        <td>
                            <PhotoDataDiv data={
                                <TrashStyledIcon onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveCustomer(customer._id)
                                }} />
                            } />
                        </td>
                    </TrStyled>
                )
            })
            setSpinner(false)
            setCustomerList(components)
        }
    }, [dispatch, customerListData, customerListStatus, selectedSort, currentPage, searchName, showMens, showWomens, showOthers])


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleRemoveCustomer = async (customerId: string | undefined) => {
        try {
            if (customerId) {
                await dispatch(deleteCustomerToAPIThunk(customerId))
                toast.info('Cliente eliminado', {
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
            toast.error('No se pudo eliminar el cliente', {
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
                    placeholder="Find by customer's name"
                    onChange={(e) => setSearchDescription(e.target.value)}
                />
                <div>
                    <ListStyled>
                        <ListElementStyled
                            onClick={() => (setShowMens(false), setShowWomens(false), setShowOthers(false))}
                            className={!showMens && !showWomens && !showOthers ? 'active' : ''}
                        >All customers</ListElementStyled>
                        <ListElementStyled
                            onClick={() => (setShowMens(true), setShowWomens(false), setShowOthers(false))}
                            className={showMens && !showWomens && !showOthers ? 'active' : ''}
                        >Mens</ListElementStyled>
                        <ListElementStyled
                            onClick={() => (setShowMens(false), setShowWomens(true), setShowOthers(false))}
                            className={!showMens && showWomens && !showOthers ? 'active' : ''}
                        >Womens</ListElementStyled>
                        <ListElementStyled
                            onClick={() => (setShowMens(false), setShowWomens(false), setShowOthers(true))}
                            className={!showMens && !showWomens && showOthers ? 'active' : ''}
                        >Others</ListElementStyled>
                    </ListStyled>
                    <SelectStyled onChange={(e) => setSelectedSort(e.target.value)}>
                        <option value="name" selected>Name</option>
                        <option value="ageOlder">Age (Older)</option>
                        <option value="ageMinor">Age (Minor)</option>
                        <option value="email">Email</option>
                    </SelectStyled>
                </div>
            </MenuStyled>

            {spinner ? <Spinner /> :
                <TableGuestStyled className='rev'>
                    <TheadStyled>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Postal code</th>
                            <th>Birth</th>
                            <th>Gender</th>
                        </tr>
                    </TheadStyled>

                    <tbody>
                        {customerList}
                    </tbody>
                </TableGuestStyled>
            }
            <Tfooter
                currentPage={currentPage}
                onPageChanged={handlePageChange}
                items={(customerListData as CustomerInterface[]).length}
                itemsPerPage={itemsPerPage}
            />
        </>
    )
}
