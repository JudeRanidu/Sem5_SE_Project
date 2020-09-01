const reviewGrid = document.querySelector('#review_grid');
const overallStar = document.querySelector('#overall_star');

//function to create the view of one review box
function renderReviews(doc){
    let date = document.createElement('span');
    let name = document.createElement('div');
    let reviewBox = document.createElement('div');
    let starpanel = document.createElement('div');
    let feedback = document.createElement('div'); 
    
    reviewBox.setAttribute('class','review_box');
    date.setAttribute('id','date_span');
    name.setAttribute('id','name_div');
    name.innerHTML = doc.data().name;
    feedback.innerHTML = doc.data().feedback;

    let d = (doc.data().date).toDate();
    let dateString = d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate();
    date.innerHTML = (dateString);

    let n = doc.data().stars;
    for(i=1; i<6; i++){
        if(i<=n){
            let star = document.createElement('span');
            star.setAttribute('class','fa fa-star orange');
            starpanel.append(star);
        }else{
            let star = document.createElement('span');
            star.setAttribute('class','fa fa-star white');
            starpanel.append(star);
        }
    }

    starpanel.appendChild(date);

    reviewBox.appendChild(name);
    reviewBox.appendChild(starpanel);
    reviewBox.appendChild(feedback);

    reviewGrid.appendChild(reviewBox);
}

var n_total = 0; //getting total of stars
var revs = 0; //getting number of reviews

db.collection('reviews').get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
        renderReviews(doc);
        n_total = n_total + doc.data().stars;
        revs = revs + 1;
    })
    let overall_n = Math.round((n_total/revs)); //getting overall star rating
    for(i=1; i<6; i++){
        if(i<=overall_n){
            let star = document.createElement('span');
            star.setAttribute('class','fa fa-star orange'); // display it with appropriate colors
            overallStar.append(star);
        }else{
            let star = document.createElement('span');
            star.setAttribute('class','fa fa-star white');
            overallStar.append(star);
        }
    }
});
