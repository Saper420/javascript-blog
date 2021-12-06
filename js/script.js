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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(selector = ''){
  const list = document.querySelector(optTitleListSelector);
  const articles = document.querySelectorAll(optArticleSelector + selector);
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

function generateTags(){
  const listOfArticle = document.querySelectorAll(optArticleSelector);
  for(let listOfArticles of listOfArticle){
    const tagOfList = listOfArticles.querySelector(optArticleTagsSelector);
    const tags = listOfArticles.getAttribute('data-tags');
    const articleTagsArray = tags.split(' ');
    for(let tag of articleTagsArray){
      tagOfList.innerHTML += `<li><a href="#tag-${tag}">${tag}</a></li>`;
    }    
  }
}

generateTags();

function tagClickHandler(){
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tager = href.replace('#tag-', '');
  const activeLinks = document.querySelectorAll('.list a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  } 
  const arrayTags = document.querySelectorAll('[href="' + href + '"]');
  for(let arrayTag of arrayTags){
    arrayTag.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tager + '"]');
}

function addClickListenersToTags(){
  const tagLink = document.querySelectorAll('a[href^="#tag-"]');
  for(let tagLinks of tagLink){
    tagLinks.addEventListener('click', tagClickHandler);    
  }
}

addClickListenersToTags();


function generateAuthors(){
  const listOfAuthors = document.querySelectorAll(optArticleSelector);
  for(let listOfAuthor of listOfAuthors){
    const tagOfList = listOfAuthor.querySelector(optArticleTagsSelector);
    const tags = listOfAuthor.getAttribute('data-author');
    tagOfList.innerHTML += `<li><a href="#author-`+tags+`">`+tags+`</a></li>`;   
  }
}

generateAuthors();

function authorClickHandler(){
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tager = href.replace('#author-', '');
  const activeLinks = document.querySelectorAll('.list a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  } 
  const arrayTags = document.querySelectorAll('[href="' + href + '"]');
  for(let arrayTag of arrayTags){
    arrayTag.classList.add('active');
  }
  generateTitleLinks('[data-author="' + tager + '"]');
}

function addClickListenersToauthor(){
  const tagLink = document.querySelectorAll('a[href^="#author-"]');
  for(let tagLinks of tagLink){
    tagLinks.addEventListener('click', authorClickHandler);    
  }
}

addClickListenersToauthor();