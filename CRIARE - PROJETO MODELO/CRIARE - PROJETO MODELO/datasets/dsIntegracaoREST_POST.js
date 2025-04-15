function createDataset(fields, constraints, sortFields) {
	log.info("###### dsIntegracaoPOST [INICIO]");
	
	var dataset = DatasetBuilder.newDataset();
    
	dataset.addColumn("COD_RETORNO");
	dataset.addColumn("MSG_RETORNO");

	var envelope = null;
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "envelope") {
                envelope = constraints[i].initialValue;
            }
        }
	}

	if (!envelope) {
        dataset.addRow(["500", "ERRO: Nenhum dado recebido para integração"]);
        return dataset;
	}

	try {
    	var oService = fluigAPI.getAuthorizeClientService();
    	
    	var data = {
    		companyId: getValue("WKCompany") + "",
    		serviceCode: "SERVICE_CODE",
    		endpoint: "/ENPOINT",
    		method: "post",
    		timeoutService: '600',
    		params: JSON.parse(envelope)
    	};
    	
    	log.info("###### ENT_DOCS#DATA:");
    	log.dir(data);
    	
    	var client = 	oService.invoke(JSONUtil.toJSON(data));
    	var resultado = client.getResult();
    	var resultadoJSON = 	JSON.parse(resultado);
    	
    	log.info("###### RESULTADO:");
    	log.dir(resultado);

    	if(resultado.indexOf("RETORNO_SERVICO") != -1){
    		var statusCode = resultadoJSON.COD_RETORNO;
    		
    		if (statusCode == 200) {
	            if (resultadoJSON.NumMov) { 
	                dataset.addRow([
	                	resultadoJSON.CodMsg.toString(), 
	                	resultadoJSON.Menssage 
	                ]);
	            } else if (resultadoJSON.errorCode) {
	                dataset.addRow([
	                	resultadoJSON.errorCode.toString(), 
	                	resultadoJSON.errorMessage
	                ]);
	            } else {
	                dataset.addRow([
	                	"500", 
	                	"resultadoJSON inesperada da API" 
	                ]);
	            }
	        }
    	} else {
    		dataset.addRow([
            	resultadoJSON.errorCode.toString(), 
            	resultadoJSON.errorMessage 
            ]);
    	}
	} catch (e) {
       log.error("### ERRO NA INTEGRAÇÃO COM O PROTHEUS: " + e);
       dataset.addRow(["500", "Erro interno no dataset: " + e.message, ""]);
	}

	log.info("###### dsIntegracaoPOST [FIM]");
	
    return dataset;
}