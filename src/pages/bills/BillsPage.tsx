import React, { useEffect, useState } from 'react'
import { AppDispatch, useAppSelector } from '../../app/store';
import { useDispatch } from 'react-redux';
import { BillsInterface } from '../../interfaces/billsInterface';
import { getBillData, getBillError, getBillStatus, getPayrollBill, getRentBill, getShopBill } from '../../features/bills/billsSlice';
import { deleteBillToAPIThunk, getBillListFromAPIThunk } from '../../features/bills/billsThunk';
import { TrStyled } from '../../components/table/TrStyled';
import { PhotoDataDiv } from '../../components/common/PhotoDataDiv';
import { TrashStyledIcon } from '../../components/common/IconStyled';
import { toast } from 'react-toastify';
import { MenuStyled } from '../../components/common/MenuStyled';
import { InputStyled } from '../../components/common/InputStyled';
import { SelectStyled } from '../../components/table/SelectStyled';
import { TheadStyled } from '../../components/table/TheadStyled';
import { TableGuestStyled } from '../../components/table/TableGuestStyled';
import { Tfooter } from '../../components/table/Tfooter';
import { ListStyled } from '../../components/common/ListStyled';
import { ListElementStyled } from '../../components/common/ListElementStyled';
import { Spinner } from '../../components/spinner/Spinner';

export const BillsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const billListData = useAppSelector<BillsInterface[]>(getBillData);
  const billListShop = useAppSelector<BillsInterface[]>(getShopBill);
  const billListRent = useAppSelector<BillsInterface[]>(getRentBill);
  const billListPayroll = useAppSelector<BillsInterface[]>(getPayrollBill);
  const billListError = useAppSelector<string | undefined>(getBillError);
  const billListStatus = useAppSelector<string>(getBillStatus);
  const [billList, setBillList] = useState<React.JSX.Element[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('newest');
  const [spinner, setSpinner] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10;
  const [searchDescription, setSearchDescription] = useState<string>('')

  const [showShop, setShowShop] = useState<boolean>(false)
  const [showRent, setShowRent] = useState<boolean>(false)
  const [showPayroll, setShowPayroll] = useState<boolean>(false)


  useEffect(() => {
    if (billListStatus === "idle")
      dispatch(getBillListFromAPIThunk())
    else if (billListStatus === "pending")
      setSpinner(true)
    else if (billListStatus === "fulfilled") {
      let components: React.JSX.Element[] = []
      let sortedList: BillsInterface[] = [];

      if (showShop)
        sortedList = billListShop.slice()
      else if (showRent)
        sortedList = billListRent.slice()
      else if (showPayroll)
        sortedList = billListPayroll.slice()
      else
        sortedList = billListData.slice()



      if (selectedSort === 'newest')
        sortedList.sort((a: BillsInterface, b: BillsInterface) => new Date(b.date).getTime() - new Date(a.date).getTime())
      else if (selectedSort === 'oldest')
        sortedList.sort((a: BillsInterface, b: BillsInterface) => new Date(a.date).getTime() - new Date(b.date).getTime())
      else if (selectedSort === 'paymentAsc')
        sortedList.sort((a: BillsInterface, b: BillsInterface) => a.paymentAmount - b.paymentAmount)
      else if (selectedSort === 'paymentDesc')
        sortedList.sort((a: BillsInterface, b: BillsInterface) => b.paymentAmount - a.paymentAmount)
      else if (selectedSort === 'beneficiary')
        sortedList.sort((a: BillsInterface, b: BillsInterface) => a.beneficiary.localeCompare(b.beneficiary))

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, sortedList.length);

      if (searchDescription.length > 0) {
        sortedList = sortedList.filter((bill: BillsInterface) => {
          return bill.description.toLowerCase().includes(searchDescription.toLowerCase())
        })
      }

      const paginatedList = sortedList.slice(startIndex, endIndex);
      paginatedList.forEach((bill: BillsInterface) => {
        components.push(
          <TrStyled title={'ID: ' + bill._id}>
            <td>
              <PhotoDataDiv data={bill.beneficiary} />
            </td>
            <td>
              <PhotoDataDiv data={bill.description} />
            </td>
            <td>
              <PhotoDataDiv data={bill.type} />
            </td>
            <td >
              <PhotoDataDiv data={bill.paymentAmount.toString() + '€'} />
            </td>
            <td>
              <PhotoDataDiv data={bill.date.toString().split('T')[0]} />
            </td>
            <td>
              <PhotoDataDiv data={
                <TrashStyledIcon onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveBill(bill._id);
                }} />
              } />
            </td>
          </TrStyled>
        )
      })
      setSpinner(false)
      setBillList(components)
    }
  }, [dispatch, billListData, billListStatus, selectedSort, currentPage, searchDescription, showShop, showRent, showPayroll])


  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleRemoveBill = async (billId: string | undefined) => {
    try {
      if (billId) {
        await dispatch(deleteBillToAPIThunk(billId))
        toast.info('Factura eliminada', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }
    } catch (error) {
      console.log('error', error)
      toast.error('No se pudo eliminar la factura', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
  }


  return (
    <>
      <MenuStyled>
        <InputStyled
          type='secondary'
          placeholder='Find by description'
          onChange={(e) => setSearchDescription(e.target.value)}
        />
        <div>
          <ListStyled>
            <ListElementStyled
              onClick={() => (setShowShop(false), setShowPayroll(false), setShowRent(false))}
              className={!showShop && !showPayroll && !showRent ? 'active' : ''}
            >All Bills</ListElementStyled>
            <ListElementStyled
              onClick={() => (setShowShop(true), setShowPayroll(false), setShowRent(false))}
              className={showShop && !showPayroll && !showRent ? 'active' : ''}
            >Shop Bills</ListElementStyled>
            <ListElementStyled
              onClick={() => (setShowShop(false), setShowPayroll(false), setShowRent(true))}
              className={!showShop && !showPayroll && showRent ? 'active' : ''}
            >Rent Bills</ListElementStyled>
            <ListElementStyled
              onClick={() => (setShowShop(false), setShowPayroll(true), setShowRent(false))}
              className={!showShop && showPayroll && !showRent ? 'active' : ''}
            >Payroll bills</ListElementStyled>
          </ListStyled>
          <SelectStyled onChange={(e) => setSelectedSort(e.target.value)}>
            <option value="newest" selected>Newest</option>
            <option value="oldest">Oldest</option>
            <option value="paymentAsc">Payment Amount (Asc)</option>
            <option value="paymentDesc">Payment Amount (Desc)</option>
            <option value="beneficiary">beneficiary</option>
          </SelectStyled>
        </div>
      </MenuStyled>

      {spinner ? <Spinner /> :
        <TableGuestStyled className='rev'>
          <TheadStyled>
            <tr>
              <th>Beneficiary</th>
              <th>Description</th>
              <th>Type</th>
              <th>Payment Amount</th>
              <th>Date</th>
            </tr>
          </TheadStyled>

          <tbody>
            {billList}
          </tbody>
        </TableGuestStyled>
      }
      <Tfooter
        currentPage={currentPage}
        onPageChanged={handlePageChange}
        items={(billListData as BillsInterface[]).length}
        itemsPerPage={itemsPerPage}
      />
    </>
  )
}
