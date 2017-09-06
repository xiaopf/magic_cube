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
        
        dir = (dir === 1) ? true : false;

        if(dir){
            if((whichFace === 'u' || whichFace === 'l' || whichFace === 'b')){
                deg = -deg
            }else{
                deg = deg
            }
        }else{
            if(whichFace === 'u' || whichFace === 'l' || whichFace === 'b'){
                deg = deg
            }else{
                deg = -deg
            }
        }


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
// 寻找底层边块中间色块
    let dirArr = ['d','u','l','f','r','b'];
    var autoStep = [];
    var tempCube = [];
    var tempCornerCube = [];

    function searchDownMiddleCube(searchFace){

        for(let i = 0; i < 6;i ++){
            for(let j = 1; j < 8; j+=2) {
                if(fakeBigSixFace[dirArr[i]][j] === fakeBigSixFace[dirArr[0]][4]){
                    // console.log(dirArr[i],j);
                    switch(dirArr[i]){
                       case 'u':
                           caseJ(i,j,['b','l','r','f'],[1,1,1,1]);//侧面色块所在的位置
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

        findStep(searchFace);

        function caseJ(i,j,arr,arr2){
            switch(j){
                case 1:
                    if(fakeBigSixFace[arr[0]][arr2[0]] === fakeBigSixFace[searchFace][4]){
                        tempCube = [dirArr[i],arr[0]];
                    }
                break;
                case 3:
                    if(fakeBigSixFace[arr[1]][arr2[1]] === fakeBigSixFace[searchFace][4]){
                        tempCube = [dirArr[i],arr[1]];
                    }
                break;
                case 5:
                    if(fakeBigSixFace[arr[2]][arr2[2]] === fakeBigSixFace[searchFace][4]){
                        tempCube = [dirArr[i],arr[2]];
                    }
                break;
                case 7:
                    if(fakeBigSixFace[arr[3]][arr2[3]] === fakeBigSixFace[searchFace][4] ){
                        tempCube = [dirArr[i],arr[3]];
                    }
                break;
            }
        }

        function findStep(sideface){
            // console.log(tempCube)
            switch(tempCube[0]){
                case 'u':
                    switch(tempCube[1]){//判断所查颜色所在的面
                        case 'b':
                            switch(sideface){//判断所查颜色中心色块的位置
                                case 'f':
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                   break;
                                case 'b':
                                    pushAndChange(['b', 180, 1], autoStep);
                                   break;
                                case 'l':
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                   break;
                                case 'r':
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                   break; 
                            }
                        break;
                        case 'l':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                    break;
                                case 'b':
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                    break;
                                case 'l':
                                    pushAndChange(['l', 180, 1], autoStep);
                                    break;
                                case 'r':
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                    break; 
                            }
                            
                        break;
                        case 'r':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['u', 90, 1], autoStep);//-------------------------
                                    pushAndChange(['f', 180, 1], autoStep);
                                    break;
                                case 'b':
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                    break;
                                case 'l':
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                    break;
                                case 'r':
                                    pushAndChange(['r', 180, 1], autoStep);
                                    break; 
                            }
                        break;
                        case 'f':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['f', 180, 1], autoStep);
                                    break;
                                case 'b':
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                    break;
                                case 'l':
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                    break;
                                case 'r':
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                    break; 
                            }
                        break;
                    }
                break;
            // /////////////////////////////////////////
                case 'd':
                    switch(tempCube[1]){
                        case 'b':
                            switch(sideface){//判断所查颜色中心色块的位置
                                case 'f':
                                    pushAndChange(['b', 180, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                break;
                                case 'b':
                                   
                                break;
                                case 'l':
                                    pushAndChange(['b', 180, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['b', 180, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                break; 
                            }
                        break;
                        case 'l':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['l', 180, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['l', 180, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                break;
                                case 'l':
                                
                                break;
                                case 'r':
                                    pushAndChange(['l', 180, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                break; 
                            }    
                        break;
                        case 'r':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['r', 180, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['r', 180, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['r', 180, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                break;
                                case 'r':
                                
                                break; 
                            }
                        break;
                        case 'f':
                            switch(sideface){
                                case 'f':
                                    
                                break;
                                case 'b':
                                    pushAndChange(['f', 180, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['f', 180, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['f', 180, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                break; 
                            }
                        break;
                    }
                break;
            // ////////////////////////////////////////
                case 'f':
                    switch(tempCube[1]){//侧面所在的面
                        case 'u':
                            switch(sideface){//判断所查颜色中心色块的位置
                                case 'f':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                break; 
                            }
                        break;
                        case 'l':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['l', 90, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                break; 
                            }   
                        break;
                        case 'r':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['r', 90, 0], autoStep);
                                break; 
                            }
                        break;
                        case 'd':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                break; 
                            }
                        break;
                    }
                break;
            // ////////////////////////////////////
                case 'b':
                    switch(tempCube[1]){//侧面所在的面
                        case 'u':
                            switch(sideface){//判断所查颜色中心色块的位置
                                case 'f':
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                break; 
                            }
                        break;
                        case 'l':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['l', 90, 0], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                break; 
                           }
                        break;
                        case 'r':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['r', 90, 1], autoStep);
                                break; 
                           }
                        break;
                        case 'd':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                break; 
                            }
                        break;
                    }
                break;
            // ////////////////////////////////////////
                case 'l':
                    switch(tempCube[1]){//侧面所在的面
                        case 'u':
                            switch(sideface){//判断所查颜色中心色块的位置
                                case 'f':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                break; 
                            }
                        break;
                        case 'b':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['l', 180, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['l', 180, 0], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['b', 90, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                break; 
                            }  
                        break;
                        case 'f':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['f', 90, 0], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['l', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['l', 180, 0], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                break; 
                            }
                        break;
                        case 'd':
                            switch(sideface){
                                case 'f':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                break; 
                            }
                        break;
                    }
                break;
            // ///////////////////////////////////////////
                case 'r':
                    switch(tempCube[1]){//侧面所在的面
                            case 'u':
                                switch(sideface){//判断所查颜色中心色块的位置
                                    case 'f':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['f', 90, 0], autoStep);
                                        pushAndChange(['r', 90, 1], autoStep);
                                    break;
                                    case 'b':
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['b', 90, 0], autoStep);
                                        pushAndChange(['r', 90, 0], autoStep);
                                    break;
                                    case 'l':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['f', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['f', 90, 1], autoStep);
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['l', 180, 1], autoStep);
                                    break;
                                    case 'r':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['f', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['f', 90, 0], autoStep);
                                        pushAndChange(['r', 180, 0], autoStep);
                                    break; 
                                }
                            break;
                            case 'b':
                                switch(sideface){
                                    case 'f':
                                        pushAndChange(['r', 180, 1], autoStep);
                                        pushAndChange(['f', 90, 1], autoStep);
                                        pushAndChange(['r', 180, 0], autoStep);
                                    break;
                                    case 'b':
                                        pushAndChange(['b', 90, 0], autoStep);
                                    break;
                                    case 'l':
                                        pushAndChange(['b', 90, 1], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['b', 90, 0], autoStep);
                                        pushAndChange(['l', 180, 1], autoStep);
                                    break;
                                    case 'r':
                                        pushAndChange(['b', 90, 1], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['b', 90, 0], autoStep);
                                        pushAndChange(['r', 180, 1], autoStep);
                                    break; 
                                }  
                            break;
                            case 'f':
                                switch(sideface){
                                    case 'f':
                                        pushAndChange(['f', 90, 1], autoStep);
                                    break;
                                    case 'b':
                                        pushAndChange(['r', 180, 1], autoStep);
                                        pushAndChange(['b', 90, 0], autoStep);
                                        pushAndChange(['r', 180, 0], autoStep);
                                    break;
                                    case 'l':
                                        pushAndChange(['f', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['f', 90, 1], autoStep);
                                        pushAndChange(['l', 180, 1], autoStep);
                                    break;
                                    case 'r':
                                        pushAndChange(['f', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['f', 90, 1], autoStep);
                                        pushAndChange(['r', 180, 1], autoStep);
                                    break; 
                                }
                            break;
                            case 'd':
                                switch(sideface){
                                    case 'f':
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['f', 90, 1], autoStep);
                                    break;
                                    case 'b':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['b', 90, 0], autoStep);
                                    break;
                                    case 'l':
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['f', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['f', 90, 1], autoStep);
                                        pushAndChange(['l', 180, 1], autoStep);
                                    break;
                                    case 'r':
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['f', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['f', 90, 1], autoStep);
                                        pushAndChange(['r', 180, 1], autoStep);
                                    break; 
                                }
                            break;
                    }
                break;
            }
        }    
    }

// ////////////////////////////////////////////////////////////

    function searchCornerCube(searchFace_01,searchFace_02){
        for(let i = 0; i < 6;i ++){
            for(let j = 0; j < 9; j+=2) {
                if (j != 4) {
                    if(fakeBigSixFace[dirArr[i]][j] === fakeBigSixFace[dirArr[0]][4]){

                        // console.log(dirArr[i], j);

                        switch(dirArr[i]){
                           case 'u':
                               caseTJ(i,j,[['l', 0, 'b', 2],['b', 0, 'r', 2],['f', 0, 'l', 2],['r', 0, 'f', 2]]);//侧面色块所在的位置
                           break;
                           case 'd':
                               caseTJ(i,j,[['l', 8, 'f', 6],['f', 8, 'r', 6],['b', 8, 'l', 6],['r', 8, 'b', 6]]);
                           break;
                           case 'f':
                               caseTJ(i,j,[['l', 2, 'u', 6],['u', 8, 'r', 0],['d', 0, 'l', 6],['r', 6, 'd', 2]]);
                           break;
                           case 'b':
                               caseTJ(i,j,[['r', 2, 'u', 2],['u', 0, 'l', 0],['d', 8, 'r', 8],['l', 6, 'd', 6]]);
                           break;
                           case 'l':
                               caseTJ(i,j,[['b', 2, 'u', 0],['u', 6, 'f', 0],['d', 6, 'b', 8],['f', 6, 'd', 0]]);
                           break;
                           case 'r':
                               caseTJ(i,j,[['f', 2, 'u', 8],['u', 2, 'b', 0],['d', 2, 'f', 8],['b', 6, 'd', 8]]);
                           break; 
                        }
                    }
                }
            }
        }

        function caseTJ(i,j,arr){
            switch(j){
                case 0:
                    if(fakeBigSixFace[arr[0][0]][arr[0][1]] === fakeBigSixFace[searchFace_01][4] && 
                        fakeBigSixFace[arr[0][2]][arr[0][3]] === fakeBigSixFace[searchFace_02][4]){
                        tempCornerCube = [dirArr[i],arr[0]];
                    }
                break;
                case 2:
                    if(fakeBigSixFace[arr[1][0]][arr[1][1]] === fakeBigSixFace[searchFace_01][4] && 
                        fakeBigSixFace[arr[1][2]][arr[1][3]] === fakeBigSixFace[searchFace_02][4]){
                        tempCornerCube = [dirArr[i],arr[1]];
                    }
                break;
                case 6:
                    if(fakeBigSixFace[arr[2][0]][arr[2][1]] === fakeBigSixFace[searchFace_01][4] && 
                        fakeBigSixFace[arr[2][2]][arr[2][3]] === fakeBigSixFace[searchFace_02][4]){
                        tempCornerCube = [dirArr[i],arr[2]];
                    }
                break;
                case 8:
                    if(fakeBigSixFace[arr[3][0]][arr[3][1]] === fakeBigSixFace[searchFace_01][4] && 
                        fakeBigSixFace[arr[3][2]][arr[3][3]] === fakeBigSixFace[searchFace_02][4]){
                        tempCornerCube = [dirArr[i],arr[3]];
                    }
                break;
            } 
        }


        findCornerStep(searchFace_01,searchFace_02);

        // console.log(tempCornerCube)

        function findCornerStep(sideface_01,sideface_02){
            // console.log(tempCube)
            switch(tempCornerCube[0]){
                case 'u':
                    switch(tempCornerCube[1][0]){//判断所查颜色所在的面
                        case 'b':
                            switch(sideface_01){//判断所查颜色中心色块的位置
                                case 'f':
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                   break;
                                case 'b':
                                    pushAndChange(['b', 90, 1], autoStep); 
                                    pushAndChange(['u', 180, 1], autoStep); 
                                    pushAndChange(['b', 180, 1], autoStep); 
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);  
                                   break;
                                case 'l':
                                    pushAndChange(['b', 90, 1], autoStep); 
                                    pushAndChange(['u', 180, 1], autoStep); 
                                    pushAndChange(['b', 90, 0], autoStep); 
                                    pushAndChange(['l', 90, 0], autoStep); 
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);  
                                   break;
                                case 'r':
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                   break; 
                            }
                        break;
                        case 'l':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    break;
                                case 'b':
                                    pushAndChange(['l', 90, 1], autoStep); 
                                    pushAndChange(['u', 90, 0], autoStep); 
                                    pushAndChange(['l', 90, 0], autoStep); 
                                    pushAndChange(['b', 90, 0], autoStep); 
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    break;
                                case 'l':
                                    pushAndChange(['l', 90, 1], autoStep); 
                                    pushAndChange(['u', 90, 0], autoStep); 
                                    pushAndChange(['l', 180, 0], autoStep); 
                                    pushAndChange(['u', 90, 1], autoStep); 
                                    pushAndChange(['l', 90, 1], autoStep);

                                    break;
                                case 'r':
                                    pushAndChange(['l', 90, 1], autoStep); 
                                    pushAndChange(['u', 90, 1], autoStep); 
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    break; 
                            }
                        break;
                        case 'r':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    break;
                                case 'b':
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    break;
                                case 'l':
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    break;
                                case 'r':
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['r', 180, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    break; 
                            }
                        break;
                        case 'f':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 180, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    break;
                                case 'b':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1 ], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    break;
                                case 'l':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    break;
                                case 'r':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    break; 
                            }
                        break;
                    }
                break;
            // /////////////////////////////////////////
                case 'd':
                    switch(tempCornerCube[1][0]){
                        case 'b':
                            switch(sideface_01){//判断所查颜色中心色块的位置
                                case 'f':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                break;
                                case 'b':
                                   
                                break;
                                case 'l':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                break; 
                            }
                        break;
                        case 'l':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                break;
                                case 'l':
                                
                                break;
                                case 'r':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                break; 
                            }    
                        break;
                        case 'r':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                break;
                                case 'b':

                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                break;
                                case 'r':
                                
                                break; 
                            }
                        break;
                        case 'f':
                            switch(sideface_01){
                                case 'f':
                                    
                                break;
                                case 'b':
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                break; 
                            }
                        break;
                    }
                break;
            // ////////////////////////////////////////
                case 'f':
                    switch(tempCornerCube[1][0]){//侧面所在的面
                        case 'u':
                            switch(sideface_01){//判断所查颜色中心色块的位置
                                case 'f':
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                break; 
                            }
                        break;
                        case 'l':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                break; 
                            }   
                        break;
                        case 'r':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
            
                                break;
                                case 'l':
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 180, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['r', 90, 0], autoStep);
                                break; 
                            }
                        break;
                        case 'd':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['f', 180, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                break; 
                            }
                        break;
                    }
                break;
            // ////////////////////////////////////
                case 'b':
                    switch(tempCornerCube[1][0]){//侧面所在的面
                        case 'u':
                            switch(sideface_01){//判断所查颜色中心色块的位置
                                case 'f':
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);

                                break;
                                case 'b':
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                break; 
                            }
                        break;
                        case 'l':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['b', 180, 1], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                break; 
                           }
                        break;
                        case 'r':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                break; 
                           }
                        break;
                        case 'd':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['b', 180, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                break; 
                            }
                        break;
                    }
                break;
            // ////////////////////////////////////////
                case 'l':
                    switch(tempCornerCube[1][0]){//侧面所在的面
                        case 'u':
                            switch(sideface_01){//判断所查颜色中心色块的位置
                                case 'f':
                                    pushAndChange(['r', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                break; 
                            }
                        break;
                        case 'b':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                break; 
                            }  
                        break;
                        case 'f':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['l', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                    pushAndChange(['l', 180, 0], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['l', 180, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['r', 180, 1], autoStep);
                                break; 
                            }
                        break;
                        case 'd':
                            switch(sideface_01){
                                case 'f':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['f', 90, 1], autoStep);
                                break;
                                case 'b':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 0], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['b', 90, 0], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['b', 90, 1], autoStep);
                                break;
                                case 'l':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['u', 180, 1], autoStep);
                                    pushAndChange(['l', 180, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 1], autoStep);
                                break;
                                case 'r':
                                    pushAndChange(['l', 90, 1], autoStep);
                                    pushAndChange(['r', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep);
                                    pushAndChange(['l', 90, 0], autoStep);
                                    pushAndChange(['r', 90, 1], autoStep);
                                break; 
                            }
                        break;
                    }
                break;
            // ///////////////////////////////////////////
                case 'r':
                    switch(tempCornerCube[1][0]){//侧面所在的面
                            case 'u':
                                switch(sideface_01){//判断所查颜色中心色块的位置
                                    case 'f':
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['u', 180, 1], autoStep);
                                        pushAndChange(['r', 90, 0], autoStep);
                                    break;
                                    case 'b':
                                        pushAndChange(['l', 90, 1], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['l', 90, 0], autoStep);
                                    break;
                                    case 'l':
                                        pushAndChange(['f', 90, 1], autoStep);
                                        pushAndChange(['u', 180, 1], autoStep);
                                        pushAndChange(['f', 90, 0], autoStep);
                                    break;
                                    case 'r':
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['b', 90, 1], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['b', 90, 0], autoStep);   
                                    break; 
                                }
                            break;
                            case 'b':
                                switch(sideface_01){
                                    case 'f':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['r', 180, 1], autoStep);
                                        pushAndChange(['u', 180, 1], autoStep);
                                        pushAndChange(['r', 90, 0], autoStep);
                                    break;
                                    case 'b':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['l', 90, 1], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['l', 90, 0], autoStep);
                                    break;
                                    case 'l':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['f', 90, 1], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['f', 90, 0], autoStep);
                                    break;
                                    case 'r':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['u', 180, 0], autoStep);
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['b', 90, 1], autoStep);
                                        pushAndChange(['u', 180, 1], autoStep);
                                        pushAndChange(['b', 90, 0], autoStep);
                                    break; 
                                }  
                            break;
                            case 'f':
                                switch(sideface_01){
                                    case 'f':
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['l', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['l', 90, 1], autoStep);
                                    break;
                                    case 'b':
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['r', 180, 0], autoStep);
                                        pushAndChange(['u', 180, 0], autoStep);
                                        pushAndChange(['r', 90, 1], autoStep);
                                    break;
                                    case 'l':
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['b', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['b', 90, 1], autoStep);
                                    break;
                                    case 'r':
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['u', 180, 0], autoStep);
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['f', 90, 0], autoStep);
                                        pushAndChange(['u', 180, 1], autoStep);
                                        pushAndChange(['f', 90, 1], autoStep);
                                    break; 
                                }
                            break;
                            case 'd':
                                switch(sideface_01){
                                    case 'f':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['f', 90, 1], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['f', 90, 0], autoStep);
                                    break;
                                    case 'b':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['u', 180, 1], autoStep);
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['b', 90, 1], autoStep);
                                        pushAndChange(['u', 180, 1], autoStep);
                                        pushAndChange(['b', 90, 0], autoStep);
                                    break;
                                    case 'l':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['l', 90, 1], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['l', 90, 0], autoStep);
                                    break;
                                    case 'r':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 0], autoStep);
                                        pushAndChange(['r', 180, 1], autoStep);
                                        pushAndChange(['u', 180, 1], autoStep);
                                        pushAndChange(['r', 90, 0], autoStep);
                                    break; 
                                }
                            break;
                    }
                break;
            }
        }  
    }

