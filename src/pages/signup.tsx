
import Head from "next/head";

import { Form , Input, Checkbox, Button } from 'antd';
import { useCallback, useState } from 'react';
import AppLayout from "@/components/AppLayout";
import useInput from '@/hooks/useInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from "@/reducers/user";
import { stateType } from "@/reducers";

const Signup = () => {

    const ErrorMessage = styled.div`
        color: red;
    `;

    const dispatch = useDispatch();
    const { signUpLoading } = useSelector((state : stateType) => state.user);

    const [email, onChangeEmail] = useInput();
    const [nickname, onChangeNickname] = useInput();
    const [password, onChangePassword] = useInput();

    const [passwordCheck, setPasswordCheck] = useState();
    const [term, setTerm] = useState();

    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const onChangePasswordCheck = useCallback((e : any) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    },[password])

    const onChangeTerm = useCallback((e : any) => {
        setTerm(e.target.checked);
        setTermError(false);
    },[term])

    const onSubmit = useCallback(() => {
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
        console.log(email, nickname, password);
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {email, password, nickname}
        });
    }, [email, password, passwordCheck, term]);
    return (
        <AppLayout>
            <Head>
                <title>회원가입 | CashCow</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor='user-email'>아이디</label>
                    <br />
                    <Input name='user-email' type="email" value={email} required onChange={onChangeEmail}></Input>
                </div>
                <div>
                    <label htmlFor='user-nick'>닉네임</label>
                    <br />
                    <Input name='user-nick' value={nickname} required onChange={onChangeNickname}></Input>
                </div>
                <div>
                    <label htmlFor='user-password'>비밀번호</label>
                    <br />
                    <Input name='user-password' type="password" value={password} required onChange={onChangePassword}></Input>
                </div>
                <div>
                    <label htmlFor='user-password-check'>비밀번호체크</label>
                    <br />
                    <Input 
                        name='user-password-check' 
                        type="password" 
                        value={passwordCheck} 
                        required 
                        onChange={onChangePasswordCheck}
                     />
                     {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
                    {termError && <ErrorMessage>약관에 동의하셔야합니다. </ErrorMessage>}
                </div>
                <div style={{marginTop: 10}}>
                    <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                </div>
            </Form>
        </AppLayout>
    );
};

export default Signup;