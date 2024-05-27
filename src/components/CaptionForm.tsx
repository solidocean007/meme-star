// src/features/comments/CaptionForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { addComment } from './commentSlice';

interface Props {
  postId: number;
}

const CaptionForm: React.FC<Props> = ({ postId }) => {
  const [caption, setCaption] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(addComment({ postId, caption }));
    setCaption('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add your caption..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CaptionForm;
