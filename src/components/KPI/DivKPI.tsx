import { DivKPIStyled } from './DivKPIStyled'
import { KPI } from './KPI'
import { MdOutlinePointOfSale } from 'react-icons/md';
import { FaCommentAlt } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { FaMoneyBills } from 'react-icons/fa6';
import { AppDispatch, useAppSelector } from '../../app/store';
import { CommentInterface } from '../../interfaces/commentsInterface';
import { getCommentData, getCommentStatus } from '../../features/comments/commentsSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCommentListFromAPIThunk } from '../../features/comments/commentsThunk';
import { getBillData, getBillStatus } from '../../features/bills/billsSlice';
import { BillsInterface } from '../../interfaces/billsInterface';
import { getCustomerData, getCustomerStatus } from '../../features/customers/customersSlice';
import { CustomerInterface } from '../../interfaces/customersInterface';
import { SaleInterface } from '../../interfaces/salesInterface';
import { getSaleData, getSaleStatus } from '../../features/sales/salesSlice';
import { getBillListFromAPIThunk } from '../../features/bills/billsThunk';
import { getCustomerListFromAPIThunk } from '../../features/customers/customersThunk';
import { getSaleListFromAPIThunk } from '../../features/sales/salesThunk';



export const DivKPI = () => {
  const dispatch: AppDispatch = useDispatch();
  const billListData = useAppSelector<BillsInterface[]>(getBillData);
  const billListStatus = useAppSelector<string>(getBillStatus);
  const [ spinnerBills, setSpinnerBills ] = useState(false);

  const customerListData = useAppSelector<CustomerInterface[]>(getCustomerData);
  const customerListStatus = useAppSelector<string>(getCustomerStatus);
  const [ spinnerCustomer, setSpinnerCustomer ] = useState(false);

  const saleListData = useAppSelector<SaleInterface[]>(getSaleData);
  const saleListStatus = useAppSelector<string>(getSaleStatus);
  const [ spinnerSales, setSpinnerSales ] = useState(false);

  const commentListData = useAppSelector<CommentInterface[]>(getCommentData);
  const commentListStatus = useAppSelector<string>(getCommentStatus);
  const [ spinnerComments, setSpinnerComments ] = useState(false);

  useEffect(() => {
    if (billListStatus === "idle")
      dispatch(getBillListFromAPIThunk())
    else if (billListStatus === "pending")
      setSpinnerBills(true)
    else if (billListStatus === "fulfilled") {
      setSpinnerBills(false)
    }
  }, [dispatch, billListData, billListStatus])

  useEffect(() => {
    if (customerListStatus === "idle")
      dispatch(getCustomerListFromAPIThunk())
    else if (customerListStatus === "pending")
      setSpinnerCustomer(true)
    else if (customerListStatus === "fulfilled") {
      setSpinnerCustomer(false)
    }
  }, [dispatch, customerListData, customerListStatus])

  useEffect(() => {
    if (saleListStatus === "idle")
      dispatch(getSaleListFromAPIThunk())
    else if (saleListStatus === "pending")
      setSpinnerSales(true)
    else if (saleListStatus === "fulfilled") {
      setSpinnerSales(false)
    }
  }, [dispatch, saleListData, saleListStatus])

  useEffect(() => {
    if (commentListStatus === "idle")
      dispatch(getCommentListFromAPIThunk())
    else if (commentListStatus === "pending")
      setSpinnerComments(true)
    else if (commentListStatus === "fulfilled") {
      setSpinnerComments(false)
    }
  }, [dispatch, commentListData, commentListStatus])


  return (
    <DivKPIStyled>
      {spinnerBills ? <KPI icon={<FaMoneyBills />} number={'Loading'} text={'Bills'} /> : <KPI icon={<FaMoneyBills />} number={billListData.length.toString()} text={'Bills'} />}
      {spinnerCustomer ? <KPI icon={<FiUsers />} number={'Loading'} text={'Customers'} /> : <KPI icon={<FiUsers />} number={customerListData.length.toString()} text={'Customers'} />}
      {spinnerSales ? <KPI icon={<MdOutlinePointOfSale />} number={'Loading'} text={'Sales'} /> : <KPI icon={<MdOutlinePointOfSale />} number={saleListData.length.toString()} text={'Sales'} />}
      {spinnerComments ? <KPI icon={<FaCommentAlt />} number={'Loading'} text={'Opinions'} /> : <KPI icon={<FaCommentAlt />} number={commentListData.length.toString()} text={'Opinions'} />}
    </DivKPIStyled>
  )
}
