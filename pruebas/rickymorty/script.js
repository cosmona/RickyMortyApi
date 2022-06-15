"use strict";

const urlRick = `https://rickandmortyapi.com/api/character/?page=`;
const urlRickPages = "https://rickandmortyapi.com/api/character/";

async function getRickPages(urlApi){
	try {
		let paginas;
		let response = await fetch(urlApi);
		let datos = await response.json();
		return paginas = datos.info.pages;
		
	} catch (error) {
		console.log(error)
	}
}

async function getRick(urlApi,page){
	let response = await fetch(urlApi+page);
	let datos = await response.json();
	return datos.results	
};


let paginas = getRickPages(urlRickPages);
let paginaCargada = 1;

getRick(urlRick,1).then((res) =>{
	console.log(res);
	let titulo = document.querySelector(".flex");

	for (let index = 0; index < res.length; index++) {
		if (index === 1) {
			titulo.innerHTML = `<article class="card" id="card"> 
										 	<div class="card-body">
												<img src="${res[index].image}" alt="Imagen de Inaki" class="card-body-img">
												<h1 class="card-body-title">
												${res[index].name}
												</h1>
												<p class="card-body-text">${res[index].species}</p>
											</div>
	
											<div class="card-footer">
												<div class="card-footer-social">
														<h3>${res[index].origin.name}</h3>
														<p>Origin</p>
												</div>
	
												<div class="card-footer-social">
													<h3>${res[index].status}</h3>
													<p>Status</p>
												</div>
	
												<div class="card-footer-social">
													<h3>${res[index].gender}</h3>
													<p>Gender</p>
												</div>
											</div>
										</article>`	
		} else {			
			titulo.innerHTML += `<article class="card" id="card"> 
									<div class="card-body">
										<img src="${res[index].image}" alt="Imagen de Inaki" class="card-body-img">
										<h1 class="card-body-title">
											${res[index].name}
										</h1>
										<p class="card-body-text">${res[index].species}</p>
									</div>
						
									<div class="card-footer">
										<div class="card-footer-social">
											<h3>${res[index].origin.name}</h3>
											<p>Origin</p>
										</div>
		
										<div class="card-footer-social">
											<h3>${res[index].status}</h3>
											<p>Status</p>
										</div>
								
										<div class="card-footer-social">
											<h3>${res[index].gender}</h3>
											<p>Gender</p>
										</div>
									</div>
								</article>`
	}
	}
	
});	

window.addEventListener('scroll', () => {
	
     if (window.scrollY >= (document.documentElement.scrollHeight - window.innerHeight)-100) {
		paginaCargada++
		getRick(urlRick,paginaCargada).then((res) =>{
			console.log(res);
			let titulo = document.querySelector(".flex");
		
			for (let index = 0; index < res.length; index++) {
			
					titulo.innerHTML += `<article class="card" id="card"> 
											<div class="card-body">
												<img src="${res[index].image}" alt="Imagen de Inaki" class="card-body-img">
												<h1 class="card-body-title">
													${res[index].name}
												</h1>
												<p class="card-body-text">${res[index].species}</p>
											</div>
								
											<div class="card-footer">
												<div class="card-footer-social">
													<h3>${res[index].origin.name}</h3>
													<p>Origin</p>
												</div>
				
												<div class="card-footer-social">
													<h3>${res[index].status}</h3>
													<p>Status</p>
												</div>
										
												<div class="card-footer-social">
													<h3>${res[index].gender}</h3>
													<p>Gender</p>
												</div>
											</div>
										</article>`
			
			}
			
		});	
	}
});




