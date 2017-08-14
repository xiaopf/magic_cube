window.onload = function(){
	let RANK = 3; // 定义魔方的阶数
    let cubeNum = RANK * RANK * RANK//计算立方体的个数

    const get = function (key) {
    	return document.querySelector(key);
    };
    // 初始化big_box的视角
    // get("#big_box").style.transform = '';
    // get("#big_box").style.transform += 'rotateX('+get('.x_rotate').value+'deg)';
    // get("#big_box").style.transform += 'rotateY('+get('.y_rotate').value+'deg)';
    // get("#big_box").style.transform += 'rotateZ('+get('.z_rotate').value+'deg)';
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

    var defaultBigSixFace = {
        'u' :[
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
    var bigSixFace = {
        'u' :[
                  [19, 1, 'orange'],  [20, 1, 'orange'], [21, 1, 'orange'],
                  [10, 1, 'orange'],  [11, 1, 'orange'], [12, 1, 'orange'],
                   [1, 1, 'orange'],   [2, 1, 'orange'],  [3, 1, 'orange']
            ],
        'f':[
                   [1, 3, 'yellow'],   [2, 3, 'yellow'],  [3, 3, 'yellow'],
                   [4, 3, 'yellow'],   [5, 3, 'yellow'],  [6, 3, 'yellow'],
                   [7, 3, 'yellow'],   [8, 3, 'yellow'],  [9, 3, 'yellow']
                ],
        'd' :[
                   [7, 5, 'blue'],   [8, 5, 'blue'],  [9, 5, 'blue'],
                  [16, 5, 'blue'],  [17, 5, 'blue'], [18, 5, 'blue'],
                  [25, 5, 'blue'],  [26, 5, 'blue'], [27, 5, 'blue']
                ],
        'b' :[
                  [21, 6, 'pink'],  [20, 6, 'pink'], [19, 6, 'pink'],
                  [24, 6, 'pink'],  [23, 6, 'pink'], [22, 6, 'pink'],
                  [27, 6, 'pink'],  [26, 6, 'pink'], [25, 6, 'pink']
                ],
        'l' :[
                  [19, 2, 'red'],  [10, 2, 'red'],  [1, 2, 'red'],
                  [22, 2, 'red'],  [13, 2, 'red'],  [4, 2, 'red'],
                  [25, 2, 'red'],  [16, 2, 'red'],  [7, 2, 'red']
                ],
        'r':[
                   [3, 4, 'green'],  [12, 4, 'green'], [21, 4, 'green'],
                   [6, 4, 'green'],  [15, 4, 'green'], [24, 4, 'green'],
                   [9, 4, 'green'],  [18, 4, 'green'], [27, 4, 'green']
                ],
    };


    // magic cube 每个小cube都有一个槽点，槽点是我自定义的，1-27编号，有固定顺序，
    // 槽点的顺序是死的，固定的，
    var cubeSlot = [];
    upDateCubeSlot ();
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


    var cubeBoxFaces = [];
    upDateCubeBoxFaces ();
    function upDateCubeBoxFaces () {
        cubeBoxFaces =  [
                            [bigSixFace["u"][6],bigSixFace["f"][0],bigSixFace["l"][2]],//1
                            [bigSixFace["u"][7],bigSixFace["f"][1]],//2
                            [bigSixFace["u"][8],bigSixFace["f"][2],bigSixFace["r"][0]],//3

                            [bigSixFace["l"][5],bigSixFace["f"][3]],//4
                            [bigSixFace["f"][4]],//5
                            [bigSixFace["r"][3],bigSixFace["f"][5]],//6


                            [bigSixFace["l"][3],bigSixFace["f"][6],bigSixFace["d"][0]],//7
                            [bigSixFace["f"][7],bigSixFace["d"][1]],//8
                            [bigSixFace["r"][6],bigSixFace["f"][8],bigSixFace["d"][2]],//9

                            [bigSixFace["u"][3],bigSixFace["l"][1]],//10
                            [bigSixFace["u"][4]],//11
                            [bigSixFace["u"][5],bigSixFace["r"][1]],//12

                            [bigSixFace["l"][4]],//13
                            [],//14
                            [bigSixFace["r"][4]],//15

                            [bigSixFace["l"][7],bigSixFace["d"][3]],//16
                            [bigSixFace["d"][4]],//17
                            [bigSixFace["r"][7],bigSixFace["d"][4]],//18

                            [bigSixFace["u"][0],bigSixFace["l"][0],bigSixFace["b"][2]],//19
                            [bigSixFace["u"][1],bigSixFace["b"][1]],//20
                            [bigSixFace["u"][2],bigSixFace["r"][2],bigSixFace["b"][0]],//21

                            [bigSixFace["b"][5],bigSixFace["l"][3]],//22
                            [bigSixFace["b"][4]],//23
                            [bigSixFace["b"][3],bigSixFace["r"][5]],//24

                            [bigSixFace["b"][8],bigSixFace["d"][6],bigSixFace["l"][6]],//25
                            [bigSixFace["b"][7],bigSixFace["d"][7]],//26
                            [bigSixFace["b"][6],bigSixFace["d"][8],bigSixFace["r"][8]]
                        ];

                        
    };







    // 当旋转时，更新旋转面包含的cube块序列号
    // rerender之前把各个小cube位置重新定义
    function changeBigSixFaceAndCubePosition(whichFace, axis, deg, dir) {
        //去除上一次的槽点上的cube序号
        var tempSlot = [];



        var tempBigSixFace = {
            'u' :[[],[],[],[],[],[],[],[],[]],
            'f' :[[],[],[],[],[],[],[],[],[]],
            'd' :[[],[],[],[],[],[],[],[],[]],
            'b' :[[],[],[],[],[],[],[],[],[]],
            'l' :[[],[],[],[],[],[],[],[],[]],
            'r' :[[],[],[],[],[],[],[],[],[]]
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
                   let tep_01 = [bigSixFace['l'][6],bigSixFace['l'][0],bigSixFace['l'][3]].concat(bigSixFace['u'].slice(3));
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


        // upDateCubeSlot ();//更新 cubeSlot


        // upDateCubeBoxFaces ();

        console.log(cubeSlot)
        console.log(cubeBoxFaces)
        console.log(bigSixFace)

    };





    // 根据给定的空间位置，设置内联样式
    function cubePositionStyle (i) {
    	return  "top:"+cubePosition[i-1][0]+"px; "+
		    	"left:"+cubePosition[i-1][1]+"px ;"+
		    	"transform:translateZ("+cubePosition[i-1][2]+"px)";
    };
    // 每个cube的六个小面
    function sixFace(i) {
        if(i==1){
        console.log(cubeBoxFaces)            
        }

        var cubeFaces = "";

        for (let j = 0; j < cubeBoxFaces[i-1].length; j++){

            cubeFaces = '<div style="background-color:orange" class="face_01"></div>'+
                        '<div style="background-color:red" class="face_02"></div>'+
                        '<div style="background-color:yellow" class="face_03"></div>'+
                        '<div style="background-color:green" class="face_04"></div>'+
                        '<div style="background-color:blue" class="face_05"></div>'+
                        '<div style="background-color:pink" class="face_06"></div>';
        }


        return cubeFaces;
    };

    // 初始化渲染cubes
    renderCube (true, []);

    // 渲染cubes
    function renderCube (init, whichFace) {
        upDateCubeSlot ();//更新 cubeSlot


        upDateCubeBoxFaces ();
    	var onOff = true;
    	get("#big_box").innerHTML="";
		for (let i = 1; i <= cubeNum; i++) {
			if (init) {
				get("#big_box").innerHTML += '<div index="'+i+'" id="box_'+i+'" class="box" style="'+cubePositionStyle (i)+'">'+sixFace(i)+'</div>';
			} else {
				if (i == defaultBigSixFace[whichFace][0][0] || i == defaultBigSixFace[whichFace][1][0] || i == defaultBigSixFace[whichFace][2][0] || i == defaultBigSixFace[whichFace][3][0] || i == defaultBigSixFace[whichFace][4][0] || i == defaultBigSixFace[whichFace][5][0] || i == defaultBigSixFace[whichFace][6][0] || i == defaultBigSixFace[whichFace][7][0] || i == defaultBigSixFace[whichFace][8][0] ) {
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


    // 旋转，同时更新cube的空间位置,同时更新html布局
    function rotateCubeFace(whichFace, axis, deg, dir){
        
        
        renderCube (false, whichFace);


        for(let i = 0; i < 9; i++) {
            $("#box_"+defaultBigSixFace["u"][i][0]).find(".face_01").css({
                backgroundColor : bigSixFace["u"][i][2]
            })
        }
        for(let i = 0; i < 9; i++) {
            $("#box_"+defaultBigSixFace["l"][i][0]).find(".face_02").css({
                backgroundColor : bigSixFace["l"][i][2]
            })
        }
        for(let i = 0; i < 9; i++) {
            $("#box_"+defaultBigSixFace["f"][i][0]).find(".face_03").css({
                backgroundColor : bigSixFace["f"][i][2]
            })
        }
        for(let i = 0; i < 9; i++) {
            $("#box_"+defaultBigSixFace["r"][i][0]).find(".face_04").css({
                backgroundColor : bigSixFace["r"][i][2]
            })
        }
        for(let i = 0; i < 9; i++) {
            $("#box_"+defaultBigSixFace["d"][i][0]).find(".face_05").css({
                backgroundColor : bigSixFace["d"][i][2]
            })
        }
        for(let i = 0; i < 9; i++) {
            $("#box_"+defaultBigSixFace["b"][i][0]).find(".face_06").css({
                backgroundColor : bigSixFace["b"][i][2]
            })
        }









        changeBigSixFaceAndCubePosition(whichFace, axis, deg, dir);
                
        setTimeout(function(){
                get(".litteWrap").style.transform = "rotate"+axis+"("+deg+"deg)";
                
        },20);



    };








    // 六个面的旋转按钮
    get('.btn1').onclick = function(){
        rotateCubeFace('u', "Y", -180, true);
        // console.log(bigSixFace);
        // console.log(cubeBoxFaces);
    };
    get('.btn2').onclick = function(){
        rotateCubeFace('l', "X", -180, true);
        // console.log(bigSixFace);
    };
    get('.btn3').onclick = function(){
        rotateCubeFace('f', "Z", 180, true);
        // console.log(bigSixFace);
        // console.log(cubeBoxFaces);
    };
    get('.btn4').onclick = function(){
        rotateCubeFace('r', "X", 180, true);
        console.log(bigSixFace);
    };
    get('.btn5').onclick = function(){
        rotateCubeFace('d', "Y", 180, true);
        console.log(bigSixFace);
    };
    get('.btn6').onclick = function(){
        rotateCubeFace('b', "Z", -180, true);
        console.log(bigSixFace);
    };

    // 六个面的旋转按钮
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