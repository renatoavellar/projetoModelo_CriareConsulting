function enableFields(form){
	var atividadeAtual = Number(getValue('WKNumState'));
	
	disableAllFields(form);
	
	//Habilita os campos
	form.setEnabled("CAMPO", 	([0,4].indexOf(atividadeAtual) > -1));
	
	var indexes = form.getChildrenIndexes("TABELA");
	for (var i = 0; i < indexes.length; i++) {
		form.setEnabled("CAMPO_TABELA___" + indexes[i], 	([0,4].indexOf(atividadeAtual) > -1));
	}
}

function disableAllFields(form){
	form.setEnabled("CAMPO", false);
			
	var indexes = form.getChildrenIndexes("TABELA");
	for (var i = 0; i < indexes.length; i++) {
		form.setEnabled("CAMPO_TABELA___" + indexes[i], false);
	}
}

/* Dá conflito com campo switch
function disableAllFields(form){
	var fields = form.getCardData();
	var iterare = fields.keySet().iterator();
	while (iterare.hasNext()){
		var key = iterare.next();
		form.setEnabled(key, false);	
	}
}
*/