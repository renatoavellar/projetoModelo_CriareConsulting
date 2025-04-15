function afterTaskComplete(colleagueId,nextSequenceId,userList){
	var processId = 		getValue("WKNumProces");
	var atividadeAtual = 	getValue("WKNumState");
	var proximaAtividade = 	getValue("WKNextState");
	
	log.info("#### afterTaskComplete " + processId + " atividadeAtual: " + atividadeAtual + " proximaAtividade: " + proximaAtividade);
	
	if(proximAtividade == "XXX"){
		//INSERE HISTORICO APROVACAO
		addDadosHistorico("DESCRICAO APROVACAO", hAPI.getCardValue("currentNome"), hAPI.getCardValue("CAMPO_APROVACAO"), hAPI.getCardValue("CAMPO_OBS_APROVADOR"));
	
		//DISPARA EMAIL CUSTOMIZADO
		log.info("############DISPARANDO EMAIL CUSTOMIZADO:");
		var emailDestinatario = "renato.avellar@criareconsulting.com";
		var assunto = "EXEMPLO ASSUNTO DO EMAIL";
		var corpoEmail = 
					"Exemplo de corpo de e-mail: Processo nº <b>" + "<a href='" + fluigAPI.getPageService().getServerURL() + 
					"/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + 
					processId + "' target='_blank'>" + processId + "</a>" + 
					"</b> foi finalizado por: <b>" + hAPI.getCardValue("currentNome") + "</b>."
	    
	    dispararEmailCustomizado(emailDestinatario, assunto, corpoEmail);   
	}
}