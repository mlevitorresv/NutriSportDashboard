import { OneElementBackgroundDiv } from "../../components/common/OneElementBackgroundDiv"
import { EmployeeInterface } from "../../interfaces/employeesInterface"
import { EmployeeInfoStyledDivFlex } from "../../components/common/EmployeeInfoStyledDivFlex"
import { MdAddPhotoAlternate, MdMailOutline } from "react-icons/md";
import { FaUser, FaBirthdayCake, FaTransgender, FaPhoneAlt, FaBriefcase, FaCalendarAlt, FaHospitalAlt } from "react-icons/fa";
import { FaAddressCard, FaFileContract, FaLocationDot, FaMapLocation } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs"
import { ButtonStyled } from "../../components/common/ButtonStyled"
import { ElementInfoDivStyled } from "../../components/common/ElementInfoDivStyled"
import { ElementInfoPStyled } from "../../components/common/ElementInfoPStyled"
import { InputStyled } from "../../components/common/InputStyled"
import { useRef } from "react";



export const EmployeesCreatePage = () => {

    const photo = useRef<HTMLInputElement>(null);
    const name = useRef<HTMLInputElement>(null);
    const birth = useRef<HTMLInputElement>(null);
    const gender = useRef<HTMLInputElement>(null);
    const dni = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const phone = useRef<HTMLInputElement>(null);
    const postalcode = useRef<HTMLInputElement>(null);
    const address = useRef<HTMLInputElement>(null);
    const job = useRef<HTMLInputElement>(null);
    const startdate = useRef<HTMLInputElement>(null);
    const socialsec = useRef<HTMLInputElement>(null);
    const contract = useRef<HTMLInputElement>(null);
    const bankAccount = useRef<HTMLInputElement>(null);

    const sendData = (e: EventTarget) => {

    }

    return (
        <>
            <OneElementBackgroundDiv>
                <EmployeeInfoStyledDivFlex dir="col">
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2qHP74tfgJw2kytcqoiAHPRLH0oc1b3BW_WLN3ICHGw&s' alt={'employee icon'} />
                    <ButtonStyled>CREATE USER</ButtonStyled>
                </EmployeeInfoStyledDivFlex>
                <EmployeeInfoStyledDivFlex box='grid'>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdAddPhotoAlternate /> Photo</ElementInfoPStyled><InputStyled type="creationform" ref={photo} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaUser /> Name</ElementInfoPStyled><InputStyled type="creationform" ref={name} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaBirthdayCake /> Birth</ElementInfoPStyled><InputStyled type="creationform" ref={birth} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaTransgender /> Gender</ElementInfoPStyled><InputStyled type="creationform" ref={gender} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaAddressCard /> DNI</ElementInfoPStyled><InputStyled type="creationform" ref={dni} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdMailOutline /> Email</ElementInfoPStyled><InputStyled type="creationform" ref={email} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaPhoneAlt /> Phone</ElementInfoPStyled><InputStyled type="creationform" ref={phone} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaLocationDot /> Postal Code</ElementInfoPStyled><InputStyled type="creationform" ref={postalcode} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaMapLocation /> Address</ElementInfoPStyled><InputStyled type="creationform" ref={address} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaBriefcase /> Job</ElementInfoPStyled><InputStyled type="creationform" ref={job} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaCalendarAlt /> Start Date</ElementInfoPStyled><InputStyled type="creationform" ref={startdate} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaHospitalAlt /> Social Security</ElementInfoPStyled><InputStyled type="creationform" ref={socialsec} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaFileContract /> Contract</ElementInfoPStyled><InputStyled type="creationform" ref={contract} /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><BsBank2 /> Bank Account</ElementInfoPStyled><InputStyled type="creationform" ref={bankAccount} /></ElementInfoDivStyled>
                </EmployeeInfoStyledDivFlex>
            </OneElementBackgroundDiv>

        </>
    )
}
