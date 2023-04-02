import AppLayout from "@/components/AppLayout";
import FollowerList from "@/components/FollowerList";
import FollowList from "@/components/FollowList";
import NicknameEditForm from "@/components/NicknameEditForm";
import Head from "next/head";
import { useSelector } from 'react-redux';
import { stateType } from '@/reducers';
import Router from "next/router";
import { useEffect } from "react";

const Profile = () => {
    
    const { me } = useSelector((state : stateType) => state.user);

    useEffect(() => {
        if(!(me && me.id)){
            Router.push('/');
        }
    },[me && me.id]);

    if(!me){
        return null;
    }

    return (
        <>
            <Head>
                <title>내 프로필 | CashCow</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={me.Followings} />
                <FollowerList header="팔로워" data={me.Followers} />
            </AppLayout>
        </>
    );
};

export default Profile;