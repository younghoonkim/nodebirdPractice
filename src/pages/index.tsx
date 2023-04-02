import AppLayout from "@/components/AppLayout";
import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import { LOAD_POSTS_REQUEST } from "@/reducers/post";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state : any) => state.user);
  const { mainPosts, hasMorePost, loadPostsLoading } = useSelector((state : any) => state.post);

  useEffect(() => {
    console.log('처음 로드');
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  },[]);

  useEffect(() => {
    function onScroll(){
      console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
      if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 300){
        if(hasMorePost && !loadPostsLoading){
          console.log('두번째로드');
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  },[hasMorePost,loadPostsLoading])
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post : any) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
}

export default Home;