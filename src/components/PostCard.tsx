import { stateType } from '@/reducers';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Popover, List } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import { number } from 'prop-types';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostImages from './PostImages';
import { useState } from 'react';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';


const PostCard = ({ post } : stateType) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state : stateType) => state.user);
    const { removePostLoading } = useSelector((state: stateType) => state.post);

    const id = me?.id; // me && me.id

    const [liked, setLiked] = useState(false);
    const [commentFormOpend, setCommentFormOpend] = useState(false);
    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);
    const onToggleComment = useCallback(() => {
        setCommentFormOpend((prev) => !prev);
    }, []);

    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id
        })
    }, []);


    return (
        <div style={{ marginBottom: 20 }}>
            <Card
                cover = {post.Images[0] && <PostImages images={post.Images} /> }
                actions = {[
                    <RetweetOutlined key="retweet" />,
                    liked 
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                        : <HeartOutlined key="heart" onClick= {onToggleLike} />,

                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id ? (
                                <>
                                    <Button>수정</Button>
                                    <Button onClick={onRemovePost} loading={removePostLoading}>삭제</Button>
                                </>
                            ) : <Button>신고</Button>
                            }                            
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>,
                ]}
                extra={id && <FollowButton post={post} />}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />
            </Card>
            {commentFormOpend && (
                <div>
                    <CommentForm post={post} />
                    <List
                        style={{marginTop: 40}}
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item : any) => (
                            <List.Item>
                                <List.Item.Meta 
                                    description= {item.User.nickname}
                                    avatar= {<Avatar>{item.User.nickname[0]}</Avatar>}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default PostCard;