
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
        <button type="button" class="btn btn-primary" data-bs-toggle="button">${category.category_name}</button>

        `
        categoryContainer.appendChild(categoryDiv);
    });
}

loadCategories();