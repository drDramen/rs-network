import { useState, useEffect } from 'react';
import { TypeComment } from '../../types/types';
import { Button } from 'antd';
import ApiService from '../../services/api-service';
import Comment from '../comment';
import './thread-comments.css';

const TreadComments = ({ postComments }: { postComments: string[] }) => {
  const apiService = new ApiService();
  const [comments, setComments] = useState<TypeComment[] | null>(null);
  const [currentCommentId, setCurrentCommentId] = useState<string>(postComments[0]);
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    apiService.getComment(currentCommentId).then((comment) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setComments((comments) => {
        if (postComments.length > 1 && currentCommentId == postComments[0]) {
          setCurrentCommentId(postComments[1]);
        }
        if (postComments[postComments.length - 1] == currentCommentId) {
          setButtonDisable(false);
        }
        if (
          currentCommentId != postComments[0] &&
          currentCommentId != postComments[1] &&
          currentCommentId != postComments[postComments.length - 1]
        ) {
          const currentPos = postComments.indexOf(currentCommentId);
          setCurrentCommentId(postComments[currentPos + 1]);
        }
        return comments != null ? [...comments, comment] : [comment];
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCommentId]);

  const renderComments = (arr: TypeComment[]) => {
    return arr.map(({ _id, userId, date, description }: TypeComment) => {
      return (
        <Comment
          key={_id}
          userId={userId}
          date={date}
          description={description}
        />
      );
    });
  };

  const showAllComments = () => {
    const currentPos = postComments.indexOf(currentCommentId);
    setCurrentCommentId(postComments[currentPos + 1]);
    setButtonDisable(false);
  };

  if (comments) {
    return (
      <div className='comment-wrapper'>
        {renderComments(comments)}
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
