
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
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url);
    const data = await res.json()
    displayNews(data.data);
}

// displaying news
const displayNews = data => {

    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent='';

    data.forEach(news => {
        console.log(news);
        const { thumbnail_url, title, details, author, total_view } = news;
        const { img, name, published_date } = author;



        const newsDiv = document.createElement('div')
        newsDiv.classList.add('row')
        newsDiv.innerHTML = `
              <div class="col-md-4 py-4">
                <img src ="${thumbnail_url}">
              </div>
              <div class="col-md-8">
                <h4>${title}</h4>
                <p >${details}  </p>

                <div class="row ">
                <div class="col-md-3">
                <img class="img-fluid w-50 h-50 rounded-circle" src = "${img}">
                <h6 class=""> ${name ? name : "N/A"} </h6
                <h6 class=""> ${published_date} </h6
                </div> 
               </div>

               <div class="col-md-3 mt-5">
                <h6>${total_view ? total_view : "N/A"}   </h6>
               </div>
               <div class="col-md-3 mt-5">
               <button type="button" class="btn btn-primary">Details</button>

               </div>
              </div>
              
              `
        newsContainer.appendChild(newsDiv);

    });
}

loadCategories();