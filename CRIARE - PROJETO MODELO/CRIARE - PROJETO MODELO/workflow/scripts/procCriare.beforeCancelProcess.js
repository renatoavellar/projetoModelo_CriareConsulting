function beforeCancelProcess(colleagueId, processId) {
    log.warn("#### CANCELAMENTO DA SOLICITACAO " + processId);
    hAPI.setCardValue("dataFinalizacao", obterDataCorrente());
    hAPI.setCardValue("situacao", "CANCELADO");
}