import React, { useEffect, useState } from 'react'
import { EmployeeInterface } from '../../interfaces/employeesInterface';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../app/store';
import { getEmployeeData, getEmployeeError, getEmployeeStatus, getMensEmployee, getOthersEmployee, getWomensEmployee } from '../../features/employees/employeesSlice';
import { deleteEmployeeToAPIThunk, getEmployeeListFromAPIThunk } from '../../features/employees/employeesThunk';
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
import { useNavigate } from 'react-router-dom';
import { ButtonStyled } from '../../components/common/ButtonStyled';


export const EmployeesPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const employeeListData = useAppSelector<EmployeeInterface[]>(getEmployeeData);
    const employeeListMens = useAppSelector<EmployeeInterface[]>(getMensEmployee);
    const employeeListWomens = useAppSelector<EmployeeInterface[]>(getWomensEmployee);
    const employeeListOthers = useAppSelector<EmployeeInterface[]>(getOthersEmployee);
    const employeeListError = useAppSelector<string | undefined>(getEmployeeError);
    const employeeListStatus = useAppSelector<string>(getEmployeeStatus);
    const [employeeList, setEmployeeList] = useState<React.JSX.Element[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('newest');
    const [spinner, setSpinner] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10;
    const [searchName, setSearchDescription] = useState<string>('')
    const [showMens, setShowMens] = useState<boolean>(false)
    const [showWomens, setShowWomens] = useState<boolean>(false)
    const [showOthers, setShowOthers] = useState<boolean>(false)

    const navigate = useNavigate()


    useEffect(() => {
        if (employeeListStatus === "idle")
            dispatch(getEmployeeListFromAPIThunk())
        else if (employeeListStatus === "pending")
            setSpinner(true)
        else if (employeeListStatus === "fulfilled") {
            let components: React.JSX.Element[] = []
            let sortedList: EmployeeInterface[] = []


            if (showMens)
                sortedList = employeeListMens.slice()
            else if (showWomens)
                sortedList = employeeListWomens.slice()
            else if (showOthers)
                sortedList = employeeListOthers.slice()
            else
                sortedList = employeeListData.slice()

            if (selectedSort === 'name')
                sortedList.sort((a: EmployeeInterface, b: EmployeeInterface) => a.name.localeCompare(b.name))
            if (selectedSort === 'email')
                sortedList.sort((a: EmployeeInterface, b: EmployeeInterface) => a.email.localeCompare(b.email))
            if (selectedSort === 'job')
                sortedList.sort((a: EmployeeInterface, b: EmployeeInterface) => a.job.localeCompare(b.job))
            if (selectedSort === 'gender')
                sortedList.sort((a: EmployeeInterface, b: EmployeeInterface) => a.gender.localeCompare(b.gender))

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, sortedList.length);

            if (searchName.length > 0) {
                sortedList = sortedList.filter((employee: EmployeeInterface) => {
                    return employee.name.toLowerCase().includes(searchName.toLowerCase())
                })
            }

            const paginatedList = sortedList.slice(startIndex, endIndex);
            paginatedList.forEach((employee: EmployeeInterface) => {
                components.push(
                    <TrStyled onClick={() => navigate(`/employees/${employee._id}`)}>
                        <td>
                            <PhotoDataDiv data={employee.name} />
                        </td>
                        <td>
                            <PhotoDataDiv data={employee.email} />
                        </td>
                        <td>
                            <PhotoDataDiv data={employee.phone} />
                        </td>
                        <td >
                            <PhotoDataDiv data={employee.job} />
                        </td>
                        <td >
                            <PhotoDataDiv data={employee.birth.toString().split('T')[0]} />
                        </td>
                        <td >
                            <PhotoDataDiv data={employee.gender} />
                        </td>
                        <td>
                            <PhotoDataDiv data={<TrashStyledIcon onClick={() => handleRemoveEmployee(employee._id)} />} />
                        </td>
                    </TrStyled>
                )
            })
            setSpinner(false)
            setEmployeeList(components)
        }
    }, [dispatch, employeeListData, employeeListStatus, selectedSort, currentPage, searchName, showMens, showWomens, showOthers])


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleRemoveEmployee = async (employeeId: string | undefined) => {
        try {
            if (employeeId) {
                await dispatch(deleteEmployeeToAPIThunk(employeeId))
                toast.info('empleado eliminado', {
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
            toast.error('No se pudo eliminar el empleado', {
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
                <div>
                    <InputStyled
                        type='secondary'
                        placeholder="Find by employee's name"
                        onChange={(e) => setSearchDescription(e.target.value)}
                    />
                    <ButtonStyled color='white' bg='#135846' onClick={() => navigate(`/employees/create`)}> Create Employee</ButtonStyled>
                </div>
                <div>
                    <ListStyled>
                        <ListElementStyled
                            onClick={() => (setShowMens(false), setShowWomens(false), setShowOthers(false))}
                            className={!showMens && !showWomens && !showOthers ? 'active' : ''}
                        >All employees</ListElementStyled>
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
                        <option value="email">Email</option>
                        <option value="job">Job</option>
                        <option value="gender">Gender</option>
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
                            <th>Job</th>
                            <th>Birth</th>
                            <th>Gender</th>
                        </tr>
                    </TheadStyled>

                    <tbody>
                        {employeeList}
                    </tbody>
                </TableGuestStyled>
            }
            <Tfooter
                currentPage={currentPage}
                onPageChanged={handlePageChange}
                items={(employeeListData as EmployeeInterface[]).length}
                itemsPerPage={itemsPerPage}
            />
        </>
    )
}
