async function listProducts()
{
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "text/plain");

	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};

	var products = await fetch("https://localhost:44357/v1/products", requestOptions)
	  .then(response => response.json())
	  .then(result => {
			$("#prods").empty();
			for(var i = 0;i<result.length; i++)
			{
				var prod = result[i];
				var el = $(`<div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 pr">
                  <div class="glasses_box product" id="${prod.id}">
                     <figure><img src="images/NoImage.png" alt="#"/></figure>
                     <h3><span class="blu">$</span>${prod.price}</h3>
                     <p>${prod.name}</p>
                  </div>
               </div>`)
				$(el).on('click', event=>{
					const clickedElement = $(event.target);
					window.location = "product.html?id=" + $(clickedElement).attr('id');
				});
				$("#prods").append(el)
			}		  
	  })
	  .catch(error => console.log('error', error));
  
  
	return products;
  
}


	


function updateLogin()
{
	
	if(!isUserLogged()){
		$("#login").show();
		$("#logoff").hide();
		$("#newProduct").hide();
		
	}else{
		$("#login").hide();
		$("#logoff").show();
		if(isUserAdmin() == true){
			$("#newProduct").show();				
		}
		else{
			$("#newProduct").hide();	
		}
	
	}	

	
}


	updateLogin();
	listProducts();
	isUserAdmin();