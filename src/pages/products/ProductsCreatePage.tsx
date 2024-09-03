import { useNavigate } from "react-router-dom"
import { AppDispatch, useAppDispatch } from "../../app/store";
import { useRef } from "react";
import { OneElementBackgroundDiv } from "../../components/common/OneElementBackgroundDiv";
import { ElementInfoDivStyled } from "../../components/common/ElementInfoDivStyled";
import { ElementInfoPStyled } from "../../components/common/ElementInfoPStyled";
import { SelectStyled } from "../../components/table/SelectStyled";
import { InputStyled } from "../../components/common/InputStyled";
import { ButtonStyled } from "../../components/common/ButtonStyled";
import { ProductInfoStyledDiv } from "../../components/common/ProductInfoStyledDiv";
import { FaBarcode, FaJar, FaSackDollar } from "react-icons/fa6";
import { TbCircleLetterB, TbCircleLetterC, TbMeat } from "react-icons/tb";
import { MdAddPhotoAlternate, MdDescription, MdWarehouse } from "react-icons/md";
import { ProductImgStyled } from "../../components/common/ProductImgStyled";

export const ProductsCreatePage = () => {

    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate()


    const name = useRef<HTMLInputElement>(null);
    const brand = useRef<HTMLInputElement>(null);
    const sku = useRef<HTMLInputElement>(null);
    const category = useRef<HTMLSelectElement>(null);
    const pvp = useRef<HTMLInputElement>(null);
    const stock = useRef<HTMLInputElement>(null);

    const description = useRef<HTMLInputElement>(null);
    const ingredients = useRef<HTMLInputElement>(null);

    const photo1 = useRef<HTMLInputElement>(null);
    const photo2 = useRef<HTMLInputElement>(null);
    const photo3 = useRef<HTMLInputElement>(null);

    const energy = useRef<HTMLInputElement>(null);
    const fats = useRef<HTMLInputElement>(null);
    const carbohydrates = useRef<HTMLInputElement>(null);
    const proteins = useRef<HTMLInputElement>(null);
    const salt = useRef<HTMLInputElement>(null);


    return (
        <>
            <OneElementBackgroundDiv direction="column">
                <ProductInfoStyledDiv col={3}>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaJar /> Name</ElementInfoPStyled><InputStyled model="creationform" /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><TbCircleLetterB /> Brand</ElementInfoPStyled><InputStyled model="creationform" /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaBarcode /> SKU</ElementInfoPStyled><InputStyled model="creationform" /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><TbCircleLetterC /> Category</ElementInfoPStyled><InputStyled model="creationform" /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><FaSackDollar /> PVP</ElementInfoPStyled><InputStyled model="creationform" /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdWarehouse /> Stock</ElementInfoPStyled><InputStyled model="creationform" /></ElementInfoDivStyled>
                </ProductInfoStyledDiv>

                <ProductInfoStyledDiv col={2}>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdDescription /> Description</ElementInfoPStyled><InputStyled model="creationform" /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><TbMeat /> Ingredients</ElementInfoPStyled><InputStyled model="creationform" /></ElementInfoDivStyled>
                </ProductInfoStyledDiv>

                <ProductInfoStyledDiv col={1}>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdAddPhotoAlternate /> Photo 1</ElementInfoPStyled><InputStyled model="creationform" /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdAddPhotoAlternate /> Photo 2</ElementInfoPStyled><InputStyled model="creationform" /></ElementInfoDivStyled>
                    <ElementInfoDivStyled><ElementInfoPStyled size="small"><MdAddPhotoAlternate /> Photo 3</ElementInfoPStyled><InputStyled model="creationform" /></ElementInfoDivStyled>
                </ProductInfoStyledDiv>

            </OneElementBackgroundDiv>
        </>
    )
}
