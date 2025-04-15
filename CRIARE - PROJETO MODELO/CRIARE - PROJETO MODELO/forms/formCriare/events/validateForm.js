function validateForm(form){
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");
	var msgErro = "";
	var indexesTabelaItens = form.getChildrenIndexes('tabelaItens');

	if(atividadeAtual == proximaAtividade) return true;
	
	// Validar a tabela itens
	if (atividadeAtual == 0 || atividadeAtual == 4){
		if (indexesTabelaItens.length < 1){
			msgErro += "<li>Favor adicionar pelo menos <b>1 Item</b>.</li>";
		} else {
			for (var i = 0; i < indexesTabelaItens.length; i++) { 
				var count = i == 0 ? 1 : i + 1;
				if (campoVazio(form, "itemDescricao___" + indexesTabelaItens[i])){
					msgErro += "<li>Informe o  <b>Descrição</b> na linha " + count +"</li>";
				}
				if (campoVazio(form, "itemQtd___" + indexesTabelaItens[i])){
					msgErro += "<li>Informe o  <b>Quantidade</b> na linha " + count +"</li>";
				}
				if (campoVazio(form, "itemValorUnit___" + indexesTabelaItens[i])){
					msgErro += "<li>Informe o  <b>Valor unitário</b> na linha " + count +"</li>";
				}
			}
		}
	}

	if (msgErro != ""){
		msgErro = "<ul>" + msgErro + "</ul>";
		exibirMensagem(form, "Favor preencher os campos <b>obrigatórios</b>:<br/><br/>" + msgErro);
	}
} 

function campoVazio(form, fieldname){
	if ((form.getValue(fieldname) == null) || (form.getValue(fieldname) == undefined) || (form.getValue(fieldname).trim() == "")){
		return true;
	}
	return false;
}

function exibirMensagem(form, mensagem){
	var mobile = form.getMobile() != null && form.getMobile();
	
	if (mobile) {
		throw mensagem;
	} else {
		throw "<div class='alert alert-warning' role='alert'>" + mensagem + "</div>" +
			"<b>Dúvidas?</b> Entre em contato com departamento de TI/Sistemas.\n\n";		
	}
}

function format2Number(valorStr){
	if (valorStr == null || valorStr == undefined || valorStr == ""){
		return 0;
	}
	while (valorStr.indexOf(".") >= 0){
		valorStr = valorStr.replace(".", "");
	}
	if (valorStr.indexOf(",") >= 0){
		valorStr = valorStr.replace(",", ".");
	}
	var valor = Number(valorStr);
	if (isNaN(valor)){
		valor = 0;
	}
	return valor;
}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
}

function formatarMoney2Str(valor){
	var unusualSymbols = new java.text.DecimalFormatSymbols();
	unusualSymbols.setDecimalSeparator(',');
	unusualSymbols.setGroupingSeparator('.');
	var formato = new java.text.DecimalFormat("#,##0.00000", unusualSymbols).format(valor);
	return formato;
}