import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, useAppSelector, RootState } from "../../app/store"
import { OneElementBackgroundDiv } from "../../components/common/OneElementBackgroundDiv"
import { useNavigate, useParams } from "react-router-dom"
import { ProductInterface } from "../../interfaces/productsInterface"
import { getProductById, getProductData, getProductError, getProductStatus } from "../../features/products/productsSlice"
import { useEffect, useState } from "react"
import { MdMailOutline } from "react-icons/md";
import { FaUser, FaBirthdayCake, FaTransgender, FaPhoneAlt, FaBriefcase, FaCalendarAlt, FaHospitalAlt } from "react-icons/fa";
import { FaAddressCard, FaFileContract, FaLocationDot, FaMapLocation } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs"
import { ElementInfoDivStyled } from "../../components/common/ElementInfoDivStyled"
import { ElementInfoPStyled } from "../../components/common/ElementInfoPStyled"
import { Spinner } from "../../components/spinner/Spinner"
import { ProductInfoStyledDiv } from "../../components/common/ProductInfoStyledDiv"
import { getProductFromAPIThunk } from "../../features/products/productsThunk"



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
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaUser /> Name</ElementInfoPStyled><ElementInfoPStyled size="big">name</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaBirthdayCake /> Birth</ElementInfoPStyled><ElementInfoPStyled size="big">birth</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaTransgender /> Gender</ElementInfoPStyled><ElementInfoPStyled size="big">gender</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaAddressCard /> DNI</ElementInfoPStyled><ElementInfoPStyled size="big">DNI</ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdMailOutline /> Email</ElementInfoPStyled><ElementInfoPStyled size="big"></ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaPhoneAlt /> Phone</ElementInfoPStyled><ElementInfoPStyled size="big"></ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaLocationDot /> Postal Code</ElementInfoPStyled><ElementInfoPStyled size="big"></ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaMapLocation /> Address</ElementInfoPStyled><ElementInfoPStyled size="big"></ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaBriefcase /> Job</ElementInfoPStyled><ElementInfoPStyled size="big"></ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaCalendarAlt /> Start Date</ElementInfoPStyled><ElementInfoPStyled size="big"></ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaHospitalAlt /> Social Security</ElementInfoPStyled><ElementInfoPStyled size="big"></ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaFileContract /> Contract</ElementInfoPStyled><ElementInfoPStyled size="big"></ElementInfoPStyled></ElementInfoDivStyled>
                        <ElementInfoDivStyled><ElementInfoPStyled size="small"><BsBank2 /> Bank Account</ElementInfoPStyled><ElementInfoPStyled size="big"></ElementInfoPStyled></ElementInfoDivStyled>
                    </ProductInfoStyledDiv>
                </OneElementBackgroundDiv>}

        </>
    )
}
