
let listaEletros= [];


function  duplicarItemLinha() {
	let item = document.getElementsByClassName("bloco-itens-list") ;
	if (item.length > 0 ){
		let grade = item[0];
		let linha1 = grade.children[0].cloneNode(true);
		let button = linha1.lastElementChild;
		button.style.visibility = "visible";
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
	let calcularButton = document.getElementsByClassName("action-calcular");
	if (addButton.length > 0 ){
		addButton[0].addEventListener("click", duplicarItemLinha);
	}
	if (calcularButton.length > 0 ){
		 calcularButton[0].addEventListener("click", calcularKWh);
	}
}

function calcularKWh(){
	google.charts.load('current', {'packages':['corechart', 'table']});
	google.charts.setOnLoadCallback(drawChart);
	
	listaEletros = []
	let blockLista = document.getElementsByClassName("itens-inputs");
	for (let x =0; x < blockLista.length;x++) {
		let inputLista = blockLista[x].querySelectorAll(".itens-atributes");
		let eletro = new Eletro(inputLista[0].value,inputLista[1].value,inputLista[2].value,inputLista[3].value);
		listaEletros.push(eletro);
	}

}


class Eletro {
		gasto = 0;
	constructor(nome, potencia, quantidade, uso){
		this.nome = String(nome);
		this.potencia = Number(potencia);
		this.quantidade = Number(quantidade);
		this.uso = Number(uso);
		this.calcularGasto();
	}
	calcularGasto() {
		this.gasto = (this.potencia / 1000) * this.quantidade * this.uso;
	}
	getListaDados(){
		this.calcularGasto();
		return [this.nome,this.gasto];
	}
}


function drawChart() {
	let data = new google.visualization.DataTable();
	data.addColumn('string', 'Aparelho');
	data.addColumn('number', 'Uso Total (kWh)');
	for (let v =0;v < listaEletros.length;v++){
		data.addRow(listaEletros[v].getListaDados());
	}

	let pieOptions = {
		title: 'Porcentual de Consumo dos Aparelhos',
		titleTextStyle: { color: 'black',
			fontSize: 15,
			bold: true,},
		is3D: false,
		pieHole: 0.0,
		with: 300,
		height: 300,
		backgroundColor: 'none',
		chartArea:{left:0,top:60,width:'100%',height:'auto',},
		legend: {position: 'bottom', textStyle: {color: 'black', fontSize: 16}, alignment:'center', maxLines:20},
		pieSliceText: 'percentage',
	};

	let tableOptions = {
		showRowNumber: true, 
		width: '100%', 
		height: '100%',
	}

	let pieChart = new google.visualization.PieChart(document.getElementById('piechart'));
	pieChart.draw(data, pieOptions);
	
	let formatter = new google.visualization.NumberFormat(
		{suffix: 'kWh',});
	formatter.format(data, 1); 

	let tableChart = new google.visualization.Table(document.getElementById('tablechart'));
	tableChart.draw(data, tableOptions);
}

setListeners();

