var product = null;


	const queryString = window.location.search;

	const urlParams = new URLSearchParams(queryString);

	const id = urlParams.get('id')

	if(id == null)
		window.location = "products.html";


	var requestOptions = {
	  method: 'GET',
	};

	
	fetch(`https://localhost:44357/v1/products/${id}`, requestOptions)
	  .then(response => response.text())
	  .then(result => {
		  product = JSON.parse(result);
		  if(product.status != null)
			window.location = "products.html";
		
		console.log("teste: ", product);
		$("#prodName").append(product.name);
		$("#pprice").text(product.price);
		$("#pdesc").text(product.description);
		$("#pstock").text("In Stock: " + product.stock);
		$("#stock").val(product.stock);
		
	  })
	  .catch(error => console.log(error))
	  

updateLogin()


	
	function updateLogin()
{
	if(!isUserLogged()){
		$("#login").show();
		$("#logoff").hide();
			$("#stockb").hide();
			$("#stock").hide();			
			$("#buy").hide();			
	}else{
		$("#login").hide();
		$("#logoff").show();
		if(isUserAdmin() == true)
		{
			$("#stockb").show();
			$("#stock").show();
			$("#buy").hide();
		}else{
			$("#stockb").hide();
			$("#stock").hide();		
			$("#buy").hide();
			if(isUserCustomer() == true)
			{
				$("#buy").show();	
			}			
		}
		
	}	
}


$("#stockb").click(()=>{
	
	product.stock = $("#stock").val();
	var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + getToken());
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(product);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://localhost:44357/v1/products/update", requestOptions)
  .then(response => response.text())
  .then(result => {
	console.log(result)  
	  window.location.reload();
  })
  .catch(error => console.log('error', error));
	
});

$("#buy").click(()=>{
	var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + getToken());
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "ProductId": product.id,
  "Quantity": 1
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://localhost:44357/v1/products/purchase", requestOptions)
  .then(response => response.text())
  .then(result => {
	console.log(result)
	alert("You have purchased this item!!");
	window.location.reload();
  })
  .catch(error => console.log('error', error));
	
});

