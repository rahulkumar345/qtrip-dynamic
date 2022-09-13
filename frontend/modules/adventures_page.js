import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
console.log(search)
let params = new URLSearchParams(search);
console.log(params.get('city'))
return params.get('city')
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let data=await fetch(config.backendEndpoint+`/adventures?city=${city}`)
  let result=await data.json()
  console.log(result)
return result
}catch(err){
  return null;
}
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(adventures)
adventures.forEach((key) => {
  generatecard(key.id, key.category, key.name,key.costPerHead,key.duration, key.image);
});
function generatecard(id,category,name,costPerHead,duration,image){
  let conatiner=document.createElement("div")
conatiner.className=" col-6 col-xl-3 mb-3"
let atag=document.createElement("a")
atag.setAttribute("id",id)
atag.href=`detail/?adventure=${id}`

let activityCard=document.createElement("div")
activityCard.className="card activity-card "
activityCard.innerHTML=`<img src="${image}">`
let banner=document.createElement("div")
banner.className="category-banner"
banner.innerHTML=`${category}`
let content=document.createElement("div")
content.className="card-body";
let content1=document.createElement("div")
content1.className=" text-center d-md-flex  justify-content-between ";
content1.innerHTML=`<h5>${name}</h5>
<p>₹${costPerHead}</p>`

let content2=document.createElement("div")
content2.className=" text-center d-md-flex  justify-content-between ";
content2.innerHTML=`<h5>duration</h5>
<p>$${duration} hours</p>`

content.append(content1)
content.append(content2)
activityCard.append(content)
activityCard.append(banner)
atag.append(activityCard)
conatiner.append(atag)

document.getElementById("data").appendChild(conatiner)

}

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList=list.filter(function(e){
    return (e.duration>low && e.duration<=high);
  })
  console.log(filteredList)
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
    
    let filterlist=[];
  list.filter(function (e) {
   
    if(categoryList.includes(e.category))
    filterlist.push(e);
           
      });
      
      return filterlist;
    
  
    };
    
 
    
 


// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  
  let filteredlist =[]
  let arr=filters["duration"].split("-")

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
if(filters["category"].length>0&&filters["duration"].length>0){

 filteredlist=filterByCategory(list,filters.category)
 filteredlist=filterByDuration(filteredlist,parseInt(arr[0]),parseInt(arr[1]))
}else if(filters["category"].length>0){
  filteredlist=filterByCategory(list,filters.category);
}else if(filters["duration"].length>0){
 filteredlist=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
}else{
  return list
}
  // Place holder for functionality to work in the Stubs
 return filteredlist;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
 return true
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
 
  // Place holder for functionality to work in the Stubs
 return JSON.parse(localStorage.getItem('filters'));

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value=filters.duration;
  if(filters.category.length>0)
  {  
   for(let i=0;i<filters.category.length;i++){
    var li=document.createElement("div");
    li.innerText=filters["category"][i];
    li.setAttribute("class","category-filter");
    
   
    document.getElementById("category-list").append(li);
   }}
   
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
