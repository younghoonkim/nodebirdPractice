import React, { useCallback } from 'react';
import {Button, Form, Input} from 'antd'
import { useState, useEffect } from 'react';
import useInput from '@/hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { stateType } from '@/reducers';
import { ADD_COMMENT_REQUEST } from '@/reducers/post';
const CommentForm = ({post} : any) => {

    const dispatch = useDispatch();

    const id = useSelector((state: stateType) => state.me?.id);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');
    const { addCommentDone, addCommentLoading } = useSelector((state : any) => state.post);


    useEffect(() => {
        if(addCommentDone){
            setCommentText('');
        }
    },[addCommentDone]);

    const onSubmitComment = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id}
        })
    }, [commentText,id]);
    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin: 0}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button 
                    style={{position: 'absolute', bottom:-40,  right: 0 }} 
                    type="primary" 
                    htmlType="submit"
                    loading={ addCommentLoading }>삐약</Button>
            </Form.Item>
        </Form>
    );
};

export default CommentForm;