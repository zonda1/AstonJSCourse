
// const URL='https://jsonplaceholder.typicode.com/posts?_limit=10&_page=1';

class Service {
  _URL='https://jsonplaceholder.typicode.com/';

fetchFunc=async(url)=>{
  const res=await fetch(`${this._URL}${url}`)
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }
  return res;
}


getResource=async(recourceName,...args)=>{
  const [_limit,_page]=args;
  let response;
  if (_limit && _page) {
    const url=`${recourceName}?_limit=${_limit}&_page=${_page}`;
    response = await this.fetchFunc(url);
  } else if (_limit && _page==undefined) {
    response = await this.fetchFunc(`${recourceName}?_limit=${_limit}&_page=1`);
  } else {
    response=await this.fetchFunc(`${recourceName}?_limit=10&_page=1`);
  }
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

  displayPagination({total}) {
   
    const pageAmount=Math.floor(+total/10);
    console.log(pageAmount);
    let i=0;
    while (i<pageAmount) {
      const li=document.createElement(`li`);
      li.classList.add('page-item');
      li.innerHTML=`
      <a class="page-link" data-page="page" href="#">${i+1}</a>
      `;
      this.pagination.insertBefore(li,this.pagination.lastElementChild);
      i++;
    }
  }

  clearList() {
    this.pageContent.innerHTML='';
  }

  clearPagination() {
    const pageLinks=[...this.pagination.children];
    pageLinks.forEach(el => {
      if (el.firstElementChild.dataset.page) el.remove();
    });
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
  service.getResource(state.page).then((res) => {
    console.log(res);
    view.displayPagination(res);
    res.data.forEach((item) => {
      view.createItem(state.page, item);
    });
    // view.setViewPagination(state.pageNumber, res.total);
  });
}


// let lastCurrentPage;
menu.addEventListener('click', (e) => {
  if (e.target.tagName !== 'A') return;
  // lastCurrentPage?.classList.remove('current-page');
  // e.target.classList.add('current-page');
  // lastCurrentPage = e.target;
  e.preventDefault();
  let state = {
    page: e.target.getAttribute('href'),
  };
  // history.pushState(state, '', state.page + '?/page-1');
  updateState(state);
});



// service.getResource('posts')
//   .then((result) => {
//       console.log('data', result);
//   });