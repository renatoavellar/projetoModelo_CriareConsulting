function createDataset(fields, constraints, sortFields) {
	log.info("##### dsIntegracaoREST_GET [INICIO]");
	
	var dataset = DatasetBuilder.newDataset();	
	dataset.addColumn("CODIGO");
	dataset.addColumn("DESCRICAO");
	
	// Exemplo de parâmetro
	// var PARAMETRO_1 = obterParametro(constraints, "PARAMETRO_1"); 
	// if (!PARAMETRO_1) throw "PARAMETRO_1 não informado.";

	var clientService = fluigAPI.getAuthorizeClientService();
	var data = {
		companyId: getValue("WKCompany") + "",
		serviceCode: "SERVICE_CODE", 
		endpoint: "/ENPOINT",
		method: "get", 
		timeoutService: "600",
		headers: {
			// Exemplo: tenantId: "01,01"
		}
	};
	
	try {
		var vo = clientService.invoke(JSON.stringify(data));
		log.dir("##### VARIAVELVO " + vo);
		var resultado = JSON.parse(vo.getResult());

		if (resultado && resultado.length > 0) {
			for (var i = 0; i < resultado.length; i++) {
				var item = resultado[i];
				dataset.addRow([
					item.codigo || "",
					item.empresa || ""
				]);
			}
		} else {
			log.warn("##### Nenhum dado retornado da API.");
		}
	} catch(e) {
		log.error("##### Erro ao buscar dados da API: " + e);
		throw "DADOS não encontrados.";
	}
	
	return dataset;
}

function obterParametro(constraints, campo) {
	var valor = "";
	if (constraints && constraints.length > 0) {
		for (var i = 0; i < constraints.length; i++) {
			var con = constraints[i];
			if (con.getFieldName().trim().toUpperCase() === campo.trim().toUpperCase()) {
				valor = con.getInitialValue();
				break;
			}
		}
	}
	return valor;
}