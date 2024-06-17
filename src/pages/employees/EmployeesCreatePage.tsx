import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, useAppSelector, RootState } from "../../app/store"
import { OneElementBackgroundDiv } from "../../components/common/OneElementBackgroundDiv"
import { useNavigate } from "react-router-dom"
import { EmployeeInterface } from "../../interfaces/employeesInterface"
import { getEmployeeData, getEmployeeError, getEmployeeStatus } from "../../features/employees/employeesSlice"
import { useEffect, useState } from "react"
import { getEmployeeFromAPIThunk } from "../../features/employees/employeesThunk"
import { EmployeeInfoStyledDivFlex } from "../../components/common/EmployeeInfoStyledDivFlex"
import { MdAddPhotoAlternate, MdMailOutline } from "react-icons/md";
import { FaUser, FaBirthdayCake, FaTransgender, FaPhoneAlt, FaBriefcase, FaCalendarAlt, FaHospitalAlt } from "react-icons/fa";
import { FaAddressCard, FaFileContract, FaLocationDot, FaMapLocation } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs"
import { ButtonStyled } from "../../components/common/ButtonStyled"
import { ElementInfoDivStyled } from "../../components/common/ElementInfoDivStyled"
import { ElementInfoPStyled } from "../../components/common/ElementInfoPStyled"
import { SmallTableStyled } from "../../components/table/small/SmallTableStyled"
import { Spinner } from "../../components/spinner/Spinner"
import { SmallDivStyled } from "../../components/table/small/SmallDivStyled"
import { SmallPStyled } from "../../components/table/small/SmallPStyled"
import { H1Styled } from "../../components/common/H1Styled"
import { DataPStyled } from "../../components/table/small/DataPStyled"
import { InputStyled } from "../../components/common/InputStyled"



export const EmployeesCreatePage = () => {

    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();
    let employeeData: EmployeeInterface | undefined;

    const allEmployeesData = useAppSelector<EmployeeInterface[]>(getEmployeeData);

    const allEmployeesError = useAppSelector<string | undefined>(getEmployeeError);
    const allEmployeesStatus = useAppSelector<string>(getEmployeeStatus);
    const [spinnerAll, setSpinnerAll] = useState<boolean>(true)


    useEffect(() => {
        if (allEmployeesStatus === "idle") {
            dispatch(getEmployeeFromAPIThunk())
        } else if (allEmployeesStatus === "pending") {
            setSpinnerAll(true)
        } else if (allEmployeesStatus === "fulfilled") {
            setSpinnerAll(false)
        }
    }, [dispatch, allEmployeesStatus])

    return (
        <>

            <OneElementBackgroundDiv>
                <EmployeeInfoStyledDivFlex dir="col">
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2qHP74tfgJw2kytcqoiAHPRLH0oc1b3BW_WLN3ICHGw&s' alt={'employee icon'} />
                    <ButtonStyled>CREATE USER</ButtonStyled>
                </EmployeeInfoStyledDivFlex>
                <EmployeeInfoStyledDivFlex box='grid'>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdAddPhotoAlternate /> Photo</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaUser /> Name</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaBirthdayCake /> Birth</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaTransgender /> Gender</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaAddressCard /> DNI</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdMailOutline /> Email</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaPhoneAlt /> Phone</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaLocationDot /> Postal Code</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaMapLocation /> Address</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaBriefcase /> Job</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaCalendarAlt /> Start Date</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaHospitalAlt /> Social Security</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaFileContract /> Contract</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><BsBank2 /> Bank Account</ElementInfoPStyled><InputStyled type="creationform"></InputStyled></ElementInfoDivStyled>
                </EmployeeInfoStyledDivFlex>
            </OneElementBackgroundDiv>

        </>
    )
}
