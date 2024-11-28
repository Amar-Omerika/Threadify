export interface Author {
  firstName: string;
  lastName: string;
}

export interface Like {
  id: number;
  createdAt: string;
  userId: number;
  topicId: number;
  commentId: number | null;
}

export interface Count {
  comments: number;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  author: Author;
  likes: Like[];
  _count: Count;
  isLikedByUser: boolean;
  numberOfComments: number;
  authorName: string;
}
