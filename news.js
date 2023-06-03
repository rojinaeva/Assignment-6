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
     <div class="col-md-3">
     <img src="${cat.thumbnail_url}" class="img-fluid rounded-start" alt="...">
   </div>
   <div class="col-md-9">
     <div class="card-body">
       <h5 class="card-title">${cat.title}</h5>
       <p class="card-text">${cat.details.slice(0,250)}</p>
       <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
     </div>
   </div>
  </div>
    
    `
    newsContainer.appendChild(newsDiv);
   }
 }



loadNewsCategories();