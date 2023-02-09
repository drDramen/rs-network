/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { TypeComment } from '../../../types/types';
import { Button } from 'antd';
import ApiService from '../../../services/api-service';
import Comment from './comment';
import './thread-comments.css';

const TreadComments = ({
  commentsId,
  setDeletedCommentId,
}: {
  commentsId: string[];
  setDeletedCommentId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const apiService = new ApiService();
  const [postComments, setPostComments] = useState<TypeComment[] | null>(null);
  const [postCommentsId, setpostCommentsId] = useState<string[]>(commentsId);
  const [currentCommentId, setCurrentCommentId] = useState<string>(postCommentsId[0]);
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

  useLayoutEffect(() => {
    setPostComments(null);
    setCurrentCommentId(postCommentsId[0]);
  }, [postCommentsId]);

  useLayoutEffect(() => {
    setPostComments(null);
    setCurrentCommentId('');
    setpostCommentsId(commentsId);
  }, [commentsId]);

  useEffect(() => {
    if (currentCommentId !== '') {
      apiService.getComment(currentCommentId).then((comment) => {
        setPostComments(() => {
          if (postCommentsId.length > 1 && currentCommentId == postCommentsId[0]) {
            setCurrentCommentId(postCommentsId[1]);
          }
          if (postCommentsId[postCommentsId.length - 1] == currentCommentId) {
            setButtonDisable(false);
          }
          if (
            (currentCommentId != postCommentsId[0] &&
              currentCommentId != postCommentsId[1] &&
              currentCommentId != postCommentsId[postCommentsId.length - 1]) ||
            (!buttonDisable && currentCommentId != postCommentsId[postCommentsId.length - 1])
          ) {
            const currentPos = postCommentsId.indexOf(currentCommentId);
            setCurrentCommentId(postCommentsId[currentPos + 1]);
          }
          return postComments != null ? [...postComments, comment] : [comment];
        });
      });
    }
  }, [currentCommentId]);

  const renderComments = (arr: TypeComment[]) => {
    return arr.map(({ _id, userId, date, description }: TypeComment) => {
      return (
        <Comment
          key={_id}
          _id={_id}
          userId={userId}
          date={date}
          description={description}
          setDeletedCommentId={setDeletedCommentId}
        />
      );
    });
  };

  const showAllComments = () => {
    const currentPos = postCommentsId.indexOf(currentCommentId);
    setCurrentCommentId(postCommentsId[currentPos + 1]);
    setButtonDisable(false);
  };

  if (postComments) {
    return (
      <div className='comment-wrapper'>
        {renderComments(postComments)}
        {buttonDisable ? (
          <Button
            className='show-all-comments-btn'
            onClick={showAllComments}
          >
            All comments
          </Button>
        ) : null}
      </div>
    );
  } else {
    return null;
  }
};

export default TreadComments;
