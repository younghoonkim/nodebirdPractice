import React, { useCallback, useMemo } from 'react';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '@/hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '@/reducers/user';
import { stateType } from '@/reducers';

const ButtonWrapper = styled.div`
    margin-Top: 10px;
`;

const FormWrapper = styled(Form)`
    padding: 10px;
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, onChangeEmail] = useInput();
    const [password, onChangePassword] = useInput();

    const { logInLoading } = useSelector((state : stateType) => state.user);
    const onSubmitForm = useCallback((e : any) => {
        console.log(email, password);
        //setIsLoggedIn(true);
        dispatch(loginRequestAction({email, password}));
    }, [email, password]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor='user-email'>이메일</label>
                <br />
                <Input name='user-email' value={email} onChange={onChangeEmail}></Input>
            </div>
            <div>
                <label htmlFor='user-password'>비밀번호</label>
                <br />
                <Input name='user-password' type="password" value={password} onChange={onChangePassword}></Input>
            </div>
            <ButtonWrapper>
                <Button type='primary' htmlType='submit' loading={logInLoading}>로그인</Button>
                <Link href="/signup">회원가입</Link>
            </ButtonWrapper>
        </FormWrapper>
    );
};

export default LoginForm;