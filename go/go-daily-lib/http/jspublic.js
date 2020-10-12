/*****************************************************************
    jspublic.js
    2007-10-06
    封装了项目中所用到的js公共方法
    修改日志：
    	2008-04-07：解决验证类型中的死循环bug
    	2008-04-08：增加email的验证方法
    	
*****************************************************************/

/**
检测字符的长度
obj 指针参数
msg 弹出错误标题
len [文本域的长度]可选项

返回值: true 或者 false
**/

/**
	 * 放大缩小弹窗，刷新页面
	 */
setTimeout(function(){
	$(function(){
		//console.info(111);
		$("#Form1").bind('submit',function(){
			//console.info(222);
			var t=$("#Form1").serializeArray();
			$(t).each(function(){
				if(this.value.indexOf("'")>=0){
					console.info(this.name);
					$("#"+this.name).val(this.value.replaceAll("'","&s379"));
				}
			});
			return true;
		});
	});	
}, 100);

function checkStringLen(obj,msg,len){

	var str=obj.value;
    var len2=0;
    for (var i=0; i<str.length; i++) {   
        if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {   
            len2 += 2;   
        } else {   
            len2 ++;   
        }   
        }
   if(len2>len)
   {
    alert(msg+"长度过长，请重新输入");
    obj.focus();
    
   return false;
   
   }
   else
   {
   return true;
   }
}

/*
 new身份证验证
 zjh 需要验证的身份证号码
 to by zhangbo
*/ 
function sfzYz(zjh){   
	validId(zjh); 
} 
var powers=new Array("7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2");      
var parityBit=new Array("1","0","X","9","8","7","6","5","4","3","2");      
         
//校验身份证号码的主调用      
function validId(obj){      
	var _id=obj.value;      
    if(_id==""){
    	return;
    }
    
    var _valid=false;      
    if(_id.length==15){      
        _valid=validId15(_id);      
    }else if(_id.length==18){   
        _valid=validId18(_id);      
    }
    
    if(!_valid){      
        alert("身份证号码有误,请检查!"); 
        obj.value = "";
        obj.focus();   
        return;      
    }        
}       
   
//校验18位的身份证号码      
function validId18(_id){      
    _id=_id+"";      
    var _num=_id.substr(0,17);      
    var _parityBit=_id.substr(17);      
    var _power=0;      
    for(var i=0;i<17;i++){      
        //校验每一位的合法性      
        if(_num.charAt(i)<'0'||_num.charAt(i)>'9'){      
            return false;      
            break;      
        }else{      
            //加权      
            _power+=parseInt(_num.charAt(i))*parseInt(powers[i]);       
        }      
    }      
    //取模      
    var mod=parseInt(_power)%11;      
    if(parityBit[mod]==_parityBit){      
        return true;      
    }      
    return false;      
}     
 
//校验15位的身份证号码       
function validId15(_id){      
    _id=_id+"";      
    for(var i=0;i<_id.length;i++){      
        //校验每一位的合法性      
        if(_id.charAt(i)<'0'||_id.charAt(i)>'9'){      
            return false;      
            break;      
        }      
    }      
    var year=_id.substr(6,2);      
    var month=_id.substr(8,2);      
    var day=_id.substr(10,2);      
    var sexBit=_id.substr(14);      
    //校验年份位      
 
    if(year<'01'||year >'90')return false;      
    //校验月份      
 
    if(month<'01'||month >'12')return false;      
    //校验日      
 
    if(day<'01'||day >'31')return false;      
      
    return true;      
} 

/** ***********对页面提交和button提交，控制字符中含有单引号*****************/

var inputtext;
var numcs ;
function wantToDoSth() {  
     if (window.document.body) {
     	if(numcs != null || numcs!='undefined'){
     		clearTimeout(numcs); 
     	}
     	inputtext = new Array();
         var evl= document.getElementsByTagName('input');
          for(var i=0;i<evl.length;i++)
          {
            if(evl[i].type=='submit'||evl[i].type=='button')
           {
				evl[i].attachEvent('onclick',  cc);
			}
			else if(evl[i].type=='text')
			inputtext.push(evl[i]);
		}
		 
		 var evl2= document.getElementsByTagName('textarea');
		      for(i=0;i<evl2.length;i++)
		      {
		         inputtext.push(evl2[i]);
		      }

     } else if(numcs == null || numcs=='undefined' || numcs==''){
        numcs=  setTimeout(wantToDoSth, 1000);
     }  
 }  
    
 //wantToDoSth(); 更新为服务端防注入 
function cc()
{
  //alert(inputtext);
  	for(i=0;i<inputtext.length;i++)
	{
  	//alert(inputtext[i].value);
 	 	var inputvalue = inputtext[i] ;
 		if(inputvalue.value.indexOf("'")>-1){
 		var array = new Array();
 		array = inputvalue.value.split("'");
 		var return_input = "";
 		//alert(array.length);
 		for(j=0;j<array.length;j++){
 			if(j < array.length -1 )
 			return_input += array[j]+"''";
 				else
 			return_input += array[j];
 		}
 		inputtext[i].value = return_input;
 		}
	}
}

/**********************************/
// 检查日期先后顺序,增加BY ZhangBo
// 判断年份格式01 yyyy
// 参数:ksnd(开始年度),jsnd(结束年度),ksndMes(开始年度),jsndMess(结束年度)
function dateKsndVs(ksnd,jsnd,ksndMes,jsndMess){ 
   var ksxn = ksnd.value;
   var jsxn = jsnd.value;
   var ksmes = ksndMes;
   var jsmes = jsndMess; 
   if(ksxn > jsxn ){ 
    alert("系统提示："+jsndMess+"不能小于"+ksmes+",请重新输入！");
    jsnd.value ='';
    return false;
   } 
}
// 判断年份格式02 yyyyMMdd
// 参数:zzsj(终止时间),qsdj(起始时间),zzMes(终止时间),qsMes(起始时间)
function dateZzsjVsQssj(zzsj,qsdj,qsMes,zzMes){   
	var zzms =zzMes;
	var qsms = qsMes; 
	 if(!CheckDate(zzsj)){
	 if(qsdj.value.length>0){
	  	var begindat=qsdj.value.split('-');
	 	var endat=zzsj.value.split('-');  
	  	var dat1=begindat[0]+begindat[1]+begindat[2];
	   	var dat2=endat[0]+endat[1]+endat[2];  
	    if(dat1> dat2){
	        alert(""+zzMes+"不能小于"+qsMes+",请重新输入！");
	         
	        zzsj.focus();
	        return false;
	    }
	  }
	}
	return true;
}
//判断起始时间和结速时间
function compdate(sid,eid){
var s=document.getElementById(sid).value;
var e=document.getElementById(eid).value;

if(s=="" || e==""){
	return true;
	}
	s=s.replace(/-/g,"/");
	e=e.replace(/-/g,"/");
	//alert(Date.parse(e)-Date.parse(s));
	if(Date.parse(s)-Date.parse(e)>0){   
    alert("起始日期要在结束日期之前!"); 
    //document.getElementById(sid).focus();
    return false;   
    }  
	return true;
}




 //增加事件2010-09-18(解决选课处理调用时的JS问题)
function newJsMAdd(htmlurl,tmpWidth,tmpHeight){
	var newwin = window.showModalDialog(htmlurl,window,"dialogWidth:"+tmpWidth+"px;status:no;dialogHeight:"+tmpHeight+"px");
	if (newwin == null){
		creating.style.visibility='visible';
		//window.Form1.PlAction.value="";
		window.Form1.submit();
		//document.getElementById('alldiv').disabled = true;
	}
	else if (newwin == "ok"){
		if (confirm("是否再次增加记录？")){
			JsMAdd(htmlurl,tmpWidth,tmpHeight);
		}
		else{
			creating.style.visibility='visible';
			///window.Form1.PlAction.value="";
			window.Form1.submit();
			///document.getElementById('alldiv').disabled = true;
		}
	}else{
		window.Form1.submit();
	}
}
  
//加入js文件,修改BY chenwen
function getRootPath(){
	var strFullPath=window.document.location.href;
	var strPath=window.document.location.pathname;
	var pos=strFullPath.indexOf(strPath);
	var prePath=strFullPath.substring(0,pos);
	var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1);
	return(prePath+postPath);
}
//检测Textarea大小
//v1对象字段名称
//弹出语句
//Textarea值的最大长度
function checkTextarea(v1,v2,v3){
var hjyy = v1.value; 
if(hjyy.length > v3){
v1.value = "";
v1.focus();
alert(v2);
return false;
}
}
function addJS(filePath)
{
	if(filePath) {
		var js = document.createElement('script');
		js.type = 'text/javascript';
		js.src =  getRootPath() + filePath;
		document.getElementsByTagName("head")[0].appendChild(js);
	}
}
//addJS('/dwr/engine.js');
//addJS('/dwr/util.js');
//addJS('/dwr/interface/dwrMonitor.js');
//addJS('/js/validate.js');

var checkonly_msg = "";
var checkonly_submitId = "submit_add";
var checkonly_spanId = "checkmessage_";
var checkonly_oldvalue = [];
var checkonly_field = "";

/*
 *useIsdel 是否启用 isdel，传值true或者其他值，当为true时，系统会自动增加isdel=0的条件。
 */
function checkIsOnly(tableName,fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		 
		dwrMonitor.checkIsOnly(tableName,fieldName,value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}


function checkIsOnlyAll(tableName,mapdata,msg,submitId,spanId) {
	DWREngine.setAsync(false);
	checkonly_spanId = spanId;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined)
		checkonly_spanId = spanId;

	dwrMonitor.checkIsOnlyAll(tableName,mapdata,checkOnlyResult);
}

/**
* 核查输入的值在数据库中是否存在
*/
function checkOnlyResult(result) {
	if(result == "N" || result == "true") {
		document.getElementById(checkonly_spanId).innerHTML = "<font color='red' size='2'>此"+checkonly_msg+"已经被使用！</font>";
		if(document.getElementById(checkonly_submitId)!=null){
			document.getElementById(checkonly_submitId).disabled = true;
		}
		alert("此"+checkonly_msg+"已经被使用！");	
	}else{
		document.getElementById(checkonly_spanId).innerHTML = "";
		var msg_temp = checkonly_spanId.replace("checkmessage_","");
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		}
		if(isCanSubmit)
			document.getElementById(checkonly_submitId).disabled = false;
	}
	checkonly_spanId = "checkmessage_";
}

//格式化日期方式
Date.prototype.format = function(format){
    var o =
    {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format))
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
    if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}


/////////////////////////////////////////////////////处理页面标签中的查询部分脚本
function ListSearch(SearchNum) {
	var tmpstr = " and (";
	for (i = 1; i <= SearchNum; i++) {
		if (document.all("SValue" + i).value != "") {
			tmpstr = tmpstr + document.all("Field" + i).value + " " + document.all("HH" + i).value;
			if (document.all("HH" + i).value == "like" || document.all("HH" + i).value == "not like") {
				tmpstr = tmpstr + " ^%" + sqlReplace(document.all("SValue" + i).value) + "%^ ";
			} else {
				tmpstr = tmpstr + " ^" + sqlReplace(document.all("SValue" + i).value) + "^ ";
			}
			
			if (i < SearchNum) {
				for (j = i + 1; j <= SearchNum; j++) {
					if (document.all("SValue" + j).value != "") {
						tmpstr = tmpstr + " " + document.all("AndOr" + i).value + " ";
						break;
					}
				}
			}
		}
	}
	if (tmpstr != " and (") {
		window.Form1.where2.value =" 1=1 " + tmpstr + ")";
		
	} else {
		window.Form1.where2.value = " 1 = 1";
	}
	window.Form1.submit();
}
//过滤非法字符
function sqlReplace(str){
	//var val = str.replace(/'/g,"''");
	var val = str;
	return val;
}
function ListSearchs(SearchNum,sqlwhere) {
	var tmpstr = " and ";
	if(SearchNum == 1){
	SearchNum++;
	}
	for (i = 1; i <= SearchNum; i++) {
		if (document.all("SValue" + i).value != "") {
			tmpstr = tmpstr + document.all("Field" + i).value + " " + document.all("HH" + i).value;
			if (document.all("HH" + i).value == "like" || document.all("HH" + i).value == "not like") {
				tmpstr = tmpstr + " ^%" + sqlReplace(document.all("SValue" + i).value) + "%^ ";
			} else {
				tmpstr = tmpstr + " ^" + sqlReplace(document.all("SValue" + i).value) + "^ ";
			}
			if (i < SearchNum) {
				for (j = i + 1; j <= SearchNum; j++) {
					if (document.all("SValue" + j).value != "") {
						tmpstr = tmpstr + " " + document.all("AndOr" + i).value + " ";
						break;
					}
				}
			}
		}
	}
	if (tmpstr != " and ") {
		window.Form1.where1.value = " 1=1 " + tmpstr + sqlwhere;
	} else {
		window.Form1.where1.value = " 1 = 1 " + sqlwhere;
	}
	window.Form1.submit();
}
/////////////////////////////////////////////////////锁定表头脚本
function DrawTable(scrTable, newTable, iStart, iEnd, jEnd) {
	var i, j, k = 0, newTR, newTD, intWidth = 0, intHeight = 0;
	newTable.mergeAttributes(scrTable);
	for (i = iStart; i < iEnd; i++) {
		newTR = newTable.insertRow(k);
		newTR.mergeAttributes(scrTable.rows[i]);
		intHeight += scrTable.rows[i].offsetHeight;
		intWidth = 0;
		for (j = 0; j < (jEnd == -1 ? scrTable.rows[i].cells.length : jEnd); j++) {
			newTD = scrTable.rows[i].cells[j].cloneNode(true);
			intWidth += scrTable.rows[i].cells[j].offsetWidth;
			newTR.insertBefore(newTD);
			newTD.style.pixelWidth = scrTable.rows[i].cells[j].offsetWidth;
		}
		k++;
	}
	newTable.style.pixelWidth = intWidth;
	newTable.style.pixelHeight = intHeight;
}

function LockTable(arTable, ColNum, RowHead, RowFoot) {
	arTable.HeadRow = RowHead;
	var objDivMaster = arTable.parentElement;
	if (objDivMaster.tagName != "DIV") {
		return;
	}
	if ((arTable.offsetHeight > objDivMaster.offsetHeight) && (arTable.offsetWidth > objDivMaster.offsetWidth)) {
		if ((ColNum > 0) && (RowHead > 0)) {
			var objTableLH = document.createElement("TABLE");
			var newTBody = document.createElement("TBODY");
			objTableLH.insertBefore(newTBody);
			objTableLH.id = "objTableLH";
			objDivMaster.parentElement.insertBefore(objTableLH);
			DrawTable(arTable, objTableLH, 0, RowHead, ColNum);
			objTableLH.srcTable = arTable;
			with (objTableLH.style) {
				zIndex = 804;
				position = "absolute";
				pixelLeft = objDivMaster.offsetLeft;
				pixelTop = objDivMaster.offsetTop;
			}
		}
		if ((ColNum > 0) && (RowFoot > 0)) {
			var objTableLF = document.createElement("TABLE");
			var newTBody = document.createElement("TBODY");
			objTableLF.insertBefore(newTBody);
			objTableLF.id = "objTableLF";
			objDivMaster.parentElement.insertBefore(objTableLF);
			DrawTable(arTable, objTableLF, arTable.rows.length - RowFoot, arTable.rows.length, ColNum);
			objTableLF.srcTable = arTable;
			with (objTableLF.style) {
				zIndex = 803;
				position = "absolute";
				pixelLeft = objDivMaster.offsetLeft;
				pixelTop = objDivMaster.offsetTop + objDivMaster.offsetHeight - objTableLF.offsetHeight - 16;
			}
		}
	}
	if ((RowHead > 0) && (arTable.offsetHeight > objDivMaster.offsetHeight)) {
		var DivHead = document.createElement("DIV");
		objDivMaster.parentElement.insertBefore(DivHead);
		var objTableHead = document.createElement("TABLE");
		var newTBody = document.createElement("TBODY");
		objTableHead.id = "HeadTar";
		objTableHead.style.position = "relative";
		objTableHead.insertBefore(newTBody);
		DivHead.insertBefore(objTableHead);
		DrawTable(arTable, objTableHead, 0, RowHead, -1);
		HeadTar.srcTable = arTable;
		with (DivHead.style) {
			overflow = "hidden";
			zIndex = 802;
			pixelWidth = objDivMaster.offsetWidth - 16;
			position = "absolute";
			pixelLeft = objDivMaster.offsetLeft;
			pixelTop = objDivMaster.offsetTop;
		}
		objDivMaster.attachEvent("onscroll", divScroll1);
	}
	if ((RowFoot > 0) && (arTable.offsetHeight > objDivMaster.offsetHeight)) {
		var DivFoot = document.createElement("DIV");
		objDivMaster.parentElement.insertBefore(DivFoot);
		var objTableFoot = document.createElement("TABLE");
		var newTBody = document.createElement("TBODY");
		objTableFoot.insertBefore(newTBody);
		objTableFoot.id = "FootTar";
		objTableFoot.style.position = "relative";
		DivFoot.insertBefore(objTableFoot);
		DrawTable(arTable, objTableFoot, arTable.rows.length - RowFoot, arTable.rows.length, -1);
		objTableFoot.srcTable = arTable;
		with (DivFoot.style) {
			overflow = "hidden";
			zIndex = 801;
			pixelWidth = objDivMaster.offsetWidth - 16;
			position = "absolute";
			pixelLeft = objDivMaster.offsetLeft;
			pixelTop = objDivMaster.offsetTop + objDivMaster.offsetHeight - DivFoot.offsetHeight - 16;
		}
		objDivMaster.attachEvent("onscroll", divScroll2);
	}
	if ((ColNum > 0) && (arTable.offsetWidth > objDivMaster.offsetWidth)) {
		var DivLeft = document.createElement("DIV");
		objDivMaster.parentElement.insertBefore(DivLeft);
		var objTableLeft = document.createElement("TABLE");
		var newTBody = document.createElement("TBODY");
		objTableLeft.insertBefore(newTBody);
		objTableLeft.id = "LeftTar";
		objTableLeft.style.position = "relative";
		DivLeft.insertBefore(objTableLeft);
		DrawTable(arTable, objTableLeft, 0, arTable.rows.length, ColNum);
		LeftTar.srcTable = arTable;
		with (DivLeft.style) {
			overflow = "hidden";
			zIndex = 800;
			pixelWidth = objDivMaster.offsetWidth - 16;
			pixelHeight = objDivMaster.offsetHeight - 16;
			position = "absolute";
			pixelLeft = objDivMaster.offsetLeft;
			pixelTop = objDivMaster.offsetTop;
		}
		objDivMaster.attachEvent("onscroll", divScroll3);
	}
}
function divScroll1() {
	var tbl = document.all("HeadTar").srcTable, parDiv = tbl.parentElement;
	while (parDiv.tagName != "DIV") {
		parDiv = parDiv.parentElement;
	}
	window.status = -parDiv.scrollLeft;
	document.all("HeadTar").style.pixelLeft = -parDiv.scrollLeft;
}
function divScroll2() {
	var tbl = document.all("FootTar").srcTable, parDiv = tbl.parentElement;
	while (parDiv.tagName != "DIV") {
		parDiv = parDiv.parentElement;
	}
	window.status = -parDiv.scrollLeft;
	document.all("FootTar").style.pixelLeft = -parDiv.scrollLeft;
}
function divScroll3() {
	var tbl = document.all("LeftTar").srcTable, parDiv = tbl.parentElement;
	while (parDiv.tagName != "DIV") {
		parDiv = parDiv.parentElement;
	}
	window.status = -parDiv.scrollLeft;
	document.all("LeftTar").style.pixelTop = -parDiv.scrollTop;
}
/////////////////////////////////////////////////////锁定表头脚本结束

