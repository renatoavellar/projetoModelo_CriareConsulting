var currentIdAnexo = null;

function workButtonsAttach(inputId, btnAnexo, btnViewer, btnDownload, btnDelete){
	console.log("RUN workButtonAttach()");
	
	try{
		var escondeBtn = false;
		var escondeBtnAnexo = true;
		
		if ($("#"+inputId).val() == "" || $("#"+inputId).val() == null || $("#"+inputId).val() == undefined){
			escondeBtn = true;
			escondeBtnAnexo = false;
		}
		
		if (escondeBtn) {
			$("."+btnViewer).hide();
			$("."+btnDownload).hide();
			$("."+btnDelete).hide();
		}
		
		if (escondeBtnAnexo) {
			$("."+btnAnexo).hide();
		}
	} catch (e){
		exibirMensagem("Anexo", "Erro ao anexar", "danger");
	}
	
	window.parent.$("#ecm-navigation-inputFile-clone").change(function(e){
		var idInput = this.getAttribute("data-file-name-camera");
		var fileName = e.target.files[0].name;
        
        $.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
			var descricao = attachment.description;
	        if(idInput == descricao){
	        	parent.WKFViewAttachment.removeAttach([i]);
				$("#"+idInput).val("");
	        }
	    });
        
        $("#"+idInput).val(fileName);
        
        if( idInput == inputId){
        	$("."+btnAnexo).hide();
        	$("."+btnDownload).fadeIn("slow"); //Animation complete
        	$("."+btnDelete).fadeIn("slow"); //Animation complete
        } 
    });
}

function showCameraCustom(obj, id) {
	var parameter = id;
    
	if(id) {
		//currentIdAnexo = parameter;
		//console.log("INPUT ANEXO CORRENTE::: " + currentIdAnexo);
		
	    var tabAttachments = parent.document.getElementById("tab-attachments");
	    if (tabAttachments) {
	        var $tabList = $(tabAttachments).parent();
	        if ($tabList.hasClass("active") && !$tabList.hasClass("out")) {
	        	console.log("scroll");
	        } else {
	        	//console.log("tabAttachments.click()");
	            //tabAttachments.click()
	        }
	        
	        if (parent.WCMAPI.isIe9()) {
	            $(".ecm-navigation-silverlight", parent.document).show("fade").css("top", 0);
	            $("#ecm-navigation-silverlight", parent.document).attr({
	                "data-on-camera": "true",
	                "data-file-name-camera": parameter
	            });
	            $(parent.document).on("keyup", this.actionKeyup)
	        } else {
	        	console.log("before openInputFile");
	        	openInputFileCustom("ecm-navigation-inputFile-clone", parameter);
	        }
	    }
	}
}

function downloadAnexo(id) {
	console.log("IDENTIFICADOR DO INPUT::: " + id);
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		var attachmentId = attachment.id;
		var attachmentName = attachment.name;
		console.log("descricao:::::::: " + descricao);
		console.log("attachmentId::::: " + attachmentId);
		console.log("attachmentName::: " + attachmentName);
        if(id == descricao /*&& i == 0*/){
        	parent.WKFViewAttachment.downloadAttach([i]);
        }
    });
}

function viewerAnexo(id) {	
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		var attachmentId = attachment.documentId;
		var attachmentName = attachment.name;
		console.log("descricao:::::::: " + descricao);
		console.log("attachmentId::::: " + attachmentId);
		console.log("attachmentName::: " + attachmentName);
        if(id == descricao /*&& i == 0*/){
        	parent.WKFViewAttachment.openAttachmentView('administrador',attachment.documentId, 1000);
        }
    });
}

function deleteAnexo(obj, id, btnViewer, btnDownload, btnAnexo) {
	console.log("IDENTIFICADOR DO INPUT::: " + id, obj);
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		console.log("descricao:::::::: " + descricao);
        if(id == descricao /*&& i == 0*/){
        	parent.WKFViewAttachment.removeAttach([i]);
			$("#"+id).val("");
			$("."+btnDownload).hide(); //Hide btnDownload
			$("."+btnViewer).hide(); //Hide btnViewer
        	$("."+obj).hide(); //Hide btnDelete
        }
    });
	$("."+btnAnexo).fadeIn("slow"); //Animation complete
}

function getId(idCampo){
	console.log("getId " + idCampo)
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		var attachmentId = attachment.documentId;
		console.log("descricao:::::::: " + descricao);
		console.log("ID:::::::: " + attachmentId);
        if(idCampo == descricao /*&& i == 0*/){
        	$('#'+idCampo+'_id').val(attachmentId);
        	setTimeout(() => {
        		getLink(idCampo); //Captura o link publico do documento
        	}, 100);
        }
    });
}

async function getLink(idCampo){
	console.log("getLink()")
	var getIdDoc = Number($('#'+idCampo+"_id").val());
	console.log(getIdDoc)
	
	let linkPublico = await getDownloadURL(getIdDoc);
	
	//Coloca o resultado no campo
	$('#'+idCampo+"_link").val(linkPublico)
	
	console.log($('#'+idCampo+"_link").val());
}

function openInputFileCustom(elementId, parameter) {
	console.log("openInputFileCustom");
    var element = parent.document.getElementById(elementId);
    
    if (element && document.createEvent) {
        element.setAttribute("data-on-camera", "true");
        if (parameter) {
            element.setAttribute("data-file-name-camera", parameter);
        }
        
        element.click();
    }
}

