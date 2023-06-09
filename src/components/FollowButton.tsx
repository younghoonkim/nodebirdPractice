import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { stateType } from '@/reducers';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post } : any) => {
    const dispatch = useDispatch();
    const { me, followLoading, unfollowLoading } = useSelector((state : stateType) => state.user);
    const isFollowing = me?.Followings.find((v : any) => v.id === post.User.id);
    const onClickButton = useCallback(() => {
        if(isFollowing){
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id
            });
        }else{
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id
            })
        }
    }, [isFollowing]);

    return (
        <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
            {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
    );
};

export default FollowButton;