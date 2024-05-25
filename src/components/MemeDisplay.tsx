// src/features/posts/MemeDisplay.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface Props {
  postId: number;
}

const MemeDisplay: React.FC<Props> = ({ postId }) => {
  const post = useSelector((state: RootState) => state.posts.find(post => post.id === postId));

  return (
    <div>
      <img src={post?.imageUrl} alt="meme" />
    </div>
  );
};

export default MemeDisplay;
