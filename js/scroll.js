moveXm=6; // １度にスクロールする幅。
speedm=85; // スクロールする間隔
marginm=10;

tm2=0;
function scroll(obj){

	obWidth=obj.offsetWidth;
	obj.style.width=obWidth+"px"; // スクロール文字の幅を取得→widthを指定
	getWinWidth();
	x=winWidth-obWidth-marginm; // 文字列の初期配置
	return moveStylem();
}
function getWinWidth(){
	if(document.all) // ブラウザの横幅を取得
		winWidth=document.body.clientWidth;
	else if(document.getElementById)
		winWidth=window.innerWidth;
}
function moveStylem(){
	getWinmWidth();
	/*if(x<marginm || x>winWidth-obWidth-marginm){ // 端まで進んで反転、10はマージン
		moveXm2*=-1;
	}*/
	x=x-moveXm2;
	obj2.style.left=x+"px";  // 文字列の横方向の配置
	clearTimeout(tm2);
	tm2=setTimeout("moveStylem()",speedm);
}
/*if(document.getElementById)
	window.onload=scroll();
}*/
