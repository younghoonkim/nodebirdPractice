import React, { useState } from 'react';
import Slick from 'react-slick';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    z-index: 5000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;
const Header = styled.header`
    header: 44px;
    background: white;
    position: relative;
    padding: 0;
    text-align: center;
`;

const ImagesZoom = ({images, onClose}: any) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <Overlay>
            <Header>
                <h1>상세이미지</h1>
                <button onClick={onClose}>X</button>
            </Header>
            <div>
                <div>
                    <Slick 
                        initialSlide={0}
                        afterChange={(slide) => setCurrentSlide(slide)}
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {
                            images.map((v) => (
                                <div key={v.src}>
                                    <img src={v.src} alt={v.src} />
                                </div>
                            ))
                        }
                    </Slick>
                </div>
            </div>
        </Overlay>
    );
};

export default ImagesZoom;