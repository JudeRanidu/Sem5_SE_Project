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
    para.innerHTML = "<span style='color:white; padding-left:5px; padding-right:10px;'>Full-Board</span>Rs."+doc.data().price_f+"/night</br><span style='color:white; padding-left:5px; padding-right:10px;'>Half-Board</span>Rs."+doc.data().price_h+"/night</br><span style='color:white; padding-left:5px; padding-right:10px;'>Breakfast-Only</span>Rs."+doc.data().price_b+"/night";

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