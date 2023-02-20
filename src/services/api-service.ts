/* eslint-disable @typescript-eslint/no-unsafe-return */

import { apiBaseUrl } from '../api-constants';
import { LoginResponse } from '../components/auth/LoginForm/LoginForm';
import {
  TypePost,
  TypeUser,
  TypeComment,
  TypeUserCreation,
  TypeDialog,
  TypeMessage,
} from '../types/types';

class ApiService {
  _apiBase = apiBaseUrl;

  async getResource<T>(url: string): Promise<T> {
    const result = await fetch(`${this._apiBase}${url}`);
    if (!result.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}` + `, received ${result.status}`);
    }
    return result.json();
  }

  async deleteResource<T>(url: string): Promise<T> {
    const result = await fetch(`${this._apiBase}${url}`, {
      method: 'DELETE',
    });
    if (!result.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}` + `, received ${result.status}`);
    }
    return result.json();
  }

  async postResource<T>(
    url: string,
    body: { [key: string]: string | number | string[] },
  ): Promise<T> {
    const result = await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!result.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}` + `, received ${result.status}`);
    }
    return result.json();
  }

  async getAllPosts(userId: string) {
    return this.getResource<[TypePost]>(`thread-posts/${userId}`);
  }

  async getUserPosts(userId: string) {
    return this.getResource<[TypePost]>(`user-posts/${userId}`);
  }

  async getPost(id: string) {
    return this.getResource<TypePost>(`posts/${id}`);
  }

  async createPost(userId: string, date: number, description: string, imageUrl: string) {
    return this.postResource<TypePost>('posts', {
      userId: userId,
      date: date,
      description: description,
      imageUrl: imageUrl,
      likes: [],
      comments: [],
    });
  }

  async deletePost(id: string) {
    return this.deleteResource<TypePost>(`posts/${id}`);
  }

  async updatePost(post: TypePost): Promise<TypePost> {
    const response = await fetch(`${this._apiBase}posts/${post._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    return response.json();
  }

  async getComment(id: string) {
    return this.getResource<TypeComment>(`comment/${id}`);
  }

  async createUser(body: TypeUserCreation): Promise<TypeUser> {
    const response = await fetch(`${this._apiBase}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 400) {
      const error = await response.text();
      throw new Error(`${error}`);
    }

    return response.json();
  }

  async getAllUsers() {
    return this.getResource<TypeUser[]>('users');
  }

  async getUser(id: string) {
    return this.getResource<TypeUser>(`users/${id}`);
  }

  async updateUser(user: TypeUser): Promise<TypeUser> {
    const response = await fetch(`${this._apiBase}users/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response.json();
  }

  async likes(pospId: string, userId: string) {
    return this.postResource<string[]>(`likes/${pospId}`, { userId: userId });
  }

  async addComment(postId: string, userId: string, date: number, description: string) {
    return this.postResource<TypeComment>('comment', {
      postId: postId,
      userId: userId,
      date: date,
      description: description,
    });
  }

  async deleteComment(id: string) {
    return this.deleteResource<TypeComment>(`comment/${id}`);
  }

  async updateComment(comment: TypeComment): Promise<TypeComment> {
    const response = await fetch(`${this._apiBase}comment/${comment._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    return response.json();
  }

  async uploadImage(formData: FormData): Promise<{ imageUrl: string }> {
    const result = await fetch(`${this._apiBase}image-upload`, {
      method: 'POST',
      body: formData,
    });
    if (!result.ok) {
      throw new Error(
        `Could not fetch ${this._apiBase}image-upload` + `, received ${result.status}`,
      );
    }
    return result.json();
  }

  async getFollowing(id: string) {
    return this.getResource<TypeUser[]>(`following/${id}`);
  }

  async createDialog(senderId: string, receiverId: string) {
    return this.postResource<TypeDialog>('dialogs', { senderId, receiverId });
  }

  async getUserDialogs(userId: string) {
    return this.getResource<TypeDialog[]>(`dialogs/${userId}`);
  }

  async getDialogById(dialogId: string) {
    return this.getResource<TypeDialog>(`dialogs/single/${dialogId}`);
  }

  async createMessage(dialogId: string, sender: string, text: string) {
    return this.postResource<TypeMessage>('messages', { dialogId, sender, text });
  }

  async getMessages(dialogId: string) {
    return this.getResource<TypeMessage[]>(`messages/${dialogId}`);
  }

  async deleteUser(userId: string) {
    return this.deleteResource<{ message: string }>(`users/remove/${userId}`);
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${this._apiBase}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 400) {
      const error = await response.text();
      throw new Error(`${error}`);
    }

    return response.json();
  }

  async checkPermission(token: string) {
    return fetch(`${this._apiBase}permission`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const apiService = new ApiService();
