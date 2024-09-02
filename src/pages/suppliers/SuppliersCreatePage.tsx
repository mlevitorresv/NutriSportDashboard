import { useRef } from 'react'
import { AppDispatch, useAppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { SupplierInterface } from '../../interfaces/suppliersInterface';
import { createSupplierToAPIThunk } from '../../features/suppliers/suppliersThunk';
import { toast } from 'react-toastify';
import { OneElementBackgroundDiv } from '../../components/common/OneElementBackgroundDiv';
import { EmployeeInfoStyledDivFlex } from '../../components/common/EmployeeInfoStyledDivFlex';
import { ElementInfoDivStyled } from '../../components/common/ElementInfoDivStyled';
import { ElementInfoPStyled } from '../../components/common/ElementInfoPStyled';
import { InputStyled } from '../../components/common/InputStyled';
import { SelectStyled } from '../../components/table/SelectStyled';
import { FaLocationDot, FaUser } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { TfiWorld } from 'react-icons/tfi';
import { ButtonStyled } from '../../components/common/ButtonStyled';
import { TbCircleLetterC } from 'react-icons/tb';

export const SuppliersCreatePage = () => {

    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();


    const name = useRef<HTMLInputElement>(null);
    const postalCode = useRef<HTMLInputElement>(null);
    const phone = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const web = useRef<HTMLInputElement>(null);
    const category = useRef<HTMLSelectElement>(null);

    const sendData = async () => {
        let data: SupplierInterface = {
            _id: undefined,
            name: name.current?.value || '',
            postalCode: parseInt(postalCode.current?.value || '0'),
            phone: phone.current?.value || '',
            email: email.current?.value || '',
            web: web.current?.value || '',
            category: category.current?.value || '',
        }

        await dispatch(createSupplierToAPIThunk(data))

        toast.success('Proveedor creado correctamente', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        navigate('/suppliers')
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
                        <ElementInfoPStyled size="small"><FaLocationDot /> Postal Code</ElementInfoPStyled>
                        <InputStyled type='number' model="creationform" ref={postalCode} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><FaPhoneAlt /> Phone</ElementInfoPStyled>
                        <InputStyled type='text' model="creationform" ref={phone} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><MdMailOutline /> Email</ElementInfoPStyled>
                        <InputStyled type='email' model="creationform" ref={email} />
                    </ElementInfoDivStyled>     
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><TfiWorld /> Web</ElementInfoPStyled>
                        <InputStyled type='text' model="creationform" ref={web} />
                    </ElementInfoDivStyled>
                    <ElementInfoDivStyled>
                        <ElementInfoPStyled size="small"><TbCircleLetterC /> Category</ElementInfoPStyled>
                        <SelectStyled type="creationform" ref={category}>
                            <option value='Products'>Products</option>
                            <option value='Rent'>Rent</option>
                        </SelectStyled>
                    </ElementInfoDivStyled>
                    <ButtonStyled onClick={sendData}>CREATE SUPPLIER</ButtonStyled>
                </EmployeeInfoStyledDivFlex>
            </OneElementBackgroundDiv>
        </>
    )
}