// ////////////////////////////////////////////////////////////

    function searchSecondFloorCube(searchFace_01,searchFace_02){
        let secondFloor = [];

        function searchMain(){
            for (let i = 1; i < 9; i += 2) {

                if(fakeBigSixFace['u'][i] == fakeBigSixFace[searchFace_01][4]) {

                    switch(i){
                        case 1:
                            if(fakeBigSixFace['b'][1] == fakeBigSixFace[searchFace_02][4]){
                                secondFloor = ['u', i];
                            }
                        break;
                        case 3:
                            if(fakeBigSixFace['l'][1] == fakeBigSixFace[searchFace_02][4]){
                                secondFloor = ['u', i];
                            }
                        break;
                        case 5:
                            if(fakeBigSixFace['r'][1] == fakeBigSixFace[searchFace_02][4]){
                                secondFloor = ['u', i];
                            }
                        break;
                        case 7:
                            if(fakeBigSixFace['f'][1] == fakeBigSixFace[searchFace_02][4]){
                                secondFloor = ['u', i];
                            }
                        break;
                    }
                }
                if (i != 7){
                    if(fakeBigSixFace['f'][i] == fakeBigSixFace[searchFace_01][4]){
                        switch(i){
                            case 1:
                                if(fakeBigSixFace['u'][7] == fakeBigSixFace[searchFace_02][4]){
                                    secondFloor = ['f', i];
                                }
                            break;
                            case 3:
                                if(fakeBigSixFace['l'][5] == fakeBigSixFace[searchFace_02][4]){
                                    secondFloor = ['f', i];
                                }
                            break;
                            case 5:
                                if(fakeBigSixFace['r'][3] == fakeBigSixFace[searchFace_02][4]){
                                    secondFloor = ['f', i];
                                }
                            break;
                        }
                    }
                    if(fakeBigSixFace['b'][i] == fakeBigSixFace[searchFace_01][4]){
                        switch(i){
                            case 1:
                                if(fakeBigSixFace['u'][1] == fakeBigSixFace[searchFace_02][4]){
                                    secondFloor = ['b', i];
                                }
                            break;
                            case 3:
                                if(fakeBigSixFace['r'][5] == fakeBigSixFace[searchFace_02][4]){
                                    secondFloor = ['b', i];
                                }
                            break;
                            case 5:
                                if(fakeBigSixFace['l'][3] == fakeBigSixFace[searchFace_02][4]){
                                    secondFloor = ['b', i];
                                }
                            break;
                        }
                    }
                    if(fakeBigSixFace['l'][i] == fakeBigSixFace[searchFace_01][4]){
                        switch(i){
                            case 1:
                                if(fakeBigSixFace['u'][3] == fakeBigSixFace[searchFace_02][4]){
                                    secondFloor = ['l', i];
                                }
                            break;
                            case 3:
                                if(fakeBigSixFace['b'][5] == fakeBigSixFace[searchFace_02][4]){
                                    secondFloor = ['l', i];
                                }
                            break;
                            case 5:
                                if(fakeBigSixFace['f'][3] == fakeBigSixFace[searchFace_02][4]){
                                    secondFloor = ['l', i];
                                }
                            break;
                        }
                    }
                    if(fakeBigSixFace['r'][i] == fakeBigSixFace[searchFace_01][4]){
                        switch(i){
                            case 1:
                                if(fakeBigSixFace['u'][5] == fakeBigSixFace[searchFace_02][4]){
                                    secondFloor = ['r', i];
                                }
                            break;
                            case 3:
                                if(fakeBigSixFace['f'][5] == fakeBigSixFace[searchFace_02][4]){
                                    secondFloor = ['r', i];
                                }
                            break;
                            case 5:
                                if(fakeBigSixFace['b'][3] == fakeBigSixFace[searchFace_02][4]){
                                    secondFloor = ['r', i];
                                }
                            break;
                        }
                    }
                } 
            }
            if(secondFloor[0] == 'u'){
                upRotate(searchFace_01, searchFace_02,secondFloor[1]);
            }

        }

        searchMain();

        switch(secondFloor[0]){
            case 'f':
                switch(secondFloor[1]){
                    case 3:
                        normalRotate(searchFace_01, searchFace_02, 1);
                        searchMain();
                    break;
                    case 5:
                        normalRotate(searchFace_01, searchFace_02, 0);
                        searchMain();
                    break;
                }
            break;
            // case 'l':
            //     switch(){
            //         case 3:
            //             normalRotate(searchFace_01, searchFace_02, dir);
            //             searchMain();
            //         break;
            //         case 5:
            //             normalRotate(searchFace_01, searchFace_02, dir);
            //             searchMain();
            //         break;
            //     }
            // break;
            case 'b':
                switch(secondFloor[1]){
                    case 3:
                        normalRotate(searchFace_01, searchFace_02, 1);
                        searchMain();
                    break;
                    case 5:
                        normalRotate(searchFace_01, searchFace_02, 0);
                        searchMain();
                    break;
                }
            break;
            // case 'r':
            //     switch(){
            //         case 1:
            //             normalRotate(searchFace_01, searchFace_02, dir);
            //             searchMain();
            //         break;
            //         case 3:
            //             normalRotate(searchFace_01, searchFace_02, dir);
            //             searchMain();
            //         break;
            //         case 5:
            //             normalRotate(searchFace_01, searchFace_02, dir);
            //             searchMain();
            //         break;
            //     }
            // break;
        }

        function normalRotate(face_01, face_02, dir){ // DIR ::: RIGHT 1  LEFT 0
            let dirF = (dir === 1) ? 0 : 1;
            pushAndChange([face_01, 90, dirF], autoStep);
            pushAndChange(['u', 90, dir], autoStep);
            pushAndChange([face_01, 90, dir], autoStep);
            pushAndChange(['u', 90, dir], autoStep);
            pushAndChange([face_02, 90, dir], autoStep);
            pushAndChange(['u', 90, dirF ], autoStep);
            pushAndChange([face_02, 90, dirF], autoStep);
        } 

        function upRotate(face_01,face_02,num){
            switch(num){
                case 1:
                    switch(face_01){
                        case 'f':
                            switch(face_02){
                                case 'l':
                                    normalRotate(face_01, face_02, 0)
                                break;
                                case 'r':
                                    normalRotate(face_01, face_02, 1)
                                break;
                            }
                        break;
                        case 'l':
                            pushAndChange(['u', 90, 1], autoStep);
                            switch(face_02){
                                case 'f':   
                                    normalRotate(face_01, face_02, 1)
                                break;
                                case 'b':
                                    normalRotate(face_01, face_02, 0)
                                break;
                            }
                        break;
                        case 'b':
                            pushAndChange(['u', 180, 1], autoStep);
                            switch(face_02){
                                case 'l':
                                    normalRotate(face_01, face_02, 1)
                                break;
                                case 'r':
                                    normalRotate(face_01, face_02, 0)
                                break;
                            }
                        break;
                        case 'r':
                            pushAndChange(['u', 90, 0], autoStep);
                            switch(face_02){
                                case 'f':
                                    normalRotate(face_01, face_02, 0)
                                break;
                                case 'b':
                                    normalRotate(face_01, face_02, 1)
                                break;
                            }
                        break;
                    }
                break;
                case 3:
                    switch(face_01){
                        case 'f':
                            pushAndChange(['u', 90, 1], autoStep);
                            switch(face_02){
                                case 'l':
                                    normalRotate(face_01, face_02, 0)
                                break;
                                case 'r':
                                    normalRotate(face_01, face_02, 1)
                                break;
                            }
                        break;
                        case 'l':
                            pushAndChange(['u', 180, 1], autoStep);
                            switch(face_02){
                                case 'f':   
                                    normalRotate(face_01, face_02, 1)
                                break;
                                case 'b':
                                    normalRotate(face_01, face_02, 0)
                                break;
                            }
                        break;
                        case 'b':
                            pushAndChange(['u', 90, 0], autoStep);
                            switch(face_02){
                                case 'l':
                                    normalRotate(face_01, face_02, 1)
                                break;
                                case 'r':
                                    normalRotate(face_01, face_02, 0)
                                break;
                            }
                        break;
                        case 'r':
                            switch(face_02){
                                case 'f':
                                    normalRotate(face_01, face_02, 0)
                                break;
                                case 'b':
                                    normalRotate(face_01, face_02, 1)
                                break;
                            }
                        break;
                    }
                break;
                case 5:
                    switch(face_01){
                        case 'f':
                            pushAndChange(['u', 90, 0], autoStep);
                            switch(face_02){
                                case 'l':
                                    normalRotate(face_01, face_02, 0)
                                break;
                                case 'r':
                                    normalRotate(face_01, face_02, 1)
                                break;
                            }
                        break;
                        case 'l':
                            switch(face_02){
                                case 'f':   
                                    normalRotate(face_01, face_02, 1)
                                break;
                                case 'b':
                                    normalRotate(face_01, face_02, 0)
                                break;
                            }
                        break;
                        case 'b':
                            pushAndChange(['u', 90, 1], autoStep);
                            switch(face_02){
                                case 'l':
                                    normalRotate(face_01, face_02, 1)
                                break;
                                case 'r':
                                    normalRotate(face_01, face_02, 0)
                                break;
                            }
                        break;
                        case 'r':
                            pushAndChange(['u', 180, 1], autoStep);
                            switch(face_02){
                                case 'f':
                                    normalRotate(face_01, face_02, 0)
                                break;
                                case 'b':
                                    normalRotate(face_01, face_02, 1)
                                break;
                            }
                        break;
                    }
                break;
                case 7:
                    switch(face_01){
                        case 'f':
                            pushAndChange(['u', 180, 1], autoStep);
                            switch(face_02){
                                case 'l':
                                    normalRotate(face_01, face_02, 0)
                                break;
                                case 'r':
                                    normalRotate(face_01, face_02, 1)
                                break;
                            }
                        break;
                        case 'l':
                            pushAndChange(['u', 90, 0], autoStep);
                            switch(face_02){
                                case 'f':   
                                    normalRotate(face_01, face_02, 1)
                                break;
                                case 'b':
                                    normalRotate(face_01, face_02, 0)
                                break;
                            }
                        break;
                        case 'b':
                            switch(face_02){
                                case 'l':
                                    normalRotate(face_01, face_02, 1)
                                break;
                                case 'r':
                                    normalRotate(face_01, face_02, 0)
                                break;
                            }
                        break;
                        case 'r':
                            pushAndChange(['u', 90, 1], autoStep);
                            switch(face_02){
                                case 'f':
                                    normalRotate(face_01, face_02, 0)
                                break;
                                case 'b':
                                    normalRotate(face_01, face_02, 1)
                                break;
                            }
                        break;
                    }
                break;
            }
        }
    }






