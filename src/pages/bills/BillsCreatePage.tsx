import React, { useEffect, useRef, useState } from 'react'
import { OneElementBackgroundDiv } from '../../components/common/OneElementBackgroundDiv'
import { ElementInfoDivStyled } from '../../components/common/ElementInfoDivStyled'
import { ElementInfoPStyled } from '../../components/common/ElementInfoPStyled'
import { InputStyled } from '../../components/common/InputStyled'
import { SelectStyled } from '../../components/table/SelectStyled'
import { TextAreaStyled } from '../../components/common/TextAreaStyled'
import { AppDispatch, useAppDispatch, useAppSelector } from '../../app/store'
import { FaSackDollar, FaTruckMoving } from 'react-icons/fa6'
import { MdDescription } from 'react-icons/md'
import { LuType } from 'react-icons/lu'
import { FaCalendarAlt } from 'react-icons/fa'
import { getSupplierData, getSupplierError, getSupplierStatus } from '../../features/suppliers/suppliersSlice'
import { SupplierInterface } from '../../interfaces/suppliersInterface'
import { getSupplierListFromAPIThunk } from '../../features/suppliers/suppliersThunk'
import { Spinner } from '../../components/spinner/Spinner'
import { BillsInterface } from '../../interfaces/billsInterface'
import { createBillToAPIThunk } from '../../features/bills/billsThunk'
import { toast } from 'react-toastify'
import { EmployeeInfoStyledDivFlex } from '../../components/common/EmployeeInfoStyledDivFlex'
import { ButtonStyled } from '../../components/common/ButtonStyled'
import { useNavigate } from 'react-router-dom'

export const BillsCreatePage = () => {

  const dispatch: AppDispatch = useAppDispatch();
  const [spinner, setSpinner] = useState<boolean>(true);
  const navigate = useNavigate();

  const supplierListData = useAppSelector<SupplierInterface[]>(getSupplierData);
  const supplierListError = useAppSelector<string | undefined>(getSupplierError);
  const supplierListStatus = useAppSelector<string>(getSupplierStatus);
  const [supplierList, setSupplierList] = useState<SupplierInterface[]>([]);

  useEffect(() => {
    if (supplierListStatus === "idle")
      dispatch(getSupplierListFromAPIThunk())
    else if (supplierListStatus === "pending")
      setSpinner(true)
    else if (supplierListStatus === "fulfilled") {
      setSupplierList(supplierListData)
      setSpinner(false)
    }
  }, [supplierListStatus, dispatch])






  const beneficiary = useRef<HTMLSelectElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const type = useRef<HTMLSelectElement>(null);
  const paymentAmount = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);

  const sendData = async () => {
    let data: BillsInterface = {
      _id: undefined,
      beneficiary: beneficiary.current?.value || '',
      description: description.current?.value || '',
      type: type.current?.value || '',
      paymentAmount: parseFloat(paymentAmount.current?.value || '0'),
      date: date.current ? new Date(date.current.value) : new Date(),
    }

    await dispatch(createBillToAPIThunk(data))

    toast.success('Factura creada correctamente', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    navigate('/bills')
  }


  return (
    <>
      {spinner ? <Spinner /> :
        <OneElementBackgroundDiv>
          <EmployeeInfoStyledDivFlex dir='col'>
            <ElementInfoDivStyled>
              <ElementInfoPStyled size="small"><FaTruckMoving /> Beneficiary</ElementInfoPStyled>
              <SelectStyled type="creationform" ref={beneficiary}>
                {supplierList.map((supplier) => (
                  <option value={supplier._id}>{supplier.name}</option>
                ))}
              </SelectStyled>
            </ElementInfoDivStyled>
            <ElementInfoDivStyled>
              <ElementInfoPStyled size="small"><MdDescription /> Description</ElementInfoPStyled>
              <TextAreaStyled ref={description} />
            </ElementInfoDivStyled>
            <ElementInfoDivStyled>
              <ElementInfoPStyled size="small"><LuType /> Type</ElementInfoPStyled>
              <SelectStyled type="creationform" ref={type} defaultValue={'male'}>
                <option value="compra">Shop</option>
                <option value="alquiler">Rent</option>
                <option value="nómina">Payroll</option>
              </SelectStyled>
            </ElementInfoDivStyled>
            <ElementInfoDivStyled>
              <ElementInfoPStyled size="small"><FaSackDollar /> Payment Amount</ElementInfoPStyled>
              <InputStyled type='number' model="creationform" ref={paymentAmount} />
            </ElementInfoDivStyled>
            <ElementInfoDivStyled>
              <ElementInfoPStyled size="small"><FaCalendarAlt /> Date</ElementInfoPStyled>
              <InputStyled type='date' model="creationform" ref={date} />
            </ElementInfoDivStyled>
            <ButtonStyled onClick={sendData}>CREATE BILL</ButtonStyled>
          </EmployeeInfoStyledDivFlex>
        </OneElementBackgroundDiv>
      }
    </>
  )
}
