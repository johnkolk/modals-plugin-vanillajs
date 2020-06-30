let fruits = [
    {id: 1, title: 'Apples', price: 20, img: 'https://e1.edimdoma.ru/data/recipes/0013/8590/138590-ed4_wide.jpg?1588870366'},
    {id: 2, title: 'Oranges', price: 40, img: 'https://e3.edimdoma.ru/data/recipes/0007/4697/74697-ed4_wide.jpg?1483096339'},
    {id: 3, title: 'Mango', price: 10, img: 'https://e2.edimdoma.ru/data/recipes/0006/7739/67739-ed4_wide.jpg?1468325191'},
];

const toHtml = fruit => `
    <div class="col">
        <div class="card mt-5">
            <img style="height: 300px;" src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Get Price</a>
                <a href="#" class="btn btn-danger" data-btn="delete" data-id="${fruit.id}">Delete</a>
            </div>
        </div>
    </div>
`;


function render() {
    // const html = fruits.map(fruit => toHtml(fruit));
    const html = fruits.map(toHtml).join(''); // тоже самое что и в пред строке, так как передаем один параметр в функц
    document.querySelector('#fruits').innerHTML = html;
}

render();

const priceModal = $.modal({
    title: "Price",
    closable: true,
    // content: `
    //     <h4>Lorem Ipsum is simply dummy text</h4>
    //     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, rerum. Lorem ipsum dolor sit amet.</p>
    // `,
    width: "500px",
    footerButtons: [
        {text: 'Close', type: 'primary', handler(){
            priceModal.close();
        }},
        // {text: 'Cancel', type: 'secondary', handler(){
        //     priceModal.close();
        // }},
    ]
});

document.addEventListener('click', event => {

    event.preventDefault();

    const fruitType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const fruit = fruits.find(f => f.id === id);

    if (fruitType === 'price'){
        priceModal.setContent(`
            <p>Price for ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `);
        priceModal.open();
    } else if (fruitType === 'delete'){
        $.confirm({
            title: 'Are you sure?',
            content: `
                <p>You are delete ${fruit.title}</p>
            `
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id);
            render();
        }).catch(() => {
            console.log('Cancel');
        })
    }
});