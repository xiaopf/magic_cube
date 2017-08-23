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

    var fakeBigSixFace = {
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
    function changeFace(whichFace, axis, deg, dir,faceArr) {
        if(Math.abs(deg) == 180){//旋转180度，顺时针和逆时针结果一样
        	if(whichFace == "f"){
        		let tep_01 = faceArr['u'].slice(0,6).concat(faceArr['d'].slice(0,3).reverse());
        		let tep_02 = [faceArr['r'][6],faceArr['r'][3],faceArr['r'][0]];
        		let tep_03 = [faceArr['l'][8],faceArr['l'][5],faceArr['l'][2]];
        		let tep_04 = faceArr['u'].slice(6).reverse().concat(faceArr['d'].slice(3));
        		faceArr['u'] = tep_01;
        		faceArr['l'][2] = tep_02[0];
        		faceArr['l'][5] = tep_02[1];
        		faceArr['l'][8] = tep_02[2];
        		faceArr['r'][0] = tep_03[0];
        		faceArr['r'][3] = tep_03[1];
        		faceArr['r'][6] = tep_03[2];
        		faceArr['d'] = tep_04;
        	};
        	if(whichFace == "u"){
        		let tep_01 = faceArr['b'].slice(0,3).concat(faceArr['f'].slice(3));
        		let tep_02 = faceArr['r'].slice(0,3).concat(faceArr['l'].slice(3));
        		let tep_03 = faceArr['l'].slice(0,3).concat(faceArr['r'].slice(3));
        		let tep_04 = faceArr['f'].slice(0,3).concat(faceArr['b'].slice(3));
        		faceArr['f'] = tep_01;
        		faceArr['l'] = tep_02;
        		faceArr['r'] = tep_03;
        		faceArr['b'] = tep_04;
        	};
        	if(whichFace == "r"){
        		let tep_01 = [faceArr['b'][6],faceArr['b'][3],faceArr['b'][0]];
        		let tep_02 = [faceArr['d'][2],faceArr['d'][5],faceArr['d'][8]];
        		let tep_03 = [faceArr['f'][8],faceArr['f'][5],faceArr['f'][2]];
        		let tep_04 = [faceArr['u'][2],faceArr['u'][5],faceArr['u'][8]];

        		faceArr['f'][2] = tep_01[0];
        		faceArr['f'][5] = tep_01[1];
        		faceArr['f'][8] = tep_01[2];
        		faceArr['u'][2] = tep_02[0];
        		faceArr['u'][5] = tep_02[1];
        		faceArr['u'][8] = tep_02[2];
        		faceArr['b'][0] = tep_03[0];
        		faceArr['b'][3] = tep_03[1];
        		faceArr['b'][6] = tep_03[2];
        		faceArr['d'][2] = tep_04[0];
        		faceArr['d'][5] = tep_04[1];
        		faceArr['d'][8] = tep_04[2];
        	};
        	if(whichFace == "l"){
        		let tep_01 = [faceArr['b'][8],faceArr['b'][5],faceArr['b'][2]];
        		let tep_02 = [faceArr['d'][0],faceArr['d'][3],faceArr['d'][6]];
        		let tep_03 = [faceArr['f'][6],faceArr['f'][3],faceArr['f'][0]];
        		let tep_04 = [faceArr['u'][0],faceArr['u'][3],faceArr['u'][6]];

        		faceArr['f'][0] = tep_01[0];
        		faceArr['f'][3] = tep_01[1];
        		faceArr['f'][6] = tep_01[2];
        		faceArr['u'][0] = tep_02[0];
        		faceArr['u'][3] = tep_02[1];
        		faceArr['u'][6] = tep_02[2];
        		faceArr['b'][2] = tep_03[0];
        		faceArr['b'][5] = tep_03[1];
        		faceArr['b'][8] = tep_03[2];
        		faceArr['d'][0] = tep_04[0];
        		faceArr['d'][3] = tep_04[1];
        		faceArr['d'][6] = tep_04[2];
        	};
        	if(whichFace == "b"){
        		let tep_01 = faceArr['d'].slice(6).reverse().concat(faceArr['u'].slice(3));
        		let tep_02 = [faceArr['r'][8],faceArr['r'][5],faceArr['r'][2]];
        		let tep_03 = [faceArr['l'][6],faceArr['l'][3],faceArr['l'][0]];
        		let tep_04 = faceArr['d'].slice(0,6).concat(faceArr['u'].slice(0,3).reverse());

        		faceArr['u'] = tep_01;
        		faceArr['l'][0] = tep_02[0];
        		faceArr['l'][3] = tep_02[1];
        		faceArr['l'][6] = tep_02[2];
        		faceArr['r'][2] = tep_03[0];
        		faceArr['r'][5] = tep_03[1];
        		faceArr['r'][8] = tep_03[2];
        		faceArr['d'] = tep_04;
        	};
        	if(whichFace == "d"){
    		   let tep_01 = faceArr['f'].slice(0,6).concat(faceArr['b'].slice(6));
    		   let tep_02 = faceArr['l'].slice(0,6).concat(faceArr['r'].slice(6));
    		   let tep_03 = faceArr['r'].slice(0,6).concat(faceArr['l'].slice(6));
    		   let tep_04 = faceArr['b'].slice(0,6).concat(faceArr['f'].slice(6));
    		   faceArr['f'] = tep_01;
    		   faceArr['l'] = tep_02;
    		   faceArr['r'] = tep_03;
    		   faceArr['b'] = tep_04;
        	};
            let tep_05 = faceArr[whichFace].reverse();
        	faceArr[whichFace] = tep_05;
        } else if(Math.abs(deg) == 90 && dir) { //顺时针旋转90度

            if(whichFace == "f"){
                let tep_01 = faceArr['u'].slice(0,6).concat([faceArr['l'][8]],[faceArr['l'][5]],[faceArr['l'][2]]);
                let tep_02 = faceArr['d'].slice(0,3);
                let tep_03 = faceArr['u'].slice(6);
                let tep_04 = [faceArr['r'][6],faceArr['r'][3],faceArr['r'][0]].concat(faceArr['d'].slice(3));
                faceArr['u'] = tep_01;
                faceArr['l'][2] = tep_02[0];
                faceArr['l'][5] = tep_02[1];
                faceArr['l'][8] = tep_02[2];
                faceArr['r'][0] = tep_03[0];
                faceArr['r'][3] = tep_03[1];
                faceArr['r'][6] = tep_03[2];
                faceArr['d'] = tep_04;
            };
            if(whichFace == "u"){
                let tep_01 = faceArr['r'].slice(0,3).concat(faceArr['f'].slice(3));
                let tep_02 = faceArr['f'].slice(0,3).concat(faceArr['l'].slice(3));
                let tep_03 = faceArr['b'].slice(0,3).concat(faceArr['r'].slice(3));
                let tep_04 = faceArr['l'].slice(0,3).concat(faceArr['b'].slice(3));
                faceArr['f'] = tep_01;
                faceArr['l'] = tep_02;
                faceArr['r'] = tep_03;
                faceArr['b'] = tep_04;
            };
            if(whichFace == "r"){
                let tep_01 = [faceArr['d'][2],faceArr['d'][5],faceArr['d'][8]];
                let tep_02 = [faceArr['f'][2],faceArr['f'][5],faceArr['f'][8]];
                let tep_03 = [faceArr['u'][8],faceArr['u'][5],faceArr['u'][2]];
                let tep_04 = [faceArr['b'][6],faceArr['b'][3],faceArr['b'][0]];
                faceArr['f'][2] = tep_01[0];
                faceArr['f'][5] = tep_01[1];
                faceArr['f'][8] = tep_01[2];
                faceArr['u'][2] = tep_02[0];
                faceArr['u'][5] = tep_02[1];
                faceArr['u'][8] = tep_02[2];
                faceArr['b'][0] = tep_03[0];
                faceArr['b'][3] = tep_03[1];
                faceArr['b'][6] = tep_03[2];
                faceArr['d'][2] = tep_04[0];
                faceArr['d'][5] = tep_04[1];
                faceArr['d'][8] = tep_04[2];
            };
            if(whichFace == "l"){
                let tep_01 = [faceArr['u'][0],faceArr['u'][3],faceArr['u'][6]];
                let tep_02 = [faceArr['b'][8],faceArr['b'][5],faceArr['b'][2]];
                let tep_03 = [faceArr['d'][6],faceArr['d'][3],faceArr['d'][0]];
                let tep_04 = [faceArr['f'][0],faceArr['f'][3],faceArr['f'][6]];
                faceArr['f'][0] = tep_01[0];
                faceArr['f'][3] = tep_01[1];
                faceArr['f'][6] = tep_01[2];
                faceArr['u'][0] = tep_02[0];
                faceArr['u'][3] = tep_02[1];
                faceArr['u'][6] = tep_02[2];
                faceArr['b'][2] = tep_03[0];
                faceArr['b'][5] = tep_03[1];
                faceArr['b'][8] = tep_03[2];
                faceArr['d'][0] = tep_04[0];
                faceArr['d'][3] = tep_04[1];
                faceArr['d'][6] = tep_04[2];
            };
            if(whichFace == "b"){
                let tep_01 = [faceArr['r'][2],faceArr['r'][5],faceArr['r'][8]].concat(faceArr['u'].slice(3));
                let tep_02 = faceArr['u'].slice(0,3).reverse();
                let tep_03 = faceArr['d'].slice(6).reverse();
                let tep_04 = faceArr['d'].slice(0,6).concat([faceArr['l'][0]],[faceArr['l'][3]],[faceArr['l'][6]]);
                faceArr['u'] = tep_01;
                faceArr['l'][0] = tep_02[0];
                faceArr['l'][3] = tep_02[1];
                faceArr['l'][6] = tep_02[2];
                faceArr['r'][2] = tep_03[0];
                faceArr['r'][5] = tep_03[1];
                faceArr['r'][8] = tep_03[2];
                faceArr['d'] = tep_04;
            };
            if(whichFace == "d"){
               let tep_01 = faceArr['f'].slice(0,6).concat(faceArr['l'].slice(6));
               let tep_02 = faceArr['l'].slice(0,6).concat(faceArr['b'].slice(6));
               let tep_03 = faceArr['r'].slice(0,6).concat(faceArr['f'].slice(6));
               let tep_04 = faceArr['b'].slice(0,6).concat(faceArr['r'].slice(6));
               faceArr['f'] = tep_01;
               faceArr['l'] = tep_02;
               faceArr['r'] = tep_03;
               faceArr['b'] = tep_04;
            };
            let tep_05 = [
                            faceArr[whichFace][6],faceArr[whichFace][3],faceArr[whichFace][0],
                            faceArr[whichFace][7],faceArr[whichFace][4],faceArr[whichFace][1],
                            faceArr[whichFace][8],faceArr[whichFace][5],faceArr[whichFace][2]
                         ];
            faceArr[whichFace] = tep_05;
        } else if(Math.abs(deg) == 90 && !dir) { //逆时针旋转90度
               if(whichFace == "f"){
                   let tep_01 = faceArr['u'].slice(0,6).concat([faceArr['r'][0]],[faceArr['r'][3]],[faceArr['r'][6]]);
                   let tep_02 = faceArr['u'].slice(6).reverse();
                   let tep_03 = faceArr['d'].slice(0,3).reverse();
                   let tep_04 = [faceArr['l'][2],faceArr['l'][5],faceArr['l'][8]].concat(faceArr['d'].slice(3));
                   faceArr['u'] = tep_01;
                   faceArr['l'][2] = tep_02[0];
                   faceArr['l'][5] = tep_02[1];
                   faceArr['l'][8] = tep_02[2];
                   faceArr['r'][0] = tep_03[0];
                   faceArr['r'][3] = tep_03[1];
                   faceArr['r'][6] = tep_03[2];
                   faceArr['d'] = tep_04;
               };
               if(whichFace == "u"){
                   let tep_01 = faceArr['l'].slice(0,3).concat(faceArr['f'].slice(3));
                   let tep_02 = faceArr['b'].slice(0,3).concat(faceArr['l'].slice(3));
                   let tep_03 = faceArr['f'].slice(0,3).concat(faceArr['r'].slice(3));
                   let tep_04 = faceArr['r'].slice(0,3).concat(faceArr['b'].slice(3));
                   faceArr['f'] = tep_01;
                   faceArr['l'] = tep_02;
                   faceArr['r'] = tep_03;
                   faceArr['b'] = tep_04;
               };
               if(whichFace == "r"){
                   let tep_01 = [faceArr['u'][2],faceArr['u'][5],faceArr['u'][8]];
                   let tep_02 = [faceArr['b'][6],faceArr['b'][3],faceArr['b'][0]];
                   let tep_03 = [faceArr['d'][8],faceArr['d'][5],faceArr['d'][2]];
                   let tep_04 = [faceArr['f'][2],faceArr['f'][5],faceArr['f'][8]];
                   faceArr['f'][2] = tep_01[0];
                   faceArr['f'][5] = tep_01[1];
                   faceArr['f'][8] = tep_01[2];
                   faceArr['u'][2] = tep_02[0];
                   faceArr['u'][5] = tep_02[1];
                   faceArr['u'][8] = tep_02[2];
                   faceArr['b'][0] = tep_03[0];
                   faceArr['b'][3] = tep_03[1];
                   faceArr['b'][6] = tep_03[2];
                   faceArr['d'][2] = tep_04[0];
                   faceArr['d'][5] = tep_04[1];
                   faceArr['d'][8] = tep_04[2];
               };
               if(whichFace == "l"){
                   let tep_01 = [faceArr['d'][0],faceArr['d'][3],faceArr['d'][6]];
                   let tep_02 = [faceArr['f'][0],faceArr['f'][3],faceArr['f'][6]];
                   let tep_03 = [faceArr['u'][6],faceArr['u'][3],faceArr['u'][0]];
                   let tep_04 = [faceArr['b'][8],faceArr['b'][5],faceArr['b'][2]];
                   faceArr['f'][0] = tep_01[0];
                   faceArr['f'][3] = tep_01[1];
                   faceArr['f'][6] = tep_01[2];
                   faceArr['u'][0] = tep_02[0];
                   faceArr['u'][3] = tep_02[1];
                   faceArr['u'][6] = tep_02[2];
                   faceArr['b'][2] = tep_03[0];
                   faceArr['b'][5] = tep_03[1];
                   faceArr['b'][8] = tep_03[2];
                   faceArr['d'][0] = tep_04[0];
                   faceArr['d'][3] = tep_04[1];
                   faceArr['d'][6] = tep_04[2];
               };
               if(whichFace == "b"){
                   let tep_01 = [faceArr['l'][6],faceArr['l'][3],faceArr['l'][0]].concat(faceArr['u'].slice(3));
                   let tep_02 = faceArr['d'].slice(6);
                   let tep_03 = faceArr['u'].slice(0,3);
                   let tep_04 = faceArr['d'].slice(0,6).concat([faceArr['r'][8]],[faceArr['r'][5]],[faceArr['r'][2]]);
                   faceArr['u'] = tep_01;
                   faceArr['l'][0] = tep_02[0];
                   faceArr['l'][3] = tep_02[1];
                   faceArr['l'][6] = tep_02[2];
                   faceArr['r'][2] = tep_03[0];
                   faceArr['r'][5] = tep_03[1];
                   faceArr['r'][8] = tep_03[2];
                   faceArr['d'] = tep_04;
               };
               if(whichFace == "d"){
                  let tep_01 = faceArr['f'].slice(0,6).concat(faceArr['r'].slice(6));
                  let tep_02 = faceArr['l'].slice(0,6).concat(faceArr['f'].slice(6));
                  let tep_03 = faceArr['r'].slice(0,6).concat(faceArr['b'].slice(6));
                  let tep_04 = faceArr['b'].slice(0,6).concat(faceArr['l'].slice(6));
                  faceArr['f'] = tep_01;
                  faceArr['l'] = tep_02;
                  faceArr['r'] = tep_03;
                  faceArr['b'] = tep_04;
               };

               let tep_05 = [
                               faceArr[whichFace][2],faceArr[whichFace][5],faceArr[whichFace][8],
                               faceArr[whichFace][1],faceArr[whichFace][4],faceArr[whichFace][7],
                               faceArr[whichFace][0],faceArr[whichFace][3],faceArr[whichFace][6]
                            ];
               faceArr[whichFace] = tep_05;
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
    function rotateCubeFace(whichFace, deg, dir){

        let axis = "";
        switch(whichFace){
            case 'u':
                axis = 'Y';
                break;
            case 'd':
                axis = 'Y';
                break;
            case 'f':
                axis = 'Z';
                break;
            case 'b':
                axis = 'Z';
                break;
            case 'l':
                axis = 'X';
                break;
            case 'r':
                axis = 'X';
                break;
        };
        
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
        changeFace(whichFace, axis, deg, dir, bigSixFace);
        

        
        
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
// ////////////////////////////////////////////////////////////
    let dirArr = ['d','u','l','f','r','b'];
    var autoStep = [];
    var tempCube = [];

    function searchCube(searchFace){


        function caseJ(i,j,arr,arr2){
            switch(j){
              case 1:
               if(bigSixFace[arr[0]][arr2[0]] === bigSixFace[searchFace][4]){
                 tempCube = [dirArr[i],j];
               }
              break;
              case 3:
               if(bigSixFace[arr[1]][arr2[1]] === bigSixFace[searchFace][4]){
                 tempCube = [dirArr[i],j];
               }
              break;
              case 5:
               if(bigSixFace[arr[2]][arr2[2]] === bigSixFace[searchFace][4]){
                 tempCube = [dirArr[i],j];
               }
              break;
              case 7:
               if(bigSixFace[arr[3]][arr2[3]] === bigSixFace[searchFace][4] ){
                 tempCube = [dirArr[i],j];
               }
              break;
            }
        }


        for(let i = 0; i < 6;i ++){
            for(let j = 1; j < 8; j+=2) {
                if(bigSixFace[dirArr[i]][j] === bigSixFace[dirArr[0]][4]){
                    switch(dirArr[i]){
                       case 'u':
                           caseJ(i,j,['b','l','r','f'],[1,1,1,1]);
                           break;
                       case 'd':
                           caseJ(i,j,['f','l','r','b'],[7,7,7,7]);
                           break;
                       case 'f':
                           caseJ(i,j,['u','l','r','d'],[7,5,3,1]);
                           break;
                       case 'b':
                           caseJ(i,j,['u','r','l','d'],[1,5,3,7]);
                           break;
                       case 'l':
                           caseJ(i,j,['u','b','f','d'],[3,5,3,3]);
                           break;
                       case 'r':
                           caseJ(i,j,['u','f','b','d'],[5,5,3,5]);
                           break; 
                    }
                }
            }
        }





        

        

        

        

    }

    function findStep(sideface){
        console.log(tempCube)
        switch(tempCube[0]){
            case 'u':
                switch(tempCube[1]){
                    case 1:
                        autoStep.push(['f', 180, true])
                    break;
                    case 3:
                        autoStep.push(['u', -90, true])
                        autoStep.push(['b', -180, true])
                    break;
                    case 5:
                    autoStep.push(['f', 180, true])
                    break;
                    case 7:
                    autoStep.push(['f', 180, true])
                    break;
                }
                break;
            // case 'd':
            //     switch(){
            //         case 1:
            //         case 3:
            //         case 5:
            //         case 7:
            //     }
            //     break;
            case 'f':
                switch(tempCube[1]){
                    case 1:
                    autoStep.push(['r', -90, false])
                    autoStep.push(['u', -180, true])
                    autoStep.push(['r', 90, true])
                    autoStep.push(['l', 180, false])
                    break;
                    case 3:
                    autoStep.push(['r', -90, false])
                    autoStep.push(['u', -180, true])
                    autoStep.push(['r', 90, true])
                    autoStep.push(['l', 180, false])
                    break;
                    case 5:
                    autoStep.push(['r', -90, false])
                    autoStep.push(['u', -180, true])
                    autoStep.push(['r', 90, true])
                    autoStep.push(['l', 180, false])
                    break;
                    case 7:
                    autoStep.push(['r', -90, false])
                    autoStep.push(['u', -180, true])
                    autoStep.push(['r', 90, true])
                    autoStep.push(['l', 180, false])
                    break;
                }
                break;
            case 'b':
                switch(tempCube[1]){
                    case 1:
                            autoStep.push(['r', 90, true])
                        break;
                    case 3:
                            autoStep.push(['r', 90, true])
                        break;
                    case 5:
                            autoStep.push(['r', 90, true])
                        break;
                    case 7:
                            autoStep.push(['r', 90, true])
                        break;
                }
                break;
            // case 'l':
            //     switch(){
            //         case 1:
            //         case 3:
            //         case 5:
            //         case 7:
            //     }
            //     break;
            // case 'r':
            //     switch(){
            //         case 1:
            //         case 3:
            //         case 5:
            //         case 7:
            //     }
            //     break;
        }
    }

    function auto(){
        // let promise = new Promise(function(resolve,reject){
        //     console.log('promise begin');
        //     resolve();
        // });

        // promise.then(function(){
            
            // return new Promise(function(resolve,reject){
                searchCube('b');
                findStep('b');
                
            // });
            
            stepBystep(autoStep,1000);
            autoStep = [];

        // }).then(function(){
            
            // return new Promise(function(resolve,reject){
                searchCube('f');
                findStep('f');
                
            // });
            
            stepBystep(autoStep,1000);
            autoStep = [];
            
            

        // }).then(function(){
            
            // return new Promise(function(resolve,reject){
            searchCube('r');
            findStep('r');
            stepBystep(autoStep,1000);
            autoStep = [];
            
            

        // }).then(function(){
               // searchCube('l');    
        // })
        


        

        


        


        

        
    }




    function stepBystep(autoStep,t){
        rotateCubeFace.apply(null,autoStep[0]);
        var index = 1;
        clearInterval(timer);
        var timer = setInterval(function(){
            if(index === autoStep.length){
                clearInterval(timer);
            }else{
                rotateCubeFace.apply(null,autoStep[index]);
                index ++;    
            }
        },t);
    };

    function random(){
        let randomArr = [];

        randomArr.push(['u', 180, false])
        randomArr.push(['r', 90, true])
        randomArr.push(['l', 90, false])
        randomArr.push(['d', 90, true])
        randomArr.push(['b', 90, false])
        randomArr.push(['f', -180, false])
        randomArr.push(['l', 90, false])
        randomArr.push(['r', 180, true])
        randomArr.push(['b', -180, true])
        randomArr.push(['d', 90, true])
        randomArr.push(['l', 90, false])
        randomArr.push(['d', 180, true])

        stepBystep(randomArr,10)

    }



    get('.btn19').onclick = function(){
        auto();
    };
    get('.btn20').onclick = function(){
        random();
    };

// ///////////////////////////////////////////////////

    // 顺时针旋转180度
    get('.btn1').onclick = function(){
        rotateCubeFace('u', -180, true);
    };
    get('.btn2').onclick = function(){
        rotateCubeFace('l', -180, true);
    };
    get('.btn3').onclick = function(){
        rotateCubeFace('f', 180, true);
    };
    get('.btn4').onclick = function(){
        rotateCubeFace('r', 180, true);
    };
    get('.btn5').onclick = function(){
        rotateCubeFace('d', 180, true);
    };
    get('.btn6').onclick = function(){
        rotateCubeFace('b', -180, true);
    };

    // 逆时针旋转180度
    get('.btn01').onclick = function(){
        rotateCubeFace('u', 180, false);
    };
    get('.btn02').onclick = function(){
        rotateCubeFace('l', 180, false);
    };
    get('.btn03').onclick = function(){
        rotateCubeFace('f', -180, false);
    };
    get('.btn04').onclick = function(){
        rotateCubeFace('r', -180, false);
    };
    get('.btn05').onclick = function(){
        rotateCubeFace('d', -180, false);
    };
    get('.btn06').onclick = function(){
        rotateCubeFace('b', 180, false);
    };
    // 逆时针旋转90度按钮
    get('.btn7').onclick = function(){
        rotateCubeFace('u', -90, true);
    };
    get('.btn8').onclick = function(){
        rotateCubeFace('l', -90, true);
    };
    get('.btn9').onclick = function(){
        rotateCubeFace('f', 90, true);
    };
    get('.btn10').onclick = function(){
        rotateCubeFace('r', 90, true);
    };
    get('.btn11').onclick = function(){
        rotateCubeFace('d', 90, true);
    };
    get('.btn12').onclick = function(){
        rotateCubeFace('b', -90, true);
    };

    // 逆时针旋转90度按钮
    get('.btn13').onclick = function(){
        rotateCubeFace('u', 90, false);
    };
    get('.btn14').onclick = function(){
        rotateCubeFace('l', 90, false);
    };
    get('.btn15').onclick = function(){
        rotateCubeFace('f', -90, false);
    };
    get('.btn16').onclick = function(){
        rotateCubeFace('r', -90, false);
    };
    get('.btn17').onclick = function(){
        rotateCubeFace('d', -90, false);
    };
    get('.btn18').onclick = function(){
        rotateCubeFace('b', 90, false);
    };
















}