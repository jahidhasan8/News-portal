
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

loadCategories();

// display catagories data 
const displayCategories = categories => {

    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = " ";
    categories.forEach(category => {

        const categoryDiv = document.createElement('div');

        categoryDiv.classList.add('d-inline');

        categoryDiv.innerHTML = `
        <button onclick="loadNews('${category.category_id}','${category.category_name}')" type="button" class="btn btn-primary" data-bs-toggle="button">${category.category_name}</button>

        `

        categoryContainer.appendChild(categoryDiv);
    });
}

// load news part
const loadNews = async (categoryId, categoryName) => {
    // footer part
    const footer = document.getElementById('footer');
    footer.classList.remove('d-none')

    // spinner start
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none');
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url);
    const data = await res.json()

    // news found part 
    const newsItem = parseInt(data.data.length)
    const newsFound = document.getElementById('news-found');
    newsFound.textContent='';
    if (newsItem !== 0) {
        newsFound.innerHTML = `
           ${newsItem} Item found for ${categoryName} 
        `
    }
    else {
        newsFound.innerHTML = `
            ${newsItem} Item found for ${categoryName}
        `
    }


    displayNews(data.data);

}

// displaying news
const displayNews = data => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = " ";

   
    //    stop spinner
    const spinner = document.getElementById('spinner');
    spinner.classList.add('d-none');


    // sorting news by most view 
    const arr = data.sort((a, b) => {
        return b.total_view - a.total_view;

    });


    data.forEach(news => {
        // console.log(news);
        const { thumbnail_url, title, details, author, total_view, image_url, _id } = news;
        const { img, name, published_date } = author;

        const newsDiv = document.createElement('div')

        newsDiv.innerHTML = `
        <div class="card mb-3 w-100 " >
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title fw-semibold">${title}</h5>
        <p class="card-text fs-6">${details}</p>
        <img class="img-fluid px-3 w-25 h-25 rounded-circle mb-3" src = "${img}">
        <h5 class="d-inline p-3"><i class="fa-solid fa-eye"></i> ${total_view ? total_view : "N/A"}  </h5>

        <button onclick="loadDetails('${_id}')" type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#newsDetailsModal">Details</button>

        <h6 class=" px-5"> ${name ? name : "N/A"} </h6
        <h6 class="px-5"> ${published_date} </h6
      </div>
      
        </div>
      </div>
      </div>`

        newsContainer.appendChild(newsDiv);

    });
}


// load news details
const loadDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data[0])
}

// show details on modal 
const displayDetails = news => {
    const { title, details, author, rating, total_view, image_url, _id } = news;
    const { img, name, published_date } = author;
    const { number, badge } = rating;

    const modalTitle = document.getElementById('newsDetailsModalLabel');
    const newsDetails = document.getElementById('news-details');
    newsDetails.textContent = '';

    modalTitle.innerText = title;

    newsDetails.innerHTML = `
      <img class="w-75 h-75" src="${image_url}">
      <p>${details}</p>
      <img class="w-25 h-25 rounded-circle" src="${img ? img : "N/A"}">
      <h5 class="d-inline">${name ? name : "N/A"}</h5>
      <h5 class="d-inline ms-5">${total_view ? total_view : "N/A"}</h5>
      <h6>Rating : ${number ? number : "N/A"}</h6>
      <h6>Badge: ${badge ? badge : "N/A"}</h6>
    
    `

}

