import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, useAppSelector, RootState } from "../../app/store"
import { OneElementBackgroundDiv } from "../../components/common/OneElementBackgroundDiv"
import { useNavigate, useParams } from "react-router-dom"
import { ProductInterface } from "../../interfaces/productsInterface"
import { getProductById, getProductError, getProductStatus } from "../../features/products/productsSlice"
import { useEffect, useState } from "react"
import { MdDescription, MdMailOutline, MdWarehouse } from "react-icons/md";
import { FaBarcode, FaJar, FaSackDollar } from "react-icons/fa6";
import { FaUser, FaBirthdayCake, FaTransgender, FaPhoneAlt, FaBriefcase, FaCalendarAlt, FaHospitalAlt } from "react-icons/fa";
import { FaAddressCard, FaFileContract, FaLocationDot, FaMapLocation } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs"
import { ElementInfoDivStyled } from "../../components/common/ElementInfoDivStyled"
import { ElementInfoPStyled } from "../../components/common/ElementInfoPStyled"
import { Spinner } from "../../components/spinner/Spinner"
import { ProductInfoStyledDiv } from "../../components/common/ProductInfoStyledDiv"
import { getProductFromAPIThunk } from "../../features/products/productsThunk"
import { TbCircleLetterB, TbCircleLetterC, TbMeat } from "react-icons/tb"
import { TableGuestStyled } from "../../components/table/TableGuestStyled"
import { TheadStyled } from "../../components/table/TheadStyled"
import { PhotoDataDiv } from "../../components/common/PhotoDataDiv"
import { TrStyled } from "../../components/table/TrStyled"



export const ProductsDetailsPage = () => {

    const params = useParams()
    const id = params.id
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();
    let productData: ProductInterface | undefined;
    const state = useSelector((state: RootState) => state);
    if (id)
        productData = getProductById(state, id)

    const productError = useAppSelector<string | undefined>(getProductError);
    const productStatus = useAppSelector<string>(getProductStatus);
    const [spinner, setSpinner] = useState<boolean>(true)


    useEffect(() => {
        if (productStatus === "idle") {
            dispatch(getProductFromAPIThunk(id))
        } else if (productStatus === "pending") {
            setSpinner(true)
        } else if (productStatus === "fulfilled" && productData) {
            setSpinner(false)
        }
    }, [dispatch, productStatus, id])


    return (
        <>
            {spinner ? <Spinner /> :
                <OneElementBackgroundDiv direction="column">
                    <ProductInfoStyledDiv col={3}>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaJar /> Name</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.name}</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><TbCircleLetterB /> Brand</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.brand}</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaBarcode /> SKU</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.SKU}</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><TbCircleLetterC /> Category</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.category}</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaSackDollar /> PVP</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.PVP}€</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdWarehouse /> Stock</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.stock}</ElementInfoPStyled></ElementInfoDivStyled>
                    </ProductInfoStyledDiv>

                    <ProductInfoStyledDiv col={2}>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdDescription /> Description</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.description}</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><TbMeat /> Ingredients</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.ingredients}</ElementInfoPStyled></ElementInfoDivStyled>
                    </ProductInfoStyledDiv>

                    <ProductInfoStyledDiv col={3}>
                        {productData?.photos.map((element, index) => (
                            <img src={element} alt={`${element} photo`} key={index} />
                        ))}
                    </ProductInfoStyledDiv>

                    <TableGuestStyled className='rev'>
                        <TheadStyled>
                            <tr>
                                <th></th>
                                <th>Por 100g</th>
                                <th>Por 30g</th>
                            </tr>
                        </TheadStyled>
                        <tbody>
                            <TrStyled>
                                <td>
                                    <PhotoDataDiv data={'ENERGY'} />
                                </td>
                                <td>
                                    <PhotoDataDiv data={productData?.energy + 'Kcal'} />
                                </td>
                                <td>
                                    <PhotoDataDiv data={(productData?.energy / 3000).toFixed(2).toString() + 'Kcal'} />
                                </td>
                            </TrStyled>
                            <TrStyled>
                                <td>
                                    <PhotoDataDiv data={'FATS'} />
                                </td>
                                <td>
                                    <PhotoDataDiv data={productData?.fats + 'G'} />
                                </td>
                                <td>
                                    <PhotoDataDiv data={(productData?.fats / 3000).toFixed(2).toString() + 'G'} />
                                </td>
                            </TrStyled>
                            <TrStyled>
                                <td>
                                    <PhotoDataDiv data={'CARBOHYDRATES'} />
                                </td>
                                <td>
                                    <PhotoDataDiv data={productData?.carbohydrates + 'G'} />
                                </td>
                                <td>
                                    <PhotoDataDiv data={(productData?.carbohydrates / 3000).toFixed(2).toString() + 'G'} />
                                </td>
                            </TrStyled>
                            <TrStyled>
                                <td>
                                    <PhotoDataDiv data={'PROTEINS'} />
                                </td>
                                <td>
                                    <PhotoDataDiv data={productData?.proteins  + 'G'} />
                                </td>
                                <td>
                                    <PhotoDataDiv data={(productData?.proteins / 3000).toFixed(2).toString() + 'G'} />
                                </td>
                            </TrStyled>
                            <TrStyled>
                                <td>
                                    <PhotoDataDiv data={'SALT'} />
                                </td>
                                <td>
                                    <PhotoDataDiv data={productData?.salt + 'G' } />
                                </td>
                                <td>
                                    <PhotoDataDiv data={(productData?.salt / 3000).toFixed(2).toString() + 'G'} />
                                </td>
                            </TrStyled>
                        </tbody>
                    </TableGuestStyled>
                </OneElementBackgroundDiv>}
            {console.log(productData?.photos)}

        </>
    )
}
