const loadNewsCategories=()=>{
   fetch('https://openapi.programming-hero.com/api/news/categories')
   .then(res =>res.json())
   .then(data =>displayNewsCategories(data.data.news_category))
   .catch(error =>console.log(error))

}

const displayNewsCategories=(categories)=>{
  console.log(categories);
  const categoriesContainer=document.getElementById('categories-container');
  categories.forEach(category => {
    console.log(category);
  const categoryDiv=document.createElement('div');
  categoryDiv.classList.add('category');
  categoryDiv.innerHTML=`
  <button onclick="loadCertainCategories('${category.category_id}')"  type="button" class="btn btn-light">${category.category_name}</button>`
  categoriesContainer.appendChild(categoryDiv);
    
  }); 
}
 const loadCertainCategories=(id)=>{
   const url=`https://openapi.programming-hero.com/api/news/category/${id}`;
   fetch(url)
   .then(res=>res.json())
   .then(data=>displayCertainCategories(data.data))
   .catch(error=>console.log(error))
 }

 const displayCertainCategories=(cate)=>{
   const newsContainer=document.getElementById('news-container');
   for(const cat of cate){
    console.log(cat);
    const newsDiv=document.createElement('div');
    newsDiv.classList.add('card');
    newsDiv.innerHTML=`
    <div class="row">
     <div class="col-md-3" id="thumbnail-style">
     <img src="${cat.thumbnail_url}" class="img-fluid rounded-start" alt="">
   </div>
   <div class="col-md-9">
     <div class="card-body">
       <h5 class="card-title">${cat.title}</h5>
       <div>
       <p class="card-text ">${cat.details.slice(0,500)}</p>
       </div>
       <div class="row card-foter">
          <div class="col">
            <div class="author-identity">
              <img class="img-fluid rounded-circle" style="width:25%" src="${cat.author.img}">

            <div>
              <span>${cat.author.name?cat.author.name:'no data found'}</span>
              <span>${cat.author.published_date.slice(0,10)}</span>
            </div>
           </div>
          </div>
          <div class="col">
             <div class="author-identity">
               <span><i class="fa-regular fa-eye"></i></span>
               <span>${cat.total_view}</span>
             </div>
          </div>
          <div class="col">
          <div class="class="author-identity">
            <span><i class="fa-solid fa-star-half-stroke"></i></span>
            <span><i class="fa-regular fa-star"></i></span>
            <span><i class="fa-regular fa-star"></i></span>
            <span> <i class="fa-regular fa-star"></i></span>
            <span><i class="fa-regular fa-star"></i></span>
          </div>
          </div>
          <div class="col">
          <div class="author-identity">
              <button onclick="loadNewsDetails('${cat._id
              }')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsModal">Details
              </button> 
         </div>
          </div>
  </div>
       
     </div>
   </div>
  </div>
    
    `
    newsContainer.appendChild(newsDiv);
   }
 }

const loadNewsDetails=(news_id)=>{
const url=`https://openapi.programming-hero.com/api/news/${news_id}`;
fetch(url)
.then(res=>res.json())
.then(data=>displayNewsDetails(data.data[0]))
.catch(error=>console.log(error))
}

const displayNewsDetails=(news)=>{
  console.log(news);
  const newsModalLabel=document.getElementById('newsModalLabel');
  newsModalLabel.innerText=news.title;
  const modalDescription=document.getElementById('modal-description');
  modalDescription.innerHTML=`
  <h6>name of author : ${news.author.name}</h6>
  <span>published of date : ${news.author.published_date} <span>
  <img src="${news.author.img}" class="img-fluid rounded-circle ms-4" style="width:25%">
  <p>description of news details : ${news.details}</p>
  
`
 

}

loadNewsCategories();