function afterProcessCreate(processId){
	log.warn("#### ABERTURA DA SOLICITACAO " + processId);
	
	var campoDescritor = 
		"CAMPO1: " 	+ hAPI.getCardValue("CAMPO1") + "\n"+
		"CAMPO2: "  + hAPI.getCardValue("CAMPO2") + "\n"+
		"CAMPO3: " 	+ hAPI.getCardValue("CAMPO3") ;
	
	hAPI.setCardValue("campoDescritor", campoDescritor); //Campo descritor customizado para o processo
	hAPI.setCardValue("numeroFluxo", processId);
	hAPI.setCardValue("situacao", "EM ABERTO");
}
