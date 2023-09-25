import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.scss";

import Pagination from "swiper";
import Navigation from "swiper";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { Card as AntdCard } from "antd";

export default function Flashcard({cards}: any){
    return (
        <>
            <Swiper
                pagination={{
                    type:"progressbar",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {cards.map(({ front, back, hint }: any, index: number) => {
                    return (
                        <SwiperSlide>
                            <Card
                                index={index}
                                total={cards.length}
                                front={front}
                                back={back}
                            />
                        </SwiperSlide>
                    );
                })}
                <SwiperSlide>
                    <div className="card-item final-view">
                        <p>You have finished your practice!</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}

const Card = ({ front, back, index, total }: any) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div className="card-item" onClick={() => setIsFlipped(!isFlipped)}>
                <div>
                    <p>Front</p>
                    <h2>{front}</h2>
                </div>
                <div className="bottom">
                    <p>{index+1}/{total}</p>
                </div>
            </div>
            <div className="card-item" onClick={() => setIsFlipped(!isFlipped)}>
                <div>
                    <p>Back</p>
                    <h2>{back}</h2>
                </div>
                <div className="bottom">
                    <p>{index+1}/{total}</p>
                </div>
            </div>
        </ReactCardFlip>
    )
}
