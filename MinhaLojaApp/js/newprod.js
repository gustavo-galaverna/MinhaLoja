if(!isUserAdmin())
{
	window.location = "products.html";
}

$( "#formprod" ).submit(function( event ) {
  event.preventDefault();
  
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + getToken());
myHeaders.append("Content-Type", "application/json");

const product = {Name: $("#name").val(),Description: $("#description").val(), ImageName: "NoImage.png", Price: $("#price").val(),Stock:$("#stock").val()};

var raw = JSON.stringify(product);
console.log(raw);
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://localhost:44357/v1/products", requestOptions)
  .then(response => response.text())
  .then(result => {
	  console.log(result)
	  var prod = JSON.parse(result);
		  if(prod.status == null){
			  window.location = "product.html?id=" + prod.id;
		  }
  })
  .catch(error => $("#errorMsg").text(error));  
  
});