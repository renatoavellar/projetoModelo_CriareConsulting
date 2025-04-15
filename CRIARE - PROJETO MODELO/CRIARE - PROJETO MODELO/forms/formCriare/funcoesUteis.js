function removeOptionSelect(id, value){
	const select = document.getElementById(id);
	for (let i = 0; i < select.options.length; i++) {
		if (select.options[i].value === value) {
			select.remove(i);
		}
	}
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}

function setReadonlyRequired(input, condicao){
	if (!condicao){
		$("[for='"+input + "']").removeClass('required');
		$("#"+input).attr("readonly", "readonly");
		document.getElementById(input).setAttribute('readOnly','');
		$("#"+input).val("");
	} else {
		$("[for='"+input + "']").addClass('required');
		$("#"+input).removeAttr("readonly", "readonly");
	}
}

function setReadonly(input, condicao){
	if (!condicao){
		$("#"+input).attr("readonly", "readonly");
		$("#"+input).val("");
	} else {
		$("#"+input).removeAttr("readonly", "readonly");
	}
}

function setRequired(input, condicao){
	if (condicao){
		$("[for='"+ input + "']").addClass('required');
	} else {
		$("[for='"+ input + "']").removeClass('required');
	}
}

function setZoomReadonlyRequired(input, condicao){
	if (!condicao){
		$("[for='"+input + "']").removeClass('required');
		$("#"+input).prop('disabled',true);
		$("#"+input).val("");
	} else {
		$("[for='"+input + "']").addClass('required');
		$("#"+input).prop('disabled',false);
	}
}

function setRadioReadonlyRequired(input, condicao){
	if (condicao){
		$("[for='"+input + "']").removeClass('required');
		$('input[name='+input+']').removeAttr("checked");
		$('input[name='+input+']').attr('disabled', true);
	} else {
		$("[for='"+input + "']").addClass('required');
		$('input[name='+input+']').attr('disabled', false);
	}
}
	
function attrReadonlyAll(arrReadonly, readonly, table) {
	var lenArrReadonly = arrReadonly.length;
	
	if (lenArrReadonly > 0){
		for (var i = 0; i < lenArrReadonly; i++) {
			if (table) {
				$(arrReadonly[i]).each(function(i, v) {
					if (readonly){
						$(this).attr("readonly", "readonly");
					} else {
						$(this).removeAttr("readonly", "readonly");
					}
					
				});		  
			} else {
				if (readonly){
					$(arrReadonly[i]).attr("readonly", "readonly");
				} else {
					$(arrReadonly[i]).removeAttr("readonly", "readonly");
				}				
			}
		}
	}	
}

function propDisabledAll(arrDisabled, disabled, table) {
	var lenArrDisabled = arrDisabled.length;
	
	if (lenArrDisabled > 0){
		for (var i = 0; i < lenArrDisabled; i++) {
			if (table) {
				$(arrDisabled[i]).each(function(i, v) {
					$(this).prop("disabled", disabled);
				});
			} else {
				$(arrDisabled[i]).prop("disabled", disabled);
			}
		}
	}
}

function attrDisabledAll(arrDisabled, disabled, table) {
	var lenArrDisabled = arrDisabled.length;
	
	if (lenArrDisabled > 0){
		for (var i = 0; i < lenArrDisabled; i++) {
			if (table) {
				$(arrDisabled[i]).each(function(i, v) {
					$(this).attr('disabled', disabled);
				});
			} else {
				$(arrDisabled[i]).attr('disabled', disabled);
			}
		}
	}
}

function SomenteNumero(e){
	 var tecla=(window.event)?event.keyCode:e.which;
	 if((tecla>47 && tecla<58)) return true;
	 else{
	 if (tecla==8 || tecla==0) return true;
	 else  return false;
	 }
}

function aplicaMask(){
	var inputs = $("[mask]");
	MaskEvent.initMask(inputs);
}

function addChildTable(tableName){
    var row = wdkAddChild(tableName);
    MaskEvent.init(); //Atualiza os campos com 'mask'
}

function hideDivRow(o){
	var p_div = o
	
	for (var i = 0; i < 10; i++) {
		p_div = p_div.parent();
		if (p_div.hasClass('row')){
			p_div.hide();
			break;
		}
	}
}

function showDivRow(o){
	var p_div = o
	
	for (var i = 0; i < 10; i++) {
		p_div = p_div.parent();
		if (p_div.hasClass('row')){
			p_div.show();
			break;
		}
	}
}

function exibirMensagem(titulo, mensagem, tipo){
	// tipos: - danger - warning - success - info
	if ((tipo == null) || (tipo == undefined) || tipo == ""){
		tipo = "info";
	}
	FLUIGC.toast({
		title: titulo,
		message: mensagem,
		type: tipo,
		timeout: 6000
	});
}

function trim(valorStr){
	if ((valorStr == null) || (valorStr == undefined)){
		return "";
	}
	return valorStr.trim();
}

