import { stateType } from '@/reducers';
import { logoutRequestAction } from '@/reducers/user';
import { Avatar, Button, Card } from 'antd';
import React, {useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
    // const onLogOut = useCallback( () => {
    //     setIsLoggedIn(false);
    // } ,[]);
    const { me, logOutLoading } = useSelector((state : stateType) => state.user)
    const dispatch = useDispatch();
    const onLogOut = () => {
        dispatch(logoutRequestAction());
    }
    return (
        <Card actions={[
            <div key="twit">짹짹 <br />{me.Posts.length}</div>,
            <div key="followings">팔로잉 <br />{me.Followings.length}</div>,
            <div key="followers">팔로워 <br />{me.Followers.length}</div>,
        ]}>
            <Card.Meta 
                avatar= {<Avatar>{me.nickname[0]}</Avatar>}
                title="cashcow" />
            
            <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;