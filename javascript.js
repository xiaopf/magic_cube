window.onload = function(){
	let RANK = 3; // 定义魔方的阶数
    let cubeNum = RANK * RANK * RANK//计算立方体的个数

    const $ = function (key) {
    	return document.querySelector(key);
    };
    // 初始化big_box的视角
    // $("#big_box").style.transform = '';
    // $("#big_box").style.transform += 'rotateX('+$('.x_rotate').value+'deg)';
    // $("#big_box").style.transform += 'rotateY('+$('.y_rotate').value+'deg)';
    // $("#big_box").style.transform += 'rotateZ('+$('.z_rotate').value+'deg)';
	$('.x_deg').innerHTML = $('.x_rotate').value + 'deg';
	$('.y_deg').innerHTML = $('.y_rotate').value + 'deg';
	$('.z_deg').innerHTML = $('.z_rotate').value + 'deg';

    // 调整big_box的视角
	$('.x_rotate').oninput = function(){
		$('.x_deg').innerHTML = this.value + 'deg';
		$("#big_box").style.transform = '';
		$("#big_box").style.transform += 'rotateX('+$('.x_rotate').value+'deg)';
		$("#big_box").style.transform += 'rotateY('+$('.y_rotate').value+'deg)';
		$("#big_box").style.transform += 'rotateZ('+$('.z_rotate').value+'deg)';
	};
	$('.y_rotate').oninput = function(){
		$('.y_deg').innerHTML = this.value + 'deg';
		$("#big_box").style.transform = '';
		$("#big_box").style.transform += 'rotateX('+$('.x_rotate').value+'deg)';
		$("#big_box").style.transform += 'rotateY('+$('.y_rotate').value+'deg)';
		$("#big_box").style.transform += 'rotateZ('+$('.z_rotate').value+'deg)';
	};
	$('.z_rotate').oninput = function(){
		$('.z_deg').innerHTML = this.value + 'deg';
		$("#big_box").style.transform = '';
		$("#big_box").style.transform += 'rotateX('+$('.x_rotate').value+'deg)';
		$("#big_box").style.transform += 'rotateY('+$('.y_rotate').value+'deg)';
		$("#big_box").style.transform += 'rotateZ('+$('.z_rotate').value+'deg)';
	};
    // 视角复位
	$('.btnF').onclick = function(){
		$('.x_rotate').value = '-30';
		$('.y_rotate').value = '-30';
		$('.z_rotate').value = '0';
		$('.x_deg').innerHTML = '-30deg';
		$('.y_deg').innerHTML = '-30deg';
		$('.z_deg').innerHTML = '0deg';
		$("#big_box").style.transform = '';
		$("#big_box").style.transform += 'rotateX(-30deg)';
		$("#big_box").style.transform += 'rotateY(-30deg)';
		$("#big_box").style.transform += 'rotateZ(0deg)';
	}
    // 每个cube的六个小面
    function sixFace(i) {
    	return '<div class="face_01">!'+i+'</div>'+
			   '<div class="face_02">!'+i+'</div>'+
			   '<div class="face_03">!'+i+'</div>'+
			   '<div class="face_04">!'+i+'</div>'+
			   '<div class="face_05">!'+i+'</div>'+
			   '<div class="face_06">!'+i+'</div>';
    };

    // cube 的空间位置，x，y，z,旋转轴，旋转角度
    var cubePosition = [
        [0,   0,   0,    'Z', 0],
        [0,   200, 0,    'Z', 0],
        [0,   400, 0,    'Z', 0],
        [200, 0,   0,    'Z', 0],
        [200, 200, 0,    'Z', 0],
        [200, 400, 0,    'Z', 0],
        [400, 0,   0,    'Z', 0],
        [400, 200, 0,    'Z', 0],
        [400, 400, 0,    'Z', 0],
        [0,   0,   -200, 'Z', 0],
        [0,   200, -200, 'Z', 0],
        [0,   400, -200, 'Z', 0],
        [200, 0,   -200, 'Z', 0],
        [200, 200, -200, 'Z', 0],
        [200, 400, -200, 'Z', 0],
        [400, 0,   -200, 'Z', 0],
        [400, 200, -200, 'Z', 0],
        [400, 400, -200, 'Z', 0],
        [0,   0,   -400, 'Z', 0],
        [0,   200, -400, 'Z', 0],
        [0,   400, -400, 'Z', 0],
        [200, 0,   -400, 'Z', 0],
        [200, 200, -400, 'Z', 0],
        [200, 400, -400, 'Z', 0],
        [400, 0,   -400, 'Z', 0],
        [400, 200, -400, 'Z', 0],
        [400, 400, -400, 'Z', 0],
    ];
    // 设置旋转面包含的cube块序列号
    var bigSixFace = {
	    'up'   :[
				  19,  20, 21,
			      10,  11, 12,
			       1,   2,  3
			    ],
	    'front':[
				   1,   2,  3,
				   4,   5,  6,
				   7,   8,  9
			    ],
	    'down' :[
				   7,   8,  9,
				  16,  17, 18,
				  25,  26, 27
			    ],
	    'back' :[
				  21,  20, 19,
				  24,  23, 22,
				  27,  26, 25
			    ],
	    'left' :[
				  19,  10,  1,
				  22,  13,  4,
				  25,  16,  7
			    ],
	    'right':[
				   3,  12, 21,
				   6,  15, 24,
				   9,  18, 27
			    ],
    };
    // 当旋转时，更新旋转面包含的cube块序列号
    function changeBigSixFace(whichFace) {
    	if(whichFace == "front"){
    		let tep_01 = bigSixFace['up'].slice(0,6).concat(bigSixFace['down'].slice(0,3).reverse());
    		let tep_02 = [bigSixFace['front'][8],bigSixFace['front'][5],bigSixFace['front'][2]];
    		let tep_03 = [bigSixFace['front'][6],bigSixFace['front'][3],bigSixFace['front'][0]];
    		let tep_04 = bigSixFace['up'].slice(6).reverse().concat(bigSixFace['down'].slice(3));
    		bigSixFace['up'] = tep_01;
    		bigSixFace['left'][2] = tep_02[0];
    		bigSixFace['left'][5] = tep_02[1];
    		bigSixFace['left'][8] = tep_02[2];
    		bigSixFace['right'][0] = tep_03[0];
    		bigSixFace['right'][3] = tep_03[1];
    		bigSixFace['right'][6] = tep_03[2];
    		bigSixFace['down'] = tep_04;
    	};
    	if(whichFace == "up"){
    		let tep_01 = bigSixFace['back'].slice(0,3).concat(bigSixFace['front'].slice(3));
    		let tep_02 = bigSixFace['right'].slice(0,3).concat(bigSixFace['left'].slice(3));
    		let tep_03 = bigSixFace['left'].slice(0,3).concat(bigSixFace['right'].slice(3));
    		let tep_04 = bigSixFace['front'].slice(0,3).concat(bigSixFace['back'].slice(3));
    		bigSixFace['front'] = tep_01;
    		bigSixFace['left'] = tep_02;
    		bigSixFace['right'] = tep_03;
    		bigSixFace['back'] = tep_04;
    	};
    	if(whichFace == "right"){
    		let tep_01 = [bigSixFace['back'][6],bigSixFace['back'][3],bigSixFace['back'][0]];
    		let tep_02 = [bigSixFace['down'][2],bigSixFace['down'][5],bigSixFace['down'][8]];
    		let tep_03 = [bigSixFace['front'][8],bigSixFace['front'][5],bigSixFace['front'][2]];
    		let tep_04 = [bigSixFace['up'][2],bigSixFace['up'][5],bigSixFace['up'][8]];
    		bigSixFace['front'][2] = tep_01[0];
    		bigSixFace['front'][5] = tep_01[1];
    		bigSixFace['front'][8] = tep_01[2];
    		bigSixFace['up'][2] = tep_02[0];
    		bigSixFace['up'][5] = tep_02[1];
    		bigSixFace['up'][8] = tep_02[2];
    		bigSixFace['back'][0] = tep_03[0];
    		bigSixFace['back'][3] = tep_03[1];
    		bigSixFace['back'][6] = tep_03[2];
    		bigSixFace['down'][2] = tep_04[0];
    		bigSixFace['down'][5] = tep_04[1];
    		bigSixFace['down'][8] = tep_04[2];
    	};
    	if(whichFace == "left"){
    		let tep_01 = [bigSixFace['back'][8],bigSixFace['back'][5],bigSixFace['back'][2]];
    		let tep_02 = [bigSixFace['down'][0],bigSixFace['down'][3],bigSixFace['down'][6]];
    		let tep_03 = [bigSixFace['front'][6],bigSixFace['front'][3],bigSixFace['front'][0]];
    		let tep_04 = [bigSixFace['up'][0],bigSixFace['up'][3],bigSixFace['up'][6]];

    		bigSixFace['front'][0] = tep_01[0];
    		bigSixFace['front'][3] = tep_01[1];
    		bigSixFace['front'][6] = tep_01[2];
    		bigSixFace['up'][0] = tep_02[0];
    		bigSixFace['up'][3] = tep_02[1];
    		bigSixFace['up'][6] = tep_02[2];
    		bigSixFace['back'][2] = tep_03[0];
    		bigSixFace['back'][5] = tep_03[1];
    		bigSixFace['back'][8] = tep_03[2];
    		bigSixFace['down'][0] = tep_04[0];
    		bigSixFace['down'][3] = tep_04[1];
    		bigSixFace['down'][6] = tep_04[2];
    	};
    	if(whichFace == "back"){
    		let tep_01 = bigSixFace['down'].slice(6).reverse().concat(bigSixFace['up'].slice(3));
    		let tep_02 = [bigSixFace['right'][8],bigSixFace['right'][5],bigSixFace['right'][2]];
    		let tep_03 = [bigSixFace['left'][6],bigSixFace['left'][3],bigSixFace['left'][0]];
    		let tep_04 = bigSixFace['down'].slice(0,6).concat(bigSixFace['up'].slice(0,3).reverse());

    		bigSixFace['up'] = tep_01;
    		bigSixFace['left'][0] = tep_02[0];
    		bigSixFace['left'][3] = tep_02[1];
    		bigSixFace['left'][6] = tep_02[2];
    		bigSixFace['right'][2] = tep_03[0];
    		bigSixFace['right'][5] = tep_03[1];
    		bigSixFace['right'][8] = tep_03[2];
    		bigSixFace['down'] = tep_04;
    	};
    	if(whichFace == "down"){
		   let tep_01 = bigSixFace['front'].slice(0,6).concat(bigSixFace['back'].slice(6));
		   let tep_02 = bigSixFace['left'].slice(0,6).concat(bigSixFace['right'].slice(6));
		   let tep_03 = bigSixFace['right'].slice(0,6).concat(bigSixFace['left'].slice(6));
		   let tep_04 = bigSixFace['back'].slice(0,6).concat(bigSixFace['front'].slice(6));
		   bigSixFace['front'] = tep_01;
		   bigSixFace['left'] = tep_02;
		   bigSixFace['right'] = tep_03;
		   bigSixFace['back'] = tep_04;
    	};

    	bigSixFace[whichFace] = bigSixFace[whichFace].reverse();
    };
    // 旋转，同时更新cube的空间位置,同时更新html布局
    function rotateCubeFace(whichFace, axis, deg){

    	renderCube (false, bigSixFace[whichFace]);

    	setTimeout(function(){
    		$(".litteWrap").style.transform = "rotate"+axis+"("+deg+"deg)";
    	},10);

		changeBigSixFace(whichFace, axis, deg);
		changeCubePosition(whichFace, axis, deg);
    };
    function changeCubePosition(whichFace, axis, deg) {
    	if(whichFace == "front"){
    		let tempPosition_01 = cubePosition.slice(0,9).reverse();
    		for (let i=0; i<9; i++){
    			tempPosition_01[i][3] = axis;
    			tempPosition_01[i][4] = deg;

    		}
    		let tempPosition_02 = cubePosition.slice(9);
    		cubePosition = tempPosition_01.concat(tempPosition_02);
    	}
    };
    // 根据给定的空间位置，设置内联样式
    function cubePositionStyle (i) {
    	return  "top:"+cubePosition[i-1][0]+"px; "+
		    	"left:"+cubePosition[i-1][1]+"px ;"+
		    	"transform:translateZ("+cubePosition[i-1][2]+"px) "+
		    	           "rotate"+cubePosition[i-1][3]+
		    	           "("+cubePosition[i-1][4]+"deg)";
    };


    // 初始化渲染cubes
    renderCube (true, []);

    // 渲染cubes
    function renderCube (init, whichFace) {
    	var onOff = true;
    	$("#big_box").innerHTML="";
		for (let i = 1; i <= cubeNum; i++) {
			if (init) {
				$("#big_box").innerHTML += '<div index="'+i+'" class="box" style="'+cubePositionStyle (i)+'">'+sixFace(i)+'</div>';
			} else {
				if (i == whichFace[0] || i == whichFace[1] || i == whichFace[2] || i == whichFace[3] || i == whichFace[4] || i == whichFace[5] || i == whichFace[6] || i == whichFace[7] || i == whichFace[8] ) {
					if (onOff) {
						$("#big_box").innerHTML += '<div class="litteWrap"></div>';
						$(".litteWrap").innerHTML += '<div index="'+i+'" class="box" style="'+cubePositionStyle (i)+'">'+sixFace(i)+'</div>';
						onOff = false;
					} else {
						$(".litteWrap").innerHTML += '<div index="'+i+'" class="box" style="'+cubePositionStyle (i)+'">'+sixFace(i)+'</div>';
					}
				} else {
					$("#big_box").innerHTML += '<div index="'+i+'" class="box" style="'+cubePositionStyle (i)+'">'+sixFace(i)+'</div>';
				}
			};
    	};
    };


    // 六个面的旋转按钮
    $('.btn1').onclick = function(){
    	rotateCubeFace('up', "Y", -180);
    	console.log(bigSixFace);
    };
    $('.btn2').onclick = function(){
    	rotateCubeFace('left', "X", -180);
    	console.log(bigSixFace);
    };
    $('.btn3').onclick = function(){
    	rotateCubeFace('front', "Z", 180);
    	console.log(bigSixFace);
    };
    $('.btn4').onclick = function(){
    	rotateCubeFace('right', "X", 180);
    	console.log(bigSixFace);
    };
    $('.btn5').onclick = function(){
    	rotateCubeFace('down', "Y", 180);
    	console.log(bigSixFace);
    };
    $('.btn6').onclick = function(){
    	rotateCubeFace('back', "Z", -180);
    	console.log(bigSixFace);
    };

















}