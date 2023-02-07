export type TypeUser = {
  _id: string;
  name: string;
  email: string;
  image: string;
  age: number;
  location: string;
  followers: string[];
  password: string;
  about: string;
};

export type TypePost = {
  _id: string;
  userId: string;
  date: number;
  description: string;
  imageUrl: string;
  likes: string[];
  comments: string[];
};

export type TypeComment = {
  _id?: string;
  postId?: string;
  userId: string;
  date: number;
  description: string;
};
