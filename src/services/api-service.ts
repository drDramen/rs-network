import { TypePost, TypeUser, TypeComment } from '../types/types';

export default class ApiService {
  _apiBase = 'http://localhost:8080/';

  async getResource<T>(url: string): Promise<T> {
    const result = await fetch(`${this._apiBase}${url}`);
    if (!result.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}` + `, received ${result.status}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.json();
  }

  async postResource<T>(url: string, body: { [key: string]: string }): Promise<T> {
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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

  async likes(pospId: string, userId1: string) {
    return this.postResource<string[]>(`likes/${pospId}`, { userId: userId1 });
  }

  // _getAllPostsID = (allPosts: [TypePost]) => {
  //   return allPosts.map((post) => {
  //     return post._id;
  //   });
  // };
}
