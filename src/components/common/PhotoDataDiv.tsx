import { PhotoDataDivPropsInterface } from '../../interfaces/componentsInterface';
import { PhotoDataDivStyled } from './PhotoDataDivStyled';

export const PhotoDataDiv = (props: PhotoDataDivPropsInterface) => {
  return (
    <PhotoDataDivStyled color = {props.color || '#393939'}>
        {props.data}
    </PhotoDataDivStyled>
  );
};
