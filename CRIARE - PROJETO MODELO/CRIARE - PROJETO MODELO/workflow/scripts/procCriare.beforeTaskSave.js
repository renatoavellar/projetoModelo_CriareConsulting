function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var processId = 		getValue("WKNumProces");
	var atividadeAtual = 	getValue("WKNumState");
	var proximaAtividade = 	nextSequenceId;
	var mudandoAtividade = 	atividadeAtual != proximaAtividade;
	
	log.info("#### beforeTaskSave " + processId + " Atividade: " + atividadeAtual + " proximaAtividade: " + proximaAtividade + " mudandoAtividade: " + mudandoAtividade);
    
    //Exemplo Anexo obrigatório na atividade
    if(mudandoAtividade && proximaAtividade == "XXX"){
    	var qtdAnexos = hAPI.listAttachments();
		if(qtdAnexos.size() == 0){
			exibirMensagem("Favor, inserir pelo menos <b>1 anexo</b> para prosseguir.");
		}
    }
}