
let rating = document.createElement('div');
for(let i=1;i<=5;i++){
    let span = document.createElement('span');
    span.classList.add('nstar');
    rating.appendChild(span);
}

function rate(n, items){
    remove(items);
    for(let i=0;i<=n;i++){
        items[i].classList.remove('nstar');
        items[i].classList.add('star');
    }
    return n;
}
function remove(items){
    for(let i=0;i<5;i++){
        if(items[i].classList.contains('star')){
        items[i].classList.remove('star');
        items[i].classList.add('nstar');
    }
    }
}

export {rating, rate, remove};













