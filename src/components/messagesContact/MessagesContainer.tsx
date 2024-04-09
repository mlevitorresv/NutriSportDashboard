import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Message } from './Message'
import 'swiper/css'
import comments from '../../data/comment.json'

export const MessagesContainer = () => {
  return (
    <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
    >
      {comments.map(comment => (
        <SwiperSlide> <Message img={comment.photo} name={comment.name} join={comment.date} comment={comment.comment} /> </SwiperSlide>
      ))}
    </Swiper>
  );
}
