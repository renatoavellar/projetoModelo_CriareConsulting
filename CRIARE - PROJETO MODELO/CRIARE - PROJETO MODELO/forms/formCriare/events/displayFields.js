function displayFields(form, customHTML){
	form.setShowDisabledFields(true);

	var MODE = form.getFormMode();
	var CURRENT_STATE = Number(getValue("WKNumState"));
	var currentUser = fluigAPI.getUserService().getCurrent();
	
	customHTML.append("<script> var MODE = '" + form.getFormMode() + "';</script>");
	customHTML.append("<script> var CURRENT_STATE = '" + CURRENT_STATE + "';</script>");
	customHTML.append("<script>function getWKNumState(){ return '" + CURRENT_STATE + "'; }</script>");
	customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "'; }</script>");
	customHTML.append("<script>function getUser(){ return '" + getValue("WKUser") + "'; }</script>");
	customHTML.append("<script>function getCompany(){ return '" + getValue("WKCompany") + "'; }</script>");
	customHTML.append("<script>function getMobile(){ return '" + form.getMobile() + "'; }</script>");

	form.setValue("CURRENT_STATE",CURRENT_STATE);
	form.setValue("currentEmail", currentUser.getEmail());
	form.setValue("currentNome", currentUser.getFullName());
	form.setValue("currentLogin", currentUser.getLogin());
	form.setValue("currentMatricula", currentUser.getCode());

	if(MODE == "ADD"){ //SOLICITANTE
		form.setValue("solicitanteMatricula", currentUser.getCode());
		form.setValue("solicitanteNome", currentUser.getFullName());
		form.setValue("solicitanteEmail", currentUser.getEmail());
		form.setValue("solicitanteDepartamento", currentUser.getValueExtData("UserProjects"));
		form.setValue("dataInicio", obterDataHoraCorrente());
	}
	
	if([0, 4].indexOf(CURRENT_STATE) == -1){
		form.setVisibleById('CAMPO', false);
	}
	
	if([0, 4].indexOf(CURRENT_STATE) > -1){ //EXEMPLO DADOS ASSUMIU ATIVIDADE
		if(MODE == "ADD" || MODE == "MOD"){
			form.setValue("responsavelAtividade", currentUser.getFullName());
			form.setValue("dataAssumiuAtividade", obterDataHoraCorrente());	
		}
	}
}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
}

function obterDataHoraCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	return formatoData.format(dateCorrente);
}