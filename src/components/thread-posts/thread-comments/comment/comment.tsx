/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */

import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TypeUser, TypeComment } from '../../../../types/types';
import dateTransformer from '../../../../services/date-transformer';
import ApiService from '../../../../services/api-service';
import Avatar from '../../../avatar';
import PostCommentText from '../../../post-comment-text';
import './comment.css';
import { useUser } from '../../../../hooks/useUser';

const Comment = ({
  comment,
  setDeletedCommentId,
  setUpdateComment,
}: {
  comment: TypeComment;
  setDeletedCommentId: React.Dispatch<React.SetStateAction<string>>;
  setUpdateComment: React.Dispatch<React.SetStateAction<TypeComment | null>>;
}) => {
  const commentDate = dateTransformer(comment.date);
  const apiService = new ApiService();
  const [user, setUser] = useState<TypeUser | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const USER = useUser().user;

  useEffect(() => {
    apiService.getUser(comment.userId).then((user) => {
      setUser(user);
    });
  }, [comment.userId]);

  const deleteComment = () => {
    apiService
      .deleteComment(comment._id)
      .then((deletedComment) => setDeletedCommentId(deletedComment._id));
  };

  if (user) {
    return (
      <div
        className='comment'
        onMouseEnter={() => {
          setShowOptions(true);
        }}
        onMouseLeave={() => {
          setShowOptions(false);
        }}
      >
        <Col flex={'30px'}>
          <Avatar
            id={user._id}
            image={user.image}
            name={user.name}
          />
        </Col>
        <Row className='comment-body'>
          <Row
            align='middle'
            className='comment-header'
            style={{ height: '24px' }}
          >
            <span className='comment-name'>{user.name}</span>

            <span className='comment-date'>
              {' '}
              {USER._id === comment.userId && showOptions ? (
                <>
                  <Button
                    className='comment-btn'
                    type='link'
                  >
                    <EditOutlined onClick={() => setUpdateComment(comment)} />
                  </Button>
                  <Button
                    className='comment-btn'
                    type='link'
                  >
                    {<DeleteOutlined onClick={deleteComment} />}
                  </Button>
                </>
              ) : null}
              {commentDate}
            </span>
          </Row>
          <PostCommentText
            text={comment.description}
            length={200}
          />
        </Row>
      </div>
    );
  } else {
    return null;
  }
};

export default Comment;
