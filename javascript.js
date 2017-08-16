window.onload = function(){
	let RANK = 3; // 定义魔方的阶数
    let cubeNum = RANK * RANK * RANK//计算立方体的个数

    const get = function (key) {
    	return document.querySelector(key);
    };

    // 初始化big_box的视角
	get('.x_deg').innerHTML = get('.x_rotate').value + 'deg';
	get('.y_deg').innerHTML = get('.y_rotate').value + 'deg';
	get('.z_deg').innerHTML = get('.z_rotate').value + 'deg';

    // 调整big_box的视角
	get('.x_rotate').oninput = function(){
		get('.x_deg').innerHTML = this.value + 'deg';
		get("#big_box").style.transform = '';
		get("#big_box").style.transform += 'rotateX('+get('.x_rotate').value+'deg)';
		get("#big_box").style.transform += 'rotateY('+get('.y_rotate').value+'deg)';
		get("#big_box").style.transform += 'rotateZ('+get('.z_rotate').value+'deg)';
	};
	get('.y_rotate').oninput = function(){
		get('.y_deg').innerHTML = this.value + 'deg';
		get("#big_box").style.transform = '';
		get("#big_box").style.transform += 'rotateX('+get('.x_rotate').value+'deg)';
		get("#big_box").style.transform += 'rotateY('+get('.y_rotate').value+'deg)';
		get("#big_box").style.transform += 'rotateZ('+get('.z_rotate').value+'deg)';
	};
	get('.z_rotate').oninput = function(){
		get('.z_deg').innerHTML = this.value + 'deg';
		get("#big_box").style.transform = '';
		get("#big_box").style.transform += 'rotateX('+get('.x_rotate').value+'deg)';
		get("#big_box").style.transform += 'rotateY('+get('.y_rotate').value+'deg)';
		get("#big_box").style.transform += 'rotateZ('+get('.z_rotate').value+'deg)';
	};
    // 视角复位
	get('.btnF').onclick = function(){
		get('.x_rotate').value = '-30';
		get('.y_rotate').value = '-30';
		get('.z_rotate').value = '0';
		get('.x_deg').innerHTML = '-30deg';
		get('.y_deg').innerHTML = '-30deg';
		get('.z_deg').innerHTML = '0deg';
		get("#big_box").style.transform = '';
		get("#big_box").style.transform += 'rotateX(-30deg)';
		get("#big_box").style.transform += 'rotateY(-30deg)';
		get("#big_box").style.transform += 'rotateZ(0deg)';
	}

    // cube 的空间位置，x，y，z,旋转轴，旋转角度
    // 代表每一个块的空间位置，顺序是色块的序列号
    var cubePosition = [
        [0,   0,   0  ],//1
        [0,   200, 0  ],//2
        [0,   400, 0  ],//3
        [200, 0,   0  ],//4
        [200, 200, 0  ],//5
        [200, 400, 0  ],//6
        [400, 0,   0  ],//7
        [400, 200, 0  ],//8
        [400, 400, 0  ],//9
        [0,   0,   -200],//10
        [0,   200, -200],//11
        [0,   400, -200],//12
        [200, 0,   -200],//13
        [200, 200, -200],//14???ccccccccccccccccccc
        [200, 400, -200],//15
        [400, 0,   -200],//16
        [400, 200, -200],//17
        [400, 400, -200],//18
        [0,   0,   -400],//19
        [0,   200, -400],//20
        [0,   400, -400],//21
        [200, 0,   -400],//22
        [200, 200, -400],//23
        [200, 400, -400],//24
        [400, 0,   -400],//25
        [400, 200, -400],//26
        [400, 400, -400]//27
    ];

    //每个cube都有固定的顺序，在旋转的时候是不会变化的，所以是默认的，每个大面包含的cube也是不会变化的
    var defaultBigSixFace = {
        'u':[
                19,  20, 21,
                10,  11, 12,
                 1,   2,  3
            ],
        'f':[
                 1,   2,  3,
                 4,   5,  6,
                 7,   8,  9
            ],
        'd':[
                 7,   8,  9,
                16,  17, 18,
                25,  26, 27
            ],
        'b':[
                21,  20, 19,
                24,  23, 22,
                27,  26, 25
            ],
        'l':[
                19,  10,  1,
                22,  13,  4,
                25,  16,  7
            ],
        'r':[
                 3,  12, 21,
                 6,  15, 24,
                 9,  18, 27
            ]
    };
    //每个cube的颜色是变化的，每个色块是在每次旋转都会变化的，所以每次旋转后都会更新每个大面包含的小cube的面颜色
    var bigSixFace = {
        'u':[
                'orange',   'orange',   'orange',
                'orange',   'orange',   'orange',
                'orange',   'orange',   'orange'
            ],
        'f':[
                'yellow',   'yellow',   'yellow',
                'yellow',   'yellow',   'yellow',
                'yellow',   'yellow',   'yellow'
            ],
        'd':[
                'blue',     'blue',     'blue',
                'blue',     'blue',     'blue',
                'blue',     'blue',     'blue'
            ],
        'b':[
                'pink',     'pink',     'pink',
                'pink',     'pink',     'pink',
                'pink',     'pink',     'pink'
            ],
        'l':[
                'red',      'red',      'red',
                'red',      'red',      'red',
                'red',      'red',      'red'
            ],
        'r':[
                'green',    'green',    'green',
                'green',    'green',    'green',
                'green',    'green',    'green'
            ]
    };

    // 当旋转时，更新各个大面上的小cube面
    function changeFace(whichFace, axis, deg, dir) {
        if(Math.abs(deg) == 180){//旋转180度，顺时针和逆时针结果一样
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
        } else if(Math.abs(deg) == 90 && dir) { //顺时针旋转90度

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
        } else if(Math.abs(deg) == 90 && !dir) { //逆时针旋转90度
               if(whichFace == "f"){
                   let tep_01 = bigSixFace['u'].slice(0,6).concat([bigSixFace['r'][0]],[bigSixFace['r'][3]],[bigSixFace['r'][6]]);
                   let tep_02 = bigSixFace['u'].slice(6).reverse();
                   let tep_03 = bigSixFace['d'].slice(0,3).reverse();
                   let tep_04 = [bigSixFace['l'][2],bigSixFace['l'][5],bigSixFace['l'][8]].concat(bigSixFace['d'].slice(3));
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
                   let tep_01 = bigSixFace['l'].slice(0,3).concat(bigSixFace['f'].slice(3));
                   let tep_02 = bigSixFace['b'].slice(0,3).concat(bigSixFace['l'].slice(3));
                   let tep_03 = bigSixFace['f'].slice(0,3).concat(bigSixFace['r'].slice(3));
                   let tep_04 = bigSixFace['r'].slice(0,3).concat(bigSixFace['b'].slice(3));
                   bigSixFace['f'] = tep_01;
                   bigSixFace['l'] = tep_02;
                   bigSixFace['r'] = tep_03;
                   bigSixFace['b'] = tep_04;
               };
               if(whichFace == "r"){
                   let tep_01 = [bigSixFace['u'][2],bigSixFace['u'][5],bigSixFace['u'][8]];
                   let tep_02 = [bigSixFace['b'][6],bigSixFace['b'][3],bigSixFace['b'][0]];
                   let tep_03 = [bigSixFace['d'][8],bigSixFace['d'][5],bigSixFace['d'][2]];
                   let tep_04 = [bigSixFace['f'][2],bigSixFace['f'][5],bigSixFace['f'][8]];
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
                   let tep_01 = [bigSixFace['d'][0],bigSixFace['d'][3],bigSixFace['d'][6]];
                   let tep_02 = [bigSixFace['f'][0],bigSixFace['f'][3],bigSixFace['f'][6]];
                   let tep_03 = [bigSixFace['u'][6],bigSixFace['u'][3],bigSixFace['u'][0]];
                   let tep_04 = [bigSixFace['b'][8],bigSixFace['b'][5],bigSixFace['b'][2]];
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
                   let tep_01 = [bigSixFace['l'][6],bigSixFace['l'][3],bigSixFace['l'][0]].concat(bigSixFace['u'].slice(3));
                   let tep_02 = bigSixFace['d'].slice(6);
                   let tep_03 = bigSixFace['u'].slice(0,3);
                   let tep_04 = bigSixFace['d'].slice(0,6).concat([bigSixFace['r'][8]],[bigSixFace['r'][5]],[bigSixFace['r'][2]]);
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
                  let tep_01 = bigSixFace['f'].slice(0,6).concat(bigSixFace['r'].slice(6));
                  let tep_02 = bigSixFace['l'].slice(0,6).concat(bigSixFace['f'].slice(6));
                  let tep_03 = bigSixFace['r'].slice(0,6).concat(bigSixFace['b'].slice(6));
                  let tep_04 = bigSixFace['b'].slice(0,6).concat(bigSixFace['l'].slice(6));
                  bigSixFace['f'] = tep_01;
                  bigSixFace['l'] = tep_02;
                  bigSixFace['r'] = tep_03;
                  bigSixFace['b'] = tep_04;
               };

               let tep_05 = [
                               bigSixFace[whichFace][2],bigSixFace[whichFace][5],bigSixFace[whichFace][8],
                               bigSixFace[whichFace][1],bigSixFace[whichFace][4],bigSixFace[whichFace][7],
                               bigSixFace[whichFace][0],bigSixFace[whichFace][3],bigSixFace[whichFace][6]
                            ];
               bigSixFace[whichFace] = tep_05;
        }
    };

    // 根据给定的空间位置，设置内联样式
    function cubePositionStyle (i) {
    	return  "top:"+cubePosition[i-1][0]+"px; "+
		    	"left:"+cubePosition[i-1][1]+"px ;"+
		    	"transform:translateZ("+cubePosition[i-1][2]+"px)";
    };
    // 渲染每个cube的六个小面
    function sixFace(i) {
        var cubeFaces = '<div style="background-color:orange" class="face_01"></div>'+
                        '<div style="background-color:red" class="face_02"></div>'+
                        '<div style="background-color:yellow" class="face_03"></div>'+
                        '<div style="background-color:green" class="face_04"></div>'+
                        '<div style="background-color:blue" class="face_05"></div>'+
                        '<div style="background-color:pink" class="face_06"></div>';
        return cubeFaces;
    };

    // 初始化渲染cubes
    renderCube (true, []);

    // 渲染cubes
    function renderCube (init, whichFace) {
    	var onOff = true;
    	get("#big_box").innerHTML="";
		for (let i = 1; i <= cubeNum; i++) {
			if (init) {
				get("#big_box").innerHTML += '<div index="'+i+'" id="box_'+i+'" class="box" style="'+cubePositionStyle (i)+'">'+sixFace(i)+'</div>';
			} else {
				if (i == defaultBigSixFace[whichFace][0] || i == defaultBigSixFace[whichFace][1] || i == defaultBigSixFace[whichFace][2] || i == defaultBigSixFace[whichFace][3] || i == defaultBigSixFace[whichFace][4] || i == defaultBigSixFace[whichFace][5] || i == defaultBigSixFace[whichFace][6] || i == defaultBigSixFace[whichFace][7] || i == defaultBigSixFace[whichFace][8] ) {
					if (onOff) {
						get("#big_box").innerHTML += '<div class="litteWrap"></div>';
						get(".litteWrap").innerHTML += '<div index="'+i+'" id="box_'+i+'" class="box" style="'+cubePositionStyle (i)+'">'+sixFace(i)+'</div>';
						onOff = false;
					} else {
						get(".litteWrap").innerHTML += '<div index="'+i+'" id="box_'+i+'" class="box" style="'+cubePositionStyle (i)+'">'+sixFace(i)+'</div>';
					}
				} else {
					get("#big_box").innerHTML += '<div index="'+i+'" id="box_'+i+'" class="box" style="'+cubePositionStyle (i)+'">'+sixFace(i)+'</div>';
				}
			};
    	};
    };


    // 旋转，同时更新cube的面的颜色,同时更新html布局
    function rotateCubeFace(whichFace, axis, deg, dir){
        
        // 每次旋转重新渲染一下cubes
        renderCube (false, whichFace);

        // 每次渲染6个大面小cube面的颜色
        for(let i = 0; i < 9; i++) {
            $("#box_"+defaultBigSixFace["u"][i]).find(".face_01").css({
                backgroundColor : bigSixFace["u"][i]
            })
            $("#box_"+defaultBigSixFace["l"][i]).find(".face_02").css({
                backgroundColor : bigSixFace["l"][i]
            })
            $("#box_"+defaultBigSixFace["f"][i]).find(".face_03").css({
                backgroundColor : bigSixFace["f"][i]
            })
            $("#box_"+defaultBigSixFace["r"][i]).find(".face_04").css({
                backgroundColor : bigSixFace["r"][i]
            })
            $("#box_"+defaultBigSixFace["d"][i]).find(".face_05").css({
                backgroundColor : bigSixFace["d"][i]
            })
            $("#box_"+defaultBigSixFace["b"][i]).find(".face_06").css({
                backgroundColor : bigSixFace["b"][i]
            })
        }

        // 调用小cubea面变换函数
        changeFace(whichFace, axis, deg, dir);
        
        //避免渲染和旋转动作同时进行 ,旋转的时间根据角度不同设置不同的值
        setTimeout(function(){
            if (Math.abs(deg) == 180) {
                get(".litteWrap").style.transitionDuration = "1s"; 
            } else if (Math.abs(deg) == 90) {
                get(".litteWrap").style.transitionDuration = "0.5s"; 
            }
            get(".litteWrap").style.transform = "rotate"+axis+"("+deg+"deg)"; 
        },10);

    };
    // var bigSixFace = {
    //     'u':[
    //             'orange',   'orange',   'orange',
    //             'orange',   'orange',   'orange',
    //             'orange',   'orange',   'orange'
    //         ],
    //     'f':[
    //             'yellow',   'yellow',   'yellow',
    //             'yellow',   'yellow',   'yellow',
    //             'yellow',   'yellow',   'yellow'
    //         ],
    //     'd':[
    //             'blue',     'blue',     'blue',
    //             'blue',     'blue',     'blue',
    //             'blue',     'blue',     'blue'
    //         ],
    //     'b':[
    //             'pink',     'pink',     'pink',
    //             'pink',     'pink',     'pink',
    //             'pink',     'pink',     'pink'
    //         ],
    //     'l':[
    //             'red',      'red',      'red',
    //             'red',      'red',      'red',
    //             'red',      'red',      'red'
    //         ],
    //     'r':[
    //             'green',    'green',    'green',
    //             'green',    'green',    'green',
    //             'green',    'green',    'green'
    //         ]
    // }
 //    let dirArr = ['d','u','l','f','r','b'];
 //    var autoStep = [];

 //    function auto(){
 //        // while(!(bigSixFace['d'][1]===bigSixFace['d'][4] && bigSixFace['d'][3]===bigSixFace['d'][4] && bigSixFace['d'][5]===bigSixFace['d'][4] && bigSixFace['d'][7]===bigSixFace['d'][4])){
 //            for(let i = 1; i < 6;i ++){
 //                for(let j = 1; j < 8; j+=2) {
 //                    if(bigSixFace[dirArr[i]][j] === bigSixFace[dirArr[0]][4]){
 //                        if(dirArr[i]==='u'){
 //                            switch(j){
 //                                case 1:
 //                                    if(bigSixFace['b'][1] === bigSixFace['b'][4]){
 //                                        autoStep.push(['b', "Z", 180, true]);
 //                                    }else{
 //                                        switch(bigSixFace['b'][1]){
 //                                            case bigSixFace['r'][4]:
 //                                                 autoStep.push(['u', "Y", -90, true]);
 //                                                 autoStep.push(['r', "X", 180, true]);
 //                                                 break;
 //                                            case bigSixFace['l'][4]:
 //                                                 autoStep.push(['u', "Y", 90, false]);
 //                                                 autoStep.push(['l', "X", 180, true]);
 //                                                 break;
 //                                            case bigSixFace['f'][4]:
 //                                                 autoStep.push(['u', "Y", -180, true]);
 //                                                 autoStep.push(['f', "Z", 180, true]);
 //                                                 break;
 //                                        };
                                        
 //                                    }
 //                                break;
 //                                case 3:
 //                                    if(bigSixFace['l'][1] === bigSixFace['l'][4]){
 //                                        autoStep.push(['l', "X", -180, true]);
 //                                    }else{
 //                                        switch(bigSixFace['l'][1]){
 //                                            case bigSixFace['r'][4]:
 //                                                 autoStep.push(['u', "Y", -180, true]);
 //                                                 autoStep.push(['r', "X", 180, true]);
 //                                                 break;
 //                                            case bigSixFace['b'][4]:
 //                                                 autoStep.push(['u', "Y", -90, true]);
 //                                                 autoStep.push(['b', "Z", 180, true]);
 //                                                 break;
 //                                            case bigSixFace['f'][4]:
 //                                                 autoStep.push(['u', "Y", 90, false]);
 //                                                 autoStep.push(['f', "Z", 180, true]);
 //                                                 break;

 //                                        };
                                        
 //                                    }
 //                                break;
 //                                case 5:
 //                                    if(bigSixFace['r'][1] === bigSixFace['r'][4]){
 //                                        autoStep.push(['r', "X", 180, true]);
 //                                    }else{
 //                                        switch(bigSixFace['r'][1]){

 //                                            case bigSixFace['l'][4]:
 //                                                 autoStep.push(['u', "Y", -180, true]);
 //                                                 autoStep.push(['l', "X", 180, true]);
 //                                                 break;
 //                                            case bigSixFace['f'][4]:
 //                                                 autoStep.push(['u', "Y", -90, true]);
 //                                                 autoStep.push(['f', "Z", 180, true]);
 //                                                 break;
 //                                            case bigSixFace['b'][4]:
 //                                                 autoStep.push(['u', "Y", 90, false]);
 //                                                 autoStep.push(['b', "Z", 180, true]);
 //                                                 break;

 //                                        };
                                       
 //                                    }
 //                                break;
 //                                case 7:
 //                                    if(bigSixFace['f'][1] === bigSixFace['f'][4]){
 //                                        autoStep.push(['f', "Z", 180, true]);
 //                                    }else{
 //                                        switch(bigSixFace['f'][1]){
 //                                            case bigSixFace['b'][4]:
 //                                                 autoStep.push(['u', "Y", -180, true]);
 //                                                 autoStep.push(['b', "Z", 180, true]);
 //                                                 break;
 //                                            case bigSixFace['l'][4]:
 //                                                 autoStep.push(['u', "Y", -90, true]);
 //                                                 autoStep.push(['l', "X", 180, true]);
 //                                                 break;
 //                                            case bigSixFace['r'][4]:
 //                                                 autoStep.push(['u', "Y", 90, false]);
 //                                                 autoStep.push(['r', "X", 180, true]);
 //                                                 break;
 //                                        };
                                        
 //                                    }
 //                                break;
 //                            }
 //                        }
 //                    }
 //                }
 //            }
       
 //        rotateCubeFace.apply(null,autoStep[0]);
 //        var index = 1;
 //        clearInterval(timer);
 //        var timer = setInterval(function(){
 //            if(index === autoStep.length){
 //                clearInterval(timer);
 //            }else{
 //                rotateCubeFace.apply(null,autoStep[index]);
 //                index ++;    
 //            }
 //        },1000);
 // // }
 //    }



    get('.btn19').onclick = function(){
        auto();
    };



    // 顺时针旋转180度
    get('.btn1').onclick = function(){
        rotateCubeFace('u', "Y", -180, true);
    };
    get('.btn2').onclick = function(){
        rotateCubeFace('l', "X", -180, true);
    };
    get('.btn3').onclick = function(){
        rotateCubeFace('f', "Z", 180, true);
    };
    get('.btn4').onclick = function(){
        rotateCubeFace('r', "X", 180, true);
    };
    get('.btn5').onclick = function(){
        rotateCubeFace('d', "Y", 180, true);
    };
    get('.btn6').onclick = function(){
        rotateCubeFace('b', "Z", -180, true);
    };

    // 逆时针旋转180度
    get('.btn01').onclick = function(){
        rotateCubeFace('u', "Y", 180, false);
    };
    get('.btn02').onclick = function(){
        rotateCubeFace('l', "X", 180, false);
    };
    get('.btn03').onclick = function(){
        rotateCubeFace('f', "Z", -180, false);
    };
    get('.btn04').onclick = function(){
        rotateCubeFace('r', "X", -180, false);
    };
    get('.btn05').onclick = function(){
        rotateCubeFace('d', "Y", -180, false);
    };
    get('.btn06').onclick = function(){
        rotateCubeFace('b', "Z", 180, false);
    };
    // 逆时针旋转90度按钮
    get('.btn7').onclick = function(){
        rotateCubeFace('u', "Y", -90, true);
    };
    get('.btn8').onclick = function(){
        rotateCubeFace('l', "X", -90, true);
    };
    get('.btn9').onclick = function(){
        rotateCubeFace('f', "Z", 90, true);
    };
    get('.btn10').onclick = function(){
        rotateCubeFace('r', "X", 90, true);
    };
    get('.btn11').onclick = function(){
        rotateCubeFace('d', "Y", 90, true);
    };
    get('.btn12').onclick = function(){
        rotateCubeFace('b', "Z", -90, true);
    };

    // 逆时针旋转90度按钮
    get('.btn13').onclick = function(){
        rotateCubeFace('u', "Y", 90, false);
    };
    get('.btn14').onclick = function(){
        rotateCubeFace('l', "X", 90, false);
    };
    get('.btn15').onclick = function(){
        rotateCubeFace('f', "Z", -90, false);
    };
    get('.btn16').onclick = function(){
        rotateCubeFace('r', "X", -90, false);
    };
    get('.btn17').onclick = function(){
        rotateCubeFace('d', "Y", -90, false);
    };
    get('.btn18').onclick = function(){
        rotateCubeFace('b', "Z", 90, false);
    };


}