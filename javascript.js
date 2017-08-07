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

    // cube 的空间位置，x，y，z,旋转轴，旋转角度
    // 代表每一个块的空间位置，顺序是色块的序列号
    var cubePosition = [
        [0,   0,   0,    {'X':0, 'Y':0, 'Z':0}],//1
        [0,   200, 0,    {'X':0, 'Y':0, 'Z':0}],//2
        [0,   400, 0,    {'X':0, 'Y':0, 'Z':0}],//3
        [200, 0,   0,    {'X':0, 'Y':0, 'Z':0}],//4
        [200, 200, 0,    {'X':0, 'Y':0, 'Z':0}],//5!!!!
        [200, 400, 0,    {'X':0, 'Y':0, 'Z':0}],//6
        [400, 0,   0,    {'X':0, 'Y':0, 'Z':0}],//7
        [400, 200, 0,    {'X':0, 'Y':0, 'Z':0}],//8
        [400, 400, 0,    {'X':0, 'Y':0, 'Z':0}],//9



        [0,   0,   -200, {'X':0, 'Y':0, 'Z':0}],//10
        [0,   200, -200, {'X':0, 'Y':0, 'Z':0}],//11!!!
        [0,   400, -200, {'X':0, 'Y':0, 'Z':0}],//12
        [200, 0,   -200, {'X':0, 'Y':0, 'Z':0}],//13!!!
        [200, 200, -200, {'X':0, 'Y':0, 'Z':0}],//14???ccccccccccccccccccc
        [200, 400, -200, {'X':0, 'Y':0, 'Z':0}],//15!!!
        [400, 0,   -200, {'X':0, 'Y':0, 'Z':0}],//16
        [400, 200, -200, {'X':0, 'Y':0, 'Z':0}],//17!!!
        [400, 400, -200, {'X':0, 'Y':0, 'Z':0}],//18
        [0,   0,   -400, {'X':0, 'Y':0, 'Z':0}],//19
        [0,   200, -400, {'X':0, 'Y':0, 'Z':0}],//20
        [0,   400, -400, {'X':0, 'Y':0, 'Z':0}],//21
        [200, 0,   -400, {'X':0, 'Y':0, 'Z':0}],//22
        [200, 200, -400, {'X':0, 'Y':0, 'Z':0}],//23!!!
        [200, 400, -400, {'X':0, 'Y':0, 'Z':0}],//24
        [400, 0,   -400, {'X':0, 'Y':0, 'Z':0}],//25
        [400, 200, -400, {'X':0, 'Y':0, 'Z':0}],//26
        [400, 400, -400, {'X':0, 'Y':0, 'Z':0}],//27
    ];
    // 设置旋转面包含的cube块序列号
    var bigSixFace = {
	    'u'   :[
				  19,  20, 21,
			      10,  11, 12,
			       1,   2,  3
			    ],
	    'f':[
				   1,   2,  3,
				   4,   5,  6,
				   7,   8,  9
			    ],
	    'd' :[
				   7,   8,  9,
				  16,  17, 18,
				  25,  26, 27
			    ],
	    'b' :[
				  21,  20, 19,
				  24,  23, 22,
				  27,  26, 25
			    ],
	    'l' :[
				  19,  10,  1,
				  22,  13,  4,
				  25,  16,  7
			    ],
	    'r':[
				   3,  12, 21,
				   6,  15, 24,
				   9,  18, 27
			    ],
    };
    
    // magic cube 每个小cube都有一个槽点，槽点是我自定义的，1-27编号，有固定顺序，
    // 槽点的顺序是死的，固定的，
    var cubeSlot = [];
    upDateCubeSlot ();

    function upDateCubeSlot () {
        cubeSlot = [
                     bigSixFace['f'][0],bigSixFace['f'][1],bigSixFace['f'][2],
                     bigSixFace['f'][3],bigSixFace['f'][4],bigSixFace['f'][5],
                     bigSixFace['f'][6],bigSixFace['f'][7],bigSixFace['f'][8],
                     bigSixFace['u'][3],bigSixFace['u'][4],bigSixFace['u'][5],
                     bigSixFace['l'][4],
                     14,
                     bigSixFace['r'][4],
                     bigSixFace['d'][3],bigSixFace['d'][4],bigSixFace['d'][5],
                     bigSixFace['b'][2],bigSixFace['b'][1],bigSixFace['b'][0],
                     bigSixFace['b'][5],bigSixFace['b'][4],bigSixFace['b'][3],
                     bigSixFace['b'][8],bigSixFace['b'][7],bigSixFace['b'][6],
                   ];
    };


    // 当旋转时，更新旋转面包含的cube块序列号
    // rerender之前把各个小cube位置重新定义
    function changeBigSixFaceAndCubePosition(whichFace, axis, deg) {
        //去除上一次的槽点上的cube序号
        var tempSlot = [];

        for (let i = 0; i < cubeSlot.length; i ++) {
            tempSlot[i] = cubeSlot[i];
            
        };

    	if(whichFace == "f"){
    		let tep_01 = bigSixFace['u'].slice(0,6).concat(bigSixFace['d'].slice(0,3).reverse());
    		let tep_02 = [bigSixFace['f'][8],bigSixFace['f'][5],bigSixFace['f'][2]];
    		let tep_03 = [bigSixFace['f'][6],bigSixFace['f'][3],bigSixFace['f'][0]];
    		let tep_04 = bigSixFace['u'].slice(6).reverse().concat(bigSixFace['d'].slice(3));
    		bigSixFace['u'] = tep_01;
    		bigSixFace['l'][2] = tep_02[0];
    		bigSixFace['l'][5] = tep_02[1];
    		bigSixFace['l'][8] = tep_02[2];
    		bigSixFace['r'][0] = tep_03[0];
    		bigSixFace['r'][3] = tep_03[1];
    		bigSixFace['r'][6] = tep_03[2];
    		bigSixFace['d'] = tep_04;
    	};
    	if(whichFace == "u"){
    		let tep_01 = bigSixFace['b'].slice(0,3).concat(bigSixFace['f'].slice(3));
    		let tep_02 = bigSixFace['r'].slice(0,3).concat(bigSixFace['l'].slice(3));
    		let tep_03 = bigSixFace['l'].slice(0,3).concat(bigSixFace['r'].slice(3));
    		let tep_04 = bigSixFace['f'].slice(0,3).concat(bigSixFace['b'].slice(3));
    		bigSixFace['f'] = tep_01;
    		bigSixFace['l'] = tep_02;
    		bigSixFace['r'] = tep_03;
    		bigSixFace['b'] = tep_04;
    	};
    	if(whichFace == "r"){
    		let tep_01 = [bigSixFace['b'][6],bigSixFace['b'][3],bigSixFace['b'][0]];
    		let tep_02 = [bigSixFace['d'][2],bigSixFace['d'][5],bigSixFace['d'][8]];
    		let tep_03 = [bigSixFace['f'][8],bigSixFace['f'][5],bigSixFace['f'][2]];
    		let tep_04 = [bigSixFace['u'][2],bigSixFace['u'][5],bigSixFace['u'][8]];
    		bigSixFace['f'][2] = tep_01[0];
    		bigSixFace['f'][5] = tep_01[1];
    		bigSixFace['f'][8] = tep_01[2];
    		bigSixFace['u'][2] = tep_02[0];
    		bigSixFace['u'][5] = tep_02[1];
    		bigSixFace['u'][8] = tep_02[2];
    		bigSixFace['b'][0] = tep_03[0];
    		bigSixFace['b'][3] = tep_03[1];
    		bigSixFace['b'][6] = tep_03[2];
    		bigSixFace['d'][2] = tep_04[0];
    		bigSixFace['d'][5] = tep_04[1];
    		bigSixFace['d'][8] = tep_04[2];
    	};
    	if(whichFace == "l"){
    		let tep_01 = [bigSixFace['b'][8],bigSixFace['b'][5],bigSixFace['b'][2]];
    		let tep_02 = [bigSixFace['d'][0],bigSixFace['d'][3],bigSixFace['d'][6]];
    		let tep_03 = [bigSixFace['f'][6],bigSixFace['f'][3],bigSixFace['f'][0]];
    		let tep_04 = [bigSixFace['u'][0],bigSixFace['u'][3],bigSixFace['u'][6]];

    		bigSixFace['f'][0] = tep_01[0];
    		bigSixFace['f'][3] = tep_01[1];
    		bigSixFace['f'][6] = tep_01[2];
    		bigSixFace['u'][0] = tep_02[0];
    		bigSixFace['u'][3] = tep_02[1];
    		bigSixFace['u'][6] = tep_02[2];
    		bigSixFace['b'][2] = tep_03[0];
    		bigSixFace['b'][5] = tep_03[1];
    		bigSixFace['b'][8] = tep_03[2];
    		bigSixFace['d'][0] = tep_04[0];
    		bigSixFace['d'][3] = tep_04[1];
    		bigSixFace['d'][6] = tep_04[2];
    	};
    	if(whichFace == "b"){
    		let tep_01 = bigSixFace['d'].slice(6).reverse().concat(bigSixFace['u'].slice(3));
    		let tep_02 = [bigSixFace['r'][8],bigSixFace['r'][5],bigSixFace['r'][2]];
    		let tep_03 = [bigSixFace['l'][6],bigSixFace['l'][3],bigSixFace['l'][0]];
    		let tep_04 = bigSixFace['d'].slice(0,6).concat(bigSixFace['u'].slice(0,3).reverse());

    		bigSixFace['u'] = tep_01;
    		bigSixFace['l'][0] = tep_02[0];
    		bigSixFace['l'][3] = tep_02[1];
    		bigSixFace['l'][6] = tep_02[2];
    		bigSixFace['r'][2] = tep_03[0];
    		bigSixFace['r'][5] = tep_03[1];
    		bigSixFace['r'][8] = tep_03[2];
    		bigSixFace['d'] = tep_04;
    	};
    	if(whichFace == "d"){
		   let tep_01 = bigSixFace['f'].slice(0,6).concat(bigSixFace['b'].slice(6));
		   let tep_02 = bigSixFace['l'].slice(0,6).concat(bigSixFace['r'].slice(6));
		   let tep_03 = bigSixFace['r'].slice(0,6).concat(bigSixFace['l'].slice(6));
		   let tep_04 = bigSixFace['b'].slice(0,6).concat(bigSixFace['f'].slice(6));
		   bigSixFace['f'] = tep_01;
		   bigSixFace['l'] = tep_02;
		   bigSixFace['r'] = tep_03;
		   bigSixFace['b'] = tep_04;
    	};

    	bigSixFace[whichFace] = bigSixFace[whichFace].reverse();


        upDateCubeSlot ();//更新 cubeSlot

        var count = 0;

        for (let i = 0; i<cubeSlot.length; i ++) {

            
            if (cubeSlot[i] != tempSlot[i]){
                count ++;

                if (count == 5) {return false;};
                var tempNewPos_01 = cubePosition[cubeSlot[i]-1];
                var tempNewPos_02 = cubePosition[i];



                tempNewPos_01[3][axis] = deg;
                tempNewPos_02[3][axis] = deg;
                tempNewPos_01[3][axis] = deg;
                tempNewPos_02[3][axis] = deg;

                cubePosition[i] = tempNewPos_01;
                cubePosition[cubeSlot[i]-1] = tempNewPos_02;
            };
        };

        if(whichFace == "f"){
            cubePosition[bigSixFace["f"][4]][axis] = deg;
        }
        if(whichFace == "u"){
            cubePosition[bigSixFace["u"][4]][axis] = deg;
        }
        if(whichFace == "r"){
            cubePosition[bigSixFace["r"][4]][axis] = deg;
        }
        if(whichFace == "l"){
            cubePosition[bigSixFace["l"][4]][axis] = deg;
        }
        if(whichFace == "b"){
            cubePosition[bigSixFace["b"][4]][axis] = deg;
        }
        if(whichFace == "d"){
            cubePosition[bigSixFace["d"][4]][axis] = deg;
        }



    };

    



















    // 根据给定的空间位置，设置内联样式
    function cubePositionStyle (i) {
    	return  "top:"+cubePosition[i-1][0]+"px; "+
		    	"left:"+cubePosition[i-1][1]+"px ;"+
		    	"transform:translateZ("+cubePosition[i-1][2]+"px) "+
		    	           "rotateX("+cubePosition[i-1][3]['X']+"deg)"+" rotateY("+cubePosition[i-1][3]['Y']+"deg)"+" rotateZ("+cubePosition[i-1][3]['Z']+"deg)";
    };
    // 每个cube的六个小面
    function sixFace(i) {
        return '<div class="face_01">!'+i+'</div>'+
               '<div class="face_02">!'+i+'</div>'+
               '<div class="face_03">!'+i+'</div>'+
               '<div class="face_04">!'+i+'</div>'+
               '<div class="face_05">!'+i+'</div>'+
               '<div class="face_06">!'+i+'</div>';
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



    // 旋转，同时更新cube的空间位置,同时更新html布局
    function rotateCubeFace(whichFace, axis, deg){

        renderCube (false, bigSixFace[whichFace]);

        setTimeout(function(){
            $(".litteWrap").style.transform = "rotate"+axis+"("+deg+"deg)";
        },10);

        changeBigSixFaceAndCubePosition(whichFace, axis, deg);
    };


    // 六个面的旋转按钮
    $('.btn1').onclick = function(){
    	rotateCubeFace('u', "Y", -180);
    	console.log(bigSixFace);
    };
    $('.btn2').onclick = function(){
    	rotateCubeFace('l', "X", -180);
    	console.log(bigSixFace);
    };
    $('.btn3').onclick = function(){
    	rotateCubeFace('f', "Z", 180);
    	console.log(bigSixFace);
    };
    $('.btn4').onclick = function(){
    	rotateCubeFace('r', "X", 180);
    	console.log(bigSixFace);
    };
    $('.btn5').onclick = function(){
    	rotateCubeFace('d', "Y", 180);
    	console.log(bigSixFace);
    };
    $('.btn6').onclick = function(){
    	rotateCubeFace('b', "Z", -180);
    	console.log(bigSixFace);
    };

















}