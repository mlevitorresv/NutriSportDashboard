import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, useAppSelector, RootState } from "../../app/store"
import { OneElementBackgroundDiv } from "../../components/common/OneElementBackgroundDiv"
import { useNavigate, useParams } from "react-router-dom"
import { ProductInterface } from "../../interfaces/productsInterface"
import { getProductById, getProductError, getProductStatus } from "../../features/products/productsSlice"
import { useEffect, useState } from "react"
import { MdMailOutline, MdWarehouse } from "react-icons/md";
import { FaBarcode, FaJar, FaSackDollar } from "react-icons/fa6";
import { FaUser, FaBirthdayCake, FaTransgender, FaPhoneAlt, FaBriefcase, FaCalendarAlt, FaHospitalAlt } from "react-icons/fa";
import { FaAddressCard, FaFileContract, FaLocationDot, FaMapLocation } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs"
import { ElementInfoDivStyled } from "../../components/common/ElementInfoDivStyled"
import { ElementInfoPStyled } from "../../components/common/ElementInfoPStyled"
import { Spinner } from "../../components/spinner/Spinner"
import { ProductInfoStyledDiv } from "../../components/common/ProductInfoStyledDiv"
import { getProductFromAPIThunk } from "../../features/products/productsThunk"
import { TbCircleLetterB, TbCircleLetterC } from "react-icons/tb"



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
                <OneElementBackgroundDiv>
                    <ProductInfoStyledDiv col = {3}>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaJar /> Name</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.name}</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><TbCircleLetterB /> Brand</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.brand}</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaBarcode /> SKU</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.SKU}</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><TbCircleLetterC /> Category</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.category}</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaSackDollar /> PVP</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.PVP}€</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdWarehouse /> Stock</ElementInfoPStyled><ElementInfoPStyled size="big">{productData?.stock}</ElementInfoPStyled></ElementInfoDivStyled>
                    </ProductInfoStyledDiv>
                </OneElementBackgroundDiv>}

        </>
    )
}
