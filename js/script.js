const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleLinkTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  articleLinkAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#tag-cloud-link').innerHTML),
  tagAuthorLink: Handlebars.compile(document.querySelector('#author-cloud-link').innerHTML)
}

'use strict';

function titleClickHandler(){
  const clickedElement = this;
  console.log(clickedElement);

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
    const linkHTMLData = {id: articleID, title: title};
    list.innerHTML += templates.articleLink(linkHTMLData);
  }
}

generateTitleLinks();

function addClickListenersToArticles(){
  const links = document.querySelectorAll('a[href^="#article-"]');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);    
  }
}

function calculateTagsParams(tags){
  const params = {min: 999999 , max: 0};
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function generateTags(){ 
  let allTags = {};
  const listOfArticle = document.querySelectorAll(optArticleSelector);
  for(let allArticle of listOfArticle){
    const tagOfList = allArticle.querySelector(optArticleTagsSelector);
    const dataTag = allArticle.getAttribute('data-tags');
    const tagsArray = dataTag.split(' ');
    for(let tagArray of tagsArray){
      const linkHTMLDatatag = {id: tagArray, title: tagArray};
      tagOfList.innerHTML += templates.articleLinkTag(linkHTMLDatatag);      
      if(!allTags.hasOwnProperty(tagArray)){
        allTags[tagArray] = 1;
      }else{
        allTags[tagArray]++;
      }
    }
    const tagList = document.querySelector('.sidebar .tags');
    const tagStyle = calculateTagsParams(allTags);
    const allTagsData = {tags: []};
    for(let tag in allTags){
      let color;
      if(allTags[tag] === tagStyle.min){
        color = 1;
      }else if(allTags[tag] === tagStyle.max){
        color = 3;
      }else{
        color = 2;
      }
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        colors: color
      });
    }
    console.log(allTagsData);
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    
  }
}

generateTags();

function tagClickHandler(){
  const clickedElement = this;
  console.log(clickedElement);
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

function generateAuthors(){
  let allTags = {};
  const listOfAuthors = document.querySelectorAll(optArticleSelector);
  const listOfAuthorsSide = document.querySelector('.sidebar .authors');
  for(let listOfAuthor of listOfAuthors){
    const tagOfList = listOfAuthor.querySelector(optArticleTagsSelector);
    const tags = listOfAuthor.getAttribute('data-author');
    const linkHTMLDataAuthor = {id: tags, title: tags};
    const linkHTMLAuthor = templates.articleLinkAuthor(linkHTMLDataAuthor);
    tagOfList.innerHTML += linkHTMLAuthor;
    if(!allTags.hasOwnProperty(tags)){
      allTags[tags] = 1;
    }else{
      allTags[tags]++;
    }
  }
  const allTagsData = {tags: []};
  for(let tag in allTags){
    allTagsData.tags.push({
      tag: tag
    });
  }
  listOfAuthorsSide.innerHTML = templates.tagAuthorLink(allTagsData);
}

generateAuthors();

function authorClickHandler(){
  const clickedElement = this;
  console.log(clickedElement);
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
addClickListenersToTags();
addClickListenersToArticles();