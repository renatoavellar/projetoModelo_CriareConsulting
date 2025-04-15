var beforeSendValidate = function(numState, nextState) {
	console.log('beforeSendValidate('+numState+', '+nextState+')');
	
	return validarForm(numState, nextState);
}

function validarForm(numState, nextState){
	var msgErro = "";
	var mudandoAtividade = numState != nextState;
	
	if (!mudandoAtividade){
		return true;
	}
	
	$('.required').each(function (index, sender) {
	    var tagName = $(this)[0].tagName;
	    if (tagName.toLowerCase() == "label") {
	    	var objeto = $(this).attr('for');
	    	var label = $(this).text();
	    	var attAtividades = $(this).attr('atividades');
	    	var atividades = null;
	    	if (attAtividades != undefined){
	    		atividades = attAtividades.split(",");
	    	}
	    	if ((atividades == null) || ((atividades != null) && ((atividades.length == 0) || (atividades.indexOf(numState.toString()) >= 0)))){
	    		var msgSub = subValidacao(objeto, numState, nextState);
	    		if ((msgSub != null) && (msgSub != undefined)){
	    			if (msgSub.trim() != ""){
	    				msgErro += "<li>"+msgSub+"</li>";
	    			} else {
	    				// ajuste para campo de anexo que fica como readonly
	    				var campoAtv = campoAtivo(objeto);
	    				if ((!campoAtv) && (objeto.substring(0, 5) == "anexo")){
	    					campoAtv = true;
	    				}
	    				if (campoAtv){
	    					// ajuste radio
	    					// para atender é necessario criar um campo hidden com o mesmo nome e com "Check" no final
	    					// e preencher com o valor do radio selecionado
	    					if (($("#"+objeto).val() == undefined) && ($("#"+objeto).length == 0) && ($("input[name='"+objeto+"']").length > 0)){
	    						if ($("input[name='"+objeto+"']")[0].type == "radio"){
	    							if ($("#"+objeto+"Check").length > 0){
	    								objeto = objeto+"Check";
	    							}
	    						}
	    					}
	    					
	    					if (($("#"+objeto).val() == null) || (($("#"+objeto).val() != null) && ($("#"+objeto).val() == ""))){
	    						msgErro += "<li>"+label+"</li>";
					    		atribuiEventoOnChange(objeto);
					    	}
	    				}
	    			}
	    		}
	    	}
	    }
	});
	
	if (msgErro != ""){
		msgErro = "<ul>" + msgErro + "</ul>"
		FLUIGC.message.alert({
		    message: 	"<div class='alert alert-warning' role='alert'>" +
		    			"Favor preencher os campos <b>obrigatórios</b>:<br/><br/>" + msgErro + 
		    			"</div>" +
		    			"<br/><b>Dúvidas?</b> Entre em contato com o departamento de TI/Sistemas.",
		    title: 'Validação',
		    label: 'Ok, entendi'
		});
		
		return false;
	}
	
	//Dados adicionais
	preencheAcompanhamento(); 
	
	return true;
}

function atribuiEventoOnChange(objeto){
	$("#"+objeto).on("change", function() {
		var parent = $(this).parent();
		if (parent.hasClass("input-group")){
			parent = parent.parent();
		}

		if ($(this).val() == null || $(this).val() == ""){
			if (!parent.hasClass("has-error")){
				parent.addClass("has-error");	
    		}
		} else {
			if (parent.hasClass("has-error")){
				parent.removeClass("has-error");	
			}
		}
	}).change();
}

function campoAtivo(sender){
	// quando um campo esta desabilitado pelo evento enableFields, o fluig coloca um "_" na frente.
	var objeto = "_"+sender;
	if ($("#"+objeto).length == 0){
		objeto = sender;
	}
	var isDisabled = $("#"+objeto).prop("disabled");
	var isReadOnly = $("#"+objeto).prop("readonly");
	if (isDisabled == null || isDisabled == undefined){
		isDisabled = false;
	}
	if (isReadOnly == null || isReadOnly == undefined){
		isReadOnly = false;
	}
	var semAtributos = isDisabled || isReadOnly; 
	return !semAtributos;
}

function subValidacao(objeto, numState, nextState){
	// se o retorno for null não será validado
	// se retornar "" é validação padrão
	// se retornar alguma mensagem, será exibido ao usuário
	return "";
}