const menuGrid = document.querySelector('#menu_grid');
const menuNav = document.querySelector('#menunav');


function renderMenu(doc){
    let photo = document.createElement('img');
    let para = document.createElement('div');
    let categoryBox = document.createElement('div');
    let link = document.createElement('a');  
    
    categoryBox.setAttribute('class','category_box');
    para.innerHTML = doc.data().category;
    photo.setAttribute('src',doc.data().image);
    link.setAttribute('id',doc.data().category);
    link.setAttribute('onclick',"openSubMenu(this.id)");
    link.setAttribute('href','javascript:void(0)');
    link.appendChild(photo);
    categoryBox.appendChild(link);
    categoryBox.appendChild(para);

    menuGrid.appendChild(categoryBox);
}

db.collection('main-menu').get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
        renderMenu(doc);
    })
});


function renderSubMenu(menuItem){
    var inmenunav = document.createElement('div');
    inmenunav.setAttribute('id','inMenuNav');
    db.collection('main-menu').get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
            if(doc.data().category==menuItem){
                var menuItems = doc.data().menuItems;
                for(i=0;i<menuItems.length;i++){
                    var docID = menuItems[i]["item"].id;
                    var ref = db.collection('items').doc(docID);
                    ref.get().then(function(doc){
                        let foodItem = document.createElement('div');
                        let name = document.createElement('div');
                        let description = document.createElement('div');
                        let persons = document.createElement('div');
                        let price = document.createElement('div');
                        let photo = document.createElement('img');
                        let person_price = document.createElement('div');

                        name.innerHTML = doc.data().name;
                        description.innerHTML = doc.data().description;
                        persons.innerHTML = "Persons: "+doc.data().persons;
                        price.innerHTML = "Price: Rs. "+doc.data().price;
                        photo.setAttribute('src',doc.data().image);
                        foodItem.setAttribute('id','fooditem');
                        name.setAttribute('id','item_name');
                        description.setAttribute('id','item_des');
                        person_price.setAttribute('id','pri_per');
                        price.setAttribute('id','item_pri');
                        persons.setAttribute('id','item_per');
                        
                        person_price.appendChild(persons);
                        person_price.appendChild(price);
                        foodItem.appendChild(name);
                        foodItem.appendChild(photo);
                        
                        foodItem.appendChild(description);
                        foodItem.appendChild(person_price);
                        inmenunav.appendChild(foodItem);
                    })
                }  
            }
        })
    });
    menuNav.appendChild(inmenunav);
}

function openSubMenu(menuItem) {
    renderSubMenu(menuItem);
    document.getElementById("menuoverlay").style.width = "100%";
    document.getElementById("menunav").style.width = "40%";
    document.getElementById("inMenuNav").style.width = "100%"; 
  }
  
function closeSubMenu() {
    document.getElementById("menunav").style.width = "0";
    document.getElementById("menuoverlay").style.width = "0";
    inMenuNav.remove();
  }