import React, { useEffect, useState } from 'react'
import { ProductInterface } from '../../interfaces/productsInterface';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../app/store';
import { getProductData, getProductError, getProductStatus } from '../../features/products/productsSlice';
import { deleteProductToAPIThunk, getProductListFromAPIThunk } from '../../features/products/productsThunk';
import { TrStyled } from '../../components/table/TrStyled';
import { PhotoDataDiv } from '../../components/common/PhotoDataDiv';
import { TrashStyledIcon } from '../../components/common/IconStyled';
import { toast } from 'react-toastify';
import { MenuStyled } from '../../components/common/MenuStyled';
import { InputStyled } from '../../components/common/InputStyled';
import { SelectStyled } from '../../components/table/SelectStyled';
import { TableGuestStyled } from '../../components/table/TableGuestStyled';
import { TheadStyled } from '../../components/table/TheadStyled';
import { Tfooter } from '../../components/table/Tfooter';
import { Spinner } from '../../components/spinner/Spinner';
import { useNavigate } from 'react-router-dom';


export const ProductsPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const productListData = useAppSelector<ProductInterface[]>(getProductData);
    const productListError = useAppSelector<string | undefined>(getProductError);
    const productListStatus = useAppSelector<string>(getProductStatus);
    const [productList, setProductList] = useState<React.JSX.Element[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('newest');
    const [spinner, setSpinner] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10;
    const [searchName, setSearchDescription] = useState<string>('')


    useEffect(() => {
        if (productListStatus === "idle")
            dispatch(getProductListFromAPIThunk())
        else if (productListStatus === "pending")
            setSpinner(true)
        else if (productListStatus === "fulfilled") {
            let components: React.JSX.Element[] = []
            let sortedList: ProductInterface[] = productListData.slice()

            if (selectedSort === 'name')
                sortedList.sort((a: ProductInterface, b: ProductInterface) => a.name.localeCompare(b.name))
            if (selectedSort === 'sku')
                sortedList.sort((a: ProductInterface, b: ProductInterface) => (a.SKU.localeCompare(b.SKU)))
            if (selectedSort === 'pvpDesc')
                sortedList.sort((a: ProductInterface, b: ProductInterface) => (b.PVP) - (a.PVP))
            if (selectedSort === 'pvpAsc')
                sortedList.sort((a: ProductInterface, b: ProductInterface) => (a.PVP) - (b.PVP))
            if (selectedSort === 'stockDesc')
                sortedList.sort((a: ProductInterface, b: ProductInterface) => (b.stock) - (a.stock))
            if (selectedSort === 'stockAsc')
                sortedList.sort((a: ProductInterface, b: ProductInterface) => (a.stock) - (b.stock))

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, sortedList.length);

            if (searchName.length > 0) {
                sortedList = sortedList.filter((product: ProductInterface) => {
                    return product.name.toLowerCase().includes(searchName.toLowerCase())
                })
            }

            const paginatedList = sortedList.slice(startIndex, endIndex);
            paginatedList.forEach((product: ProductInterface) => {
                components.push(
                    <TrStyled onClick={() => navigate(`/products/${product._id}`)}>
                        <td>
                            <PhotoDataDiv data={product.name} />
                        </td>
                        <td>
                            <PhotoDataDiv data={product.SKU} />
                        </td>
                        <td>
                            <PhotoDataDiv data={product.brand} />
                        </td>
                        <td >
                            <PhotoDataDiv data={product.category} />
                        </td>
                        <td >
                            <PhotoDataDiv data={product.PVP.toString()} />
                        </td>
                        <td >
                            <PhotoDataDiv data={product.stock.toString()} />
                        </td>
                        <td>
                            <PhotoDataDiv data={
                                <TrashStyledIcon onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveProduct(product._id);
                                }} />
                            } />
                        </td>
                    </TrStyled>
                )
            })
            setSpinner(false)
            setProductList(components)
        }
    }, [dispatch, productListData, productListStatus, selectedSort, currentPage, searchName])


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleRemoveProduct = async (productId: string | undefined) => {
        try {
            if (productId) {
                await dispatch(deleteProductToAPIThunk(productId)).unwrap();
                toast.info('producto eliminado', {
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
            toast.error('No se pudo eliminar el producto', {
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
                    placeholder="Find by product's name"
                    onChange={(e) => setSearchDescription(e.target.value)}
                />
                <SelectStyled onChange={(e) => setSelectedSort(e.target.value)}>
                    <option value="name" selected>Name</option>
                    <option value="sku">SKU</option>
                    <option value="pvpDesc">PVP (Desc)</option>
                    <option value="pvpAsc">PVP (Asc)</option>
                    <option value="stockDesc">Stock (Desc)</option>
                    <option value="stockAsc">Stock (Asc)</option>
                </SelectStyled>
            </MenuStyled>

            {spinner ? <Spinner /> :
                <TableGuestStyled className='rev'>
                    <TheadStyled>
                        <tr>
                            <th>Name</th>
                            <th>SKU</th>
                            <th>Brand</th>
                            <th>category</th>
                            <th>PVP</th>
                            <th>Stock</th>
                        </tr>
                    </TheadStyled>

                    <tbody>
                        {productList}
                    </tbody>
                </TableGuestStyled>
            }
            <Tfooter
                currentPage={currentPage}
                onPageChanged={handlePageChange}
                items={(productListData as ProductInterface[]).length}
                itemsPerPage={itemsPerPage}
            />
        </>
    )
}
