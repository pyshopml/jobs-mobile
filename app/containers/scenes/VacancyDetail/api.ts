import IPost from "types/post.interface";

function fetchPostFromServer(id: number) {
  const url = `http://jobs.pyshop.ru/api/vacancies/${id}/`;
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch(url, options)
}

function postDateToObject(post){
  post.created_on = new Date(post.created_on);
  post.modified_on = new Date(post.modified_on);
  return post;
}

export async function fetchPost(id: number,
                                done: (post: IPost) => any,
                                error: (msg: string) => any,
                                notFound: () => any){
  try {
    const res = await fetchPostFromServer(id);
    if (res.status == 404){
      notFound();
      return;
    }
    if (!res.ok)
      throw new Error(res.statusText);
    const post: IPost = await res.json().then( (post) => postDateToObject(post) )
    done(post);
  } catch (e) {
    error(e.message);
  }
}