import { Button, Form, Input } from 'antd';
import React, { useCallback, useRef } from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  useInput from '@/hooks/useInput';
import { addPost } from '@/reducers/post';

const PostForm = () => {
    const { imagePaths, addPostDone} = useSelector((state : any) => state.post);

    const dispatch = useDispatch();
    const [text, onChangeText, setText] = useInput('');

    useEffect(() => {
        if(addPostDone){
            setText('');
        }

    },[addPostDone]);

    const onSubmit = useCallback(() => {
        dispatch(addPost(text));
    },[text]);

    const imageInput = useRef<any>();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);
    return (
        <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit} >
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한일이 있었나요?"
            />
            <div>
                <input type="file" multiple style={{display: 'none'}} ref={imageInput}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type='primary' style={{ float: 'right' }} htmlType='submit'>짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v) => (
                    <div key={v} style={{ display: 'inline-block'}}>
                        <img src={v} style={{ width: '200px'}} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                )
                )}
            </div>
        </Form>
    );
};

export default PostForm;