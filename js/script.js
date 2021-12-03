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
  optArticleTagsSelector = '.post-tags .list',
  optArticlesList = '.post .active';

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

function generateTags(){
  const listOfArticle = document.querySelectorAll(optArticleSelector);
  for(let listOfArticles of listOfArticle){
    const tagOfList = listOfArticles.querySelector(optArticleTagsSelector);
    const tags = listOfArticles.getAttribute('data-tags');
    const articleTagsArray = tags.split(' ');
    for(let tag of articleTagsArray){
      tagOfList.innerHTML += `<li><a href="#tag-`+tag+`">`+tag+`</a></li>`;
    }    
  }
}

generateTags();

function tagClickHandler(){
  /* prevent default action for this event */
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tager = href.innerHTML;
  console.log(tager);
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('.post-tags .list a.active');
  console.log(activeLinks);
  /* START LOOP: for each active tag link */
  for(let activeLink of activeLinks){
    /* remove class active */
    activeLink.classList.remove('active');
  } 
  /* END LOOP: for each active tag link */
  const tags = href.replace('#tag-', '');
  /* find all tag links with "href" attribute equal to the "href" constant */
  for(let tag of tags){
  /* START LOOP: for each found tag link */
    tag.classList.add('active');
    /* add class active */

  /* END LOOP: for each found tag link */
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let tagsLinks of tagLinks){
  /* add tagClickHandler as event listener for that link */
    tagClickHandler(tagsLinks);
    
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();