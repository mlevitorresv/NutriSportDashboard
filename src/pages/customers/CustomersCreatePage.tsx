import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerInterface } from "../../interfaces/customersInterface";
import { AppDispatch, useAppDispatch } from "../../app/store";
import { createCustomerToAPIThunk } from "../../features/customers/customersThunk";
import { toast } from "react-toastify";
import { EmployeeInfoStyledDivFlex } from "../../components/common/EmployeeInfoStyledDivFlex";
import { OneElementBackgroundDiv } from "../../components/common/OneElementBackgroundDiv";
import { ElementInfoDivStyled } from "../../components/common/ElementInfoDivStyled";
import { ElementInfoPStyled } from "../../components/common/ElementInfoPStyled";
import { InputStyled } from "../../components/common/InputStyled";
import { SelectStyled } from "../../components/table/SelectStyled";
import { ButtonStyled } from "../../components/common/ButtonStyled";
import { MdMailOutline } from "react-icons/md";
import { FaLocationDot, FaTransgender, FaUser } from "react-icons/fa6";
import { FaBirthdayCake, FaPhoneAlt } from "react-icons/fa";

export const CustomersCreatePage = () => {

    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const phone = useRef<HTMLInputElement>(null);
    const PCode = useRef<HTMLInputElement>(null);
    const birth = useRef<HTMLInputElement>(null);
    const gender = useRef<HTMLSelectElement>(null);

    const sendData = async () => {
        let data: CustomerInterface = {
            _id: undefined,
            name: name.current?.value || '',
            email: email.current?.value || '',
            phone: phone.current?.value || '',
            postalCode: parseInt(PCode.current?.value || '0'),
            birth: birth.current ? new Date(birth.current.value) : new Date(),
            gender: gender.current?.value || ''
        }

        await dispatch(createCustomerToAPIThunk(data))

        toast.success('Cliente creado correctamente', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        navigate('/customers')
    }


    return (
        <>
            <OneElementBackgroundDiv>
                <EmployeeInfoStyledDivFlex dir='col'>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaUser /> Name</ElementInfoPStyled>
                        <InputStyled type='text' model="creationform" ref={name} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><MdMailOutline /> Email</ElementInfoPStyled>
                        <InputStyled type='email' model="creationform" ref={email} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaPhoneAlt /> Phone</ElementInfoPStyled>
                        <InputStyled type='text' model="creationform" ref={phone} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaLocationDot /> Postal Code</ElementInfoPStyled>
                        <InputStyled type='number' model="creationform" ref={PCode} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaBirthdayCake /> Birth</ElementInfoPStyled>
                        <InputStyled type='date' model="creationform" ref={birth} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaTransgender /> Gender</ElementInfoPStyled>
                        <SelectStyled type="creationform" ref={gender}>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='other'>Other</option>
                        </SelectStyled>
                    </ElementInfoDivStyled>
                    <ButtonStyled onClick={sendData}>CREATE CUSTOMER</ButtonStyled>
                </EmployeeInfoStyledDivFlex>
            </OneElementBackgroundDiv>
        </>
    )
}
