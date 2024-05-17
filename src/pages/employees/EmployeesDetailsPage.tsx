import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, useAppSelector, RootState } from "../../app/store"
import { OneElementBackgroundDiv } from "../../components/common/OneElementBackgroundDiv"
import { useParams } from "react-router-dom"
import { EmployeeInterface } from "../../interfaces/employeesInterface"
import { getEmployeeById, getEmployeeError, getEmployeeStatus } from "../../features/employees/employeesSlice"
import { useEffect, useState } from "react"
import { getEmployeeFromAPIThunk } from "../../features/employees/employeesThunk"
import { EmployeeInfoStyledDivFlex } from "../../components/common/EmployeeInfoStyledDivFlex"
import { MdMailOutline } from "react-icons/md";
import { FaUser, FaBirthdayCake, FaTransgender, FaPhoneAlt, FaBriefcase, FaCalendarAlt, FaHospitalAlt } from "react-icons/fa";
import { FaAddressCard, FaFileContract, FaLocationDot, FaMapLocation } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs"
import { ButtonStyled } from "../../components/common/ButtonStyled"
import { ElementInfoDivStyled } from "../../components/common/ElementInfoDivStyled"
import { ElementInfoPStyled } from "../../components/common/ElementInfoPStyled"



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
                <EmployeeInfoStyledDivFlex dir="col">
                    {employeeData?.photo ? <img src={employeeData?.photo} alt={employeeData?.name + 'photo'} /> : <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2qHP74tfgJw2kytcqoiAHPRLH0oc1b3BW_WLN3ICHGw&s' alt={'employee icon'} />}
                    <ButtonStyled>UPDATE {employeeData?.name.split(' ')[0].toUpperCase()}</ButtonStyled>
                </EmployeeInfoStyledDivFlex>
                <EmployeeInfoStyledDivFlex dir="col">
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaUser /> Name</ElementInfoPStyled><ElementInfoPStyled size="big">{employeeData?.name}</ElementInfoPStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaBirthdayCake /> Birth</ElementInfoPStyled><ElementInfoPStyled size="big">{employeeData?.birth.toString().split('T')[0]}</ElementInfoPStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaTransgender /> Gender</ElementInfoPStyled><ElementInfoPStyled size="big">{employeeData?.gender}</ElementInfoPStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaAddressCard /> DNI</ElementInfoPStyled><ElementInfoPStyled size="big">{employeeData?.DNI}</ElementInfoPStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdMailOutline /> Email</ElementInfoPStyled><ElementInfoPStyled size="big">{employeeData?.email}</ElementInfoPStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaPhoneAlt /> Phone</ElementInfoPStyled><ElementInfoPStyled size="big">{employeeData?.phone}</ElementInfoPStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaLocationDot /> Postal Code</ElementInfoPStyled><ElementInfoPStyled size="big">{employeeData?.postalCode}</ElementInfoPStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaMapLocation /> Address</ElementInfoPStyled><ElementInfoPStyled size="big">{employeeData?.address}</ElementInfoPStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaBriefcase /> Job</ElementInfoPStyled><ElementInfoPStyled size="big">{employeeData?.job}</ElementInfoPStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaCalendarAlt /> Start Date</ElementInfoPStyled><ElementInfoPStyled size="big">{employeeData?.startDate.toString().split('T')[0]}</ElementInfoPStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaHospitalAlt /> Social Security</ElementInfoPStyled><ElementInfoPStyled size="big">{employeeData?.socialSecurity}</ElementInfoPStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaFileContract /> Contract</ElementInfoPStyled><ElementInfoPStyled size="big">{employeeData?.contract}</ElementInfoPStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><BsBank2 /> Bank Account</ElementInfoPStyled><ElementInfoPStyled size="big">ES********{employeeData?.bankAccount.substring(10, 14)}</ElementInfoPStyled></ElementInfoDivStyled>
                </EmployeeInfoStyledDivFlex>
            </OneElementBackgroundDiv>
        </>
    )
}
