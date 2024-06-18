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
import { AppDispatch, useAppDispatch } from "../../app/store";
import { createEmployeeToAPIThunk } from "../../features/employees/employeesThunk";
import { SelectStyled } from "../../components/table/SelectStyled";



export const EmployeesCreatePage = () => {
    const dispatch: AppDispatch = useAppDispatch()

    const photo = useRef<HTMLInputElement>(null);
    const name = useRef<HTMLInputElement>(null);
    const birth = useRef<HTMLInputElement>(null);
    const gender = useRef<HTMLSelectElement>(null);
    const dni = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const phone = useRef<HTMLInputElement>(null);
    const postalcode = useRef<HTMLInputElement>(null);
    const address = useRef<HTMLInputElement>(null);
    const job = useRef<HTMLInputElement>(null);
    const startdate = useRef<HTMLInputElement>(null);
    const socialsec = useRef<HTMLInputElement>(null);
    const contract = useRef<HTMLSelectElement>(null);
    const bankAccount = useRef<HTMLInputElement>(null);

    const sendData = async () => {
        let data: EmployeeInterface = {
            _id: undefined,
            name: name.current?.value || '',
            photo: photo.current?.value || '',
            birth: birth.current? new Date(birth.current.value) : new Date(),
            gender: gender.current?.value || '',
            DNI: dni.current?.value || '',
            email: email.current?.value || '',
            password: '', // No se está recogiendo de los inputs
            phone: phone.current?.value || '',
            postalCode: parseInt(postalcode.current?.value || '0', 10),
            address: address.current?.value || '',
            job: job.current?.value || '',
            startDate: startdate.current ? new Date(startdate.current.value) : new Date(),
            contract: contract.current?.value || '',
            active: true,
            socialSecurity: parseInt(socialsec.current?.value || '0', 10),
            bankAccount: bankAccount.current?.value || '',
        };

        await dispatch(createEmployeeToAPIThunk(data))

        console.log('usuario creado')

    }

    return (
        <>
            <OneElementBackgroundDiv>
                <EmployeeInfoStyledDivFlex dir="col">
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2qHP74tfgJw2kytcqoiAHPRLH0oc1b3BW_WLN3ICHGw&s' alt={'employee icon'} />
                    <ButtonStyled onClick={sendData}>CREATE USER</ButtonStyled>
                </EmployeeInfoStyledDivFlex>
                <EmployeeInfoStyledDivFlex box='grid'>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><MdAddPhotoAlternate /> Photo</ElementInfoPStyled>
                        <InputStyled type="creationform" ref={photo} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaUser /> Name</ElementInfoPStyled>
                        <InputStyled type="creationform" ref={name} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaBirthdayCake /> Birth</ElementInfoPStyled>
                        <InputStyled type="creationform" ref={birth} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaTransgender /> Gender</ElementInfoPStyled>
                        <SelectStyled type="creationform" ref={gender} defaultValue={'male'}>
                            <option value="male" selected>Male</option>
                            <option value="female">Female</option>
                            <option value="Other">Other</option>
                        </SelectStyled>
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaAddressCard /> DNI</ElementInfoPStyled>
                        <InputStyled type="creationform" ref={dni} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><MdMailOutline /> Email</ElementInfoPStyled>
                        <InputStyled type="creationform" ref={email} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaPhoneAlt /> Phone</ElementInfoPStyled>
                        <InputStyled type="creationform" ref={phone} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaLocationDot /> Postal Code</ElementInfoPStyled>
                        <InputStyled type="creationform" ref={postalcode} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaMapLocation /> Address</ElementInfoPStyled>
                        <InputStyled type="creationform" ref={address} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaBriefcase /> Job</ElementInfoPStyled>
                        <InputStyled type="creationform" ref={job} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaCalendarAlt /> Start Date</ElementInfoPStyled>
                        <InputStyled type="creationform" ref={startdate} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaHospitalAlt /> Social Security</ElementInfoPStyled>
                        <InputStyled type="creationform" ref={socialsec} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaFileContract /> Contract</ElementInfoPStyled>
                        <SelectStyled type="creationform" ref={contract} defaultValue={'undefinedTime'}>
                            <option value="partner" selected>Partner</option>
                            <option value="undefinedTime">Undefined Time</option>
                            <option value="certainTime">Certain Time</option>
                        </SelectStyled>
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><BsBank2 /> Bank Account</ElementInfoPStyled>
                        <InputStyled type="creationform" ref={bankAccount} />
                    </ElementInfoDivStyled>
                </EmployeeInfoStyledDivFlex>
            </OneElementBackgroundDiv>

        </>
    )
}
