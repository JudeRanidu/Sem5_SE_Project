const roomGrid = document.querySelector('#room_grid');


function renderRoom(doc){
    var photo = document.createElement('img');
    let name = document.createElement('h3');
    let para = document.createElement('p');
    let roomBox = document.createElement('div');
    let detBox = document.createElement('div');

    photo.setAttribute('src',doc.data().path);
    roomBox.setAttribute('class','room_box');
    detBox.setAttribute('class','det_box');
    name.textContent = doc.data().type;
    para.textContent = "Rs. "+doc.data().price+" per night";

    detBox.appendChild(name);
    detBox.appendChild(para);
    roomBox.appendChild(photo);
    roomBox.appendChild(detBox);

    roomGrid.appendChild(roomBox);

}
    db.collection('rooms').get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
            renderRoom(doc);
        })
    });