function afterProcessFinish(processId){
	log.warn("#### FINALIZACAO DA SOLICITACAO " + processId);
	
	hAPI.setCardValue("dataFinalizacao", obterDataCorrente());
	hAPI.setCardValue("situacao", "FINALIZADO");
}