/////////////////////////////////////////////////////拖动列宽脚本
function MouseDownToResize(obj) {
	obj.mouseDownX = event.clientX;
	obj.pareneTdW = obj.parentElement.offsetWidth;
	obj.pareneTableW = mxh.offsetWidth;
	obj.setCapture();
}
function MouseMoveToResize(obj, clo) {
	if (!obj.mouseDownX) {
		return false;
	}
	var newWidth = obj.pareneTdW * 1 + event.clientX * 1 - obj.mouseDownX;
	if (newWidth > 0) {
		obj.parentElement.style.width = newWidth;
	  if (document.getElementById("mxh").rows[0] != undefined)
        {
            for (i = 0; i < document.getElementById("mxh").rows.length; i++){
            	try{
            		document.getElementById("mxh").rows[i].cells[clo].style.width = newWidth;
            	}catch(e){
            	}
            }               
        }
		document.getElementById("tblHeadDiv").style.pixelLeft = -document.getElementById("mxhDiv").scrollLeft;
	}
}
function MouseUpToResize(obj) {
	obj.releaseCapture();
	obj.mouseDownX = 0;
}
/////////////////////////////////////////////////////拖动列宽脚本结束
function formSubmit(page) {
	document.forms[0].submit();
}
function gb_bgcolor(e, iRowID) {
	ioldSelectRow = document.getElementById("oldSelectRow").value;
	if (ioldSelectRow != "") {
		document.getElementById(ioldSelectRow).bgColor = "";
	}
	e.bgColor = "#cccccc";
	document.getElementById("oldSelectRow").value = iRowID;
}
//新的选择列表行的事件
//新的选择列表行的事件
function gb_bgcolor2(e, iRowID) {
	ioldSelectRow = document.getElementById("oldSelectRow").value;
	
	if (ioldSelectRow != "") {
	    try{
			document.getElementById(ioldSelectRow).style.backgroundColor = "";
		}
		catch(eii){}
	}
	e.style.backgroundColor = "#C4DEFD";
	document.getElementById("oldSelectRow").value = iRowID;
}

function doWhereKey(e) {
	document.getElementById("key_where").value = document.getElementById("key_where_" + e.id).value;
	alert("key_where:" + document.getElementById("key_where").value);
}

function doAWhereKey(e) {
	document.getElementById("key_where").value = document.getElementById("key_where_" + e.id.toString().substr(1)).value;
	alert("key_where:" + document.getElementById("key_where").value);
}

/////////////////////////////////////////////////////全选脚本，在通用列表标记库中使用
function SelectAll() {
	if (document.all.C_Select == null)
		return;
	if (document.all.C_Select.length == null) {
	if(!document.all.C_Select.disabled && !document.all.C_Select.parentElement.disabled)
		document.all.C_Select.checked = document.all.C_SelectALL.checked;
	} else {
		for (i = 0; i < document.all.C_Select.length; i++) {
			if(!document.all.C_Select[i].disabled && !document.all.C_Select[i].parentElement.disabled)
				document.all.C_Select[i].checked = document.all.C_SelectALL.checked;
		}
	}
}

/////////////////////////////////////////////////////选择批量操作的内容
function ChangeSzValue() {
   if (document.all.ZdSzNr.value == ''){
      document.all.ZdSzValue.readOnly = true;
      document.all.cmdselect.style.visibility = "hidden";
   }
   else{
    		//代码:类型:下拉选择SQL
    var dmbz = document.all.ZdSzNr.value.split(":");
    		//字典的设置值
	document.all.ZdSzValue.value = "";
	//字典代码
	document.all.ZdSzCode.value = dmbz[0];
		//字典的显示内容
	document.all.ZdSzCodeValue.value = "";
		// 如果有字典内容显示字典内容
	if (dmbz.length > 2){
      document.all.ZdSzValue.readOnly = true;
      document.all.cmdselect.style.visibility = "visible";
		}else {// 不是字典			
	  document.all.ZdSzValue.readOnly = false;
      document.all.cmdselect.style.visibility = "hidden";
	}
  }
  document.getElementById('ZdSzCodeValue').value = "";
  document.getElementById('ZdSzValue').value = "";
  document.getElementById('ZDSXkeydm').value = "";
  document.getElementById("hiddenframe").style.display = "none";
}
/*
//批量设置事件
function ZdSz() {
	if (document.all.ZdSzNr.value == "") {
		alert("请先指定要设置的内容!");
		document.all.ZdSzNr.focus();
		return false;
	}
	if (document.all.ZdSzValue.value == "") {
		alert("请先指定要设置的值!");
		document.all.ZdSzValue.focus();
		return false;
	}
	if (!CheckCanDelete("设置<" + document.all.ZdSzNr.options[document.all.ZdSzNr.selectedIndex].text+">")) {
		return false;
	}
	document.all.ZdSzValueTemp.value = document.all.ZdSzValue.value;
	document.all.PlAction.value = "set";
	ZdZcing.style.visibility = "visible";
	document.Form1.submit();
	ZdZcing.style.visibility = "hidden";
}*/
//批量设置事件
function ZdSz() {
	
	if (document.getElementById("ZdSzNr").value == "") {
		alert("请先指定要设置的内容!");
		document.all.ZdSzNr.focus();
		return false;
	}
	
	if (document.getElementById("ZdSzValue").value == "") {
		alert("请先指定要设置的内容!");
		document.all.ZdSzValue.focus();
		return false;
	} 

	var c_select=document.getElementsByName("C_Select");
	var val="",isSelect=false;	

	//判断是否选定记录
	for(var i=0;i<c_select.length;i++) {
		if(c_select[i].checked==true){// No selected 属性
			val+="'"+c_select[i].value+"',";
			isSelect=true;
		}
	}
	if(!isSelect) {
		alert('指定设置无效，没有选择记录！');
		return false;
	}else {
		var patrn=/^0+\.*[0-9]*$/;//扩展数据类型
		var type=document.all.ZdSzNr.value.split(":")[1];
		//临时解决导学时分类带了0造成在开课通知单中不能修改学时信息
		if(type=="01" || type=="02" || type=="03" || type=="04" || type=="05"){
		   type=parseInt(type);
		} 
		var isnum=!patrn.exec(type);
		if(!isnum){
			var result=false;
			if(type=='0'){
			result=checkNumber(document.all.ZdSzValue);	
			}	
			else if(type=='0.1'){
			result=checkNumber(document.all.ZdSzValue);	
			if(document.all.ZdSzValue.value<0 && result){
			alert("必须为大于0的数字");
			result=false;
			}
			}else if(type=='0.2'){
			result=checkIntegerIsTun(document.all.ZdSzValue);
			}		
			if(result==true) {
				ZdZcing.style.visibility = "visible";
				if(document.all.ZdSzValueTemp.value=='')
					document.all.ZdSzValueTemp.value = document.all.ZdSzValue.value;					
				document.all.PlAction.value = "set";
				document.all.ZDSXkeydm.value = document.all.ZdSzNr.value;
				document.all.ZdSzCodeValue.value = document.all.ZdSzValue.value;				
				//document.Form1.submit();
				//ZdZcing.style.visibility = "hidden";
			}else{
				ZdZcing.style.visibility = "hidden";
				return false;
			}
		}
		if (!CheckCanDelete("设置<" + document.all.ZdSzNr.options[document.all.ZdSzNr.selectedIndex].text+">")) {
		ZdZcing.style.visibility = "hidden";
			return false;
		}
		
		//设置值		
		ZdZcing.style.visibility = "visible";
		if(document.all.ZdSzValueTemp.value=='')
			document.all.ZdSzValueTemp.value = document.all.ZdSzValue.value;
		document.all.PlAction.value = "set";
		document.all.ZDSXkeydm.value = document.all.ZdSzNr.value;
		document.all.ZdSzCodeValue.value = document.all.ZdSzValue.value;
		document.forms(0).action = "";
		if(document.getElementById("userModifyUrl").value != "") {
			var modFieldName = document.getElementById("ZdSzNr").value.split(":")[0];
			var userModFields = document.getElementById("userModifyUrl").value.split(",");
			for(var i=0;i<userModFields.length;i++) {
				if(userModFields[i].split(":")[0] == modFieldName) {
					document.forms(0).action = userModFields[i].split(":")[1];
					break;
				}
			}
		}
		document.Form1.submit();
		ZdZcing.style.visibility = "hidden";
		document.all.PlAction.value = "";
		document.all.ZdSzValueTemp.value = "";
	}	
}

//选择查询操作的内容
function szSearchValue(i) {
	var searchF = document.all('Field'+i).value;
	document.all('SValue'+i).value = "";
	if (document.all('Field'+i).value == ''){
      		document.all('cmdselectS'+i).style.visibility = "hidden";
   	}else {
    		//代码:类型:下拉选择SQL
    		var dmbz = searchF.split(":");
		//字典代码
		document.all.ZdSzCode.value = dmbz[0];
		//字典的显示内容
		document.all.ZdSzCodeValue.value = "";
		// 如果有字典内容显示字典内容
		if (dmbz.length > 2){
      			document.all('cmdselectS'+i).style.visibility = "visible";
		}else {// 不是字典			
	  		document.all('cmdselectS'+i).style.visibility = "hidden";
			if (dmbz[1]=="10") {
				document.all('SValue'+i).value = "yyyy-MM-dd";
			}else if (dmbz[1]=="11") {
				document.all('SValue'+i).value = "yyyy-MM-dd hh:mm:ss";
			}else if (dmbz[1]=="12") {
				document.all('SValue'+i).value = "yyyyMM";
			}else if (dmbz[1]=="13") {
				document.all('SValue'+i).value = "yyyyMMdd";
			}else if (dmbz[1]=="14") {
				document.all('SValue'+i).value = "yyyyMMddhhmmss";
			}
		}
  	}
	document.getElementById('ZdSzCodeValue').value = "";  	
  	document.getElementById('ZDSXkeydm').value = "";
  	document.getElementById("hiddenframe").style.display = "none";
}

//查询操作选择弹出iframe
function ChooseHiddenframeS(i){
	var tmpUrl = "../../selectDictionary.do?method=execute&typeCode="+i+"&type=" + document.all('Field'+i).value;
	var abe=getLTWH(document.getElementById('SValue'+i));

	document.getElementById("hiddenframe").style.position = "absolute";
    	document.getElementById("hiddenframe").style.border = 0;
	document.getElementById("hiddenframe").width = 205;
	document.getElementById("hiddenframe").height = 225;
    	document.getElementById("hiddenframe").style.pixelLeft = abe.left;
	document.getElementById("hiddenframe").style.top = abe.top;
	document.getElementById("hiddenframe").style.display = "";
    	window.frames["hiddenframe"].location = tmpUrl;	
}
//检查数据类型事件
function CheckDataLx(obj, Lx) {
	s_array_objvalue = obj.value.toString().split("|");
	tmpstr = s_array_objvalue[0];
	if (trimstr(tmpstr) != "") {
		if (Lx == "number") {
			if (!checkNum(tmpstr)) {
				alert("必须输入数字！");
				obj.focus();
				obj.value = "";
				try {
					return false;
				}
				catch (exception) {
					return false;
				}
			}
		} else {
			if (Lx == "date") {
				if (!checkDate(tmpstr)) {
					alert("必须输入日期格式，例如：2007-01-01");
					obj.value = "";
					obj.focus();
					try {
						return false;
					}
					catch (exception) {
						return false;
					}
				}
			}
		}
	}
	return true;
}

//JS中的Trim方法，替换字符串中的空格
function trimstr(s){
  return s.replace(/(^\s*)|(\s*$)/g, ""); 
}


//批量设置选择值事件
function SelectValueCode() {
	var batchSeter = document.all.batchSeter.value;
	var ZdSzCode = document.all.ZdSzCode.value;
	var zdBeanName = document.all.zdBeanName.value;
	var htmlurl = "public.do?method=ZdSearch&ZdSzCode=" + ZdSzCode + "&zdBeanName=" + zdBeanName + "&batchSeter=" + batchSeter;
	var newwin = window.open(htmlurl, "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,top=" + (screen.availheight / 2 - 147) + " ,left=" + (screen.availwidth / 2 - 110) + ",width=220,height=330");
}

//批量删除事件
function DeleteSelectedData(iPageNum) {
	if (!CheckCanDelete("删除")) {
		return false;
	}
	document.Form1.PlAction.value = "del";
	creating.style.visibility = "visible";
	document.Form1.submit();
	document.getElementById('alldiv').disabled = true;
	document.all.PlAction.value = "";
	creating.style.visibility = "hidden";
}

//检查复选脚本
function CheckCanDelete(strOper) {
	var CanDelete = false;
	if (document.all.C_Select == null) {
		CanDelete = false;
	} else {
		if (document.all.C_Select.length == null ) 
			CanDelete = document.all.C_Select.checked;
		else{
			for (i = 0; i < document.all.C_Select.length; i++) {
				if (document.all.C_Select[i].checked) {
					CanDelete = true;
					break;
				}
			}
		}
	}
	if (!CanDelete) {
		alert("指定" + strOper + "无效，没有选择记录！");
		return false;
	}else if (!confirm("您所选择的记录将被指定" + strOper + "，继续？")) {
		return false;
	}
	return true;
}

//打开一个模态窗口
function JsMod(htmlurl,tmpWidth,tmpHeight){  
	htmlurl=getRandomUrl(htmlurl); 
	var newwin = window.showModalDialog(htmlurl,window,"dialogWidth:"+tmpWidth+"px;status:no;dialogHeight:"+tmpHeight+"px"); 
	if(newwin!=null && newwin == "ok"){
		openProgress();
		window.Form1.PlAction.value="";
		window.Form1.submit();
	}
}



/**
所有showModalDialog替换为open
url 打开弹出框的url地址
obj 参数

sFeatures 用来描述对话框的外观等信息
*/
window.showModalDialog = function(url,obj,sFeatures){ 
	sFeatures = sFeatures.replace(/dialogHeight/gi,"height");
	sFeatures = sFeatures.replace(/dialogWidth/gi,"width"); 
	sFeatures = sFeatures.replace(/dialogTop/gi,"top"); 
	sFeatures = sFeatures.replace(/dialogLeft/gi,"left");
	sFeatures = sFeatures.replace(/:/gi, "=");
	sFeatures = sFeatures.replace(/;/gi, ",");
	
	var iTop = 60;    //获得窗口的垂直位置;
	var iLeft = 200;  	//获得窗口的水平位置; 
	sFeatures = sFeatures+",top="+iTop+",left="+iLeft;
 
	var newWindow = window.open(url,"",sFeatures);
	return newWindow;
}

//刷新open打开的父页面
function parentRefresh(){
	try{
		window.opener.openProgress();
	}catch(e){}
	
	try{
		window.opener.indexSx();   
	}catch(e){
		//opener.location.href = opener.location.href; 
		window.opener.location.reload();
	} 
	window.opener=null;
	window.close();
}


function openWindowNew(htmlurl,tmpWidth,tmpHeight,itop,ileft){
	var top = ((window.screen.availHeight-document.body.clientHeight)/2);
	if(itop!=null && itop!=""){
		top = itop;
	}
	var left = ((window.screen.availWidth-document.body.clientWidth)/2);  
	if(ileft!=null && ileft!=""){
		left = ileft;
	}
	
	window.open(htmlurl, "printsetup", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,top=" 
			+ top+ ",left=" + left+ ",width="+tmpWidth+"px,height=" + tmpHeight + "px");
}

 

function JsMod_div(htmlurl,tmpWidth,tmpHeight){
	htmlurl=getRandomUrl(htmlurl);
	
	if(tmpWidth==null || tmpWidth==""){
		tmpWidth = 500;
	}
	
	if(tmpHeight==null || tmpHeight==""){
		tmpHeight = 400;
	}
	
	var sHtml="<div id=\"help_win\" class=\"easyui-window\" title=\"\" style=\"width:"+tmpWidth+"px;height:"+tmpHeight+"px;\"" 
		+" data-options=\"collapsible:false,minimizable:false,maximizable:false,modal:true\">";
	sHtml = sHtml+"<iframe scrolling=\"no\" style=\"border:0px;width:100%;height:560px;\" src=\""+htmlurl+"\" ></iframe>";
	sHtml=sHtml+"</div>";
	
	$("body").append(sHtml);
	
	$('#help_win').window('open'); 
	
/*	htmlurl=getRandomUrl(htmlurl);
	var newwin = window.showModalDialog(htmlurl,window,"dialogWidth:"+tmpWidth+"px;status:no;dialogHeight:"+tmpHeight+"px");
	alert(newwin);
	if(newwin!= null && newwin == "ok"){
		window.Form1.PlAction.value="";
		window.Form1.submit();
	//	document.getElementById('alldiv').disabled = true;
	}*/
}


//通过Servlet的通用设置个性化列表 url必须带路径,格式如/jiaowu/kkgl/listKktzd.jsp
function setPrivateShowByServlet(url,root) {
	htmlurl = root+"/PublicPrivateShowServlet?url=" + url;
	var newwin = window.open(htmlurl, "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,top=" + (screen.availheight / 2 - 220) + " ,left=" + (screen.availwidth / 2 - 150) + ",width=300,height=440");
}

//通过Servlet的通用打印
function printSetupByServlet(title) {
	htmlurl = "../PublicListPrintServlet?TblName=" + encodeURI(encodeURI(title));
	clruku(htmlurl);
	//var newwin = window.open(htmlurl, "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,top=" + (screen.availheight / 2 - 220) + " ,left=" + (screen.availwidth / 2 - 150) + ",width=300,height=540");
}
function clruku(url) {
	
	$("<div id='ddrkDialog' class='panel-noscroll'></div>").dialog({
	    title: "打印",
	    width: 500 - 50,
	    height: document.body.clientHeight /1.2,
	    cache: false,
	    modal: true,
	    content: "<iframe src='"+url+"' id='ddrkDialogIframe' frameborder='no' marginwidth='0'" 
    		+ " marginheight='0' border='0' width='100%' height='100%'></iframe>",
	    onClose: function(){
	    	$("#ddrkDialog").dialog("destroy");
	    	//searchOper();
	    }
	});
}
function destroy(){
	$("#ddrkDialog").dialog("destroy");
}
//通过Servlet的sql通用打印
function printSetupByServlet3(title,root,isSql) {
	htmlurl = root+"/PublicListPrintServlet?TblName=" + encodeURI(encodeURI(title))+"&isSql="+isSql;
	clruku(htmlurl);
	//var newwin = window.open(htmlurl, "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,top=" + (screen.availheight / 2 - 220) + " ,left=" + (screen.availwidth / 2 - 150) + ",width=300,height=540");
}

//通过Servlet的通用打印2带WEB根
var newwin_printSetupByServlet;
function printSetupByServlet2(title,root) {
if(newwin_printSetupByServlet){
newwin_printSetupByServlet.close();
	}
	htmlurl = root+"/PublicListPrintServlet?TblName="+encodeURI(encodeURI(title));
	clruku(htmlurl);
	//newwin_printSetupByServlet = window.open(htmlurl, "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,top=" + (screen.availheight / 2 - 220) + " ,left=" + (screen.availwidth / 2 - 150) + ",width=300,height=540");
}

//通过Servlet的通用打印4带WEB根
function printSetupByServlet4(title,root,url) {
	htmlurl = root+"/PublicListPrintServlet?TblName=" + encodeURI(encodeURI(title))+"&url="+url;
	clruku(htmlurl);
	//var newwin = window.open(htmlurl, "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,top=" + (screen.availheight / 2 - 220) + " ,left=" + (screen.availwidth / 2 - 150) + ",width=300,height=540");
}

//通过Servlet的通用打印5带WEB根
function printSetupByServlet5(title,root,isSql,url) {
	htmlurl = root+"/PublicListPrintServlet?TblName=" + encodeURI(encodeURI(title))+"&url="+url+"&isSql="+isSql;
	clruku(htmlurl);
	//var newwin = window.open(htmlurl, "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,top=" + (screen.availheight / 2 - 220) + " ,left=" + (screen.availwidth / 2 - 150) + ",width=300,height=540");
}
//打开一个窗口
function JsOpenWin(htmlurl,tmpWidth,tmpHeight){
   var  top = ((window.screen.availHeight-document.body.clientHeight)/2);  
   var  left = ((window.screen.availWidth-document.body.clientWidth)/2);  
	window.open(htmlurl, "printsetup", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,top=" 
		+ top+ " ,left=" + left+ ",width="+tmpWidth+"px,height=" + tmpHeight + "px");
}

