import { InfinitySpin } from "react-loader-spinner"
import { SpinnerDivStyled } from "./SpinnerDivStyled"

export const Spinner = () => {
    return (
        <SpinnerDivStyled>
            <InfinitySpin
                color="#135846"
            />
        </SpinnerDivStyled>

    )
}

