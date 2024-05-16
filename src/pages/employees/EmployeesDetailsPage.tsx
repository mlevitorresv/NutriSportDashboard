import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, useAppSelector, RootState } from "../../app/store"
import { OneElementBackgroundDiv } from "../../components/common/OneElementBackgroundDiv"
import { useParams } from "react-router-dom"
import { EmployeeInterface } from "../../interfaces/employeesInterface"
import { getEmployeeById, getEmployeeError, getEmployeeStatus } from "../../features/employees/employeesSlice"
import { useEffect, useState } from "react"
import { getEmployeeFromAPIThunk } from "../../features/employees/employeesThunk"
import { EmployeeInfoStyledDivFlex } from "../../components/common/EmployeeInfoStyledDivFlex"
import { EmployeeInfoStyledDivGrid } from "../../components/common/EmployeeInfoStyledDivGrid"
import { MdMailOutline } from "react-icons/md";
import { FaUser, FaBirthdayCake, FaTransgender, FaPhoneAlt } from "react-icons/fa";
import { FaClipboardUser, FaLocationDot, FaMapLocation } from "react-icons/fa6";
import { EmployeeInfoGlobalDiv } from "../../components/common/EmployeeInfoGlobalDiv"



export const EmployeesDetailsPage = () => {

    const params = useParams()
    const id = params.id
    const dispatch: AppDispatch = useDispatch();
    let employeeData: EmployeeInterface | undefined;
    const state = useSelector((state: RootState) => state);
    if (id)
        employeeData = getEmployeeById(state, id)

    const employeeError = useAppSelector<string | undefined>(getEmployeeError);
    const employeeStatus = useAppSelector<string>(getEmployeeStatus);
    const [spinner, setSpinner] = useState<boolean>(true)

    useEffect(() => {
        if (employeeStatus === "idle") {
            dispatch(getEmployeeFromAPIThunk(id))
        } else if (employeeStatus === "pending") {
            setSpinner(true)
        } else if (employeeStatus === "fulfilled" && employeeData) {
            setSpinner(false)
        }
    }, [dispatch, employeeStatus, id])

    return (
        <>
            <OneElementBackgroundDiv>
                <EmployeeInfoGlobalDiv>
                    <EmployeeInfoStyledDivFlex>
                        {employeeData?.photo ? <img src={employeeData?.photo} alt={employeeData?.name + 'photo'} /> : <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2qHP74tfgJw2kytcqoiAHPRLH0oc1b3BW_WLN3ICHGw&s' alt={'employee icon'} />}
                        <div>
                            <p><FaUser /> {employeeData?.name}</p>
                            <p><FaBirthdayCake /> {employeeData?.birth.toString().split('T')[0]}</p>
                            <p><FaTransgender /> {employeeData?.gender}</p>
                            <p><FaClipboardUser /> {employeeData?.DNI}</p>
                        </div>
                    </EmployeeInfoStyledDivFlex>
                    <EmployeeInfoStyledDivGrid>
                        <p><MdMailOutline /> {employeeData?.email}</p>
                        <p><FaPhoneAlt /> {employeeData?.phone}</p>
                        <p><FaLocationDot /> {employeeData?.postalCode}</p>
                        <p><FaMapLocation /> {employeeData?.address}</p>
                    </EmployeeInfoStyledDivGrid>
                </EmployeeInfoGlobalDiv>
            </OneElementBackgroundDiv>
        </>
    )
}
