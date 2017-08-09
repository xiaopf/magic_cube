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
        [0,   0,   0  ],//1
        [0,   200, 0  ],//2
        [0,   400, 0  ],//3
        [200, 0,   0  ],//4
        [200, 200, 0  ],//5!!!!
        [200, 400, 0  ],//6
        [400, 0,   0  ],//7
        [400, 200, 0  ],//8
        [400, 400, 0  ],//9
        [0,   0,   -200],//10
        [0,   200, -200],//11!!!
        [0,   400, -200],//12
        [200, 0,   -200],//13!!!
        [200, 200, -200],//14???ccccccccccccccccccc
        [200, 400, -200],//15!!!
        [400, 0,   -200],//16
        [400, 200, -200],//17!!!
        [400, 400, -200],//18
        [0,   0,   -400],//19
        [0,   200, -400],//20
        [0,   400, -400],//21
        [200, 0,   -400],//22
        [200, 200, -400],//23!!!
        [200, 400, -400],//24
        [400, 0,   -400],//25
        [400, 200, -400],//26
        [400, 400, -400]//27
    ];
    var cubeRotateDeg = [
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0},
       {'X':0, 'Y':0, 'Z':0}
    ];
    // 设置旋转面包含的cube块序列号
    // var bigSixFace = {
	   //  'u'   :[
				//   19,  20, 21,
			 //      10,  11, 12,
			 //       1,   2,  3
			 //    ],
	   //  'f':[
				//    1,   2,  3,
				//    4,   5,  6,
				//    7,   8,  9
			 //    ],
	   //  'd' :[
				//    7,   8,  9,
				//   16,  17, 18,
				//   25,  26, 27
			 //    ],
	   //  'b' :[
				//   21,  20, 19,
				//   24,  23, 22,
				//   27,  26, 25
			 //    ],
	   //  'l' :[
				//   19,  10,  1,
				//   22,  13,  4,
				//   25,  16,  7
			 //    ],
	   //  'r':[
				//    3,  12, 21,
				//    6,  15, 24,
				//    9,  18, 27
			 //    ],
    // };

        var bigSixFace = {
            'u'   :[
                      [19, 1],  [20, 1], [21, 1],
                      [10, 1],  [11, 1], [12, 1],
                       [1, 1],   [2, 1],  [3, 1]
                    ],
            'f':[
                       [1, 3],   [2, 3],  [3, 3],
                       [4, 3],   [5, 3],  [6, 3],
                       [7, 3],   [8, 3],  [9, 3]
                    ],
            'd' :[
                       [7, 5],   [8, 5],  [9, 5],
                      [16, 5],  [17, 5], [18, 5],
                      [25, 5],  [26, 5], [27, 5]
                    ],
            'b' :[
                      [21, 6],  [20, 6], [19, 6],
                      [24, 6],  [23, 6], [22, 6],
                      [27, 6],  [26, 6], [25, 6]
                    ],
            'l' :[
                      [19, 2],  [10, 2],  [1, 2],
                      [22, 2],  [13, 2],  [4, 2],
                      [25, 2],  [16, 2],  [7, 2]
                    ],
            'r':[
                       [3, 4],  [12, 4], [21, 4],
                       [6, 4],  [15, 4], [24, 4],
                       [9, 4],  [18, 4], [27, 4]
                    ],
        };

    // magic cube 每个小cube都有一个槽点，槽点是我自定义的，1-27编号，有固定顺序，
    // 槽点的顺序是死的，固定的，
    var cubeSlot = [];
    upDateCubeSlot ();
    console.log("!!!!!!!",cubeSlot)

    function upDateCubeSlot () {
        cubeSlot = [
                     bigSixFace['f'][0][0],bigSixFace['f'][1][0],bigSixFace['f'][2][0],
                     bigSixFace['f'][3][0],bigSixFace['f'][4][0],bigSixFace['f'][5][0],
                     bigSixFace['f'][6][0],bigSixFace['f'][7][0],bigSixFace['f'][8][0],
                     bigSixFace['u'][3][0],bigSixFace['u'][4][0],bigSixFace['u'][5][0],
                     bigSixFace['l'][4][0],
                     14,
                     bigSixFace['r'][4][0],
                     bigSixFace['d'][3][0],bigSixFace['d'][4][0],bigSixFace['d'][5][0],
                     bigSixFace['b'][2][0],bigSixFace['b'][1][0],bigSixFace['b'][0][0],
                     bigSixFace['b'][5][0],bigSixFace['b'][4][0],bigSixFace['b'][3][0],
                     bigSixFace['b'][8][0],bigSixFace['b'][7][0],bigSixFace['b'][6][0],
                   ];
    };

    // 当旋转时，更新旋转面包含的cube块序列号
    // rerender之前把各个小cube位置重新定义
    function changeBigSixFaceAndCubePosition(whichFace, axis, deg, dir) {
        //去除上一次的槽点上的cube序号
        var tempSlot = [];

        var tempCubePosition = [];

        var tempBigSixFace = {
            'u' :[[],[],[],[],[],[],[],[],[]],
            'f' :[[],[],[],[],[],[],[],[],[]],
            'd' :[[],[],[],[],[],[],[],[],[]],
            'b' :[[],[],[],[],[],[],[],[],[]],
            'l' :[[],[],[],[],[],[],[],[],[]],
            'r' :[[],[],[],[],[],[],[],[],[]]
        };

        var tempCubeRotateDeg =[];

        for (let i = 0; i < cubePosition.length; i ++) {
            tempCubePosition[i] = cubePosition[i];
        };

        for (let i = 0; i < cubeSlot.length; i ++) {
            tempSlot[i] = cubeSlot[i];
        };


            for (var m = 0; m < 9; m ++) {

                    tempBigSixFace['u'][m][0] = bigSixFace['u'][m][0];
                    tempBigSixFace['f'][m][0] = bigSixFace['f'][m][0];
                    tempBigSixFace['d'][m][0] = bigSixFace['d'][m][0];
                    tempBigSixFace['b'][m][0] = bigSixFace['b'][m][0];
                    tempBigSixFace['l'][m][0] = bigSixFace['l'][m][0];
                    tempBigSixFace['r'][m][0] = bigSixFace['r'][m][0];
                    tempBigSixFace['u'][m][1] = bigSixFace['u'][m][1];
                    tempBigSixFace['f'][m][1] = bigSixFace['f'][m][1];
                    tempBigSixFace['d'][m][1] = bigSixFace['d'][m][1];
                    tempBigSixFace['b'][m][1] = bigSixFace['b'][m][1];
                    tempBigSixFace['l'][m][1] = bigSixFace['l'][m][1];
                    tempBigSixFace['r'][m][1] = bigSixFace['r'][m][1];

            };

        for (let i = 0; i < cubeRotateDeg.length; i ++) {
            tempCubeRotateDeg[i] = cubeRotateDeg[i];
        };
        





// console.log(tempBigSixFace)






        if(Math.abs(deg) == 180){//11111111111111111111111111111111111
            // console.log(180);
        	if(whichFace == "f"){
        		let tep_01 = bigSixFace['u'].slice(0,6).concat(bigSixFace['d'].slice(0,3).reverse());
        		let tep_02 = [bigSixFace['r'][6],bigSixFace['r'][3],bigSixFace['r'][0]];
        		let tep_03 = [bigSixFace['l'][8],bigSixFace['l'][5],bigSixFace['l'][2]];
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
            let tep_05 = bigSixFace[whichFace].reverse();
        	bigSixFace[whichFace] = tep_05;

        } else if(Math.abs(deg) == 90 && dir) {
            console.log("顺90");
            if(whichFace == "f"){
                let tep_01 = bigSixFace['u'].slice(0,6).concat([bigSixFace['l'][8]],[bigSixFace['l'][5]],[bigSixFace['l'][2]]);
                let tep_02 = bigSixFace['d'].slice(0,3);
                let tep_03 = bigSixFace['u'].slice(6);

                let tep_04 = [bigSixFace['r'][6],bigSixFace['r'][3],bigSixFace['r'][0]].concat(bigSixFace['d'].slice(3));

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
                let tep_01 = bigSixFace['r'].slice(0,3).concat(bigSixFace['f'].slice(3));
                let tep_02 = bigSixFace['f'].slice(0,3).concat(bigSixFace['l'].slice(3));
                let tep_03 = bigSixFace['b'].slice(0,3).concat(bigSixFace['r'].slice(3));
                let tep_04 = bigSixFace['l'].slice(0,3).concat(bigSixFace['b'].slice(3));
                bigSixFace['f'] = tep_01;
                bigSixFace['l'] = tep_02;
                bigSixFace['r'] = tep_03;
                bigSixFace['b'] = tep_04;
            };
            if(whichFace == "r"){
                let tep_01 = [bigSixFace['d'][2],bigSixFace['d'][5],bigSixFace['d'][8]];
                let tep_02 = [bigSixFace['f'][2],bigSixFace['f'][5],bigSixFace['f'][8]];
                let tep_03 = [bigSixFace['u'][8],bigSixFace['u'][5],bigSixFace['u'][2]];
                let tep_04 = [bigSixFace['b'][6],bigSixFace['b'][3],bigSixFace['b'][0]];
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
                let tep_01 = [bigSixFace['u'][0],bigSixFace['u'][3],bigSixFace['u'][6]];
                let tep_02 = [bigSixFace['b'][8],bigSixFace['b'][5],bigSixFace['b'][2]];
                let tep_03 = [bigSixFace['d'][6],bigSixFace['d'][3],bigSixFace['d'][0]];
                let tep_04 = [bigSixFace['f'][0],bigSixFace['f'][3],bigSixFace['f'][6]];

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
                let tep_01 = [bigSixFace['r'][2],bigSixFace['r'][5],bigSixFace['r'][8]].concat(bigSixFace['u'].slice(3));
                let tep_02 = bigSixFace['u'].slice(0,3).reverse();
                let tep_03 = bigSixFace['d'].slice(6).reverse();
                let tep_04 = bigSixFace['d'].slice(0,6).concat([bigSixFace['l'][0]],[bigSixFace['l'][3]],[bigSixFace['l'][6]]);

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
               let tep_01 = bigSixFace['f'].slice(0,6).concat(bigSixFace['l'].slice(6));
               let tep_02 = bigSixFace['l'].slice(0,6).concat(bigSixFace['b'].slice(6));
               let tep_03 = bigSixFace['r'].slice(0,6).concat(bigSixFace['f'].slice(6));
               let tep_04 = bigSixFace['b'].slice(0,6).concat(bigSixFace['r'].slice(6));
               bigSixFace['f'] = tep_01;
               bigSixFace['l'] = tep_02;
               bigSixFace['r'] = tep_03;
               bigSixFace['b'] = tep_04;
            };


            let tep_05 = [
                            bigSixFace[whichFace][6],bigSixFace[whichFace][3],bigSixFace[whichFace][0],
                            bigSixFace[whichFace][7],bigSixFace[whichFace][4],bigSixFace[whichFace][1],
                            bigSixFace[whichFace][8],bigSixFace[whichFace][5],bigSixFace[whichFace][2]
                         ];

            bigSixFace[whichFace] = tep_05;




        } else if(Math.abs(deg) == 90 && !dir) {
            console.log("逆90");
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
        }





        upDateCubeSlot ();//更新 cubeSlot

        var count = 0;


      console.log(tempSlot);
          console.log(cubeSlot);

        for (let i = 0; i<cubeSlot.length; i ++) {

            if (cubeSlot[i] != tempSlot[i]){

                count ++;
                // if (Math.abs(deg) == 180 && count == 5) {break};

                // if (count == 1){console.log(cubePosition)}

                // var tempNewPos_01 = cubePosition[cubeSlot[i]-1];
                var tempNewPos_01 = cubePosition[tempSlot[i]-1];
                // if (count == 1){

                    // console.log(tempSlot[i],cubeSlot[i],tempNewPos_01);
                    // console.log(tempSlot[i]-1,tempSlot[i],tempNewPos_02);

                // }
                var k = i;
                var whichAxis = "";
                var whichAxisDir = true;
                var whichDir = true;
            

                for (let j = 0; j < 9; j++){
                    if (tempBigSixFace[whichFace][j][0] == tempSlot[k]) {

                        console.log(tempBigSixFace[whichFace][j][0],tempSlot[k],tempBigSixFace[whichFace][j][1]);

                        switch ( tempBigSixFace[whichFace][j][1] ) {
                            case 1  :
                                        whichAxis = "Y";
                                        whichAxisDir = false
                                        break;
                            case 2  :
                                        whichAxis = "X";
                                        whichAxisDir = false
                                        break;
                            case 3  :
                                        whichAxis = "Z";
                                        whichAxisDir = true
                                        break;
                            case 4  :
                                        whichAxis = "X";
                                        whichAxisDir = true
                                        break;
                            case 5  :
                                        whichAxis = "Y";
                                        whichAxisDir = true
                                        break;
                            case 6  :
                                        whichAxis = "Z";
                                        whichAxisDir = false
                                        break;
                        };
                    }
                }

                 if (whichFace == "f"||whichFace == "d"||whichFace == "r") {
                        whichDir = true;
                 }else if(whichFace == "b"||whichFace == "u"||whichFace == "l"){
                        whichDir = false;
                 }
                 console.log(tempSlot[k]-1,whichAxis,whichAxisDir);
             // alert(cubeRotateDeg[cubeSlot[i]-1][whichAxis])






             
if(whichAxisDir === whichDir){

console.log("+++++++++++++++++++++++++++++++++++++++++++++++++")
                        tempCubeRotateDeg[tempSlot[k]-1][whichAxis] = (cubeRotateDeg[tempSlot[k]-1][whichAxis]+deg)%360;
}else{
console.log("--------------------------------------------------")
                    tempCubeRotateDeg[tempSlot[k]-1][whichAxis] = (cubeRotateDeg[tempSlot[k]-1][whichAxis]+(-deg))%360;
                }




                // cubeRotateDeg[tempSlot[i]-1][axis] = (cubeRotateDeg[tempSlot[i]-1][axis]+deg)%360;


                // tempCubePosition[tempSlot[i]-1] = tempNewPos_01;
                tempCubePosition[cubeSlot[i]-1] = tempNewPos_01;
            };
        };


        // 对中心色块旋转

        cubeRotateDeg[bigSixFace[whichFace][4][0]-1][axis] = (cubeRotateDeg[bigSixFace[whichFace][4][0]-1][axis]+deg)%360;




       for (let u = 0; u < cubePosition.length; u ++) {
           cubePosition[u] = tempCubePosition[u];
       };

       for (let h = 0; h < cubeRotateDeg.length; h ++) {
           cubeRotateDeg[h] = tempCubeRotateDeg[h];
       };

       // console.log(cubePosition);
       console.log(bigSixFace);
       console.log(cubeRotateDeg[1]);
       console.log(cubeRotateDeg[2]);
  
    };






    // 根据给定的空间位置，设置内联样式
    function cubePositionStyle (i) {
    	return  "top:"+cubePosition[i-1][0]+"px; "+
		    	"left:"+cubePosition[i-1][1]+"px ;"+
		    	"transform:translateZ("+cubePosition[i-1][2]+"px) "+
		    	           "rotateX("+cubeRotateDeg[i-1]['X']+"deg)"+" rotateY("+cubeRotateDeg[i-1]['Y']+"deg)"+" rotateZ("+cubeRotateDeg[i-1]['Z']+"deg)";
    };
    // 每个cube的六个小面
    function sixFace(i) {
        var cubeFaces = "";

            if(i == 1 || i == 2 || i == 3 || i == 10 || i == 11 || i == 12 ||  i == 19 ||  i == 20 ||  i == 21 ) {
                cubeFaces += '<div  cube_asix = "Y" class="face_01">'+i+'!1</div>';
              }
            if(i == 19 || i == 10 || i == 1 || i == 22 || i == 13 || i == 4 ||  i == 25 ||  i == 16 ||  i == 7 ) {
                cubeFaces += '<div  cube_asix = "X" class="face_02">'+i+'!2</div>';
              }
            if(i <=9 ) {
                cubeFaces += '<div  cube_asix = "Z" class="face_03">'+i+'!3</div>';
              }
            if(i == 3 || i == 6 || i == 9 || i == 12 || i == 15 || i == 18 ||  i == 21 ||  i == 24 ||  i == 27 ) {
                cubeFaces += '<div  cube_asix = "X" class="face_04">'+i+'!4</div>';
              }
            if(i == 7 || i == 8 || i == 9 || i == 16 || i == 17 || i == 18 ||  i == 25 ||  i == 26 ||  i == 27 ) {
                cubeFaces += '<div  cube_asix = "Y" class="face_05">'+i+'!5</div>';
              }
            if(i == 25 ||  i == 26 ||  i == 27 || i == 22 || i == 23 || i == 24 ||  i == 19 ||  i == 20 ||  i == 21 ) {
                cubeFaces +='<div  cube_asix = "Z" class="face_06">'+i+'!6</div>';
            }

        return cubeFaces;
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
				if (i == bigSixFace[whichFace][0][0] || i == bigSixFace[whichFace][1][0] || i == bigSixFace[whichFace][2][0] || i == bigSixFace[whichFace][3][0] || i == bigSixFace[whichFace][4][0] || i == bigSixFace[whichFace][5][0] || i == bigSixFace[whichFace][6][0] || i == bigSixFace[whichFace][7][0] || i == bigSixFace[whichFace][8][0] ) {
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

var ooo = 0;

    // 旋转，同时更新cube的空间位置,同时更新html布局
    function rotateCubeFace(whichFace, axis, deg, dir){

        renderCube (false, whichFace);

        setTimeout(function(){
            // changeBigSixFaceAndCubePosition(whichFace, axis, deg, dir);
            // if(ooo < 2){
                // alert(1)

                $(".litteWrap").style.transform = "rotate"+axis+"("+deg+"deg)";
                // ooo ++;
                changeBigSixFaceAndCubePosition(whichFace, axis, deg, dir);
            // }
        },10);



    };


    // 六个面的旋转按钮
    $('.btn1').onclick = function(){
    	rotateCubeFace('u', "Y", -180, true);
    };
    $('.btn2').onclick = function(){
    	rotateCubeFace('l', "X", -180, true);
    };
    $('.btn3').onclick = function(){
    	rotateCubeFace('f', "Z", 180, true);
    };
    $('.btn4').onclick = function(){
    	rotateCubeFace('r', "X", 180, true);
    };
    $('.btn5').onclick = function(){
    	rotateCubeFace('d', "Y", 180, true);
    };
    $('.btn6').onclick = function(){
    	rotateCubeFace('b', "Z", -180, true);
    };

    $('.btn7').onclick = function(){
        rotateCubeFace('u', "Y", -90, true);
        // console.log(bigSixFace);
    };
    $('.btn8').onclick = function(){
        rotateCubeFace('l', "X", -90, true);
        // console.log(bigSixFace);
    };
    $('.btn9').onclick = function(){
        rotateCubeFace('f', "Z", 90, true);
        // console.log(bigSixFace);
    };
    $('.btn10').onclick = function(){
        rotateCubeFace('r', "X", 90, true);
        // console.log(bigSixFace);
    };
    $('.btn11').onclick = function(){
        rotateCubeFace('d', "Y", 90, true);
        // console.log(bigSixFace);
    };
    $('.btn12').onclick = function(){
        rotateCubeFace('b', "Z", -90, true);
        // console.log(bigSixFace);
    };

















}