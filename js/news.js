
// load categories data 

const loadCategories = async () => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    } catch (error) {
        console.error(error);
    }

}

// display catagories data 
const displayCategories = categories => {
    // console.log(categories);
    categories.forEach(category => {
        const categoryContainer = document.getElementById('category-container');

        const categoryDiv = document.createElement('div');

        categoryDiv.classList.add('d-inline');

        categoryDiv.innerHTML = `
        <button onclick="loadNews('${category.category_id}')" type="button" class="btn btn-primary" data-bs-toggle="button">${category.category_name}</button>

        `
        categoryContainer.appendChild(categoryDiv);
    });
}

// load news part
const loadNews = async (categoryId) => {
    const footer = document.getElementById('footer');
    footer.classList.remove('d-none')
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url);
    const data = await res.json()
    displayNews(data.data);
    // return data.data;


}

// displaying news
const displayNews = data => {

    // const data = await loadNews();
    // console.log(data);
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';

    data.forEach(news => {
        // console.log(news);
        const { thumbnail_url, title, details, author, rating, total_view, image_url, _id } = news;
        const { img, name, published_date } = author;
        const { number, badge } = rating;


        const newsDiv = document.createElement('div')
        newsDiv.classList.add('row')
        newsDiv.innerHTML = `
              <div class="col-md-4 py-4">
                <img src ="${thumbnail_url}">
              </div>
              <div class="col-md-8 ">
                <h4>${title}</h4>
                <p >${details}  </p>

                <div class="row ">
                <div class="col-md-4 ">
                <img class="img-fluid w-50 h-50 rounded-circle" src = "${img}">
                <h6 class=""> ${name ? name : "N/A"} </h6
                <h6 class=""> ${published_date} </h6
                </div> 
               </div>

               <div class="col-md-4 mt-5">
                <h6>${total_view ? total_view : "N/A"}   </h6>
               </div>
               <div class="col-md-4 col-sm-12 mt-5">
        
               <button onclick="loadDetails('${_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">Details</button>

               </div>
              </div>
              
              `
        newsContainer.appendChild(newsDiv);

    });
}



// load news details
const loadDetails = async id =>{
    const url=`https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data[0])
}

// show details on modal 
const displayDetails = news =>{
    const { title, details, author, rating, total_view, image_url, _id } = news;
    const { img, name, published_date } = author;
    const { number, badge } = rating;

    const modalTitle = document.getElementById('newsDetailsModalLabel');
    const newsDetails = document.getElementById('news-details');
    newsDetails.textContent='';

    modalTitle.innerText =title;

    newsDetails.innerHTML=`
      <img class="w-75 h-75" src="${image_url}">
      <p>${details}</p>
      <img class="w-25 h-25 rounded-circle" src="${img ? img : "N/A"}">
      <h5 class="d-inline">${name ? name : "N/A"}</h5>
      <h5 class="d-inline ms-5">${total_view ? total_view : "N/A"}</h5>
      <h5>Rating : ${number ? number : "N/A"}</h5>
      <h5>Badge: ${badge ? badge : "N/A"}</h5>
    
    `

}


loadCategories();