import React, { useCallback, useState } from 'react';
import { stateType } from '@/reducers';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './ImagesZoom';

const PostImages = ( {images} : any) => {

    const [showImageZoom, setShowImageZoom] = useState(false);
    const onZoom = useCallback(() => {
        setShowImageZoom(true);
    },[]);
    const onClose = useCallback(() => {
        setShowImageZoom(false);
    },[]);

    if(images.length === 1){
        return (
            <>
                <img role='presentation' src={images[0].src} alt={images[0].src} onClick={onZoom}></img>
                {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
            </>
        )
    }
    else if(images.length === 2){
        return (
            <>
                <img role='presentation' style={{ width: '50%', display: 'inline-block'}} src={images[0].src} alt={images[0].src} onClick={onZoom}></img>
                <img role='presentation' style={{ width: '50%', display: 'inline-block'}} src={images[1].src} alt={images[1].src} onClick={onZoom}></img>
                {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
            </>
        )
    }
    return (
        <>
            <img role='presentation' style={{ width: '50%'}} src={images[0].src} alt={images[0].src} onClick={onZoom}></img>
            <div
                role="presentation"
                style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle'}}
                onClick={onZoom}
            >
                <PlusOutlined />
                <br />
                {images.length - 1}
                개의 사진 더보기
            </div>
            {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
        </>        
    );
};

export default PostImages;