function existeArquivo(nomeArquivo) {
	console.log(":: existeArquivo: "+nomeArquivo);
	
	var existe = false;
	$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) { 
		console.log("Attachment Description", attachment.description); 
		console.log("Attachment Name", attachment.name);
		console.dir(attachment);
		
		if(attachment.name == nomeArquivo /*|| attachment.physicalFileName == nomeArquivo*/) {
			existe = true;
		} 
	});
	
	return existe;
}

/////////////////////////////////////////TABELA/////////////////////////////////////////
function showCameraCustomTabela(obj, id) {
	var inputIdSplit = obj.id.split("___");
	
	if (inputIdSplit.length > 1) {
	    id = id + "_" + inputIdSplit[1];
	    $("#idAnexo___" + inputIdSplit[1]).val(id); //Campo Controle do Anexo da tabela DOCUMENTOS
	} 
	
	var parameter = id;
	
	if(id) {
		
		//currentIdAnexo = parameter;
		//console.log("INPUT ANEXO CORRENTE::: " + currentIdAnexo);
		
	    var tabAttachments = parent.document.getElementById("tab-attachments");
	    if (tabAttachments) {
	        var $tabList = $(tabAttachments).parent();
	        if ($tabList.hasClass("active") && !$tabList.hasClass("out")) {
	        	console.log("scroll");
	        } else {
	        	//console.log("tabAttachments.click()");
	            //tabAttachments.click()
	        }
	        
	        if (parent.WCMAPI.isIe9()) {
	            $(".ecm-navigation-silverlight", parent.document).show("fade").css("top", 0);
	            $("#ecm-navigation-silverlight", parent.document).attr({
	                "data-on-camera": "true",
	                "data-file-name-camera": parameter
	            });
	            $(parent.document).on("keyup", this.actionKeyup)
	        } else {
	        	//console.log("before openInputFile");
	        	openInputFileCustom("ecm-navigation-inputFile-clone", parameter);
	        }
	    }
	}
}

function downloadAnexoTabela(obj, id, idAnexo) {
	var inputIdSplit = obj.id.split("___");
	var idDoc = $("#"+idAnexo+"___"+inputIdSplit[1]).val();
	
	if (inputIdSplit.length > 1) {
	    id = id + "_" + inputIdSplit[1];
	} 
	
	//console.log("IDENTIFICADOR DO INPUT::: " + id);
		
	var nomeArquivo = $("#"+id).val();
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		var attachmentId = attachment.id;
		var attachmentName = attachment.name;
		//console.log("descricao:::::::: " + descricao);
		//console.log("attachmentId::::: " + attachmentId);
		//console.log("attachmentName::: " + attachmentName);
        if(idDoc == descricao /*&& i == 0*/){
        	parent.WKFViewAttachment.downloadAttach([i]);
        }
    });
}

function removeAnexoTabela(obj, id, idAnexo) {
	var inputIdSplit = obj.id.split("___");
	var idDoc = $("#"+idAnexo+"___"+inputIdSplit[1]).val();
	
	if (inputIdSplit.length > 1) {
	    id = id + "_" + inputIdSplit[1];
	} 
	
	//console.log("IDENTIFICADOR DO INPUT::: " + id);
		
	var nomeArquivo = $("#"+id).val();
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		console.log("descricao:::::::: " + descricao);
        if(idDoc == descricao /*&& i == 0*/){
        	parent.WKFViewAttachment.removeAttach([i]);
        }
    });
}

async function viewerAnexoTabelaBlank(obj, idAnexo) {	
	var inputIdSplit = obj.id.split("___");
	var idDoc = $("#"+idAnexo+"___"+inputIdSplit[1]).val();
	
	var getIdDoc = await getIdDocument(idDoc);
	var linkPublico = await getDownloadURL(getIdDoc);
	//console.log("Link::::::::::::::" + linkPublico)
	
	window.open(linkPublico, '_blank');
}

function viewerAnexoTabela(obj, id, idAnexo) {	
	var inputIdSplit = obj.id.split("___");
	var idDoc = $("#"+idAnexo+"___"+inputIdSplit[1]).val();
	
	if (inputIdSplit.length > 1) {
	    id = id + "_" + inputIdSplit[1];
	} 
	
	//console.log("viewerAnexo::: " + id)
	
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		var attachmentId = attachment.id;
		var attachmentName = attachment.name;
		
	    if(idDoc == descricao){
	    	parent.WKFViewAttachment.openAttachmentView('admin',attachment.documentId, 1000);
	    }
	});
}

function getDownloadURL(documentId) {
	return new Promise(function(resolve, reject) {
		try {
			fetch(`/api/public/2.0/documents/getDownloadURL/${documentId}`, {method: 'GET'})
			.then((response) => {
				if (response.ok) {
				    return response.json();
				}
				throw ('Erro ao obter o link público do arquivo');
			})
			.then((body) => {
				resolve(body.content);
			})
			.catch((err) =>{
				reject({ erro: true, message: err})
			});

		} catch (erro) {
			reject({ erro: true, message: `Houve um erro inesperado na função getDownloadURL`, details: erro })
		}
	})
}

function getIdDocument(documentDescription) {
	return new Promise(function(resolve, reject) {
		try {
			const anexos = parent.ECM.attachmentTable.getData();
			for(let i = 0; i < anexos.length; i++){
				var descricao = anexos[i].description;
				if (documentDescription == descricao) {
					resolve(anexos[i].documentId) 
				}
			}
			resolve(null)
		} catch (erro) {
			reject({ erro: true, message: `Houve um erro inesperado na função getIdDocument`, details: erro })
		}
	})
}