//检查输入是否是数字
function checkcapital(input, flag) {
	if (input.value == "") return false;
	str = input.value;
	var checkOK;
	var checkStr = str;
	var allValid = true;
	var allNum = "";
	if (flag == 0) {
		checkOK = "0123456789-, ";
	} else {
		checkOK = "0123456789";
	}
	for (i = 0; i < checkStr.length; i++) {
		ch = checkStr.charAt(i);
		for (j = 0; j < checkOK.length; j++) {
			if (ch == checkOK.charAt(j)) {
				break;
			}
		}
		if (j == checkOK.length) {
			allValid = false;
			break;
		}
		allNum += ch;
	}
	if (!allValid) {
		alert("输入的数据必须是数字!");
		input.value = "";
		input.focus();
		input.select();
		return (false);
	}
	return true;
}

//弹出一般窗口
function JsAdd(url, iWidth, iHeight, iTop, iLeft) { 
	open(url, "Detail", "Scrollbars=no,Toolbar=no,Location=no,Direction=no,resizable=yes,Width=" + iWidth + " ,Height=" + iHeight + ",top=" + iTop + ",left=" + iLeft); 
}

//转入页事件
function submitpage(maxPageNum) {
	if (document.getElementById('txtpage').value == "") {
		alert("请输入要查看的页码！");
		document.getElementById('txtpage').focus();
		return false;
	} else {
		ipage = parseInt(document.getElementById('txtpage').value);
		if (isNaN(ipage)) {
			alert("请确认输入的是数字!");
			document.getElementById('txtpage').focus();
			return false;
		} else {
			if (ipage < 1) {
				document.Form1.PageNum.value = "1";
				ipage = 1;
			}
			if (ipage > maxPageNum) {
				document.Form1.PageNum.value = maxPageNum;
				ipage = maxPageNum;
			}
			document.Form1.PageNum.value = ipage;
			creating.style.visibility = "visible";
			document.Form1.submit();
			document.getElementById('alldiv').disabled = true;
			return true;
		}
	}
}

//子报表的打开关闭事件，第二个版本
function openclose2(rowIndex, subTableHeight, url, basePath) {
	var closeimg = basePath + "/framework/images/menu_close.gif";
	var openimg = basePath + "/framework/images/menu_open.gif";
	if (document.getElementById("img" + rowIndex).src.indexOf("close") > 0) {
		document.getElementById("img" + rowIndex).src = openimg;
		if (document.getElementById("subtd" + rowIndex).innerHTML.length <= 6){
		    document.getElementById("subtd" + rowIndex).innerHTML = "<iframe scrolling=no id=\"subiframe" + rowIndex + "\" width=90% height=" + subTableHeight + " src=\"\"></iframe>";
		    document.all("subiframe" + rowIndex).src = url;
		}
		document.all("subtr" + rowIndex).style.display = "block";
	} else {
		document.getElementById("img" + rowIndex).src = closeimg;
		document.all("subtr" + rowIndex).style.display = "none";
	}
}
 function checkRadioEmpty(prop) {
		var radio_len = document.all(prop).length;
		var result = false;
		if(radio_len >= 2) {
			for(var i=0;i<radio_len;i++) {
				 if(document.all(prop)[i].checked == true){
					  result = true;
				 }
			}
		}else{
			if(document.all(prop).checked == true) {
				result = true;
			}
		}
		return result;
	}
    
    
//点击保存按钮--增加(增修删用)
function submitAdd(action1,callback){ 
	if(checkType() == false){
		return;
	}
	
	var field = document.Form1.fieids.value.split('\|');
	for(var i=1;i<field.length;i++){
		var tmp=field[i].split(',');
   	 	//tmp = tmp[0].split('.');
   	 	var maxlen = document.getElementById(tmp[0]).maxLength;
   	 
   	 	if(typeof(document.getElementById(tmp[0]).value)!='undefined') {
   	 		if(trimstr(document.getElementById(tmp[0]).value)=="null"){
				alert('此文本框的值不能为null');
				document.all(tmp[0]).focus();
				document.all(tmp[0]).select();	
				return false;
   	 		}
   	 		
			var t = document.getElementById(tmp[0]).value;
			var length = t.replace(/[^\x00-\xff]/g,"**").length;
			
		/*	if(length!=''){
				if(parseInt(maxlen)<length){
					alert('此文本框的值过长，最多允许有'+maxlen+'个字符，其中汉字占两个字符，其他占一个字符');
					document.all(tmp[0]).focus();
					return false;
				}
			}*/
   	 	}
    }
    
    var notnul=document.Form1.notNull.value.split(/,/g);
    for(var i=0;i<notnul.length;i++){
    var temp=notnul[i].split(/:/g);
    
    if(notnul[i].indexOf("#radiobox") >= 0) {
    	if(!checkRadioEmpty(temp[1].replace("#radiobox",""))) {
			alert(temp[0]+"没有选择!");
			return false;
		}
    }else{
    	if (typeof(temp[1]) != "undefined") { 
		    if(trimstr(document.getElementById(temp[1]).value)==""){
				alert(temp[0]+'不能为空');
				document.getElementById(temp[1]).focus();
				try{
					document.getElementById(temp[1]).select();
			 	}catch(e){}
			 	return false;
		    }
		}
    }
	    
	   
	    
    }
     //回调方法
	     if(typeof(callback)!='undefined'){
	     if(!callback()){
	     return;
	     }
	       }
    document.Form1.submit_add.disabled="true";
    if(action1=="null"){
	       document.Form1.actionUrl.value="add";
	       //alert(callback);
	       window.Form1.submit();
    }else{
	       window.Form1.action  = action1;
	       window.Form1.submit();
    }
}

//点击保存按钮--修改(增修删用)
function submitEdit(action1,callback){
	if(!isFormChanged()) return;
	
	if(checkType() == false) return;
	var field = document.Form1.fieids.value.split('\|');
	
	for(var i=1;i<field.length;i++){
	   	 var tmp=field[i].split(',');
	   	 //tmp = tmp[0].split('.');
	   	 var maxlen = document.getElementById(tmp[0]).maxLength;
	     if(trimstr(document.getElementById(tmp[0]).value)=="null"){
		       alert('此文本框的值不能为null');
		       document.all(tmp[0]).focus();
		       document.all(tmp[0]).select();	
		       return false;
	      }
	     var t = document.getElementById(tmp[0]).value;
		 var length = t.replace(/[^\x00-\xff]/g,"**").length
		
		 /*if(length!=''){
			if(parseInt(maxlen)<length){
				  alert('此文本框的值过长，最多允许有'+maxlen+'个字符，其中汉字占两个字符，其他占一个字符');
				  document.all(tmp[0]).focus();
				  return false; 
			}
		 }*/
    }
 	var notnul=document.Form1.notNull.value.split(/,/g);
     //吴争修改
    for(var i=0;i<notnul.length;i++){
	   	 var temp = notnul[i].split(/:/g);
	   	 
	   	 if(notnul[i].indexOf("#radiobox") >= 0) {
	    	if(!checkRadioEmpty(temp[1].replace("#radiobox",""))) {
				alert(temp[0]+"没有选择!");
				return false;
			}
	    }
	    else{
		   	 if(trimstr(document.getElementById(temp[1]).value)==""){
		    	alert(temp[0]+'不能为空');
		       	//temp[1].fouce();
		       	//temp[1].select();
		       	return false;
		   	 }
	   	}
	   	 
    }
    
     //回调方法
	     if(typeof(callback)!='undefined'){
	     if(!callback()){
	     return;
	     }
	       }
    
    document.Form1.submit_add.disabled="true";
    document.Form1.loadTimes.value=1;
    if(action1=="null"){
     	  document.Form1.actionUrl.value="edit";
      	 window.Form1.submit();
    }else{
     	  window.Form1.action = action1;
     	  window.Form1.submit();
    }
}
//点击删除按钮--删除(增修删用)
function submitDel(action1){
   if(!confirm('数据将被删除,是否继续?'))
     {return false;}
    document.Form1.delButton.disabled="true";
    document.Form1.loadTimes.value=1;
    if(action1=="null"){
       document.Form1.actionUrl.value="del";
       window.Form1.submit();
    }else{
       window.Form1.action= action1;
       window.Form1.submit();
    }
}

//查询事件
function JsFind(htmlurl,tmpWidth,tmpHeight){
	var newwin = window.showModalDialog(htmlurl,"","dialogWidth:"+tmpWidth+"px;status:no;dialogHeight:"+tmpHeight+"px");
	if (newwin != null)
	{
		if (newwin.type == "ok")
		{
			window.Form1.where1.value = newwin.wheresql;
			window.Form1.OrderBy.value = newwin.OrderBy;
			window.Form1.PageNum.value = "1";
			creating.style.visibility='visible';
			window.Form1.submit();
			document.getElementById('alldiv').disabled = true;
		}
	}
}

function getRandomStr()
{
	var  date=new Date();
	var t=Date.parse(date);   
	return t;
}

//给URL带个随机参数
function getRandomUrl(htmlurl)
{
var count =htmlurl.indexOf("?");
var  date=new Date();
var t=Date.parse(date);    
if(count<0)
{
htmlurl=htmlurl+"?tktime="+t;
}
else
{
htmlurl=htmlurl+"&tktime="+t;
}

return htmlurl;
}



//增加事件
function JsMAddNoAgain(htmlurl,tmpWidth,tmpHeight){
    htmlurl=getRandomUrl(htmlurl);
    
	var newwin = window.showModalDialog(htmlurl,window,"dialogWidth:"+tmpWidth+"px;status:no;dialogHeight:"+tmpHeight+"px");
	
	if(newwin!=null && newwin == "ok"){
//		creating.style.visibility='visible';
		window.Form1.PlAction.value="";
		window.Form1.submit();
//		document.getElementById('alldiv').disabled = true;
	} 
}


 //增加事件
function JsMAdd(htmlurl,tmpWidth,tmpHeight){
    htmlurl=getRandomUrl(htmlurl);
    var newwin = window.showModalDialog(htmlurl,window,"dialogWidth:"+tmpWidth+"px;status:no;dialogHeight:"+tmpHeight+"px");
/*	if(newwin!=null && newwin == "ok"){
		if(confirm("是否再次增加记录？")){
			JsMAdd(htmlurl,tmpWidth,tmpHeight);
		}else{ 
			window.Form1.PlAction.value="";
			window.Form1.submit(); 
		}
	}else{
	  if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
	        //alert('你是使用IE')
	  }else if (navigator.userAgent.indexOf('Firefox') >= 0){
	        //alert('你是使用Firefox')
	  }else if (navigator.userAgent.indexOf('Opera') >= 0){
	        //alert('你是使用Opera')
	  }else{
	        //alert('你是使用其他的浏览器浏览网页！')
	        window.Form1.PlAction.value="";
			window.Form1.submit(); 
	  } 
	}*/  
	
/*	if(newwin == null){
		creating.style.visibility='visible';
		window.Form1.PlAction.value="";
		window.Form1.submit();
		document.getElementById('alldiv').disabled = true;
	}else if(newwin == "ok"){
		if(confirm("是否再次增加记录？")){
			JsMAdd(htmlurl,tmpWidth,tmpHeight);
		}
		else{
			creating.style.visibility='visible';
			window.Form1.PlAction.value="";
			window.Form1.submit();
			document.getElementById('alldiv').disabled = true;
		}
	}else{
		window.Form1.submit();
	} */
}


 //增加事件
function JsMAddbyNoRefresh(htmlurl,tmpWidth,tmpHeight){
	var newwin = window.showModalDialog(htmlurl,window,"dialogWidth:"+tmpWidth+"px;status:no;dialogHeight:"+tmpHeight+"px");
	
}

//显示\隐藏表格
function showTable(imgId, divId) {
    var tableDivObj = document.getElementById(divId);
    tableDivObj.style.display = (tableDivObj.style.display == "none" ? "block" : "none");
} 

//判断身份证格式
function checkIdCard(obj) {
	if (obj.value == "") return false;
	var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
	var error;
	var varArray = new Array();
	var intValue;
	var lngProduct = 0;
	var intCheckDigit;
	var idNumber = obj.value;
	var intStrLen = obj.value.length;
	if ((intStrLen != 15) && (intStrLen != 18)) {
		error = "输入身份证号码长度不正确！"; 
		alert(error); 
		obj.focus();
		obj.select();
		obj.value="";
		return false;
	}
	for (var i = 0; i < intStrLen; i++) {
		varArray[i] = idNumber.charAt(i);
		if ((varArray[i] < "0" || varArray[i] > "9") && (i != 17)) {
			error = "错误的身份证号码！"; 
			alert(error); 
			obj.focus();
			obj.select();
			obj.value="";
			return false;
		} else {
			if (i < 17) {
				varArray[i] = varArray[i] * factorArr[i];
			}
		}
	}
	if (intStrLen == 18) {
		var date8 = idNumber.substring(6, 14);
		if (checkDateId(date8) == false) {
			error = "身份证中日期信息不正确！"; 
			alert(error); 
			obj.focus();
			obj.select();
			obj.value="";
			return false;
		}
		for (var i = 0; i < 17; i++) {
			lngProduct = lngProduct + varArray[i];
		}
		intCheckDigit = 12 - lngProduct % 11;
		switch (intCheckDigit) {
		  case 10:
			intCheckDigit = "X";
			break;
		  case 11:
			intCheckDigit = 0;
			break;
		  case 12:
			intCheckDigit = 1;
			break;
		}
		if (varArray[17].toUpperCase() != intCheckDigit) {
			error = "身份证效验位错误!...正确为： " + intCheckDigit + "";
			alert(error); 
			obj.focus();
			obj.select();
			obj.value="";
			return false;
		}
	} else {
		var date6 = idNumber.substring(6, 12);
		if (checkDateId(date6) == false) {
			alert("身份证日期信息有误！"); 
			obj.focus();
			obj.select();
			obj.value="";
			return false;
		}
	}
	return true;
}

function checkDateId(date){    
	return true;
}

//判断日期格式
function CheckDate(obj) {
	var sDate = obj.value;
	var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var iaDate = new Array(3);
	var year, month, day;
	if (arguments.length != 1) {
		alert("程序里调用的参数有错，\n只能一个参数！");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	iaDate = sDate.toString().split("-");
	if (obj.value != "") {
		if (iaDate.length != 3) {
			alert("日期格式错误，正确格式：2000-01-01");
			obj.value = "";
			obj.focus();
			obj.select();
			return false;
		}
		if (iaDate[1].length > 2 || iaDate[2].length > 2) {
			alert("日期格式错误，正确格式：2000-01-01");
			obj.value = "";
			obj.focus();
			obj.select();
			return false;
		}
		year = parseFloat(iaDate[0]);
		month = parseFloat(iaDate[1]);
		day = parseFloat(iaDate[2]);
		if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
			iaMonthDays[1] = 29;
		}
		if (month < 1 || month > 12) {
			alert("月份错误，月份范围应在1-12之间!");
			obj.value = "";
			obj.focus();
			obj.select();
			return false;
		}
		if (day < 1 || day > iaMonthDays[month - 1]) {
			alert("日期错误，日期范围应在1-" + iaMonthDays[month - 1] + "之间");
			obj.value = "";
			obj.focus();
			obj.select();
			return false;
		}
		var reg = /^\d{4}-((0[1-9]{1})|([1-9]{1})|(1[0-2]{1}))-((0[1-9]{1})|([1-9]{1})|([1-2]{1}[0-9]{1})|(3[0-1]{1}))$/;
		if (!reg.test(obj.value)) {
			alert("日期格式错误，正确格式：2000-01-01");
			obj.value = "";
			obj.focus();
			obj.select();
			return false;
		}
	}
}
//判断是否为数字
function checkNumber(input)
{
try  
  { if(isValidate){return true;}
}catch(err)  
{}
  str = input.value;
  var allValid = true;
  if(str==""){return false;}
  try
  {
	if(parseFloat(str)!=str) allValid = false;
  }
  catch(ex)
  {
	allValid = false;
  }
  if(!allValid){
	alert("输入的数据必须是数字");
	input.value="";
	input.focus();
	return false;
  }
  return true;
}
//判断是否为数字
function checkNumbers(input)
{
  str = input.value;
  var allValid = true;
  if(str==""){return false;}
  try
  {
	if(parseFloat(str)!=str) allValid = false;
  }
  catch(ex)
  {
	allValid = false;
  }
  if(str > 1000){
	alert("输入的数字必选小于1000");
	input.value="";
	input.focus();
	return false;
	}
  if(!allValid){
	alert("输入的数据必须是数字");
	input.value="";
	input.focus();
	return false;
  }
  return true;
}
//判断是否为整数
function checkInteger(input){
	str = input.value;
  	var allValid = true;
  	if(str==""){return false;}
 	try{
		if(parseInt(str)!=str) allValid = false;
  	} catch(ex){
		allValid = false;
	}
	if(!allValid){
		alert("输入的数据必须是整数！");
		input.value="";
		input.focus();
		return false;
  	}
  	return true;
}

//判断是否是字符或数字
function checkLetter(input){
	if (input.value == "") return false;
	if(/[^0-9a-zA-Z]/g.test(input.value)){
		alert("必须输入字符或数字");
		input.value="";
		input.focus();
		return false;
	}
	return true;
}
//去除字符串空格
function trim(input){
	return input.replace(/^\s+/g,"").replace(/\s+$/g,"");
}
//判断年月脚本函数yyyyMM
function checkYearMonth(input){
	if (input.value == "") return false;
	if(trim(input.value) != ""){
		var reg = /^\d{4}(0[1-9]{1})|(1[0-2]{1})$/;
		if(!reg.test(input.value) || input.value.length != 6){
			alert("格式错误,正确格式为200701");
			input.value = "";
			input.focus();
			return false;
		}
	}
	return true;
}

/////////////////////////////////////////////////////批量操作选择弹出iframe
function ChooseHiddenframe(basePath){
	var tmpWidth = 200;
	var tmpHeight = 200;
	var tmpUrl = basePath;
	var ChooseType="";
	if(document.all.isOutJoin.value=='false')
		ChooseType= document.all.ZdSzNr.value.substring(document.all.ZdSzNr.value.lastIndexOf(":")+1);
	else
		ChooseType = document.all.ZdSzNr.value.substring(0,document.all.ZdSzNr.value.indexOf(":"))+"::"+document.all.ZdSzNr.value.substring(document.all.ZdSzNr.value.lastIndexOf(":")+1);
	switch(ChooseType){
	  case "gymc":		//公寓信息
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "fjzfbz":		//资费标准
	    tmpWidth = "340";
	    tmpHeight = "300";
	    break;
	  case "xbmb":		//性别编码
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "lxtjsm":		//离校条件
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "xn":		//学年
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "xq":   //学期
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "jllbmc":		//奖励类别
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "fxqmc":		//分校区名称
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "gyqmc":		//公寓区名称
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;  
	  case "lcbh":     //楼层
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "fjbh":    //房间
	  	tmpWidth = "450";
	    tmpHeight = "400";
	    break;
	  case "wpsm":   //物品
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "jgxm":   //军训教官
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "cdmc":   //军训场地
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "jxxmmc":   //军训项目
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "jxmc":   //军训名称
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "tzbzxmmc":   //体制健康标准项目
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	  case "zhcpxmmc":   //综合测评项目
	    tmpWidth = "320";
	    tmpHeight = "300";
	    break;
	}
    tmpUrl = tmpUrl+ "/selectDictionary.do?method=execute&isOutJoin="+document.all.isOutJoin.value+"&type=" + ChooseType;
	var abe=getLTWH(document.getElementById('ZdSzValue'));
	document.getElementById("hiddenframe").style.position = "absolute";
    document.getElementById("hiddenframe").style.border = 0;
	document.getElementById("hiddenframe").width = tmpWidth;
	document.getElementById("hiddenframe").height = tmpHeight;
    document.getElementById("hiddenframe").style.pixelLeft = abe.left;
	document.getElementById("hiddenframe").style.top = abe.top - tmpHeight - 2;
	document.getElementById("hiddenframe").style.display = "";
	window.frames["hiddenframe"].location = tmpUrl;	
}