function formatarData(dataInvertida){
	if (dataInvertida == null || dataInvertida == undefined || dataInvertida == ""){
		return null;
	}
	var dataArray = dataInvertida.split('-');
	var partesData = (""+dataArray[2]+"/"+dataArray[1]+"/"+dataArray[0]).split("/");
	return new Date(partesData[2], partesData[1] - 1, partesData[0]);
}

function formatDateISOToUTC(dateISO){
	if (dateISO == null || dateISO == undefined || dateISO == ""){
		return null;
	}
	var dataArray = dateISO.split('-');
	dataArray[2] + "/" + dataArray[1] + "/" + dataArray[0];
	
	return new Date(dataArray);
}

function validaDataInicioFim(pDataInicio, pDataFim) {
	var dataInicio = formatarData(pDataInicio);
	var dataFim = formatarData(pDataFim);
	
	if (dataInicio != null && dataFim != null){
		if(dataFim < dataInicio){
			return false;
		}
	}
	return true;
}

function validaValorMaior(valor, valorRef){
	var valorRefFloat = parseFloat(valorPadraoZero(valorRef).replace(/[$.]+/g,"").replace(",", "."));
	var valorFloat = parseFloat(valorPadraoZero(valor).replace(/[$.]+/g,"").replace(",", "."));
	var retorno = false;
	if (valorFloat > valorRefFloat){
		retorno = true;
	}
	
	return retorno;	
}

function validaValorMenor(valor, valorRef){
	var valorRefFloat = parseFloat(valorPadraoZero(valorRef).replace(/[$.]+/g,"").replace(",", "."));
	var valorFloat = parseFloat(valorPadraoZero(valor).replace(/[$.]+/g,"").replace(",", "."));
	var retorno = false;
	if (valorFloat < valorRefFloat){
		retorno = true;
	}
	
	return retorno;	
}

function converteFloatStr(valor){
	return valor.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").replace(".", "#").replace(/[$,]+/g,".").replace("#", ",");
}

function converteStrFloat(valor){
	return parseFloat(valor.replace(/[$.]+/g,"").replace(",", "."))
}

function checkTrueFalse(value){
	$('input[name='+input+']').prop("checked", checkTrueFalse(chk_option_1_1_1_1_a));
	if( value != null && value != undefined && value != ""){
		return true;
	} else {
		return false;
	}
}

function radioCheckedTrueFalse(input){
	var value = "";
	if ($("input:radio[name^='"+input+"___']").length > 0) {
		var indice = this.name.split('___')[1];
		value = $("#"+input+"Check___"+indice).val();
		$("input:radio[name^='"+input+"___']").each(function(i) {
			if (this.value == value){
				this.checked = true;
			} else {
				this.checked = false;
			}
		});
	} else {
		value = $("#"+input+"Check").val();
		$('input:radio[name='+input+']').each(function(i) {
			if (this.value == value){
				this.checked = true;
			} else {
				this.checked = false;
			}
		});	
	}
}

function campoFormVazio(value){
	if ((value == null) || (value == undefined) || (value.trim() == "")){
		return true;
	}
	return false;
}

function valorPadraoZero(value){
	if ((value == null) || (value == undefined) || (value.trim() == "")){
		return "0,00";
	}
	
	return value;
}

function alteraMaiusculo(el){
	var campo = el.id;
	document.getElementById(campo).value = document.getElementById(campo).value.replace("|", "-").toUpperCase();
}

function compararDatas(data1, data2){
	var date1 = new Date(data1);
	var date2 = new Date(data2);

	if(date1 <= date2) return true;
	if(date1 > date2) return false;
}

function preencheAcompanhamento() {
	data = new Date();
	dt = data.toLocaleDateString() + " " + data.toLocaleTimeString();

	if (document.getElementById('origem').value != "") {
		document.getElementById('destino').innerHTML = '<div class="panel panel-default fs-no-margin">' +
			'<div class="panel-body fs-sm-space media clearfix">' +
			'<a class="pull-left" href="#">' +
			'<div>' +
			'<img src="/social/api/rest/social/image/profile/' + $("#currentLogin").val() + '/SMALL_PICTURE" alt="" class="fluig-style-guide thumb-profile img-rounded thumb-profile-sm thumb-profile-sm-legacy" social="" api="" rest="" image="" profile="" rodrigo="">' +
			'</div>' +
			'</a >' +
			' <div class="media-body">' +
			' <header>' +
			'<h5 class="media-heading">' +
			'<span class="wrap-element-popover">' + $("#currentNome").val() + '</span>' +
			'<span class="timeline-header-no-link"> compartilhou </span >' +
			'<span class="timeline-header-no-link"> uma observação </span >' +
			'<span class="timeline-header-no-link fs-no-bold"> - </span>' +
			'<span class="timeline-header-no-link fs-no-bold">' + dt + '</span>' +
			'</h5 >' +
			' </header >' +
			'<p>' + $("#origem").val() + '</p>' +
			'</div>' +
			'</div>' +
			'<div class="panel-footer">' +
			'</div>' +
			'</div> <br> ' + document.getElementById('destino').innerHTML;
		document.getElementById('origem').value = "";
	}
	document.getElementById('acompanhamento').innerHTML = $("#destino").val();
}

