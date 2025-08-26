function createDataset(fields, constraints, sortFields) {
	log.info("###### dsIntegracaoPOST [INICIO]");
	
	var dataset = DatasetBuilder.newDataset();
    
	dataset.addColumn("COD_RETORNO");
	dataset.addColumn("MSG_RETORNO");
	
	var PARAM_1 = 			"";
	var PARAM_2 = 			"";
	
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
        	if (constraints[i].fieldName == "PARAM_1") 		PARAM_1 = constraints[i].initialValue;
        	if (constraints[i].fieldName == "PARAM_2") 		PARAM_2 = constraints[i].initialValue;
        }
	} else {
		dataset.addRow([
        	"500", 
        	"ERRO: Nenhum dado recebido para a integração."
    	]);
	}
	
	//Montando o envelope
	var envelope = {
			"PARAM_1": 	"",
			"PARAM_2": 	""
	}
	
	try {
    	var oService = fluigAPI.getAuthorizeClientService();
    	
    	var data = {
    		companyId: getValue("WKCompany") + "",
    		serviceCode: "SERVICO_CADASTRADO",
    		endpoint: "/enpoint_rest",
    		method: "post",
    		timeoutService: '600',
    		params: envelope
    	};
    	
    	log.info("###### ENT_DOCS#DATA:");
    	log.dir(data);
    	
    	var client = 			oService.invoke(JSONUtil.toJSON(data));
    	var resultado = 		client.getResult();
    	var resultadoJSON = 	JSON.parse(resultado);
    	
    	log.info("###### RESULTADO:");
    	log.dir(resultado);

    	if(resultado.indexOf("MENSAGEM_RETORNO_SUCCESS") != -1){
    		var statusCode = 	resultadoJSON.statusCode;
    		var success = 		resultadoJSON.success;
    		var returnData = 	resultadoJSON.returnData;
    		
    		if (statusCode == 200) {
                dataset.addRow([
                	"" + statusCode, 
                	returnData.message
                ]);
	        } else {
	        	dataset.addRow([
	        		"" + statusCode, 
                	returnData.message
                ]);
	        }
    	} else {
    		dataset.addRow([
    			"500", 
            	"resultadoJSON inesperada da API"
            ]);
    	}
	} catch (e) {
       log.error("### ERRO NA INTEGRAÇÃO COM O PROTHEUS: " + e);
       dataset.addRow([
    	   "500", 
    	   "Erro interno no dataset: " + e
       ]);
	}

	log.info("###### dsIntegracaoPOST [FIM]");
	
    return dataset;
}