/// 找出元素在页面中的坐标和高度,宽度
///element  页面元素
/// <returns>返回元素的绝对Left,Top,Width,Heihgt</returns>
function getLTWH(element) { 
    if ( arguments.length != 1 || element == null )  { 
        return null; 
    } 
    var offsetTop = element.offsetTop; 
    var offsetLeft = element.offsetLeft; 
    var offsetWidth = element.offsetWidth; 
    var offsetHeight = element.offsetHeight; 
    while( element = element.offsetParent ) { 
        offsetTop += element.offsetTop; 
        offsetLeft += element.offsetLeft; 
    } 
    var Abe={
       left:offsetLeft,
       top:offsetTop,
       width:offsetWidth,
       height:offsetHeight
    }
    return Abe;
} 
///////////////选择按钮弹出iframe
function selectFrame(dmField,mcField,ChooseType)
{
	var tmpWidth = "";
	var tmpHeight = "";
	var tmpUrl = "";
	var tmpChooseType = ChooseType;
	var tmpRight = "";
	var strhql="";
	switch(tmpChooseType.toLowerCase())
	{
	   case "bzkzy":		     //选择部颁专业
			tmpWidth = "255";
			tmpHeight = "262";
			break;
	}
    tmpUrl = "../ggxx/selectFrame.do?method=select&type=" + tmpChooseType;
	var abe=getLTWH(document.getElementById(mcField));
	document.getElementById("hiddenframe").style.position = "absolute";
	document.getElementById("hiddenframe").style.border="0px ";
	document.getElementById("hiddenframe").width = tmpWidth;
	document.getElementById("hiddenframe").height = tmpHeight;
	document.getElementById("hiddenframe").style.pixelLeft = abe.left;
	document.getElementById("hiddenframe").style.top = abe.top+abe.height;
	document.getElementById("hiddenframe").style.display = "";
	window.frames["hiddenframe"].location = tmpUrl+"&dmField="+dmField+"&mcField="+mcField+"";	
}

