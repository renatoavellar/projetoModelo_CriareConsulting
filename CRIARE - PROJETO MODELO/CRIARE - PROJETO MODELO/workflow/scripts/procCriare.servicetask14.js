function servicetask14() {
	log.info("$$$$$$$$$$ serviceTask14 $$$$$$$$$$");
	
	var envelope = {
			"PARAM_1" : 	hAPI.getCardValue("CAMPO_1"), 
			"PARAM_2" : 	hAPI.getCardValue("CAMPO_2")	
	}
    
    log.dir(envelope);
    
	var constraints = [];
	constraints.push(DatasetFactory.createConstraint("envelope", JSONUtil.toJSON(envelope), "", ConstraintType.MUST));
    var dataset = DatasetFactory.getDataset("dsIntegracaoREST_POST", null, [c1], null);
    
    log.dir(dataset);
    
    if(dataset){
        var codRetorno = dataset.getValue(0,"COD_RETORNO");
        var msgRetorno = dataset.getValue(0,"MSG_RETORNO");
        var response = codRetorno + " - " + msgRetorno
        
        log.info("$$$$$$$$$$ Response: " + response);
        
        if(codRetorno == "200"){
            log.info("$$$$$$$$$$ RETORNO: " + response);
        }else{
            if(response.indexOf("INTERNAL SERVER ERROR") != -1){
                throw "Problemas de Integração, favor acionar a equipe de TI/Sistemas.";
            }else{
                throw response;
            }
        }
    } else {
    	throw "Falha na integração. Entre em contato com a equipe de TI/Sistemas.";
    }
}