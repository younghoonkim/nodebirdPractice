import React, { useState } from "react";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled from "styled-components";
import { useSelector } from "react-redux";

const {Search} = Input;

const SearchWrapper = styled(Search)`
    vertical-allign: middle;
`;


type AppLayoutProps = {
    children : React.ReactNode
};

const AppLayout = ({ children } : AppLayoutProps) => {
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { me } = useSelector((state : any) => state.user);
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home">
                    <Link href="/">CASHCOW</Link>                    
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link href="/profile">프로필</Link> 
                </Menu.Item>
                <Menu.Item key="searchinput">
                    <Search enterButton></Search>
                </Menu.Item>
                <Menu.Item key="signup">
                    <Link href="/signup">회원가입</Link>                    
                </Menu.Item>
                <Menu.Item key="cashcow">
                    <Link href="/cashcow">Coin</Link>                    
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {/* {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn} /> : <LoginForm setIsLoggedIn = {setIsLoggedIn} />} */}
                    {me && me.id ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    오른쪽메뉴
                </Col>
            </Row>
        </div>
    )
}

export default AppLayout;
