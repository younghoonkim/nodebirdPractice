import Link from 'next/link';
import React from 'react';

const PostCardContent = ({postData} : any) => { //첫 게시물 #해시태그 #익스프레스
    return (
        <div>
            {postData.split(/(#[^\s#]+)/g).map((v : string, i: number) => {
                if(v.match(/(#[^\s#]+)/)){
                    return <Link href={`/hashtag/${v.slice(1)}`} key={i}>{v}</Link>;
                }
                return v;
            })}
        </div>
    );
};

export default PostCardContent;