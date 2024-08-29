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

export const BillsCreatePage = () => {

  const dispatch: AppDispatch = useAppDispatch();
  const [spinner, setSpinner] = useState<boolean>(true);


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




  return (
    <>
      {spinner ? <Spinner /> :
        <OneElementBackgroundDiv>
          <ElementInfoDivStyled>
            <ElementInfoPStyled size="small"><FaTruckMoving /> Beneficiary</ElementInfoPStyled>
            <SelectStyled type="creationform" ref={beneficiary} defaultValue={'male'}>
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
              <option value="male" selected>Male</option>
              <option value="female">Female</option>
              <option value="Other">Other</option>
            </SelectStyled>
          </ElementInfoDivStyled>
          <ElementInfoDivStyled>
            <ElementInfoPStyled size="small"><FaSackDollar /> Payment Amount</ElementInfoPStyled>
            <InputStyled type="creationform" ref={paymentAmount} />
          </ElementInfoDivStyled>
          <ElementInfoDivStyled>
            <ElementInfoPStyled size="small"><FaCalendarAlt /> Date</ElementInfoPStyled>
            <InputStyled type="creationform" ref={date} />
          </ElementInfoDivStyled>
        </OneElementBackgroundDiv>
      }
    </>
  )
}
