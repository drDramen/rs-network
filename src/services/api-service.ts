/* eslint-disable @typescript-eslint/no-unsafe-return */

import { apiBaseUrl } from '../api-constants';
import { TypePost, TypeUser, TypeComment } from '../types/types';

export default class ApiService {
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

  async postResource<T>(url: string, body: { [key: string]: string | number }): Promise<T> {
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

  async getAllPosts() {
    return this.getResource<[TypePost]>('thread-posts/63dce6b73d2c466b038fc8a9');
  }

  async getPost(id: string) {
    return this.getResource<TypePost>(`posts/${id}`);
  }

  async getComment(id: string) {
    return this.getResource<TypeComment>(`comment/${id}`);
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
}