//判断日期格式2 yyyyMMdd
function CheckDate2(obj) {
	if (obj.value == "") return false;
	var sDate = obj.value;
	var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var iaDate = new Array(3);
	if (sDate.length != 8) {
		alert("日期格式错误，正确格式：20080101");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	iaDate[0] = sDate.substring(0, 4);
	iaDate[1] = sDate.substring(4, 6);
	iaDate[2] = sDate.substring(6, 8);
	var year, month, day;
	if (arguments.length != 1) {
		alert("程序里调用的参数有错，\n只能传入1个参数！");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	if (iaDate[1].length > 2 || iaDate[2].length > 2) {
		alert("日期格式错误，正确格式：20080101");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	year = parseFloat(iaDate[0]);
	if (sDate.substring(4, 5) != "0") {
		month = parseFloat(iaDate[1]);
	} else {
		month = parseFloat(sDate.substring(5, 6));
	}
	if (sDate.substring(6, 7) != "0") {
		day = parseFloat(iaDate[2]);
	} else {
		day = parseFloat(sDate.substring(7, 8));
	}
	if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
		iaMonthDays[1] = 29;
	}
	if (month < 1 || month > 12) {
		alert("月份错误，月份范围应在1-12之间!");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	if (day < 1 || day > iaMonthDays[month - 1]) {
		alert("日期错误，日期范围应在" + iaMonthDays[month - 1] + "之间");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	var reg = /^\d{4}((0[1-9]{1})|([1-9]{1})|(1[0-2]{1}))((0[1-9]{1})|([1-9]{1})|([1-2]{1}[0-9]{1})|(3[0-1]{1}))$/;
	if (!reg.test(obj.value)) {
		alert("日期格式错误，正确格式：20080101");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}
//判断日期格式2 yyyyMMdd
//参数flag是否需要判断截止日期大于开始日期
function CheckDateAndValidate(qsrq,jzrq) {
	if (jzrq.value == "") return false;
	var sDate = jzrq.value;
	var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var iaDate = new Array(3);
	if (sDate.length != 8) {
		alert("日期格式错误，正确格式：20080101");
		jzrq.value = "";
		jzrq.focus();
		jzrq.select();
		return false;
	}
	iaDate[0] = sDate.substring(0, 4);
	iaDate[1] = sDate.substring(4, 6);
	iaDate[2] = sDate.substring(6, 8);
	var year, month, day;
	if (iaDate[1].length > 2 || iaDate[2].length > 2) {
		alert("日期格式错误，正确格式：20080101");
		jzrq.value = "";
		jzrq.focus();
		jzrq.select();
		return false;
	}
	year = parseFloat(iaDate[0]);
	if (sDate.substring(4, 5) != "0") {
		month = parseFloat(iaDate[1]);
	} else {
		month = parseFloat(sDate.substring(5, 6));
	}
	if (sDate.substring(6, 7) != "0") {
		day = parseFloat(iaDate[2]);
	} else {
		day = parseFloat(sDate.substring(7, 8));
	}
	if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
		iaMonthDays[1] = 29;
	}
	if (month < 1 || month > 12) {
		alert("月份错误，月份范围应在1-12之间!");
		jzrq.value = "";
		jzrq.focus();
		jzrq.select();
		return false;
	}
	if (day < 1 || day > iaMonthDays[month - 1]) {
		alert("日期错误，日期范围应在" + iaMonthDays[month - 1] + "之间");
		jzrq.value = "";
		jzrq.focus();
		jzrq.select();
		return false;
	}
	var reg = /^\d{4}((0[1-9]{1})|([1-9]{1})|(1[0-2]{1}))((0[1-9]{1})|([1-9]{1})|([1-2]{1}[0-9]{1})|(3[0-1]{1}))$/;
	if (!reg.test(jzrq.value)) {
		alert("日期格式错误，正确格式：20080101");
		jzrq.value = "";
		jzrq.focus();
		jzrq.select();
		return false;
	}
	checkDataIsValid(qsrq,jzrq);
}
//判断截止日期必须大于开始日期
function checkDataIsValid(qsrq,jzrq){
		var qsdata = new Array(3);
		var jzdata = new Array(3);
		qsdata[0] = qsrq.value.substring(0, 4);
		qsdata[1] = qsrq.value.substring(4, 6);
		qsdata[2] = qsrq.value.substring(6, 8);
		if(null!=jzrq.value && ""!=jzrq.value){
			jzdata[0] = jzrq.value.substring(0, 4);
			jzdata[1] = jzrq.value.substring(4, 6);
			jzdata[2] = jzrq.value.substring(6, 8);
			if(qsdata[0]>jzdata[0]){
				alert("截止日期不能小于起始日期!");
				jzrq.focus();
				jzrq.select();
				return false;
			}else if(qsdata[0]==jzdata[0]){
				if(qsdata[1]>jzdata[1]){
					alert("截止日期不能小于起始日期!");
					jzrq.focus();
					jzrq.select();
					return false;
				}else if(qsdata[1]==jzdata[1]){
					if(qsdata[2]>jzdata[2]){
						alert("截止日期不能小于起始日期!");
						jzrq.focus();
						jzrq.select();
						return false;
					}else if(qsdata[2]==jzdata[2]){
						if(qsdata[3]>=jzdata[3]){
							alert("截止日期不能小于起始日期!");
							jzrq.focus();
							jzrq.select();
							return false;
						}
					}
				}
				return true;
			}
		}
		return true;
	}
//判断年份yyyy
function CheckYear(obj){
	if (arguments.length != 1) {
		alert("程序里调用的参数有错，\n只能传入1个参数！");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	if (obj.value == "") return false;
	if (obj.value.length != 4) {
		alert("日期格式错误，正确格式：2008");
		obj.value = "";
		obj.focus();
		obj.select();
		
		return false;
	}
	var reg=new RegExp("^\\d{4}$");
	if(!reg.test(obj.value)){
		alert("日期格式错误，正确格式：2008");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	var year = parseFloat(obj.value);
	if (year < 1970 || year > 2050){
		alert("年份输入错误!");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
}

//判断日期格式3 yyyyMM
function CheckDate3(obj) {
	if (arguments.length != 1) {
		alert("程序里调用的参数有错，\n只能传入1个参数！");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	if (obj.value == "") return false;
	var sDate = obj.value;
	var iaDate = new Array(2);
	if (sDate.length != 6) {
		alert("日期格式错误，正确格式：200801");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	var reg =  /^(\d{4})(\d{2})$/;
	if (!reg.test(obj.value)) {
		alert("日期格式错误，正确格式：200801");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	iaDate[0] = sDate.substring(0, 4);
	iaDate[1] = sDate.substring(4, 6);
	var year, month;
	year = parseFloat(iaDate[0]);
	if (year < 1970 || year > 2050){
		alert("年份输入错误!");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	if (sDate.substring(4, 5) != "0") {
		month = parseFloat(iaDate[1]);
	} else {
		month = parseFloat(sDate.substring(5, 6));
	}
	if (month < 1 || month > 12) {
		alert("月份错误，月份范围应在1-12之间!");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}


//验证EMAIL格式
function ValidateEmail(obj){
	if (obj.value == "") return false;
    var emailReg=/^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailReg.test(obj.value)) {
		alert("email格式错误！正确格式：admin@qzsoft.com");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}
//设置cookie，默认保持30天
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date(); 
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	//document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取cookie
function getCookie(name) {
	//var arr = document.cookie.match(new RegExp("(^|   )" + name + "=([^;]*)(;|$)"));
	var arr = document.cookie.split(";");
	if (arr != null) {
		for(var i=0;i<arr.length;i++) {
			var theTmp = arr[i].split("=");
			if(name == trimstr(theTmp[0])) 
				return unescape(theTmp[1]);
		}
	}
	return "";
}
//删除一个cookie
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) {
		//document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}
//验证一个地址是否是IP地址
function isIPa(obj) { 
	if (obj.value == "") return false;
	var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g 
	if(re.test(obj.value)){ 
		if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true; 
	}
	alert("IP地址格式错误，正确格式：192.168.1.1");
	obj.value = "";
	obj.focus();
	obj.select();
	return false; 
}
//日期时间检查  
//格式为：YYYY-MM-DD HH:MM:SS  
function CheckDateTime(obj){
	if (obj.value == "") return false;
    var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
    var reg1 = /^(\d+)-(\d{1,2})-(\d{1,2})$/; 
    var r = obj.value.match(reg); 
    var r1 = obj.value.match(reg1);
    if(r==null&&r1!=null){
    	obj.value = obj.value+" 00:00:00";
    }
    r = obj.value.match(reg); 
    if(r==null){
    	alert("日期时间格式错误，正确格式为：yyyy-MM-dd hh:mm:ss");
		obj.value = "";
		obj.focus();
		obj.select();
    	return false;
    }
    r[2]=r[2]-1;   
    var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]);
    if(d.getFullYear()!=r[1] || d.getMonth()!=r[2] 
    	|| d.getDate()!=r[3] || d.getHours()!=r[4] 
    	|| d.getMinutes()!=r[5] || d.getSeconds()!=r[6]){
    	alert("日期时间格式错误，正确格式为：yyyy-MM-dd hh:mm:ss");
		obj.value = "";
		obj.focus();
		obj.select();
    	return false;
    }
    return true;   
}

//跳转到你指定的PATH
function GoYourPath(path){
	window.location.href = path;
}

//判断是否为数字和正数 
function checkNumberIsTun(input)
{
  str = input.value;
  var allValid = true;
  
    if(str==""){return false;}
    
    if( str.substr(0,1) =="0" &&  str.substr(1,1)!=".")
	{
	  alert("输入格式错误！");
	  input.value="";
	  input.focus();
	  return false;
	}
	
	try
	 {
		if(parseFloat(str,10)!=str) allValid = false;
	 }
	 catch(ex)
	 {
		allValid = false;
	 }
  if(!allValid){
	alert("输入的数据必须是数字!");
	input.value="";
	input.focus();
	return false;
  }
  else if(eval(str) <= 0)
  {
  	alert("输入的数据必须大于零!");
  	input.value="";
	input.focus();
	return false;
  }
  else if(eval(str) > 9999999999.99)
  {
	alert("数据过大,必须小于百亿!");
	input.value="";
	input.focus();
	return false;
  }
    return true;
}
//判断是否为数字和正数 
function checkNumberIsTuns(input)
{
  str = input.value;
  var allValid = true;
  
    if(str==""){return false;}
    
     
	try
	 {
		if(parseFloat(str,10)!=str) allValid = false;
	 }
	 catch(ex)
	 {
		allValid = false;
	 }
  if(!allValid){
	alert("输入的数据必须是数字!");
	input.value="";
	input.focus();
	return false;
  }
  else if(eval(str) < 0)
  {
  	alert("输入的数据必须大于零!");
  	input.value="";
	input.focus();
	return false;
  }
  else if(eval(str) > 9999999999.99)
  {
	alert("数据过大,必须小于百亿!");
	input.value="";
	input.focus();
	return false;
  }
    return true;
}
//判断是否为整数和正数
function checkIntegerIsTun(input)
{
	str = input.value;
  	var allValid = true;
  	if(str==""){return false;}
 	try{
		if(parseInt(str,10)!=str) allValid = false;
  	} 
  	catch(ex)
  	{
		allValid = false;
	}
	if(!allValid){
		alert("输入的数据必须是整数!");
		input.value="";
		input.focus();
		return false;
  	}
  	else if(str <= 0)
    {
      alert("输入的数据必须大于零!");
  	  input.value="";
	  input.focus();
	  return false;
    }
    else if(eval(str) > 99999999)
  	{
	  alert("数据过大,必须小于亿!");
	  input.value="";
	  input.focus();
	  return false;
  	}
  	return true;
}

//判断是否为数字和正数
function checkNumberIsMoney(input)
{
  str = input.value;
  var allValid = true;
  if(str==""){return false;}
  
    if( str.substr(0,1) =="0" &&  str.substr(1,1)!=".")
	{
	  alert("输入格式错误！");
	  input.value="";
	  input.focus();
	  return false;
	}
	try
	 {
		if(parseFloat(str,10)!=str) allValid = false;
	 }
	 catch(ex)
	 {
		allValid = false;
	 }
	 
  if(!allValid){
	alert("输入的数据必须是数字!");
	input.value="";
	input.focus();
	return false;
  }
  else if(eval(str) <= 0)
  {
  	alert("输入的数据必须大于零!");
  	input.value="";
	input.focus();
	return false;
  }
  else if(eval(str) > 999999989999999999.99)
  {
	alert("数据过大!");
	input.value="";
	input.focus();
	return false;
  }
    return true;
}
/****************************************************************************
* 谢平20080924增加一系列检查JS方法
****************************************************************************/
//通过id获得这个对象的值
function getValue(idOrName) {
	return document.getElementById(idOrName).value;
}
//通过id获得对象
function getObj(idOrName) {
	return document.getElementById(idOrName);
}

//检查输入对象是否为空
function isEmpty(s) {
	var bool = false;
	if (s == null || trimstr(s) == "")
		bool = true;
	return bool;
}

//检查用户输入字段是否超过指定长度
function checkInputValueLength(inStr, length) {
	if ((inStr == null) || (trimstr(inStr) == "")) {
		return true;
	}
	if (inStr.length > length) {
		return true;
	}
	return false;
}

//检查用户输入字段长度在两个数之间
function checkInputBetween(inStr, limitLen, maxLen) {
	if ((inStr == null) || (trimstr(inStr) == "")) {
		return false;
	}
	if ((inStr.length < limitLen) || (inStr.length > maxLen)) {
		return true;
	}
	return false;
}

//将查两个字符串是否相等
function checkTwoString(str1, str2) {
	return (str1 == str2);
}

//过滤掉字符串 sString 中的空格，返回过滤后的字符串
function tFilterSpace(sString) {
	var re;
	re = / /g;
	return sString.replace(re, "");
}

//检查字符串1(findval)在字符串2(val)中出现的次数
function stringAppearCount(findval, val) {
	var v1 = 0;
	var v2 = 0;
	while (v1 != -1 && v1 < val.length) {
		v1 = val.indexOf(findval, v1);
		if (v1 >= 0) {
			v1++;
			v2++;
		}
	}
	return v2;
}

//检查字符串1(findval)在字符串2(val)中出现第几次(val3)时的位置
function stringAppearPlace(findval, val, val3) {
	var v1 = 0;
	while (val3 > 0 && v1 != -1 && v1 < val.length) {
		v1 = val.indexOf(findval, v1);
		if (v1 >= 0) {
			v1 = v1 + findval.length;
			val3--;
		}
	}
	if (v1 > 0) {
		v1 = v1 - findval.length();
	}
	return v1;
}
//检查字符串长度是否符合要求
function stringCheckLength(val, val3) {
		if (val.length > val3) {
			alert("输入长度大于"+val3);
			return false;
		}
}
//字符转换为UTF-8编码
function EncodeUtf8(s1)
{
      var s = escape(s1);
      var sa = s.split("%");
      var retV ="";
      if(sa[0] != "")
      {
         retV = sa[0];
      }
      for(var i = 1; i < sa.length; i ++)
      {
           if(sa[i].substring(0,1) == "u")
           {
               retV += Hex2Utf8(Str2Hex(sa[i].substring(1,5)));
              
           }
           else retV += "%" + sa[i];

		   if (sa[i].length > 5)
		   {
		      retV += sa[i].substring(5);
		   } 
		   
		   
      }
     
      return retV;
}
function Str2Hex(s)
{
      var c = "";
      var n;
      var ss = "0123456789ABCDEF";
      var digS = "";
      for(var i = 0; i < s.length; i ++)
      {
         c = s.charAt(i);
         n = ss.indexOf(c);
         digS += Dec2Dig(eval(n));
          
      }
      //return value;
      return digS;
}
function Dec2Dig(n1)
{
      var s = "";
      var n2 = 0;
      for(var i = 0; i < 4; i++)
      {
         n2 = Math.pow(2,3 - i);
         if(n1 >= n2)
         {
            s += '1';
            n1 = n1 - n2;
          }
         else
          s += '0';
         
      }
      return s;
     
}
function Dig2Dec(s)
{
      var retV = 0;
      if(s.length == 4)
      {
          for(var i = 0; i < 4; i ++)
          {
              retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
          }
          return retV;
      }
      return -1;
}
function Hex2Utf8(s)
{
     var retS = "";
     var tempS = "";
     var ss = "";
     if(s.length == 16)
     {
         tempS = "1110" + s.substring(0, 4);
         tempS += "10" + s.substring(4, 10);
         tempS += "10" + s.substring(10,16);
         var sss = "0123456789ABCDEF";
         for(var i = 0; i < 3; i ++)
         {
            retS += "%";
            ss = tempS.substring(i * 8, (eval(i)+1)*8);
           
           
           
            retS += sss.charAt(Dig2Dec(ss.substring(0,4)));
            retS += sss.charAt(Dig2Dec(ss.substring(4,8)));
         }
         return retS;
     }
     return "";
} 


function createTableSetDiv()
{
	var s_array_newtitle = "";
	var s_array_newmc = "";
	var s_array_title = "";
	var s_array_mc = "";
	var _s_array_newtitle = "";
	var _s_array_newmc = "";
	var _s_array_title = "";
	var _s_array_mc = "";
	var _tableFields = document.getElementById("tableFields").value.split(/,/g);
	var _otherFields = document.getElementById("otherFields").value.split(/,/g);
	
	for(var i=0;i<_tableFields.length;i++) {
		_s_array_newtitle = _s_array_newtitle + "," + _tableFields[i].substring(0,_tableFields[i].indexOf(":"));
		_s_array_newmc = _s_array_newmc + "," + _tableFields[i];
	}
	for(var i=0;i<_otherFields.length;i++) {
		_s_array_title = _s_array_title + "," + _otherFields[i].substring(0,_otherFields[i].indexOf(":"));
		_s_array_mc = _s_array_mc + "," + _otherFields[i];
	}
	_s_array_newtitle = _s_array_newtitle.replace(",","");
	_s_array_newmc = _s_array_newmc.replace(",","");
	_s_array_title = _s_array_title.replace(",","");
	_s_array_mc = _s_array_mc.replace(",","");
	s_array_newtitle = _s_array_newtitle.split(/,/g);
	s_array_newmc = _s_array_newmc.split(/,/g);
	s_array_title = _s_array_title.split(/,/g);
	s_array_mc = _s_array_mc.split(/,/g);
	
	var tmpoptions = "";
	var tblhtml = "<table border=\"0\" width=\"100%\"  bordercolorlight=\"#cccccc\" cellspacing=\"0\" cellpadding=\"0\" bordercolor=\"#cccccc\" bordercolordark=\"#FFFFFF\">";
	tblhtml = tblhtml + "<tr><td width=\"45%\" align=\"center\">待显示字段</td><td>&nbsp;</td><td width=\"45%\" align=\"center\">已显示字段</td></tr>";
	tblhtml = tblhtml + "<tr align=\"center\">";
	
	for(i=0;i<s_array_title.length;i++)
	{
		if(s_array_title[i] != "")
			tmpoptions = tmpoptions + "<option value=\""+s_array_mc[i]+"\">"+s_array_title[i]+"</option>";
	}		
	tblhtml = tblhtml + "<td><select name=\"dShowField\"  id=\"dShowField\"  size=\"15\" style=\"width:150\" >"+tmpoptions+"</select></td>";
	tblhtml = tblhtml + "<td><input type=\"button\" class=\"button\" name=\"TableShowLeft\"  id=\"TableShowLeft\"  value=\"右移\" ><br><br><input type=\"button\" class=\"button\" name=\"TableShowRight\"  id=\"TableShowRight\"  value=\"左移\" ><br><br><input type=\"button\" class=\"button\"  name=\"TableShowTop\"  id=\"TableShowTop\"  value=\"上移\" ><br><br><input type=\"button\" class=\"button\" name=\"TableShowBottom\"  id=\"TableShowBottom\"  value=\"下移\"  ></td>";
	
	tmpoptions = "";
	for(i=0;i<s_array_newtitle.length;i++)
	{
		if(s_array_newtitle[i] != "")
			tmpoptions = tmpoptions + "<option value=\""+s_array_newmc[i]+"\">"+s_array_newtitle[i]+"</option>";
	}	
	
	tblhtml = tblhtml + "<td><select name=\"YShowField\"  id=\"YShowField\"  size=\"15\" style=\"width:150\"  >"+tmpoptions+"</select></td>";
	tblhtml = tblhtml + "</tr>";
	tblhtml = tblhtml + "<tr><td colspan=3 align=\"center\"><input type=\"button\" class=\"button\" name=\"TableShowOk\"  id=\"TableShowOk\"  value=\"确定\"  >&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"button\" class=\"button\" name=\"TableShowCancel\"  id=\"TableShowCancel\"  value=\"取消\"  ></td></tr></table>";
	
	var tmpdiv = document.createElement("DIV");
	tmpdiv.id = "TblShowSetDiv";
	tmpdiv.style.position = "absolute";
	tmpdiv.style.zIndex = 2;
	tmpdiv.style.width = 360;
	tmpdiv.style.height = 280;
	tmpdiv.style.left = document.getElementById('alldiv').offsetLeft+2;
	tmpdiv.style.top = document.getElementById('alldiv').offsetTop+2;
	tmpdiv.style.backgroundColor = "#F5F7F9";
	tmpdiv.style.overflow = "auto";
	tmpdiv.innerHTML = tblhtml;
	document.body.appendChild(tmpdiv);
	
	document.getElementById("dShowField").ondblclick = LeftMoveShowField;
	
	document.getElementById("TableShowLeft").onclick = LeftMoveShowField;
	document.getElementById("TableShowLeft").onmouseover = new Function("this.style.cursor='hand';");
	
	document.getElementById("TableShowRight").onclick = RightMoveShowField;
	document.getElementById("TableShowRight").onmouseover = new Function("this.style.cursor='hand';");
	
	document.getElementById("TableShowTop").onclick = TopMoveShowField;
	document.getElementById("TableShowTop").onmouseover = new Function("this.style.cursor='hand';");
	
	document.getElementById("TableShowBottom").onclick = BottomMoveShowField;
	document.getElementById("TableShowBottom").onmouseover = new Function("this.style.cursor='hand';");
	
	document.getElementById("YShowField").ondblclick = RightMoveShowField;
	
	
	document.getElementById("TableShowOk").onclick = doChangeTableSet;
	document.getElementById("TableShowOk").onmouseover = new Function("this.style.cursor='hand';");
	
	document.getElementById("TableShowCancel").onclick = doCanCelTableSet;
	document.getElementById("TableShowCancel").onmouseover = new Function("this.style.cursor='hand';");
	
	
	document.getElementById('alldiv').disabled = true;
}

function doCanCelTableSet()
{
	if (document.getElementById('TblShowSetDiv') != null)
	{
		document.getElementById('TblShowSetDiv').removeNode(true);
	}
	document.getElementById('alldiv').disabled = false;
}

function LeftMoveShowField()
{
	var ObjdShowField = document.getElementById("dShowField");
	var ObjYShowField= document.getElementById("YShowField");
	
	if (ObjdShowField.selectedIndex >=0)
	{
		var newoption = document.createElement("OPTION");
		var tmpIndex = ObjdShowField.selectedIndex;
		ObjYShowField.options.add(newoption);
		newoption.innerText = ObjdShowField.options[tmpIndex].text;
		newoption.value = ObjdShowField.options[tmpIndex].value;
		ObjdShowField.options.remove(tmpIndex);
		if (tmpIndex < ObjdShowField.options.length)
		{
			ObjdShowField.selectedIndex = tmpIndex;
		}
	}
}

function RightMoveShowField()
{
	var ObjdShowField = document.getElementById("dShowField");
	var ObjYShowField= document.getElementById("YShowField");
	
	if (ObjYShowField.selectedIndex >=0)
	{
		var newoption = document.createElement("OPTION");
		var tmpIndex = ObjYShowField.selectedIndex;
		ObjdShowField.options.add(newoption);
		newoption.innerText = ObjYShowField.options[tmpIndex].text;
		newoption.value = ObjYShowField.options[tmpIndex].value;
		ObjYShowField.options.remove(tmpIndex);
		if (tmpIndex < ObjYShowField.options.length)
		{
			ObjYShowField.selectedIndex = tmpIndex;
		}
	}
}
function TopMoveShowField()
{	
	var ObjYShowField= document.getElementById("YShowField");
	if (ObjYShowField.selectedIndex > 0 )
	{
		var tmpIndex = ObjYShowField.selectedIndex -1;
		var tmpText = ObjYShowField.options[tmpIndex].text;
		var tmpValue = ObjYShowField.options[tmpIndex].value;
		
		ObjYShowField.options[tmpIndex].text = ObjYShowField.options[tmpIndex+1].text;
		ObjYShowField.options[tmpIndex].value = ObjYShowField.options[tmpIndex+1].value;
		
		tmpIndex = tmpIndex + 1;
		ObjYShowField.options[tmpIndex].text = tmpText;
		ObjYShowField.options[tmpIndex].value = tmpValue;
		
		ObjYShowField.selectedIndex = tmpIndex - 1;
		
	}
}
function BottomMoveShowField()
{
	var ObjYShowField= document.getElementById("YShowField");
	
	if (ObjYShowField.selectedIndex >= 0 && ObjYShowField.selectedIndex < ObjYShowField.options.length-1)
	{
		var tmpIndex = ObjYShowField.selectedIndex + 1;
		var tmpText = ObjYShowField.options[tmpIndex].text;
		var tmpValue = ObjYShowField.options[tmpIndex].value;
		
		ObjYShowField.options[tmpIndex].text = ObjYShowField.options[tmpIndex-1].text;
		ObjYShowField.options[tmpIndex].value = ObjYShowField.options[tmpIndex-1].value;
		
		tmpIndex = tmpIndex - 1;
		ObjYShowField.options[tmpIndex].text = tmpText;
		ObjYShowField.options[tmpIndex].value = tmpValue;
		
		ObjYShowField.selectedIndex = tmpIndex + 1;
		
	}
}

function doChangeTableSet()
{
	var ObjYShowField= document.getElementById("YShowField");
	var ObjDShowField= document.getElementById("dShowField");
	if (ObjYShowField.options.length == 0)
	{
		alert('请设置显示字段!');
		return false;
	}
	var tmpFieldMc_new = "";
	var tmpFieldMc_old = "";
	for(i=0;i<ObjYShowField.options.length;i++) {
		tmpFieldMc_new = tmpFieldMc_new + "," + ObjYShowField.options[i].value;
	}
	for(i=0;i<ObjDShowField.options.length;i++) {
		tmpFieldMc_old = tmpFieldMc_old + "," + ObjDShowField.options[i].value;
	}
	
	document.getElementById("tableFields").value = tmpFieldMc_new.replace(",","");
	document.getElementById("otherFields").value = tmpFieldMc_old.replace(",","") ;
	
	doCanCelTableSet();
	window.Form1.submit();
}

function findPositionY( obj ) {
  if( obj.offsetParent ) {
      for( var posX = 0, posY = 0; obj.offsetParent; obj = obj.offsetParent ) {
        posX += obj.offsetLeft;
        posY += obj.offsetTop;
      }
      return posY;
  } else {
      return obj.y;
  }
 }
 
 
 //********************************已下功能为批量修改时使用 开始*********************************
	var tableName = "";
	var option_value = "";
	var option_name = "";
	var option_where = "";
	function changeUpdateField(obj) {
		var update_field = obj.value.split(":")[0];
		var selectField;
		var selectField_update;
		if(selectFields != "") {
			selectField = selectFields.split("#");
		}
		
		if(selectField != undefined) {
			for(var i=0;i<selectField.length;i++) {
				if(update_field == selectField[i].split(":")[0]) {
					selectField_update = selectField[i];
					break;
				}
			}
			if(selectField_update != undefined) {
				//通过DWR查询
				if(selectField_update.split(":")[1] == 0) {
					tn = selectField_update.split(":")[2];
					ov = selectField_update.split(":")[3];
					on = selectField_update.split(":")[4];
					ow =  selectField_update.split(":")[5];
					DWREngine.setAsync(false);
					dwrMonitor.getforsj(tn,ov,on,ow,getDataResult);
				}
				//静态设置select
				if(selectField_update.split(":")[1] == 1) {
					var options = selectField_update.split(":")[2];
					var option = options.split("$");
					var ops = "";
					for(var j=0;j<option.length;j++) {
						option[j] = "'"+option[j].replace("|","':'")+"'";
						ops = ops + "," + option[j];
					}
					ops = ops.replace(",","");
					ops = "{"+ops+"}";
					document.getElementById("ZdSzValue_text").innerHTML = "";
					document.getElementById("ZdSzValue_select").innerHTML = "<select id=\"ZdSzValue\" name=\"ZdSzValue\"></select>"
					document.getElementById("ZdSzValue_select").style.visibility = "visible";
					DWRUtil.addOptions(ZdSzValue,objectEval(ops));
				}
				//外接JS方法
				if(selectField_update.split(":")[1] == 2) { 
					var jsMethod = "";
					if(selectField_update.indexOf("$id") >= 0) {
						jsMethod = selectField_update.split(":")[2].replace("$id","ZdSzValue").replace("$value","ZdSzValue_value");
						document.getElementById("ZdSzValue_text").innerHTML = "<input type=\"hidden\" id=\"ZdSzValue\" name=\"ZdSzValue\"><input type=\"text\" id=\"ZdSzValue_value\" name=\"ZdSzValue_value\" class=\"mytext\" size=\"15\" >"
						document.getElementById("ZdSzValue_value").readOnly = true;
						document.getElementById("ZdSzValue").readOnly = true;
					}else{
						jsMethod = selectField_update.split(":")[2].replace("$value","ZdSzValue");
						document.getElementById("ZdSzValue_text").innerHTML = "<input type=\"text\" id=\"ZdSzValue\" name=\"ZdSzValue\" class=\"mytext\" size=\"15\" >"
						document.getElementById("ZdSzValue").readOnly = true;
					}
					document.getElementById("ZdSzValue_select").innerHTML = "";
					
					document.getElementById("ZdSzValue_text").style.visibility = "visible";
					document.getElementById("cmdselect").style.visibility = "visible";
					document.getElementById("cmdselect").onclick = new Function(jsMethod);
				}
				//内接JS方法
				if(selectField_update.split(":")[1] == 3) {
					
					var jsMethod = "";
					if(selectField_update.indexOf("$id") >= 0) {
						jsMethod = selectField_update.split(":")[2].replace("$id","ZdSzValue").replace("$value","ZdSzValue_value");
						document.getElementById("ZdSzValue_text").innerHTML = "<input type=\"hidden\" id=\"ZdSzValue\" name=\"ZdSzValue\"><input type=\"text\" id=\"ZdSzValue_value\" name=\"ZdSzValue_value\" class=\"mytext\" size=\"15\" >"
						document.getElementById("ZdSzValue_value").readOnly = true;
						document.getElementById("ZdSzValue").readOnly = true;
					}else{
						jsMethod = selectField_update.split(":")[2].replace("$value","ZdSzValue");
						document.getElementById("ZdSzValue_text").innerHTML = "<input type=\"text\" id=\"ZdSzValue\" name=\"ZdSzValue\" class=\"mytext\" size=\"15\" >"
						//document.getElementById("ZdSzValue").readOnly = true;
					}
					document.getElementById("ZdSzValue_select").innerHTML = ""; 
					document.getElementById("ZdSzValue_text").style.visibility = "visible";
					document.getElementById("cmdselect").style.visibility = "hidden";
					document.getElementById("ZdSzValue").onclick = new Function(jsMethod);
				}
			}else{
				document.getElementById("ZdSzValue_select").innerHTML = "";
				document.getElementById("ZdSzValue_text").innerHTML = "<input type=\"text\" id=\"ZdSzValue\" name=\"ZdSzValue\" class=\"mytext\" size=\"15\" >"
				document.getElementById("ZdSzValue_text").style.visibility = "visible";
				if(obj.value == "") document.getElementById("ZdSzValue").readOnly = true;
			}
		}
	}
	
	function getDataResult(dataList) {
		document.getElementById("ZdSzValue_text").innerHTML = "";
		document.getElementById("ZdSzValue_select").innerHTML = "<select id=\"ZdSzValue\" name=\"ZdSzValue\"></select>"
		document.getElementById("ZdSzValue_select").style.visibility = "visible";
		DWRUtil.addOptions("ZdSzValue",dataList,0,1);
	}
	
//********************************已上功能为批量修改时使用 结束*********************************

//****************************已下功能为搜索时使用 开始********************************
	var query_index = 0;
	function isHiddenSelect(obj,indexf,oldValue) {
		//如果原来是个选择框，则不用设置默认值。
		if(document.getElementById("SValue"+indexf+"_select").innerHTML != "")
		{
			oldValue = "";
		}
	
		query_index = indexf;
		var update_field = obj.value.split(":")[0];
		var selectField;
		var selectField_update;
		if(selectFields_query != "") {
			selectField = selectFields_query.split("#");
		}
		
		for(var i=0;i<selectField.length;i++) {
			if(update_field == selectField[i].split(":")[0]) {
				selectField_update = selectField[i];
				break;
			}
		}
		if(selectField_update != undefined) {
			//通过DWR查询
			if(selectField_update.split(":")[1] == 0) {
				tn = selectField_update.split(":")[2];
				ov = selectField_update.split(":")[3];
				on = selectField_update.split(":")[4];
				ow =  selectField_update.split(":")[5];
				DWREngine.setAsync(false);
				dwrMonitor.getforsj(tn,ov,on,ow,getDataResultForQuery);
				
				document.getElementById("submit_select_hidden"+query_index).value = "";
				document.getElementById("submit_select_hidden"+query_index).style.visibility = "hidden";
			}
			//静态设置select
			if(selectField_update.split(":")[1] == 1) {
				var options = selectField_update.split(":")[2];
				var option = options.split("$");
				var ops = "";
				for(var j=0;j<option.length;j++) {
					option[j] = "'"+option[j].replace("|","':'")+"'";
					ops = ops + "," + option[j];
				}
				ops = ops.replace(",","");
				ops = "{"+ops+"}";
				document.getElementById("SValue"+query_index+"_text").innerHTML = "";
				document.getElementById("SValue"+query_index+"_select").innerHTML = "<select id=\"SValue"+query_index+"\" name=\"SValue"+query_index+"\"></select>"
				document.getElementById("SValue"+query_index+"_select").style.visibility = "visible";
				DWRUtil.addOptions("SValue"+query_index,{'':'--全选--'}); 
				DWRUtil.addOptions("SValue"+query_index,objectEval(ops));
				
				document.getElementById("submit_select_hidden"+query_index).value = "";
				document.getElementById("submit_select_hidden"+query_index).style.visibility = "hidden";
			}
			//外接JS方法
			if(selectField_update.split(":")[1] == 2) {
				var jsMethod = selectField_update.split(":")[2].replace("$value","SValue"+query_index);
				
				document.getElementById("SValue"+query_index+"_select").innerHTML = "";
				document.getElementById("SValue"+query_index+"_text").innerHTML = "<input type=\"text\" id=\"SValue"+query_index+"\" name=\"SValue"+query_index+"\" class=\"mytext\" value=\"" + oldValue + "\" size=\"10\" >"
				document.getElementById("SValue"+query_index+"_text").style.visibility = "visible";
				document.getElementById("submit_select_hidden"+query_index).value = "选择";
				document.getElementById("submit_select_hidden"+query_index).style.visibility = "visible";
				document.getElementById("submit_select_hidden"+query_index).onclick = new Function(jsMethod);
			}
		}else{
			document.getElementById("SValue"+query_index+"_select").innerHTML = "";
			document.getElementById("SValue"+query_index+"_text").innerHTML = "<input type=\"text\" id=\"SValue"+query_index+"\" name=\"SValue"+query_index+"\" class=\"mytext\" value=\"" + oldValue + "\" size=\"10\" >"
			document.getElementById("SValue"+query_index+"_text").style.visibility = "visible";
			if(obj.value == "") document.getElementById("SValue"+query_index).readOnly = true;
			
			document.getElementById("submit_select_hidden"+query_index).value = "";
			document.getElementById("submit_select_hidden"+query_index).style.visibility = "hidden";
		}
	}
	
	function getDataResultForQuery(dataList) {
		document.getElementById("SValue"+query_index+"_text").innerHTML = "";
		document.getElementById("SValue"+query_index+"_select").innerHTML = "<select id=\"SValue"+query_index+"\" name=\"SValue"+query_index+"\"></select>"
		document.getElementById("SValue"+query_index+"_select").style.visibility = "visible";
		DWRUtil.addOptions("SValue"+query_index,{'':'--全选--'}); 
		DWRUtil.addOptions("SValue"+query_index,dataList,0,1);
	}
//**************************************已上功能为搜索时使用结束*****************************************

/*****************************以下功能为查询返回后保存原有状态使用********************************/
var dir = location.href.substring(0,location.href.lastIndexOf('/')+1);
var radomLen = location.href.lastIndexOf('&tktime');
if(radomLen == -1)
{
	radomLen = location.href.length;
}
var courrentUrl = location.href.substring(dir.length,radomLen);
radomLen = courrentUrl.lastIndexOf('?tktime');
if(radomLen == -1)
{
	radomLen = courrentUrl.length;
}
courrentUrl = courrentUrl.substring(0, radomLen);

/**
 * 保存搜索数据
 */
function saveSearchData() {
	var searchStr = "";
	searchStr = searchStr + processSearchStr();
	searchStr = "{"+searchStr.replace(",","")+"}";
	dwrMonitor.setSearchBaseBean(courrentUrl + user,objectEval(searchStr));
}
/**
 * 处理搜索数据
 */
function processSearchStr() {
	var searchStr = "";
	var divObj = document.getElementById("search_values");

	if(divObj != null) {
		var inputData = divObj.getElementsByTagName("input");
		var selectData = divObj.getElementsByTagName("select");
		for(var i=0;i<inputData.length;i++) {
			if(inputData[i].type != "button" && inputData[i].type != "reset") {
				searchStr = searchStr + "," + inputData[i].name + ":'" + inputData[i].value + "'";
			}
		}
		for(var j=0;j<selectData.length;j++) {
			searchStr = searchStr + "," + selectData[j].name + ":'" + selectData[j].value + "'";
		}
	}
	
	return searchStr;
}
	var isCompleInit=true;
	function initSearchValue() {
	isCompleInit=false;
		DWREngine.setAsync(false);
		dwrMonitor.getSearchValue(searchValue);
		isCompleInit=true;
	}
	function searchValue(mapObj) {
		var value = mapObj[courrentUrl + user];
		if(value != null) {
			var divObj = document.getElementById("search_values");
			if(divObj != null) {
				var inputData = divObj.getElementsByTagName("input");
				var selectData = divObj.getElementsByTagName("select");
			    
				for(var i=0;i<inputData.length;i++) {
					if(inputData[i].type != "button" && inputData[i].type != "reset") {
							if(value[inputData[i].name] != undefined)
							   inputData[i].value = value[inputData[i].name];
					}
				}
				//for(var j=0;j<selectData.length;j++) {
				//		if(value[selectData[j].name] != undefined) {
				//		   selectData[j].value = value[selectData[j].name];
				//		}
				//}
				for(var j=0;j<selectData.length;j++) {
					if(value[selectData[j].name] != undefined) {
						selectData[j].value = value[selectData[j].name];
						//正则表达式过滤id或name为特殊字符的select，不过滤则会报错：Syntax error, unrecognized expression: #zcjfh option[value=<>]
						var pattern = new RegExp("[~'!@#￥$%^&*()-+_=<>:.]");
						//select的选择项为空时则不重新触发onchange事件.
						if(!pattern.test(selectData[j].value) && selectData[j].value!="" ){
							//根据保存的搜索条件选中select的某一项并触发一次change事件
						  	var selectOnChange="#"+selectData[j].name;//修改原因为当option值中有空格时初始化会报错
						  	$(selectOnChange).trigger('change');
						}
					}
				}
			}
		}
	}
	/*****************************以上功能为查询返回后保存原有状态使用********************************/
	
  
  /*****************************以下功能为生成ajax树使用********************************/
  var dataList;
  var parameter = "";
  var sunParameter = "";
  var beanName;
  var pName;
  var idName;
  var showName;
  var defaultPValue="0";
  function setParameter(name,value) {
  	  if(this.parameter == "") {
  	  	 parameter = name + ":'" + value + "'";
  	  }else{
  	  	 parameter = parameter + "," + name + ":'" + value + "'";
  	  }
  }
  function setSunParameter(name,value) {
  	  sunParameter = name + ":'" + value + "'";
  }
  
  
  var treeTableIndex = null;
  function getDatas(beanName) {
  	  DWREngine.setAsync(false);
  	  if(parameter != "") parameter = parameter + ",";
  	  var parameter_tmp = parameter + sunParameter;
  	  parameter_tmp = objectEval("{"+parameter_tmp+"}");
  	  dwrMonitor.getTreeDataList(beanName,parameter_tmp,outList);
  }
  function getDatasForAjax(tableStr,pId,indexf) {
  	  DWREngine.setAsync(false);
  	  //var indexf = tableStr.split(":")[0];
  	  var parameter_tmp = objectEval("{"+tableStr+"}");
  	  dwrMonitor.getAjaxMoreTreelist(parameter_tmp,indexf,pId,treeTableIndex,outList);
  }
  function outList(list) {
  	  dataList = list;
  }
  
  var ajax_tree_tables = new Array();
  function fillTree_moreTable() {
  	 getDatasForAjax(ajax_tree_tables[0],"0","0");
     var html = "";
   	 html = html + '<div class="dTreeNode">';
	html = html + '';
	html = html + '<a id="sd0" class="node" href=javascript:goUrl(0)>所有</a>';
	html = html + '</div>';
  	for(var i=1;i<=dataList.length;i++) {
  		html = html + "<div class='dTreeNode'>";
  		if(1) {
  			html = html + "<a href=javascript:void(0) onclick=javascript:doFill_moreTable(this,"+i+",1,'"+dataList[i-1][0]+"'); id='close'><img id='jd"+i+"' src='"+imgPath+"/js/dtree/img/plus.gif'/></a>";
  			html = html + "<img id='folder"+i+"' src='"+imgPath+"/js/dtree/img/folder.gif' />";
  			
  		}else{
	  		html = html + "<img src='"+imgPath+"/js/dtree/img/join.gif' />";
	  		html = html + "<img src='"+imgPath+"/js/dtree/img/page.gif' />";
  		}
  		html = html + "<a class='node' href=javascript:goUrl('"+dataList[i-1][0]+"')>"+dataList[i-1][1]+"</a>";
  		html = html + "<div id='dd"+i+"' class='clip' style='display:none;'></div>";
  		html = html + "<div>";
  	}
  	theTree.innerHTML = html;
  }
  function doFill_moreTable(obj,k,indexf,pId) {
  	
  	if(indexf>ajax_tree_tables.length-1)
  		getDatasForAjax(ajax_tree_tables[ajax_tree_tables.length-1],pId,indexf);
  	else
    	getDatasForAjax(ajax_tree_tables[indexf],pId,indexf);
  	var k_te = ""+k;
  	var html = "";
  	for(var i=0;i<dataList.length;i++) {
  			html = html + '<div class="dTreeNode">';
  			if(treeTableIndex != null) {
	  			if(ajax_tree_tables.length > indexf+1 || 1) {
	  				for(var s=0;s<k_te.length;s++) {
	  					html = html + '<img src="'+imgPath+'/js/dtree/img/line.gif" alt="" />';
	  				}
	  				//判断是否是含单表的
	  				if(treeTableIndex != null) {
	  					if((indexf) == treeTableIndex.split("#")[0]) {
	  						html = html + "<a href=javascript:void(0) onclick=javascript:doFill_moreTable(this,"+k+i+","+(indexf)+",'"+dataList[i][0]+"'); id='close'><img id='jd"+k+i+"' src='"+imgPath+"/js/dtree/img/plus.gif'/></a>";
	  					}else
	  						html = html + "<a href=javascript:void(0) onclick=javascript:doFill_moreTable(this,"+k+i+","+(indexf+1)+",'"+dataList[i][0]+"'); id='close'><img id='jd"+k+i+"' src='"+imgPath+"/js/dtree/img/plus.gif'/></a>";
	  				}else
						html = html + "<a href=javascript:void(0) onclick=javascript:doFill_moreTable(this,"+k+i+","+(indexf+1)+",'"+dataList[i][0]+"'); id='close'><img id='jd"+k+i+"' src='"+imgPath+"/js/dtree/img/plus.gif'/></a>";
					html = html + '<img id="folder'+k+i+'" src="'+imgPath+'/js/dtree/img/folder.gif" alt="" />';
	  			}else{
	  				for(var s=0;s<k_te.length;s++) {
						html = html + '<img src="'+imgPath+'/js/dtree/img/line.gif" alt="" />';
					}
					html = html + '<img src="'+imgPath+'/js/dtree/img/join.gif" alt="" />';
					html = html + '<img id="id4" src="'+imgPath+'/js/dtree/img/page.gif" alt="" />';
				}
			}else{
				if(ajax_tree_tables.length > indexf+1) {
	  				for(var s=0;s<k_te.length;s++) {
	  					html = html + '<img src="'+imgPath+'/js/dtree/img/line.gif" alt="" />';
	  				}
	  				html = html + "<a href=javascript:void(0) onclick=javascript:doFill_moreTable(this,"+k+i+","+(indexf+1)+",'"+dataList[i][0]+"'); id='close'><img id='jd"+k+i+"' src='"+imgPath+"/js/dtree/img/plus.gif'/></a>";
					html = html + '<img id="folder'+k+i+'" src="'+imgPath+'/js/dtree/img/folder.gif" alt="" />';
	  			}else{
	  				for(var s=0;s<k_te.length;s++) {
						html = html + '<img src="'+imgPath+'/js/dtree/img/line.gif" alt="" />';
					}
					html = html + '<img src="'+imgPath+'/js/dtree/img/join.gif" alt="" />';
					html = html + '<img id="id4" src="'+imgPath+'/js/dtree/img/page.gif" alt="" />';
				}
			}
			html = html + '<a id="sd4" class="node" href=javascript:goUrl("'+dataList[i][0]+'")>'+dataList[i][1]+'</a>';
			html = html + "<div id='dd"+k+i+"' class='clip' style='display:none;'></div>";
			html = html + '</div>';
	}
	
	document.getElementById("dd"+k).innerHTML = html;
  	document.getElementById("dd"+k).style.display = "block";
  	if(obj.id=="open") {
  	    document.getElementById("dd"+k).style.display = "none";
  		document.getElementById("jd"+k).src=imgPath+"/js/dtree/img/plus.gif";
  		document.getElementById("folder"+k).src=imgPath+"/js/dtree/img/folder.gif";
  		obj.id="close";
  		
  	}
  	else{
  		document.getElementById("jd"+k).src=imgPath+"/js/dtree/img/minus.gif";
  		document.getElementById("folder"+k).src=imgPath+"/js/dtree/img/folderopen.gif";
  		obj.id="open";
  	}
  }

  function fillTree_oneTable() {
  	setSunParameter(pName,defaultPValue);
    getDatas(beanName);
    var html = "";
    html = html + '<div class="dTreeNode">';
	html = html + '';
	html = html + '<a id="sd0" class="node" href=javascript:goUrl(0)>所有</a>';
	html = html + '</div>';
  	for(var i=1;i<=dataList.length;i++) {
  		html = html + "<div class='dTreeNode'>";
  		if(dataList[i-1]["haveSon"] == "1" || 1) {
  			html = html + "<a href=javascript:void(0) onclick=javascript:doFill_oneTable(this,"+i+",'"+dataList[i-1][idName]+"'); id='close'><img id='jd"+i+"' src='"+imgPath+"/js/dtree/img/plus.gif'/></a>";
  			html = html + "<img id='folder"+i+"' src='"+imgPath+"/js/dtree/img/folder.gif' />";
  			
  		}else{
	  		html = html + "<img src='"+imgPath+"/js/dtree/img/join.gif' />";
	  		html = html + "<img src='"+imgPath+"/js/dtree/img/page.gif' />";
  		}
  		html = html + "<a class='node' href=javascript:goUrl('"+dataList[i-1][idName]+"')>"+dataList[i-1][showName]+"</a>";
  		html = html + "<div id='dd"+i+"' class='clip' style='display:none;'></div>";
  		html = html + "<div>";
  	}
  	theTree.innerHTML = html;
  }
  
  function doFill_oneTable(obj,k,pId) {
    sunParameter = "";
  	setSunParameter(pName,pId);
    getDatas(beanName);
  	var k_te = ""+k;
  	var html = "";
  	for(var i=0;i<dataList.length;i++) {
  			html = html + '<div class="dTreeNode">';
  			if(dataList[i]["haveSon"] == "1" || 1) {
  				for(var s=0;s<k_te.length;s++) {
  					html = html + '<img src="'+imgPath+'/js/dtree/img/line.gif" alt="" />';
  				}
				html = html + "<a href=javascript:void(0) onclick=javascript:doFill_oneTable(this,"+k+i+",'"+dataList[i][idName]+"'); id='close'><img id='jd"+k+i+"' src='"+imgPath+"/js/dtree/img/plus.gif'/></a>";
				html = html + '<img id="folder'+k+i+'" src="'+imgPath+'/js/dtree/img/folder.gif" alt="" />';
  			}else{
  				for(var s=0;s<k_te.length;s++) {
					html = html + '<img src="'+imgPath+'/js/dtree/img/line.gif" alt="" />';
				}
				html = html + '<img src="'+imgPath+'/js/dtree/img/join.gif" alt="" />';
				html = html + '<img id="id4" src="'+imgPath+'/js/dtree/img/page.gif" alt="" />';
			}
			html = html + '<a id="sd4" class="node" href=javascript:goUrl("'+dataList[i][idName]+'")>'+dataList[i][showName]+'</a>';
			html = html + "<div id='dd"+k+i+"' class='clip' style='display:none;'></div>";
			html = html + '</div>';
	}
	document.getElementById("dd"+k).innerHTML = html;
  	document.getElementById("dd"+k).style.display = "block";
  	if(obj.id=="open") {
  	    document.getElementById("dd"+k).style.display = "none";
  		document.getElementById("jd"+k).src=imgPath+"/js/dtree/img/plus.gif";
  		document.getElementById("folder"+k).src=imgPath+"/js/dtree/img/folder.gif";
  		obj.id="close";
  		
  	}
  	else{
  		document.getElementById("jd"+k).src=imgPath+"/js/dtree/img/minus.gif";
  		document.getElementById("folder"+k).src=imgPath+"/js/dtree/img/folderopen.gif";
  		obj.id="open";
  	}
  }
  /**
  * _beanName:表对应的bean对象; _pName:生成的树父ID的名称; _idName:生成的树主ID的名称;
  * _showName:生成的树中显示name的名称; _defaultPValue:第一级的父ID的默认值
  */
  function initAjaxTree(_beanName,_pName,_idName,_showName,_defaultPValue) {
  	  beanName = _beanName;
   	  pName = _pName;
   	  idName = _idName;
   	  showName = _showName;
   	  defaultPValue = _defaultPValue;
   	  fillTree_oneTable();
  }
  /*****************************以上功能为生成ajax树使用********************************/
	
	function objectEval(text){
	    // eval() breaks when we use it to get an object using the { a:42, b:'x' }
	    // syntax because it thinks that { and } surround a block and not an object
	    // So we wrap it in an array and extract the first element to get around
	    // this.
	    // This code is only needed for interpreting the parameter input fields,
	    // so you can ignore this for normal use.
	    // The regex = [start of line][whitespace]{[stuff]}[whitespace][end of line]
	    text = text.replace(/\n/g, ' ');
	    text = text.replace(/\r/g, ' ');
	    if (text.match(/^\s*\{.*\}\s*$/))
	    {
	      text = '[' + text + '][0]';
	    }
	    return eval(text);
   }
   //获取checkbox的值赋予隐藏域 check_object_id值与check_object_name值
   /**
   var objId;
   var objName;
   function checkboxValue(e)
   {
	var check_object_id=document.getElementById("check_object_id");
	var check_object_name=document.getElementById("check_object_name");
	var str=new Array;
	str=e.value.split(",");
	check_object_id.value=check_object_id.value+","+str[0];
	
	check_object_name.value=check_object_name.value+","+str[1];
	
   }
   function getCheckBoxValue(isClose) {
	    if(isClose == undefined) isClose = true;
	    var inpuSize=document.getElementsByTagName("input");
	    for(var i=0;i<inpuSize.length;i++)
	    {
	    	if(inpuSize[i].type=="checkbox")
	    	{
	    			if(inpuSize[i].checked==true)
	    			{
	    				var str=inpuSize[i].value;//获取checkbox的值
						var strlist=new Array;
						strlist=str.split(",");
						var str=document.getElementById("check_object_id").value;
						var str2=document.getElementById("check_object_name").value;
						str=str+strlist[0]+",";
						str2=str2+strlist[1]+",";	
						document.getElementById("check_object_id").value=str;
						document.getElementById("check_object_name").value=str2;
						
	    			}
	    	}
	    }
	     document.getElementById("check_object_id").value=document.getElementById("check_object_id").value.substring(0,document.getElementById("check_object_id").value.lastIndexOf(","));
	     document.getElementById("check_object_name").value=document.getElementById("check_object_name").value.substring(0,document.getElementById("check_object_name").value.lastIndexOf(","));
					
	  	window.returnValue=document.getElementById("check_object_id").value+"||"+document.getElementById("check_object_name").value;	
	   	if(isClose) window.close();
   }
   function showModal(url,parameterId,parameterName,e) {
	   var value=window.showModalDialog(url,e);
	   var valueList=new Array;
	   valueList=value.split("||");
	   document.getElementById(parameterId).value=valueList[0];
	   document.getElementById(parameterName).value=valueList[1];
   }
   **/
   function getCheckBoxIds(colId) {
		var col = document.all(colId);
		var ids = new Array();
		var j = 0;
		if(col!=null){
          if(isNaN(col.length)){
             if(document.all(colId).checked){
                ids[0] = document.all(colId).value;
             }
          }else{
			 for(var i=0; i<col.length; i ++){
              if(col[i].checked){
                ids[j] = col[i].value;
				j ++;
              }
            }
		  }
        }
		return ids;
	}
	function getCheckBoxValues(isClose) {
		var ids = getCheckBoxIds("C_Select");
		if(ids.length == 0){
	        alert("没有选择相关信息，操作无效！");
	        return;
        }else{
        	//for()
        }
	}
	
	Array.prototype.remove=function(dx)
	{
	    if(isNaN(dx)||dx>this.length){return false;}
	    for(var i=0,n=0;i<this.length;i++)
	    {
	        if(this[i]!=this[dx])
	        {
	            this[n++]=this[i]
	        }
	    }
	    this.length-=1
	}
	
	
	///--------------------------以下程序用于:当选择列表的页面时使用,支持翻页选择----------------------////
	var idts = [];
    var namets = [];
    var namets1=[];
    var ids = "";
    var names = "";
    var name1s = "";
    //edit by ywuei at 2010-09-14     
    function initOldDatas_bak(old_ids,old_names) {
    	ids = old_ids;
    	names = old_names;
    	var col_tmp = document.all("C_Select");
    	
    	if(col_tmp!=null){
          if(isNaN(col_tmp.length)){
	          if(old_ids.indexOf(document.getElementById("C_Select").value.split(",")[0]) >= 0){
	               col_tmp.checked = true;
	          }
          }else{
			 for(var i=0; i<col_tmp.length; i++){
              	if((","+ids+",").indexOf(","+col_tmp[i].value.split(",")[0]+",") >= 0){
              		//vids += col_tmp[i].value.split(",")[0]+",";
              		//vnames += col_tmp[i].value.split(",")[1]+",";
                	col_tmp[i].checked = true;
              	}
             }
		  }
        }
       
        if(ids != "") {
        	//vids=vids.substring(0,vids.length-1);
        	ids = old_ids;
        	idts = ids.split(",");
    	}

    	if(names != "") {
    		//vnames = vnames.substring(0,vnames.length-1);
    		namets = old_names.split(",");
    	}
    	var html = "<font color='red'>" + names + "</font>";
    	document.getElementById("select_datas_names").innerHTML = "&nbsp;&nbsp;"+html;
    	document.getElementById("check_object_id").value = ids;
    	document.getElementById("check_object_name").value = names;
    	 
    	initCheckDatas("C_Select");
    }
    
    
    function initOldDatas_name1(old_ids,old_names,old_name1s){
    	ids = old_ids;
    	names = old_names;
    	name1s = old_name1s;
    	
    	var col_tmp = document.all("C_Select");
    	
    	if(col_tmp!=null){
          if(isNaN(col_tmp.length)){
	          if(old_ids.indexOf(document.getElementById("C_Select").value.split(",")[0]) >= 0){
	               col_tmp.checked = true;
	          }
          }else{
			 for(var i=0; i<col_tmp.length; i++){
              	if((","+ids+",").indexOf(","+col_tmp[i].value.split(",")[0]+",") >= 0){
              		//vids += col_tmp[i].value.split(",")[0]+",";
              		//vnames += col_tmp[i].value.split(",")[1]+",";
                	col_tmp[i].checked = true;
              	}
             }
		  }
        }
       
        if(ids!="") { 
        	idts = ids.split(",");
    	}

    	if(names!="") {
    		namets = old_names.split(",");
    	}
    	
    	if(name1s!="") {
    		namets1 = name1s.split(",");
    	}
    	
    	var html = "<font color='red'>" + names + "</font>";
    	document.getElementById("select_datas_names").innerHTML = "&nbsp;&nbsp;"+html;
    	document.getElementById("check_object_id").value = ids;
    	document.getElementById("check_object_name").value = names;
    	initCheckDatas("C_Select");
    }
    
    
    function resetDatas(){
    	document.getElementById("select_datas_names").innerHTML ="";
    	document.getElementById("check_object_id").value ="";
    	document.getElementById("check_object_name").value ="";
    	var selObj = document.getElementsByName("C_Select");
    	checkids = new Array();
    	checkNames = new Array();
		//alert(selObj.length);
    	for(var a=0;a<selObj.length;a++){
    		selObj[a].checked=false;
    	} 
    }
    
/*	function selectData(obj) {
    	if(obj.checked == true) {
    		var have = false;
    		for(var i=0;i<idts.length;i++) {
    			if(idts[i] == obj.value.split(",")[0]) {
    				have = true;
    			}
    		}
    		if(have == false) { 
    			idts[idts.length] = obj.value.split(",")[0];
    			namets[namets.length] = obj.value.split(",")[1];
    			if(obj.value.split(",").length>2){
    				namets1[namets1.length] = obj.value.split(",")[2];
    			}
    		}
    	}else{
    		for(var i=0;i<idts.length;i++) {
    			if(idts[i] == obj.value.split(",")[0]) {
    				idts.remove(i);
    			}
    			if(namets[i] == obj.value.split(",")[1]) {
    				namets.remove(i);
    			}
    			if(obj.value.split(",").length>2)
    			{
    			  if(namets1[i] == obj.value.split(",")[1]) {
	    				namets1.remove(i);
    			  }
    			}
    		}
    	}
    	selectForHTML();
    }*/
    
    function selectForHTML() {
    	html = "";
    	ids = "";
    	names = "";
    	names1="";
    	for(var i=0;i<idts.length;i++) {
    		if(namets[i]!=null){
    			html = html + "," + namets[i];
    			names = names + "," + namets[i];
    		}
    		
    		if(idts[i]!=null){
    			ids = ids + "," + idts[i];
    		} 
    		
    		if(namets1.length>0){
    			if(namets1[i]!=null){
    				names1 = names1 + "," + namets1[i];
    			}
    		}
    	}
    	
    	html = "<font color='red'>" + html.replace(",","") + "</font>";
    	ids = ids.replace(",","");
    	names = names.replace(",","");
    	names1 = names1.replace(",","");
    	document.getElementById("select_datas_names").innerHTML = "&nbsp;&nbsp;"+html;
    	document.getElementById("check_object_id").value = ids;
    	document.getElementById("check_object_name").value = names;
    	try{
    		document.getElementById("check_object_name1").value = names1;
    	}catch(e){}
    }
    //选中所有的复选框
    function selectAll_checkbox(call,cid){
        var old = document.all(call).checked;
        var col = document.all(cid);
        if(col!=null){
          if(col.length>=2){
            for(var i=0; i<col.length; i ++){
			  if(col[i].disabled == false)
				col[i].checked = old;
				selectData(col[i]);
            }
          }
          else{
			 if(col.disabled == false) {
				 col.checked = old;
			 	 selectData(col);
			 }
          }
        }
    }
    function initCheckDatas(colId) {
    	var ids_tmp = ","+document.getElementById("check_object_id").value+",";
    	var col_tmp = document.all(colId);
    	if(col_tmp!=null){
          if(isNaN(col_tmp.length)){
             if(ids_tmp.indexOf(","+document.getElementById(colId).value.split(",")[0]+",") >= 0){
                col_tmp.checked = true;
             }
          }else{
			 for(var i=0; i<col_tmp.length; i ++){
              if(ids_tmp.indexOf(","+col_tmp[i].value.split(",")[0]+",") >= 0){
                col_tmp[i].checked = true;
              }
            }
		  }
        }
    }
    //////////-----------------------以上程序用于:当选择列表的页面时使用,支持翻页选择-------------------////////////
   
   
   //让所有控件不可操作
		function DisableAllControls(){ 
			var inputData = document.getElementsByTagName("input");
			var selectData = document.getElementsByTagName("select");
			var textareaData = document.getElementsByTagName("textarea");
			for(var i=0;i <inputData.length;i++){
				if(inputData[i].type == 'button')
					inputData[i].disabled=true;
				if(inputData[i].type == 'text')
					inputData[i].readOnly = true;
				inputData[i].onblur = "";
			}
			for(var j=0;j<selectData.length;j++) {
				selectData[j].disabled = true;
			}
			for(var j=0;j<textareaData.length;j++) {
				textareaData[j].readOnly = true;
			}
		}
		
	
	//判断表单中的数据是否作了修改,如果未修改不允许提交
	var isTextChanged = false;
	function isFormChanged() {
		var form = document.forms[0];
		for (var i = 0; i < form.elements.length; i++) {
		   	var element = form.elements[i];
		   	var type = element.type;
		   	if (type == "text" || type == "hidden" || type == "textarea") {
		    	if (Trim(element.value) != Trim(element.defaultValue)) {
		     		isTextChanged = true;
		     		break;
		    	}
		   	} else if (type == "radio" || type == "checkbox") {
		    	if (element.checked != element.defaultChecked) {
		     		isTextChanged = true;
		     		break;
		    	}
		   	} else if (type == "select-one"||type == "select-multiple") {
		    	for (var j = 0; j < element.options.length; j++) {
		    		if(element.disabled== false) {
			     		if (element.options[j].selected != element.options[j].defaultSelected) {
			      			isTextChanged = true;
			      			break;
			     		}
		     		}
		    	}
		    	
		   	}else { 
		    	// etc...
		   	}
		}
		if(!isTextChanged) {
			//document.forms(0).disabled = true;
			alert("您没有作任何的修改,不能提交表单!");
			//document.forms(0).disabled = false;
			return false;
		}else{
			return true;
		}
	}
	
		function initSelectDefalt() {
			var form = document.forms[0];
			
			if(form == undefined) return;
			
			for (var i = 0; i < form.elements.length; i++) {
		   		var element = form.elements[i];
		   		var type = element.type;
				if (type == "select-one") {
					var isHaveDefault = false;
					for (var j = 0; j < element.options.length; j++) {
						if (element.options[j].defaultSelected == true) {
				      		isHaveDefault = true;
				      		break;
				     	}
			     	}
			
					if(!isHaveDefault) {
						if(element.options[0] != null)
			    			element.options[0].defaultSelected = true;
					}
			   	}
			}
		}
		
		
		
		
    /**
     * 将1,2,3,4,6,8,9,10,13转换成 1-4,6,8-10,13
     * @param str
     * @return
     */
    function convertKkzc(str)
    {
		var strlist =  str.split(",");
		var strReturn = "";
		strReturn = strReturn + strlist[0];
		if (strlist.length > 1)
		{
		    for (i = 0; i < strlist.length; i++)
		    {
				var m = "";
				var n = "";
				var j = i + 1;
				for (j = i + 1; j < strlist.length; j++)
				{
				    if (strlist[j] ==  parseInt(strlist[j - 1]) + 1)
				    {
						m = strlist[j];
						continue;
				    } else
				    {
						n = strlist[j];
						break;
				    }
				}
				i = j - 1;
				if ("" != m)
				{
				    strReturn = strReturn + "-" + m;
				}
				if ("" != n)
				{
				    strReturn = strReturn + "," + n;
				}
			}
		}
		
		return strReturn;
    }
    
    
    /**
     * 将 1-4,6,8-10,13转换成 1,2,3,4,6,8,9,10,13
     * @param str
     * @return
     */
    function ReserveConvertKkzc(str){
		var strlist =  str.split(",");
		var strReturn = "";
		if (strlist.length > 0){
		    for (var i = 0; i < strlist.length; i++){
		    	var oneStrList = strlist[i].split("-");
		    	if (oneStrList.length > 1){
		    		//开始周不能大于结束周
		    		if(parseInt(oneStrList[0])>parseInt(oneStrList[1])){
		    			return "";
		    		}
		    		
		    		for (var j = parseInt(oneStrList[0]); j <= parseInt(oneStrList[1]); j++){
		    			if(strReturn==""){
		    				strReturn = j;
		    			}else{
		    				strReturn = strReturn + "," +j;
		    			}
		    		}
		    	}else{
		    		if(strReturn==""){
	    				strReturn = strlist[i];
	    			}else{
	    				strReturn = strReturn + "," +strlist[i];
	    			} 
		    	}
			}
		}
		return strReturn;
    }
    
    /**
     * 将 1-4,6,8-10,13转换成 1,2,3,4,6,8,9,10,13
     * edit by wangwei 2018.8.16 加入单双周判断
     */
    function ReserveConvertKkzc_Sjbz(str,sjbz){
		var strlist =  str.split(",");
		var strReturn = "";
		if (strlist.length > 0){
		    for (var i = 0; i < strlist.length; i++){
		    	var oneStrList = strlist[i].split("-");
		    	if (oneStrList.length > 1){
		    		//开始周不能大于结束周
		    		if(parseInt(oneStrList[0])>parseInt(oneStrList[1])){
		    			return "";
		    		}
		    		
		    		for (var j = parseInt(oneStrList[0]); j <= parseInt(oneStrList[1]); j++){
		    			if(strReturn==""){
		    				
		    				if(sjbz!='0'){
		    					var ys = sjbz == "2" ? "0": "1";
								if(parseInt(j) % 2 == ys){
									strReturn = j;
		    					}
		    				}else{	
		    					strReturn = j;
		    				}
		    			}else{
		    				if(sjbz!='0'){
		    					var ys = sjbz == "2" ? "0": "1";
								if(parseInt(j) % 2 == ys){
									strReturn = strReturn + "," +j;
		    					}
		    				}else{	
		    					strReturn = strReturn + "," +j;
		    				}
		    			}
		    		}
		    	}else{
		    		if(strReturn==""){
		    			if(sjbz!='0'){
		    				var ys = sjbz == "2" ? "0": "1";
							if(parseInt(strlist[i]) % 2 == ys){
								strReturn = strlist[i];
	    					}
	    				}else{	
	    					strReturn = strlist[i];
	    				}
	    			}else{
	    				if(sjbz!='0'){
	    					var ys = sjbz == "2" ? "0": "1";
							if(parseInt(strlist[i]) % 2 == ys){
								strReturn = strReturn + "," +strlist[i];
	    					}
	    				}else{	
	    					strReturn = strReturn + "," +strlist[i];
	    				}
	    			} 
		    	}
			}
		}
		return strReturn;
    }
    

    /**
     * 将1,2,3,4,6,8,9,10,13 转换成相加的数字
     * @param str
     * @return
     */    
    function StringsToPlusValue(str)
    {
		var thisStr = str;
		var strlist =  thisStr.split(",");
		var iReturn = 0;
		if (strlist.length > 0)
		{
		    for (var i = 0; i < strlist.length; i++)
		    {
		    	if ("" != strlist[i])
		    	{
					iReturn += parseInt(strlist[i]);    	
		    	}
		    }
		    
		    return iReturn;
		}
		
		return 0;
    }
    
    
function get_radio_value (radio_array)
{
	var i;
    for (i = 0; null != radio_array && i < radio_array.length; ++ i)  //radio_array.length是radio选项的个数
    	if (radio_array[i].checked)
        	return radio_array[i].value;
	return null;  //如果一项都没选则返回空值
}


String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {   
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {   
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);   
    } else {   
        return this.replace(reallyDo, replaceWith);   
    }   
}   

//全角转换为半角互换，boo=1表示半角转全角 boo=0表示全角转半角
function stringToChange(Obj, boo)
{
    var result = "";
    var str = Obj.value;
    var charlist = "\";'<>";//半角字符

    for(var i = 0; i < str.length; i++)//字符串str中的字符 
    {
        var c1 = str.charAt(i);
        var c2 = str.charCodeAt(i);
        if(charlist.indexOf(c1) > -1)
        {
            if(" " == c1)
            {
                result += "　";
            }else
            {
                result += String.fromCharCode(str.charCodeAt(i) + 65248); 
            }
        }else
        {
            if(boo > 0)
            {
                result += String.fromCharCode(str.charCodeAt(i)); 
            }else
            {
                if("　" == c1)
                {
                    result += " ";
                }else
                {
                    if(charlist.indexOf(String.fromCharCode(str.charCodeAt(i) - 65248)) > -1)
                    {
                        result += String.fromCharCode(str.charCodeAt(i) - 65248);
                    }else
                    {
                        result += String.fromCharCode(str.charCodeAt(i)); 
                    }
                }
            }
        } 
    } 
    Obj.value = result;
}

//过滤关键字，所有文本框不允许输入半角 ' <> 等字符
//周建伟：暂时不启用，因为按向左键，不起作用
function filterKeyChar()
{
/*
    var input=document.getElementsByTagName("input");
    for(var i=0;i<input.length;i++)
    {
        if(input[i].type=="text")
            input[i].onkeyup=function(){
			    stringToChange(this, 1);
			}
            
    }
*/
}
//雷立华
//检查字符是否超出限制（中文包括）
function checkstringlength(obj,number,strnew)
{
    var str=obj.value;
    var len2=0;
    for (var i=0; i<str.length; i++) {   
        if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {   
            len2 += 2;   
        } else {   
            len2 ++;   
        }   
        }
   if(len2>number)
   {
    alert(strnew+"长度过长，请重新输入");
    obj.focus();
    
   return false;
   
   }
   else
   {
   return true;
   }
}
//雷立华
//给空值赋指定值
function setValueNumber(value,setvalue)
{

if(isEmpty(value))
{

 return setvalue;
}

return value;
}


//左右移动Option
function moveOption(_objLeft, _objRight, _remainOld)
{
	var objLeft = document.getElementById(_objLeft);
	var objRight = document.getElementById(_objRight);
	
	for (var i = 0; i < objLeft.options.length; i++)
	{
		if(objLeft.options[i].selected)
		{
			objRight.add(new Option(objLeft.options[i].text, objLeft.options[i].value));	
			
			if (_remainOld == false)
			{
				objLeft.remove(i);
				i--;
			}
		}
	}
}
//检查输入是否是数字而且必须小于多少  code by yuwei
function checkcapitalAndValue(input, limit,msg, flag) {
	if (input.value == "") return false;
	str = input.value;
	var checkOK;
	var checkStr = str;
	var allValid = true;
	var allNum = "";
	if (flag == 0) {
		checkOK = "0123456789-, ";
	} else {
		checkOK = "0123456789";
	}
	for (i = 0; i < checkStr.length; i++) {
		ch = checkStr.charAt(i);
		for (j = 0; j < checkOK.length; j++) {
			if (ch == checkOK.charAt(j)) {
				break;
			}
		}
		if (j == checkOK.length) {
			allValid = false;
			break;
		}
		allNum += ch;
	}
	if (!allValid) {
		alert(msg+"输入的数据必须是数字!");
		input.value = "";
		input.focus();
		input.select();
		return (false);
	}else if(Number(input.value)>Number(limit)){
		alert(msg+"输入的数据必须小于"+limit);
		input.value = "";
		input.focus();
		input.select();
		return (false);
	}
	return true;
}
//初始化审核数据
function onworkflow(){
     url = "${pageContext.request.contextPath}/workflow.do?method=workflowShowProcess";
     var ajax = new Ajax.Request(url,
     {
      method:'post',
      onSuccess:onDw
     }
     );
  } 
function onDw(response){} 
//判断adsu标签中多个字段组合唯一	
//type类型 add增加 update修改 
//windowtype弹出窗口类型 alert提示窗 confirm消息确认取消窗
//tableName表名
//coloumName1组合字段其一
//coloumName2组合字段其二
//whereString组装条件字符串(可对N个组合条件进行判断)
//stralert提示语句
//参考示例：pjjylb_add.jsp/pjjylb_edit.jsp
var stralerts;
var types;
var windowtypes;
function onCheckAdsuOnly(type,windowtype,tn,co1,co2,ws,stralert){
		stralerts = stralert;
		types = type;
		windowtypes = windowtype;
		dwrMonitor.getforsj(tn,co1,co2,ws,getDataResult2); 
}
function getDataResult2(dataList){
      if(dataList.length >0){
      	if(windowtypes == "alert"){
      		alert(stralerts);
      	}
      	if(windowtypes == "confirm"){
      		if(confirm(stralerts)){
      			if(types == "add"){
       			submitAdd('null');
       			}
		       	if(types == "update"){
		       		submitEdit('null');
		       	}
      		}
      	}
      }else{ 
      	if(types == "add"){
       		submitAdd('null');
       	}
       	if(types == "update"){
       		submitEdit('null');
       	}
      } 
} 
function onCheckAdsuOnlys(windowtype,tn1,cn1,cn2,ws,stralert){
		stralerts = stralert; 
		windowtypes = windowtype;
		dwrMonitor.getforsj(tn1,cn1,cn2,ws,getDataResult2s); 
}
function getDataResult2s(dataList){
      if(dataList.length >0){
      	if(windowtypes == "alert"){
      		alert(stralerts);
      	}
      	if(windowtypes == "confirm"){
      		if(confirm(stralerts)){
      		}
      	}
      } 
      alert(ir);
} 



//验证开课周次
function isKkZc(str)
{
	//var kkZcReg=/^(\d?,?-?\d?)+$/;
	str=trim(str);
	var kkZcReg=/^(\d+||\d+-\d+)((,\d+-\d+)*||(,\d+)*)((,\d+)||(,\d+-\d+))?$/;
	//var kkZcReg=/^(\d+||\d+-\d+)((((,\d)+-\d)+)*||(,\d+)*)((,\d+)||(,\d+-\d+))?$/;
    /*if (!kkZcReg.test(str)) 
    {
    	alert(1);
    	return false;
    }*/
    if(issmalltobigKKzc(str))
    {
       if(!isReKKzc(str))
       {
        return false;
       }
    }
    else
    {
     return false;
    }
    
	return true;
}

//严整周次是否有重复的
function isReKKzc(str)
{
   /**
     * 将 1-4,6,8-10,13转换成 1,2,3,4,6,8,9,10,13
     * @param str
     * @return
     */
    
    var tempstr= ReserveConvertKkzc(str);
    var templist=tempstr.split(",");
    var tempstrequal=","+tempstr+",";
    //循环检测是否有重复的 
    for(var i=0;i<templist.length;i++)
    {
      var equalstr=","+templist[i]+",";
      var starnum=tempstrequal.indexOf(equalstr);
      var endnum=tempstrequal.lastIndexOf(equalstr);
      if(starnum!=endnum)
      {
       return  false;
      }
    
    }
    
    
    return true;
   
}



//检测类似1-5，带‘-’模式的前数是否小于后数 需要在重复检查的前面
function issmalltobigKKzc(str)
{
  var templist=str.split(",");
   for(var i=0;i<templist.length;i++)
    {
      var oneStrList = templist[i].split("-");
		    	if (oneStrList.length > 1)
		    	{
		    		if(parseInt(oneStrList[0])>=parseInt(oneStrList[1]))
		    		{
		    			 return false;
		    		}
		    	}
    
    }
return  true;
}

//检测周次是否含相应的单双周次 flag=1为奇数，flag=2为偶数 
function isdsKKzc(str,flag)
{
  var templist=str.split(",");
   for(var i=0;i<templist.length;i++)
    {
      var oneStrList = templist[i].split("-");
		    	if (oneStrList.length > 1||flag=='0')
		    	{
		    		return true;
		    	}
               else
               {
                 if(flag=='1')
                 {
                     if(parseInt(oneStrList)%2!=0)
                     return true;
                 }
                 else 
                 {
                   if(parseInt(oneStrList)%2==0)
                   {
                    return true;
                   }
                 }
                 
                 
               }
    }
return  false;
}

function getMaxKKzc(str,maxZc)
{
  /**
     * 将 1-4,6,8-10,13转换成 1,2,3,4,6,8,9,10,13
     * @param str
     * @return
     */
    var tempmax=1;
    var tempstr= ReserveConvertKkzc(str);
    var templist=tempstr.split(",");
    var tempstrequal=","+tempstr+",";
    
    for(var i=0;i<templist.length;i++)
    {
      var equalstr=parseInt(templist[i]);
      if(equalstr>tempmax)
      {
      tempmax=equalstr;
      }
     
    
    }
  
    if(tempmax>parseInt(maxZc))
    {
     alert("请保证周次数最大不超过"+maxZc+"！");
     return false;
    }
    
    return true;
  }
//验证电话格式
function ValidatePhoneNum(obj){
	if (obj.value == "") return false;
    	var phoneReg=/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
    	if (!phoneReg.test(obj.value)) {
		alert("电话格式错误！\n\n正确格式，例如：\n固话：1234-12345678\n固话带分机：1234-12345678-1234\n手机：12345678901");
		obj.value = "";
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}  

function emailCheck(obj) {  
    var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;  
    if (!pattern.test(obj.value)) {  
        alert("请输入正确的邮箱地址。"); 
        obj.value = "";
        obj.focus();  
        return false;  
    }  
    return true;  
} 


//验证不能输入特殊字符
function checkInput(obj){
var stringReg =",./?;:'\"\|%，。、？；：’\”%&￥";
if (obj.value == "") return false;
   for(var i = 0; i < obj.value.length; i++)//字符串str中的字符 
    {
	    var c1 = obj.value.charAt(i);
	    if(stringReg.indexOf(c1) > -1){
			alert("不能输入,./?;:'\"\|%");
			obj.value='';
			return false;
		}
	}

}
function mxhDivOnscroll(obj){
isscroll=true;
javascript:document.getElementById('tblHeadDiv').style.pixelLeft = -obj.scrollLeft;
/*document.getElementById('cwhdiv').style.left = document.getElementById('alldiv').offsetWidth - 20 + this.scrollLeft;*/

}
var isdown=false;
var isscroll=false;
function mxhDivonmousedown(){
isdown=true;
//alert(2);
}
function mxhDivonmouseup(){
isdown=false;
if(isscroll){
//alert(1);
}
isscroll=false;
}

//列表右击菜单
function csMenu() {
    this.IEventHander = null;
    this.IContextMenuHander = null;
    this.IStartIndex = null;
    this._menu = null;
    this._iframe = null;
    this._object = null;

    this.Show = function() {
        var e = window.event || event;
        if (e.button == 2) {
            this.IContextMenuHander = function(){return false;};
            document.attachEvent("oncontextmenu", this.IContextMenuHander);
            window.csMenu$Object = this;
            this.IEventHander = function(){window.csMenu$Object.Hide();};
            document.attachEvent("onmousedown", this.IEventHander);

			var tr = e.srcElement;
            if (tr.nodeName == 'TABLE') return;
            while (tr.nodeName != 'TR') tr = tr.parentNode;
            tr.onclick();
            var tds = tr.cells;
            var h = "<table height=" + tr.height + "px width='120px' cellpadding=0 cellspacing=0  style='border:1 solid buttonface;border:2 outset buttonhighlight;margin-top:-8px;margin-left:-8px;margin-right:-8px;margin-bottom:-8px;'>"; 
            h += "<tr  onMouseOver =\"this.style.backgroundColor='#C4DEFD'\"  onMouseOut =\"this.style.backgroundColor='#FFF'\">";
            for (var i = this.IStartIndex; i < tds.length; i++) {
            	var j = tds[i].outerHTML.indexOf('onclick="') + 9;
				h += tds[i].outerHTML.substring(0, j);
				h += "window.csMenu$Object._iframe.style.display = 'none'; ";
				h += "window.csMenu$Object._menu.style.display = 'none'; ";
				h += tds[i].outerHTML.substring(j);
				if( i < tds.length - 1){
					h += "</tr><tr  onMouseOver =\"this.style.backgroundColor='#C4DEFD'\"  onMouseOut =\"this.style.backgroundColor='#FFF'\" >";
				} 
			}
            h += "</tr></table>"; 
            this._menu.innerHTML = h;             
            this._menu.style.left = e.clientX;
            this._menu.style.top = e.clientY;
            this._menu.style.display = "";
                        
            var ifrmTop = e.clientY;
            var ifrmLeft = e.clientX;
            var ifrmWidth = this._menu.offsetWidth;
            var ifrmHeight = this._menu.offsetHeight;
            
            var scrollHeight = document.body.scrollHeight;
            var scrollWidth = document.body.scrollWidth; 
            if(e.clientY + this._menu.offsetHeight > scrollHeight){
            	 ifrmTop = ifrmTop - ifrmHeight;
            	 this._menu.style.top = ifrmTop;
            }
            
            if(e.clientX + this._menu.offsetWidth > scrollWidth ){
            	ifrmLeft = ifrmLeft - ifrmWidth;
            	this._menu.style.left = ifrmLeft;
            }
            
            this._iframe.style.left = ifrmLeft;
            this._iframe.style.top = ifrmTop;
           	this._iframe.style.height = ifrmHeight;
            this._iframe.style.width = ifrmWidth;
            this._iframe.style.display = "";
            //window.scrollTo(0,document.body.scrollHeight);
            
        }
    };

    this.Hide = function() {
        var e = window.event || event;
        var _element = e.srcElement;
        do {
            if (_element == this._menu)
                return false;
        }
        while ((_element = _element.offsetParent));
		document.detachEvent("on" + e.type, this.IEventHander);
        this._iframe.style.display = "none";
        this._menu.style.display = "none";
		document.detachEvent("oncontextmenu", this.IContextMenuHander);
    };

    this.initialize = function() {  
    	this._object = document.getElementById("mxh");
        window._csMenu$Object = this;
        var _eventHander = function(){window._csMenu$Object.Show();};
        this._object.attachEvent("onmouseup", _eventHander);
		document.getElementById('creating').onpropertychange = function() {
			if (event.propertyName == "style.visibility")
				if (event.srcElement["style"]["visibility"] == "visible") 
					window._csMenu$Object._object.detachEvent("onmouseup", _eventHander);
		}
		document.getElementById('hiddenframe').onreadystatechange = function() {
			if (this.readyState && this.readyState == 'complete') {
				window._csMenu$Object.Hide();
				if(document.getElementById("mxh") != window._csMenu$Object._object) {
					window._csMenu$Object._object = document.getElementById("mxh");
					window._csMenu$Object._object.attachEvent("onmouseup", _eventHander);
					window._csMenu$Object.IStartIndex = document.getElementById("tblHead").rows[0].cells.length - 1;
				}
			}
		}
		this.IStartIndex = document.getElementById("tblHead").rows[0].cells.length - 1;
		
        this._menu = document.createElement('div');
        document.body.insertBefore(this._menu, document.body.firstChild);
        this._menu.setAttribute("id", "menu_div"); 
        this._menu.style.border = "1px solid #cccccc";
        this._menu.style.backgroundColor = "white";
        this._menu.style.padding = "8px";
        this._menu.style.position = "absolute";
     	this._menu.style.display = "none";
     	this._menu.style.zIndex = "1000000";
     	
        this._iframe = document.createElement('iframe');
 	    document.body.insertBefore(this._iframe, document.body.firstChild);
 	    this._iframe.setAttribute("id", "menu_iframe"); 
 	    this._iframe.style.position = "absolute";
        this._iframe.style.display = "none";
        this._iframe.style.zIndex = "999999";
        this._iframe.style.border = "0px";
        this._iframe.style.height = "0px";
        this._iframe.style.width = "0px";    
    };

    this.initialize();
}

document.onreadystatechange = function() {
	if (document.readyState == "complete") {
		var _object = document.getElementById("tblHead");
		if(_object != undefined) {
			var tds = _object.rows[0].cells;
			if(tds[tds.length - 1].innerText == " 操作")
				new csMenu();
		}
	}
}


function getCheckedElement(obj) {
	var vStrType = Object.prototype.toString.apply(obj);
	if (vStrType == "[object String]") {
		var vObjArray = document.getElementsByName(obj);
		if (vObjArray.length > 0) {
			return vObjArray[0];
		}
	} else if (vStrType == "[object Object]") {
		return obj;
	}
	return null;
}

function checkStringLenB(obj,msg,len,needFocus,needSelect){
	var vObj = getCheckedElement(obj);
	if (!vObj) {
		window.alert("参数错误，根据参数 obj 获取不到文档对象。");
		return false;
	}
	
	var vIntLength = len;
	if (len == null) {
		vIntLength = obj.maxLength;
	}
	
	if (null == vIntLength) {
		window.alert("找不到需要检查的最大长度（len 或者 obj.maxLength 其中一个必须要有值）。");
		return false;
	}
	
	var vObjValue = vObj.value;
	vObjValue == (null != vObjValue) ? vObjValue : "";
	
	var vIntStrLengthB = vObjValue.replace(/[\u4e00-\u9fa5]/g, "xx").length;
   	if(vIntStrLengthB > len){
   		window.alert(msg+"的长度超过了"+len+"个字节（汉字占两个字节）。");
   		if (needFocus) vObj.focus();
   		if (needSelect) vObj.select();
   		return false;
   	}
  	return true;
}

// 导出DBF通用方法
var newwin_dbfCommonExport = null;
function commonExport(title, root, fileId, param) {
	if(newwin_dbfCommonExport){
		newwin_dbfCommonExport.close();
	}
	
	htmlurl = root+"/DBFServlet";
	try {
	/*
		var xmlhttp = null;
		if (window.ActiveXObject) {
			xmlhttp = new ActiveXObject("MiCROSOFT.XMLHTTP");
		}
		else {
			xmlhttp = new XMLHttpRequest();
		}
		
		var paramURL = "&fileId=" + fileId;
		for (var prop in param) {
			if (param.hasOwnProperty(prop)) {
				paramURL += "&"+prop+"="+param[prop];
			}
		}
		
		xmlhttp.open("post", htmlurl);
		xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(paramURL);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.status == 200) {
				window.alert(xmlhttp.getAllResponseHeaders());
			}
		}
	*/
	
		var oDiv = document.getElementById("commonExportDiv");
		if (oDiv) {
			document.body.removeChild(oDiv);
		}
		oDiv = document.createElement("<div id='commonExportDiv'>");
		oDiv.style.display = "none";

		var oForm = document.createElement("<form name='commonExportForm' method='post'>");
		var oHidden = null;
		for (var prop in param) {
			if (param.hasOwnProperty(prop)) {
				oHidden = document.createElement("<input type='hidden' name='"+prop+"'>");
				oHidden.value = param[prop];
				
				oForm.appendChild(oHidden);
			}
		}
		
		oHidden = document.createElement("<input type='hidden' name='fileId'>");
		oHidden.value = fileId;
		oForm.appendChild(oHidden);
		
		oHidden = document.createElement("<input type='hidden' name='title'>");
		oHidden.value = title;
		oForm.appendChild(oHidden);
				
		var oFrame = document.createElement("<iframe name='commonExportFrame' style='display:none'>");
		oDiv.appendChild(oForm);
		oDiv.appendChild(oFrame);
		document.body.appendChild(oDiv);
		
		document.forms['commonExportForm'].target = "commonExportFrame";
		alert(htmlurl);
		document.forms['commonExportForm'].action = htmlurl;
		document.forms['commonExportForm'].submit();
		
	} catch (e) {
		window.alert(e.description);
	}
}


function mJsMod(htmlurl,tmpWidth,tmpHeight){
	htmlurl=getRandomUrl(htmlurl);
	var newwin = window.showModalDialog(htmlurl,window,"dialogWidth:"+tmpWidth+"px;status:no;resizable:yes;dialogHeight:"+tmpHeight+"px");
	if (newwin != null && newwin == "ok"){
	    window.Form1.action="";
	    window.Form1.submit();	    
	}
}


/*
 *useIsdel 是否启用 isdel，传值true或者其他值，当为true时，系统会自动增加isdel=0的条件。
 */
function checkIsOnlyFrmfcell(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyFrmfcell(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}


/*
 *useIsdel 是否启用 isdel，传值true或者其他值，当为true时，系统会自动增加isdel=0的条件。
 */
function checkIsOnlyGgl(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyGgl(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyGgly(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyGgly(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyFrmr(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyFrmr(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyFrmro(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyFrmro(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyfrmu(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyfrmu(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyjg(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyjg(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyjg01(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyjg01(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyXx(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyXx(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJx06(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJx06(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJx060(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJx060(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyXx01(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyXx01(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJx04(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJx04(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyzc(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyzc(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyzc02(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyzc02(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyXx03(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyXx03(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyXsf(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyXsf(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJx(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJx(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyaa(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyaa(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJx02(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJx02(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlySj11(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlySj11(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlySj(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlySj(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyCj07(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyCj07(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlycjrd(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlycjrd(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyCj070(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyCj070(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJx02new(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJx02new(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJx02new01(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJx02new01(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJ1(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJ1(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJy(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJy(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJc(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJc(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJc01(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJc01(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJck(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJck(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJc010(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJc010(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJc0102(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJc0102(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJck03(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJck03(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJcbh(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJcbh(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJcmc(fieldName,object,msg,submitId,spanId,useIsdel) {
 
	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJcmc(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyNew(fieldName,object,msg,submitId,spanId,useIsdel) {

	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyNew(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlySk(fieldName,object,msg,submitId,spanId,useIsdel) {

	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlySk(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlySkd(fieldName,object,msg,submitId,spanId,useIsdel) {

	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlySkd(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJx041(fieldName,object,msg,submitId,spanId,useIsdel) {

	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJx041(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyKw(fieldName,object,msg,submitId,spanId,useIsdel) {

	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyKw(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyJx030(fieldName,object,msg,submitId,spanId,useIsdel) {

	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyJx030(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlySj03(fieldName,object,msg,submitId,spanId,useIsdel) {

	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlySj03(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlySj030(fieldName,object,msg,submitId,spanId,useIsdel) {

	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlySj030(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlySj0306(fieldName,object,msg,submitId,spanId,useIsdel) {

	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlySj0306(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlySj0605(fieldName,object,msg,submitId,spanId,useIsdel) {

	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlySj0605(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyXs11_s(fieldName,object,msg,submitId,spanId,useIsdel) {

	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	if(isOld){
		dwrMonitor.checkIsOnlyXs11_s(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}

function checkIsOnlyXj(fieldName,object,msg,submitId,spanId,useIsdel) {

	DWREngine.setAsync(false);
	checkonly_spanId = checkonly_spanId + fieldName;
	if(msg!=undefined)
		checkonly_msg = msg;
	if(submitId!=undefined)
		checkonly_submitId = submitId;
	if(spanId!=undefined) 
		checkonly_spanId = spanId;
	var value = object.value;
	var checkonly_oldvalue_temp = fieldName + "$" + trimstr(value);
	var isOld = true;
	for(var kk=0;kk<checkonly_oldvalue.length;kk ++) {
		if(checkonly_oldvalue_temp == checkonly_oldvalue[kk]) {
			isOld = false;
			break;
		}
	}
	
	if(isOld){
		dwrMonitor.checkIsOnlyXj(value,useIsdel,checkOnlyResult);
	} else {
		document.getElementById(checkonly_spanId).innerHTML = "";
		var isCanSubmit = true;
		var checkonly_field_temps = checkonly_field.split(",");
		for(var jj=0;jj<checkonly_field_temps.length;jj++) {
			if(trimstr(checkonly_field_temps[jj]) != "") {
				if(document.getElementById("checkmessage_"+checkonly_field_temps[jj]).innerHTML != "") {
					isCanSubmit = false;
				}
			}
		} 
		if(isCanSubmit) 
			if(document.getElementById(checkonly_submitId)!=null){
				document.getElementById(checkonly_submitId).disabled = false;
			}
			checkonly_spanId = "checkmessage_";
		return false;
	}
	return true;
}


function isIE(){ //ie? 
	if (window.navigator.userAgent.toLowerCase().indexOf("msie")>=1) 
		return true; 
	else 
		return false; 
}
/*
 * 去掉数字中的空格
 */
function checkNums(obj){
	var strNum = obj.value;
	strNum = strNum.replaceAll(' ','');
	obj.value = strNum;
}


if(!isIE()){ //firefox innerText define 
	HTMLElement.prototype.__defineGetter__( "innerText", 
	function(){ 
		var anyString =""; 
		var childS = this.childNodes; 
		for(var i=0; i<childS.length; i++) { 
			if(childS[i].nodeType==1) 
				anyString += childS[i].tagName=="BR" ? '\n' : childS[i].textContent; 
			else if(childS[i].nodeType==3) 
				anyString += childS[i].nodeValue; 
		} 
		return anyString; 
	}); 
	HTMLElement.prototype.__defineSetter__( "innerText", 
	function(sText){ 
		this.textContent=sText; 
	} ); 
	
} 

function cjkEncode(text) {       
    if (text == null) {       
        return "";       
    }       
    var newText = "";       
    for (var i = 0; i < text.length; i++) {       
        var code = text.charCodeAt (i);        
        if (code >= 128 || code == 91 || code == 93) {//91 is "[", 93 is "]".       
            newText += "[" + code.toString(16) + "]";       
        } else {       
            newText += text.charAt(i);       
        }       
    }       
    return newText;       
}  

function frdy(url){
	if(document.Form1!=undefined&&document.Form1!="undefined"){
		var formurl=document.Form1.action;
		document.Form1.action=url;
		var target=document.Form1.target;
		document.Form1.target="_blank";
		document.Form1.submit();
		document.Form1.action=formurl;
		document.Form1.target=target;
	}else{
		var formurl=document.forms[0].action;
		document.forms[0].action=url;
		var target=document.forms[0].target;
		document.forms[0].target="_blank";
		document.forms[0].submit();
		document.forms[0].action=formurl;
		document.forms[0].target=target;
	}
	
}

function showfrDyWin(){
    if(document.getElementById("finreportids")) {
      var values="";
      var elems=document.getElementsByName("C_Select");
      for(var i=0;i<elems.length;i++){
        if(elems[i].checked){
          values+="'"+elems[i].value+"',";
        }
      }
      document.getElementById("finreportids").value=values.substring(1,values.length-2);
    } 
	$("#frdy_win").show().window("open");
}

//修复表头表数据错位问题,页脚丢失问题 by 汪雨驰
function checkWidth() {
	var headers = $(".dataTables_scrollHeadInner table:eq(0) tr:eq(0) th");
	var tab = document.getElementById("dataTables");
	var rows = tab.rows;
	headers.each(function(j, header){
		for (var i = 0; i < rows.length; i++) {
			var cells = rows[i].cells;
			cells[j].width = header.style.width;
		}
	});
	
	//页面
	var tag_mainView = $("#tag_mainView");
	var padding = 0;
	if (tag_mainView != undefined) {
		try{
			padding = parseInt(tag_mainView.css("padding-top").replace("px",""));
		}catch(e){
			padding = 0;
		}
	}
	//页面标题
	var main_view_title = $("#main_view_title");
	var main_view_title_height = 0;
	if (main_view_title != undefined) {
		main_view_title_height = main_view_title.outerHeight();
	}
	//搜索框
	var toolAndSearchView = $("#toolAndSearchView");
	var toolAndSearchView_height = 0;
	if (toolAndSearchView != undefined) {
		toolAndSearchView_height = toolAndSearchView.outerHeight();
	}
	
	//显示页面div
	var tag_tshowView = $("#tag_tshowView");
	//更新显示页面的高度
	tag_tshowView.height(tag_mainView.height() - 2 * padding - main_view_title_height - toolAndSearchView_height);
	//显示div
	var dataTables_wrapper = $("#dataTables_wrapper div:eq(0) div:eq(0)");
	
	//页脚div
	var dataTables_info = $("#dataTables_info");
	var dataTables_info_height = 0;
	if (dataTables_info != undefined) {
		dataTables_info_height = toolAndSearchView.outerHeight();
	}
	dataTables_wrapper.height(tag_tshowView.height() - dataTables_info_height);
	
	dataTables_wrapper.find(">div:eq(1)").height(dataTables_wrapper.height() - dataTables_wrapper.find(">div:eq(0)").height());
}
//帆软专用
var vid="";
var mb="";
var id="";
var b=0;
function frdy_laosha(ids,key,frurl,func){
		vid=ids;
		DWREngine.setAsync(false);
		dwrMonitor.getFrMbxx(key,getDataResult_fr);
		if(!document.getElementById("frjumpurl")){
			$("[name='Form1']").eq(0).append("<input type='hidden' id='frjumpurl' name='frjumpurl'  value=''  />")
		}
		if(b==1){
		setTimeout(func,0);
		}else{
		var url=""
		if(mb.indexOf(".frm")>=0){
				url=frurl+"/ReportServer?formlet=/"+mb;
		}else{
				url=frurl+"/ReportServer?reportlet=/"+mb;
		}
		console.info(url);
		if(id!=null && id.indexOf(",")>0){
			var strs= new Array();
			strs=id.split(",");
			var idl=vid.split(",");
			for(var i=0;i<strs.length;i++){
				url+="&"+strs[i]+"="+idl[i];
			}
		}else{
		
			if(id!=null)url+="&"+id+"="+vid;
		}
			var str_url=window.btoa(url);
			//str_url=window.atob(str_url);
			//alert(str_url);
			$("#frjumpurl").val(str_url);
			//获取路径
			var pathName=window.document.location.pathname;
			//截取，得到项目名称
			var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
			JsOpenWin(projectName+"/fr/fr_index.jsp",1000,700);
		}
}
function getDataResult_fr(obj){
if(obj!=""){
		 mb=obj[0];
		 id=obj[1];
}else{
	b=1;
}
}


//共性需求 系统总所有打印字眼改成导出
$(function(){
	try{
		var  $btvalue= $('input[type=button]');
		$btvalue.each(function (i,n) {
			//以防打印字眼有空格的情况
			if($(this).val().replace(/\s*/g,"")=="打印"){
				$(this).val("导出");
			}
		})}
	catch(e){}
});