// 寻找底层角色块
    function auto(){

        searchDownMiddleCube('b');//参数是表示侧面的颜色（以中心色块为标准的）
        searchDownMiddleCube('f');
        searchDownMiddleCube('l');
        searchDownMiddleCube('r');
        ////////////////////////////
        searchCornerCube('l','f')
        searchCornerCube('f','r')
        searchCornerCube('b','l')
        searchCornerCube('r','b')
        ///////////////////////////

        searchSecondFloorCube('l','f')
        searchSecondFloorCube('b','l')
        searchSecondFloorCube('r','b')
        searchSecondFloorCube('f','r')

        // searchSecondFloorCube('l','f')
        // searchSecondFloorCube('l','b')
        // searchSecondFloorCube('b','r')
        // searchSecondFloorCube('r','f')
                

        stepBystep(autoStep,1000)
    }


// /////////////////////////////////////////////////////

    function pushAndChange(arr,inArr){
        inArr.push(arr);

        let axis = "";
        switch(arr[0]){
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

        changeFace(arr[0], axis, arr[1], arr[2], fakeBigSixFace);
    }




// 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、

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


// 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
    let randomArr = [];
    function random(){
        

        pushAndChange(['u', 180, 0], randomArr)
        pushAndChange(['r', 90, 1], randomArr)
        pushAndChange(['l', 90, 0], randomArr)
        pushAndChange(['d', 180, 1], randomArr)
        pushAndChange(['r', 180, 1], randomArr)
        pushAndChange(['b', 180, 1], randomArr)
        pushAndChange(['d', 90, 1], randomArr)
        pushAndChange(['l', 90, 0], randomArr)
        pushAndChange(['d', 90, 1], randomArr)
        pushAndChange(['b', 90, 0], randomArr)
        pushAndChange(['f', 180, 0], randomArr)
        pushAndChange(['l', 90, 0], randomArr)

        // let steps = [
        //                 ['u', 180, 0],
        //                 ['r', 90, 1],
        //                 ['l', 90, 0],
        //                 ['d', 90, 1],
        //                 ['l', 90, 0],
        //                 ['d', 180, 1],
        //                 ['r', 180, 1],
        //                 ['b', 180, 1],
        //                 ['d', 90, 1],
        //                 ['b', 90, 0],
        //                 ['f', 180, 0],
        //                 ['l', 90, 0]
        //             ]


        // for (let i = 0; i < 12; i++) {
        //     let randomNum = Math.floor(Math.random()*12);
        //     pushAndChange(steps[randomNum], randomArr)
        // }

        stepBystep(randomArr,10)

    }

    get('.btn19').onclick = function(){
        auto();
        autoStep = [];
    };
    get('.btn20').onclick = function(){
        random();
        randomArr = []
    };

// 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、













// ///////////////////////////////////////////////////

    // 顺时针旋转180度
    get('.btn1').onclick = function(){
        rotateCubeFace('u', 180, 1);
    };
    get('.btn2').onclick = function(){
        rotateCubeFace('l', 180, 1);
    };
    get('.btn6').onclick = function(){
        rotateCubeFace('b', 180, 1);
    };

    // //////////

    get('.btn3').onclick = function(){
        rotateCubeFace('f', 180, 1);
    };
    get('.btn4').onclick = function(){
        rotateCubeFace('r', 180, 1);
    };
    get('.btn5').onclick = function(){
        rotateCubeFace('d', 180, 1);
    };


    // 逆时针旋转180度
    get('.btn03').onclick = function(){
        rotateCubeFace('f', 180, 0);
    };
    get('.btn04').onclick = function(){
        rotateCubeFace('r', 180, 0);
    };
    get('.btn05').onclick = function(){
        rotateCubeFace('d', 180, 0);
    };

    // ///////////////////
    get('.btn01').onclick = function(){
        rotateCubeFace('u', 180, 0);
    };
    get('.btn02').onclick = function(){
        rotateCubeFace('l', 180, 0);
    };

    get('.btn06').onclick = function(){
        rotateCubeFace('b', 180, 0);
    };

    // 顺时针旋转90度按钮
    get('.btn7').onclick = function(){
        rotateCubeFace('u', 90, 1);
    };
    get('.btn8').onclick = function(){
        rotateCubeFace('l', 90, 1);
    };

    get('.btn12').onclick = function(){
        rotateCubeFace('b', 90, 1);
    };
////////////////////////////////
    get('.btn9').onclick = function(){
        rotateCubeFace('f', 90, 1);
    };
    get('.btn10').onclick = function(){
        rotateCubeFace('r', 90, 1);
    };
    get('.btn11').onclick = function(){
        rotateCubeFace('d', 90, 1);
    };

    // 逆时针旋转90度按钮

    get('.btn15').onclick = function(){
        rotateCubeFace('f', 90, 0);
    };
    get('.btn16').onclick = function(){
        rotateCubeFace('r', 90, 0);
    };
    get('.btn17').onclick = function(){
        rotateCubeFace('d', 90, 0);
    };


    get('.btn13').onclick = function(){
        rotateCubeFace('u', 90, 0);
    };
    get('.btn14').onclick = function(){
        rotateCubeFace('l', 90, 0);
    };
    get('.btn18').onclick = function(){
        rotateCubeFace('b', 90, 0);
    };















}