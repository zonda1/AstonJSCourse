
class Service {
  _URL='https://jsonplaceholder.typicode.com/';

  fetchFunc=async(url)=>{
    const res=await fetch(`${this._URL}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res;
  }

  getResource=async(recourceName,_pageNum=1,_limitContent=10)=>{
    const response=await this.fetchFunc(`${recourceName}?_limit=${_limitContent}&_page=${_pageNum}`);
    const headers = new Map(response.headers);
    const data = await response.json();
    return {
      data,
      total: headers.get('x-total-count') || null
    };
  }
}
class View {
  pageContent=document.querySelector('.content');
  pagination=document.querySelector('.pagination');

  createItem(itemName, item) {
    switch (itemName) {
      case 'posts':
        this.createPost(item);
        break;
      case 'comments':
        this.createComment(item);
        break;
      case 'photos':
        this.createPhoto(item);
        break;
      case 'todos':
        this.createTodo(item);
    }
  }

  createPost({id,title,body}) {
    const div=document.createElement(`div`);
    div.classList.add('post');
    div.innerHTML=`
    <h2 Post:>${id}</h2>
    <p class="post__title">Post: ${title}</p>
    <p class="post__post">${body}</p>`;
    this.pageContent.append(div);
  }

  createComment({ id,name, email, body }) {
    const item = document.createElement('div');
    item.classList.add('comment');
    item.innerHTML = `
      <h2>Comment: ${id}</h2>
      <p class="comment__name"><span>Name:</span> ${name}</p>
      <p class="comment__email"><span>Email:</span> ${email}</p>
      <p class="comment__comment"><span>Comment:</span> ${body}</p>`;
    this.pageContent.appendChild(item);
  }

  createPhoto({ id, title, url }) {
    const item = document.createElement('div');
    item.classList.add('photo');
    item.innerHTML = `
        <h2>Photo: ${id}</h2>
        <p class="photo__title"><span>Title:</span> ${title}</p>
        <p class="photo__url"><span>URL:</span> <a>${url}</a></p>
    `;
    this.pageContent.appendChild(item);;
  }

  createTodo({ id, title, completed }) {
    const item = document.createElement('div');
    item.classList.add('todo');
    item.classList.add(`${completed ? 'completed' : 'incomleted'}`);
    item.innerHTML = `
        <h3>Case: ${id}</h3>  
        <p class="todo__title"><span>Title:</span> ${title}</p>
        <p class="todo__info"><span>Completed:</span> ${completed}</p>
    `;
    this.pageContent.appendChild(item);
  }

  displayPagination(page,total) {
    const lastPage=Math.floor(+total/10);
    this.pagination.innerHTML = `
    <a href="${page - 1 ? page - 1 : 1}">Previous</a>
        ${page < 3 ? '' : '<a href="1">1'}
        ${page < 4 ? '' : '</a><span>...</span>'}
        ${page < 2 ? '' : `<a href="${page - 1}">${page - 1}</a>`}
        <a href="${page}" class="current-page">${page}</a>
        ${page > lastPage - 2 ? '' : `<a href="${page + 1}">${page + 1}</a>`}
        ${page > lastPage - 3 ? '' : '<span>...</span>'}
        ${page > lastPage - 1 ? '' : `<a href="${lastPage}">${lastPage}</a>`}
    <a href="${page + 1 < lastPage ? page + 1 : lastPage}">Next</a>
  `;
  }

  clearList() {
    this.pageContent.innerHTML='';
  }

  clearPagination() {
    this.pagination.innerHTML='';
  }
}

const service = new Service();
const view = new View();

const menu=document.querySelector('.menu');

function updateState(state) {
  view.clearList();
  view.clearPagination();
  if (!state) return;
  if (!state.pageNumber) {
    state.pageNumber = 1;
  }
  service.getResource(state.page,state.pageNumber).then((res) => {
    view.displayPagination(state.pageNumber,res.total);
    res.data.forEach((item) => {
      view.createItem(state.page, item);
    });
  });
}

view.pagination.addEventListener('click', (e) => {
  if (e.target.tagName !== 'A') return;
  e.preventDefault();
  let state = {
    page: location.href.match(/comments|posts|photos|todos/gm)[0],
    pageNumber: +e.target.getAttribute('href'),
  };
  history.pushState(state, '', `?/page-${state.pageNumber}`);
  updateState(state);
});

let lastCurrentPage;
menu.addEventListener('click', (e) => {
  if (e.target.tagName !== 'A') return;
  lastCurrentPage?.classList.remove('current-page');
  e.target.classList.add('current-page');
  lastCurrentPage = e.target;
  e.preventDefault();
  let state = {
    page: e.target.getAttribute('href'),
  };
  history.pushState(state, '', state.page + '?/page-1');
  updateState(state);
});

window.addEventListener('popstate', (e) => {
  updateState(e.state);
});