'use strict';

function titleClickHandler(event){
  const clickedElement = this;
  console.log('Link was clicked!');

  const activeLinks = document.querySelectorAll('.titles a.active');
  const chceckActiveList = clickedElement.classList.contains('active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  if (chceckActiveList){
    clickedElement.classList.remove('active');
  }else{
    clickedElement.classList.add('active');
  }

  console.log('clickedElement:', clickedElement);

  /* get 'href' attribute from the clicked link */
  const clickedElementHref = clickedElement.getAttribute("href");
  /* find the correct article using the selector (value of 'href' attribute) */
  const articleID = document.querySelector(clickedElementHref);
  /* add class 'active' to the correct article */
  const activePosts = document.querySelectorAll('.post');
  
  const chceckActivePost = articleID.classList.contains('active');
  for(let activePost of activePosts){
    activePost.classList.remove('active');
  }

  if (chceckActivePost){
    articleID.classList.remove('active');
  }else{
    articleID.classList.add('active');
  }
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
  const list = document.querySelector(optTitleListSelector);
  const articles = document.querySelectorAll(optArticleSelector);
  /*let html = '';*/
  list.innerHTML = ''; 

  for(let article of articles){
    const articleID = article.id;
    const title = article.querySelector(optTitleSelector).innerHTML;
    list.innerHTML += '<li><a href="#'+articleID+'"><span>'+title+'</span></a></li>';
    /*const  linkHTML = '<li><a href="#'+articleID+'"><span>'+title+'</span></a></li>';
    html = html + linkHTML;
    list.innerHTML = html;*/
  }
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}