function mValor(v) {
	v = v.replaceAll(",", "");
	v = v.replaceAll(".", "");
	v = v.replace(/(\d)(\d{8})$/, "$1.$2");
	v = v.replace(/(\d)(\d{5})$/, "$1.$2");
	v = v.replace(/(\d)(\d{2})$/, "$1,$2");
	return v;
}

function currencyToNumber(numero) {
	if(numero!=null && numero!=undefined && numero!=''){
		numero = numero.split(',');
		numero[0] = numero[0].split('.').join('');
		return parseFloat(numero.join('.'))
	}else{
		return 0
	}
}

function numberToCurrency(numero) {
    var isNegative = numero < 0;
    numero = Math.abs(parseFloat(numero)).toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    if (isNegative) {
        numero[0] = ' -' + numero[0];
    }
    return numero.join(',');
}

function anexarArquivo(){
	JSInterface.showCamera();
	$(window.top.document).find('#attachmentsStatusTab').trigger('click');  
}

function setZoomData(instance, value){ //Adiciona um valor em um campo zoom
	window[instance].setValue(value);
}

function addZeroes(num, len) { //adiciona zeros em uma string
	var numberWithZeroes = String(num);
	var counter = numberWithZeroes.length;
      
	while(counter < len) {
		numberWithZeroes = "0" + numberWithZeroes;
		counter++;
	}
	return numberWithZeroes;
}

function phoneNumber(v){ //aplicar no campo do form: onblur='mascara(this,phoneNumber)' / onkeyup='mascara(this,phoneNumber)'
	v = v.replace(/\D/g,"");
	
	v=v.replace(/\D/g, '');
	v=v.replace(/(\d{2})(\d)/, "($1) $2");
	v=v.replace(/(\d)(\d{4})$/, "$1-$2");
	
	return v;
}

function cpfCnpj(v){ //aplicar no campo do form: onblur='mascara(this,cpfCnpj)' / onkeyup='mascara(this,cpfCnpj)'
	v = v.replace(/\D/g,"");
	 
    if (v.length < 14) { //CPF
        v=v.replace(/(\d{3})(\d)/,"$1.$2");
        v=v.replace(/(\d{3})(\d)/,"$1.$2");
        v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    } else { //CNPJ
        v=v.replace(/^(\d{2})(\d)/,"$1.$2");
        v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
        v=v.replace(/\.(\d{3})(\d)/,".$1/$2");
        v=v.replace(/(\d{4})(\d)/,"$1-$2");
    }
    
    return v;
}

function mascara(o,f){
    v_obj=o;
    v_fun=f;
    setTimeout('execmascara()',1);
}

function execmascara(){
    v_obj.value=v_fun(v_obj.value);
}

function validateCnpj(cnpj) { 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
}

function startProcess(processId, startRequest) {
	parent.WCMAPI.Create({
        url: parent.WCMAPI.serverURL + '/process-management/api/v2/processes/' + processId + '/start',
        contentType: 'application/json',
        type: 'POST',
        data: startRequest,
        success: function (data, status, jqXHR) {
        	console.log(data.processInstanceId);
        	var linkFluig = parent.WCMAPI.serverURL + "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + data.processInstanceId;
    		const novaAba = window.open(linkFluig, '_blank');
    		novaAba.focus();
        },
        error: function (msg) {
            console.log(msg.status);
            console.log(msg.statusText);
            if (codigo == '400') alert(codigo + '-Parâmetros não estão corretos.')
            if (codigo == '401') alert(codigo + '-Usuário não está autenticado.')
            if (codigo == '403') alert(codigo + '-Usuário não tem permissão para essa ação.')
            if (codigo == '404') alert(codigo + '-Recurso não encontrado.')
            if (codigo == '500') alert(codigo + '-Erro interno do servidor.')
        }
    });
}

/*
 * Função para acessar determinada solicitação em outra aba
 * Parâmetro(v): Numero da solicitação
*/
function acessarSolicitacao(v){
	if(v != "" && v != null && v != undefined){
		var solicitacoes = v.split(',');
		console.log(solicitacoes.length)
		for(var i=0; i < solicitacoes.length; i++){
			console.log(solicitacoes[i]);
			var linkFluig = parent.WCMAPI.serverURL + "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + solicitacoes[i];
			const novaAba = window.open(linkFluig, '_blank');
			novaAba.focus();
		}
	}
}

/*
 * Redimenciona automaticamente os <textarea> de acordo com a quantidade de linhas digitadas 
*/
function configureTextAreas() {
    $('textarea').each(resizeTextArea).on('input change', resizeTextArea).trigger('input');
}