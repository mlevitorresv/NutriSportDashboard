import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Message } from './Message'
import 'swiper/css'
import { AppDispatch, useAppSelector } from '../../app/store'
import { useDispatch } from 'react-redux'
import { CommentInterface } from '../../interfaces/commentsInterface'
import { getCommentData, getCommentError, getCommentStatus } from '../../features/comments/commentsSlice'
import { getCommentListFromAPIThunk } from '../../features/comments/commentsThunk'

export const MessagesContainer = () => {

  const dispatch: AppDispatch= useDispatch();
  const commentListData = useAppSelector<CommentInterface[]>(getCommentData)
  const commentListError = useAppSelector<string | undefined>(getCommentError)
  const commentListStatus = useAppSelector<string>(getCommentStatus)
  const [spinner, setSpinner] = useState<boolean>(true);

  useEffect(() => {
    if(commentListStatus === "idle"){
      dispatch(getCommentListFromAPIThunk())
    }
    else if(commentListStatus === "pending"){
      setSpinner(true)
    }
    else if(commentListStatus === "fulfilled"){
      setSpinner(false)
    }
  })

  return (
    spinner ? <p>Loading...</p> : 
      <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
      >
        {commentListData.map(comment => (
          <SwiperSlide> <Message email={comment.email} join={comment.date.toString().split('T')[0]} comment={comment.comment} /> </SwiperSlide>
        ))}
      </Swiper>
  );
}
