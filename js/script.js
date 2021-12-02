'use strict';

function titleClickHandler(){
  const clickedElement = this;
  console.log('Link was clicked!');

  const activeLinks = document.querySelectorAll('.titles a.active');
  const checkActiveList = clickedElement.classList.contains('active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  if (checkActiveList){
    clickedElement.classList.remove('active');
  }else{
    clickedElement.classList.add('active');
  }

  console.log('clickedElement:', clickedElement);


  const clickedElementHref = clickedElement.getAttribute('href');
  const articleID = document.querySelector(clickedElementHref);
  const activePosts = document.querySelectorAll('.post');
  
  const checkActivePost = articleID.classList.contains('active');
  for(let activePost of activePosts){
    activePost.classList.remove('active');
  }

  if (checkActivePost){
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
  list.innerHTML = ''; 

  for(let article of articles){
    const articleID = article.id;
    const title = article.querySelector(optTitleSelector).innerHTML;
    list.innerHTML += '<li><a href="#'+articleID+'"><span>'+title+'</span></a></li>';
  }
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}