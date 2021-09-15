



function  duplicarItemLinha() {
	let item = document.getElementsByClassName("bloco-itens-list") ;
	if (item.length > 0 ){
		let grade = item[0];
		let linha1 = grade.children[0].cloneNode(true);
		let button = linha1.lastElementChild;
		button.style.display = "block";
		button.addEventListener("click", function () {
			deletarItemLinha(this);
		});
		grade.appendChild(linha1);

	}
	
	
}

function deletarItemLinha(item){
	item.parentElement.remove();
}

function setListeners() {
	let addButton = document.getElementsByClassName("action-add");
	if (addButton.length > 0 ){
		addButton[0].addEventListener("click", duplicarItemLinha);
	}
}


setListeners();