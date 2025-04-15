function currencyToNumber(numero){
	if(numero != null && numero != undefined && numero != ''){
        return parseFloat(numero.replace(".","").replace(",","."));
	}else{
		return 0
	}
}

function convertFloat(valor){
	return parseFloat(valor.replace(".","").replace(",","."));
}

function numberToCurrency(numero) {
    var numero = parseFloat(numero).toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	return formatoData.format(dateCorrente);
}

function converteDataISO(data){
	data = String(data);
	
	if(data == "" || data == null || data == undefined){
		return ""
	} else {
	    var dia = "" + data.substring(8,10);
	    var mes = "" + data.substring(5,7);
	    var ano = "" + data.substring(0,4);
	    var dataFormat =  dia + '/' + mes + '/' +  ano;
	    
	    return String(dataFormat)
	}
}

function converteDataISO(data){
	data = String(data);
	
	if(data == "" || data == null || data == undefined){
		return ""
	} else {
	    var dia = "" + data.substring(8,10);
	    var mes = "" + data.substring(5,7);
	    var ano = "" + data.substring(0,4);
	    var dataFormat =  dia + '/' + mes + '/' +  ano;
	    
	    return String(dataFormat)
	}
}

function exibirMensagem(mensagem){
	throw 	"<b>veja o motivo abaixo:</b><br><br><hr>" +
			"●&nbsp;&nbsp;" + mensagem + "<br><hr><br>" +
			"<b>Dúvidas?</b> Entre em contato com departamento de TI/Sistemas.<br><br>";		
}

function addDadosHistorico(area, usuario, status, detalhe){ //Função para criar um historico de aprovações quando houver aprovação multinível
	var tabelaHist = new java.util.HashMap();
	tabelaHist.put("histData", obterDataCorrente());
	tabelaHist.put("histArea", area);
	tabelaHist.put("histUsuario", usuario);
	tabelaHist.put("histStatus", status);
	tabelaHist.put("histDetalhe", detalhe);
	
	hAPI.addCardChild("tabelaHistorico", tabelaHist);
}

function dispararEmailCustomizado(emailDestinatario, assunto, corpoEmail){
    try{
        var parametros = 		new java.util.HashMap();
        var destinatarios = 	new java.util.ArrayList();
        
        parametros.put("subject", assunto);
        parametros.put("corpoEmail", corpoEmail);
        destinatarios.add(emailDestinatario);
        
        log.info("#### enviarEmail >> parametros " + parametros + "destinatarios " + destinatarios);
        
        notifier.notify('admin', "template_email_BLANK", parametros, destinatarios, "text/html");
    }catch(e){
    	log.info("#### ERRO NO EMAIL CUSTOMIZADO");
    	log.error(e);
        throw(e)
    }
}
