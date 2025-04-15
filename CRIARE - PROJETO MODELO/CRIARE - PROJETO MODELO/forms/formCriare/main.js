window.onload = function(){
	//window.onload
}

$(document).ready(function() {
	console.log(CURRENT_STATE, MODE);
	
	//HEADER
	$("#PanelDadosUser").append(
		Mustache.render($("#tpl-panel-user").html(),{
			numeroFluxo: $('#numeroFluxo').val(), 
			nome: $('#solicitanteNome').val(), 
			email: $('#solicitanteEmail').val(), 
			dataInicio: $("#dataInicio").val() 
		})
	);
			
	//Oculta/exibe elementos no formulário
	if(CURRENT_STATE != 0 && CURRENT_STATE != 4){ //Início
		$('.btnADD_tabelaItens').hide();
		$('.btnDELETE_tabelaItens').hide();
	}
	if(CURRENT_STATE != 0 && CURRENT_STATE != 4){ //Início
		$('.btnAnexo').hide();
		$('.btnDelete').hide();
	}
	
	//Switch
	FLUIGC.switcher.init('#switchBtn');
	radioCheckedTrueFalse("switchBtn");
	$('#switchBtn').on('switchChange.bootstrapSwitch', function (event, state) {
		if (state){
			$("#switchBtnCheck").val("S");
		} else {
			$("#switchBtnCheck").val("N");
		}		
	});
	//$("#switchBtn").bootstrapSwitch('readonly', true);
	
	//Anexos
	workButtonsAttach("anexoDocumento", "btnAnexo", "btnViewer", "btnDownload", "btnDelete");
	
	//Zoom
	validaZoom();
	
	//Calcular total
	$(document).on('blur', '.calcularTotal , .fluigicon-trash', function () {
		calcularTotal();
	});
	
	//ON CHANGE - ON BLUR
	$("#CAMPO").on('change',function(){ //blur
		window["CAMPO_ZOOM"].clear(); //Exemplos limpar campo zoom
		$('#CAMPO_ZOOM option').remove();
		
		$("#CAMPO").val(''); //Exemplo limpar campo comum
		
		reloadZoomFilterValues("CAMPO_ZOOM", "CAMPO," + $('#NOME_CAMPO').val()); //Reload filter values
	});
	
	//Integração Consulta de CEP
	$("#cep").on('change',function(){
		var cep = $("#cep").val().replace(/\D/g,'');
		if(cep != ''){
			var validaCep = /^[0-9]{8}$/;
			if(validaCep.test(cep)){
				//Endereco
				$("#logradouro").val();
				$("#bairro").val();
				$("#nomeCidade").val();
				$("#nomeUF").val();

				//Consulta o Webservice viacep.com.br
				$.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
					if(!("erro" in dados)){
						//Atualiza os campos com os valores da consuta
						$("#logradouro").val(dados.logradouro);
						$("#bairro").val(dados.bairro);
						$("#nomeCidade").val(dados.localidade);
						$("#nomeUF").val(dados.uf);
					}else{
						//CEP pesquisado não foi encontrado						
						FLUIGC.toast({title: 'Atenção: ',message: 'CEP não encontrado.',type: 'warning'});
					}
				});
			}else{
				//CEP é inválido
				FLUIGC.toast({title: 'Atenção: ',message: 'Formato de CEP inválido.',type: 'warning'});
			}
		}
	});
});

function setSelectedZoomItem(selectedItem) {
	if(selectedItem.inputId == 'ZOOM'){
		$("#CAMPO_CHAVE").val(id);
	}
	
	/*EXEMPLO PAI x FILHO*/
	if ( removedItem.inputId.match(/ZOOM___/)) {
		var id = removedItem.inputId.split("___")[1];
		$("#CAMPO_CHAVE___"+id).val(id);
	}
}

function removedZoomItem(removedItem) {		
	if (removedItem.inputId == "ZOOM") {
		$("#CAMPO_CHAVE").val("");
	}
	
	/*EXEMPLO PAI x FILHO*/
	if ( removedItem.inputId.match(/ZOOM___/)) {
		var id = removedItem.inputId.split("___")[1];
		$("#CAMPO_CHAVE___"+id).val("");
	}
}

function validaZoom(){
	$(document).on('select2:opening', function (e) {
		let campo = "";
		var id = e.target.id;		
		$("#alert_template").remove();
		
		if(id == "CAMPOTARGET" && ($("#CAMPO_OBRIGATORIO").val() == null)){
			campo = "NOME CAMPO OBRIGATORIO"
		}
		
		if(id == "campoZoom" && $("#campoSelect").val() == ""){ //Exemplo
			campo = "Select"
		}

		if(campo != ""){
			e.preventDefault();
			$(e.target).parent().append(Mustache.render($(".alerta-zoom").html(), { campo : campo }));
			setTimeout(function() { 
				$("#alert_template").remove();
			}, 3500);
		}
	});
}

function criarSolicitacaoFluig(matriculaSolicitante) {
	var startRequest = {
        "targetState": NUMERO_ATIVIDADE,
        "targetAssignee": matriculaSolicitante,
        "subProcessTargetState": 0,
        "comment": "Iniciado automaticamente através do processo: " + $('#numeroFluxo').val(),
        "formFields": {
        	"startType": 				"auto",
        	"solicitanteMatricula": 	matriculaSolicitante
        }
    };
    startProcess('ID_PROCESSO', startRequest);
}

function calcularTotal() {
	console.log("RUN calcularTotal()");
	setTimeout(function(){ 
		var total = 0;
		$("[tablename='tabelaItens']>tbody>tr:not(:first-child)").each(function (index) {
			var id = $(this).find('[name^="itemDescricao___"],[name^="_itemDescricao___"]').attr("name").split('___')[1];
			var qtd = $('#itemQtd___'+id).val();
			var valorItem = Number($('#itemValorUnit___'+id).val().replaceAll('.', '').replaceAll(',', '.'))
			var valorSomaItem = qtd * valorItem;
			
			total += valorSomaItem
			
			if($('#itemValorUnit___'+id).val() != "") $('#itemValorUnit___'+id).val(mValor(valorItem.toFixed(2)));
			$('#itemValorTotal___'+id).val(mValor(valorSomaItem.toFixed(2)));
		});
		
		$("#valorTotal").val(mValor(total.toFixed(2)));
	}, 100)	
}

function desabilitaCamposPaiFilho(){
	const tabelaRow = $("[tablename='TABELA'] tbody tr");
	tabelaRow.each(function(index, element) {
		if(index > 0){
			tabelaRow.eq(index).find("input[id^='CAMPO_TABELA']").prop("disabled", true);
			tabelaRow.eq(index).find("textarea[id^='CAMPO_TABELA']").prop("disabled", true);
		}
	});
}