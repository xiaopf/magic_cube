window.onload = function(){

    let RANK = 3; // 定义魔方的阶数
    let cubeNum = RANK * RANK * RANK//计算立方体的个数
    var testAuto = !true;


    // 定义获取元素的方法
    const get = function (key) {
        return document.querySelector(key);
    };

    let speed = get('.speed').value;//定义自动旋转的速度

    // 初始化魔方显示视角及自动旋转速度 的文字说明
    get('.x_deg').innerHTML = get('.x_rotate').value + 'deg';
    get('.y_deg').innerHTML = get('.y_rotate').value + 'deg';
    get('.z_deg').innerHTML = get('.z_rotate').value + 'deg';
    get('.speed_num').innerHTML = speed + 'ms';

    // 调整魔方显示视角及自动旋转动画速度的滑块事件，改变文字说明，魔方视角及动画速度
    get('.x_rotate').oninput = function(){
        get('.x_deg').innerHTML = this.value + 'deg';
        get("#big_box").style.transform = 'rotateX('+get('.x_rotate').value + 'deg) rotateY(' + get('.y_rotate').value+'deg) rotateZ(' + get('.z_rotate').value + 'deg)';
    };
    get('.y_rotate').oninput = function(){
        get('.y_deg').innerHTML = this.value + 'deg';
        get("#big_box").style.transform = 'rotateX('+get('.x_rotate').value + 'deg) rotateY(' + get('.y_rotate').value+'deg) rotateZ(' + get('.z_rotate').value + 'deg)';

    };
    get('.z_rotate').oninput = function(){
        get('.z_deg').innerHTML = this.value + 'deg';
        get("#big_box").style.transform = 'rotateX('+get('.x_rotate').value + 'deg) rotateY(' + get('.y_rotate').value+'deg) rotateZ(' + get('.z_rotate').value + 'deg)';

    };
    get('.speed').oninput = function(){
        speed = get('.speed').value;
        get('.speed_num').innerHTML = speed + 'ms';
    };

    // 魔方视角复位
    get('.btnF').onclick = function(){
        get('.x_rotate').value = '-30';
        get('.y_rotate').value = '-30';
        get('.z_rotate').value = '0';
        get('.x_deg').innerHTML = '-30deg';
        get('.y_deg').innerHTML = '-30deg';
        get('.z_deg').innerHTML = '0deg';
        get("#big_box").style.transform = 'rotateX(-30deg) rotateY(-30deg) rotateZ(0deg)';
    }

    // cube 的空间位置,x,y,z,旋转轴,代表每一个块的空间位置,顺序是色块的序列号
    var cubePosition = [
        [0,   0,   0  ],//1
        [0,   162, 0  ],//2
        [0,   324, 0  ],//3
        [162, 0,   0  ],//4
        [162, 162, 0  ],//5
        [162, 324, 0  ],//6
        [324, 0,   0  ],//7
        [324, 162, 0  ],//8
        [324, 324, 0  ],//9
        [0,   0,   -162],//10
        [0,   162, -162],//11
        [0,   324, -162],//12
        [162, 0,   -162],//13
        [162, 162, -162],//14 中心色块
        [162, 324, -162],//15
        [324, 0,   -162],//16
        [324, 162, -162],//17
        [324, 324, -162],//18
        [0,   0,   -324],//19
        [0,   162, -324],//20
        [0,   324, -324],//21
        [162, 0,   -324],//22
        [162, 162, -324],//23
        [162, 324, -324],//24
        [324, 0,   -324],//25
        [324, 162, -324],//26
        [324, 324, -324]//27
    ];

    //为每个小立方体编号！每个cube都有固定的编号,在旋转的时候是不会变化的,只是编导不同的空间位置
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

    // 每个大面的小块所展现的颜色
    //每个cube的颜色是变化的,每个色块是在每次旋转都会变化的,所以每次旋转后都会更新每个大面包含的小cube的面颜色
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
    
    // 初始状态和 bigSixFace 一样，但是作为探路的 fakeBigSixFace 是主要变换的对象
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



    // 初始化渲染cubes
    renderCube (true, []);
    for(let i = 0; i < 9; i++) {
        $("#box_"+defaultBigSixFace["u"][i]).find(".face_01").css({
            backgroundColor : bigSixFace["u"][i],
            borderRadius: '12px'
        })
        $("#box_"+defaultBigSixFace["l"][i]).find(".face_02").css({
            backgroundColor : bigSixFace["l"][i],
            borderRadius: '12px'
        })
        $("#box_"+defaultBigSixFace["f"][i]).find(".face_03").css({
            backgroundColor : bigSixFace["f"][i],
            borderRadius: '12px'
        })
        $("#box_"+defaultBigSixFace["r"][i]).find(".face_04").css({
            backgroundColor : bigSixFace["r"][i],
            borderRadius: '12px'
        })
        $("#box_"+defaultBigSixFace["d"][i]).find(".face_05").css({
            backgroundColor : bigSixFace["d"][i],
            borderRadius: '12px'
        })
        $("#box_"+defaultBigSixFace["b"][i]).find(".face_06").css({
            backgroundColor : bigSixFace["b"][i],
            borderRadius: '12px'
        })
    }

    // 当旋转时,每个有固定编号的小立方体，上面的颜色根据参数的不同进行变换、、那个面旋转，轴，角度，方向，颜色的数组
    function changeFace(whichFace, axis, deg, dir, faceArr) {

        //旋转180度,顺时针和逆时针结果一样
        if(Math.abs(deg) == 180){
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
        } 

        //顺时针旋转90度
        else if(Math.abs(deg) == 90 && dir) {

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
        } 

        //逆时针旋转90度
        else if(Math.abs(deg) == 90 && !dir) { 
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

    // 根据给定的空间位置,设置内联样式
    function cubePositionStyle (i) {
        return  "top:"+cubePosition[i-1][0]+"px; "+
                "left:"+cubePosition[i-1][1]+"px ;"+
                "transform:translateZ("+cubePosition[i-1][2]+"px)";
    };

    // 渲染每个cube的六个小面
    function sixFace(i) {
        var cubeFaces = '<div style="background-color:black; border-radius: 0px;" class="face_01"></div>'+
                        '<div style="background-color:black; border-radius: 0px;" class="face_02"></div>'+
                        '<div style="background-color:black; border-radius: 0px;" class="face_03"></div>'+
                        '<div style="background-color:black; border-radius: 0px;" class="face_04"></div>'+
                        '<div style="background-color:black; border-radius: 0px;" class="face_05"></div>'+
                        '<div style="background-color:black; border-radius: 0px;" class="face_06"></div>';
        return cubeFaces;
    };

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

    // 旋转,同时更新cube的面的颜色,同时更新html布局
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
                backgroundColor : bigSixFace["u"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["l"][i]).find(".face_02").css({
                backgroundColor : bigSixFace["l"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["f"][i]).find(".face_03").css({
                backgroundColor : bigSixFace["f"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["r"][i]).find(".face_04").css({
                backgroundColor : bigSixFace["r"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["d"][i]).find(".face_05").css({
                backgroundColor : bigSixFace["d"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["b"][i]).find(".face_06").css({
                backgroundColor : bigSixFace["b"][i],
                borderRadius: '12px'
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


/////////////////////////////////////////////////////////////
    // 寻找旋转步骤 
    let dirArr = ['d','u','l','f','r','b'];
    let NumTurn = [[0, 'f'], [2, 'r'], [8, 'b'], [6, 'l']];
    var autoStep = [];
    var saveShiftStep = [];
    var tempCube = [];
    var tempCornerCube = [];

    // 寻找底层边块中间色块（底层十字）
    function searchDownMiddleCube(searchFace){

        for(let i = 0; i < 6;i ++){
            for(let j = 1; j < 8; j+=2) {
                if(fakeBigSixFace[dirArr[i]][j] === fakeBigSixFace[dirArr[0]][4]){
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
                                    pushAndChange(['u', 90, 1], autoStep);
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
                                    pushAndChange(['u', 90, 1], autoStep);
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
                                    pushAndChange(['l', 90, 0], autoStep);//???????????????????????????
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
                case 'r'://底层颜色
                    switch(tempCube[1]){//侧面所在的面
                            case 'u':
                                switch(sideface){//判断所查颜色侧面中心色块的位置
                                    case 'f':
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['f', 90, 1], autoStep);
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
                                        pushAndChange(['f', 90, 1], autoStep);
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
    
    // 寻找底层角色块（底层完整）
    function searchCornerCube(searchFace_01,searchFace_02){//l f

        for(let i = 0; i < 6;i ++){
            for(let j = 0; j < 9; j+=2) {
                if (j != 4) {
                    if(fakeBigSixFace[dirArr[i]][j] === fakeBigSixFace[dirArr[0]][4]){

                        switch(dirArr[i]){
                           case 'u':
                               caseTJ(i,j,[['l', 0, 'b', 2],['b', 0, 'r', 2],['f', 0, 'l', 2],['r', 0, 'f', 2]]);//侧面色块所在的位置
                           break;
                           case 'd':
                               caseTJ(i,j,[['l', 8, 'f', 6],['f', 8, 'r', 6],['b', 8, 'l', 6],['r', 8, 'b', 6]]);///
                           break;
                           case 'f':
                               caseTJ(i,j,[['l', 2, 'u', 6],['u', 8, 'r', 0],['d', 0, 'l', 8],['r', 6, 'd', 2]]);///.. d0 l6 
                           break;
                           case 'b':
                               caseTJ(i,j,[['r', 2, 'u', 2],['u', 0, 'l', 0],['d', 8, 'r', 8],['l', 6, 'd', 6]]);////
                           break;
                           case 'l':
                               caseTJ(i,j,[['b', 2, 'u', 0],['u', 6, 'f', 0],['d', 6, 'b', 8],['f', 6, 'd', 0]]);
                           break;
                           case 'r':
                               caseTJ(i,j,[['f', 2, 'u', 8],['u', 2, 'b', 0],['d', 2, 'f', 8],['b', 6, 'd', 8]]);///
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
                    if(fakeBigSixFace[arr[2][0]][arr[2][1]] === fakeBigSixFace[searchFace_01][4] && //d 0  l4
                        fakeBigSixFace[arr[2][2]][arr[2][3]] === fakeBigSixFace[searchFace_02][4]){ // 
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

        if (tempCornerCube[0] == 'u') {
            switch(tempCornerCube[1][0]){//判断所查颜色所在的面
                case 'b':
                    var a = 2;
                    while(isDownCornerOK(NumTurn[a][0])){
                        pushAndChange(['u', 90, 1], autoStep);
                        a --;
                        if (a < 0) { a = 3;} 
                    }
                    pushAndChange([NumTurn[a][1], 90, 1], autoStep);
                    pushAndChange(['u', 180, 1], autoStep);
                    pushAndChange([NumTurn[a][1], 90, 0], autoStep);
                    searchCornerCube(searchFace_01,searchFace_02);
                break;
                case 'l':
                    var b = 3;
                    while(isDownCornerOK(NumTurn[b][0])){
                        pushAndChange(['u', 90, 1], autoStep);
                        b --;
                        if (b < 0) { b = 3;} 
                    }
                    pushAndChange([NumTurn[b][1], 90, 1], autoStep);
                    pushAndChange(['u', 180, 1], autoStep);
                    pushAndChange([NumTurn[b][1], 90, 0], autoStep);
                    searchCornerCube(searchFace_01,searchFace_02);
                break;
                case 'r':
                    var c = 1;
                    while(isDownCornerOK(NumTurn[c][0])){
                        pushAndChange(['u', 90, 1], autoStep);
                        c --;
                        if (c < 0) { c = 3;} 
                    }
                    pushAndChange([NumTurn[c][1], 90, 1], autoStep);
                    pushAndChange(['u', 180, 1], autoStep);
                    pushAndChange([NumTurn[c][1], 90, 0], autoStep);
                    searchCornerCube(searchFace_01,searchFace_02);
                break;
                case 'f':
                    var d = 0;
                    while(isDownCornerOK(NumTurn[d][0])){
                        pushAndChange(['u', 90, 1], autoStep);
                        d --;
                        if (d < 0) { d = 3;} 
                    }
                    pushAndChange([NumTurn[d][1], 90, 1], autoStep);
                    pushAndChange(['u', 180, 1], autoStep);
                    pushAndChange([NumTurn[d][1], 90, 0], autoStep);
                    searchCornerCube(searchFace_01,searchFace_02);
                break;
            }
        } else {
            findCornerStep(searchFace_01,searchFace_02);
        }

        function isDownCornerOK(n){
            if (fakeBigSixFace['d'][n] == fakeBigSixFace['d'][4]) {
                switch(n){
                    case 0:
                        if(fakeBigSixFace['l'][8] == fakeBigSixFace['l'][4] && fakeBigSixFace['f'][6] == fakeBigSixFace['f'][4]){
                            return true;
                        } else {
                            return false;
                        }
                    break;
                    case 2:
                        if(fakeBigSixFace['f'][8] == fakeBigSixFace['f'][4] && fakeBigSixFace['r'][6] == fakeBigSixFace['r'][4]){
                            return true;
                        } else {
                            return false;
                        }
                    break;
                    case 6:
                        if(fakeBigSixFace['b'][8] == fakeBigSixFace['b'][4] && fakeBigSixFace['l'][6] == fakeBigSixFace['l'][4]){
                            return true;
                        } else {
                            return false;
                        }
                    break;
                    case 8:
                        if(fakeBigSixFace['r'][8] == fakeBigSixFace['r'][4] && fakeBigSixFace['b'][6] == fakeBigSixFace['b'][4]){
                            return true;
                        } else {
                            return false;
                        }
                    break;
                }
            } 
        }

        function findCornerStep(sideface_01,sideface_02){

            switch(tempCornerCube[0]){
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
                                    pushAndChange(['r', 90, 1], autoStep);
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
                                    pushAndChange(['u', 90, 0], autoStep)
                                    pushAndChange(['f', 90, 0], autoStep);
                                    pushAndChange(['u', 90, 1], autoStep)
                                    pushAndChange(['f', 90, 1], autoStep);
                                    pushAndChange(['u', 90, 0], autoStep)
                                    pushAndChange(['f', 90, 0], autoStep);
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
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['r', 90, 0], autoStep);
                                    break;
                                    case 'b':
                                        pushAndChange(['b', 90, 0], autoStep);
                                        pushAndChange(['u', 180, 1], autoStep);
                                        pushAndChange(['b', 90, 1], autoStep);
                                    break;
                                    case 'l':
                                        pushAndChange(['l', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['l', 90, 1], autoStep);
                                    break;
                                    case 'r':
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['u', 180, 0], autoStep);
                                        pushAndChange(['r', 90, 1], autoStep);
                                    break; 
                                }
                            break;
                            case 'd':
                                switch(sideface_01){
                                    case 'f':
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['u', 180, 0], autoStep);
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['f', 90, 0], autoStep);
                                        pushAndChange(['u', 180, 0], autoStep);
                                        pushAndChange(['f', 90, 1], autoStep);
                                    break;
                                    case 'b':
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['b', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['b', 90, 1], autoStep);
                                    break;
                                    case 'l':
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['l', 90, 0], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['r', 90, 0], autoStep);
                                        pushAndChange(['l', 90, 1], autoStep);
                                    break;
                                    case 'r':
                                        pushAndChange(['r', 90, 1], autoStep);
                                        pushAndChange(['u', 90, 1], autoStep);
                                        pushAndChange(['r', 180, 0], autoStep);
                                        pushAndChange(['u', 180, 0], autoStep);
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

    // 寻找第二层 棱色块
    function searchSecondFloorCube(searchFace_01,searchFace_02){
        let secondFloor = [];

        function searchMain(searchFace_01,searchFace_02){
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

        searchMain(searchFace_01,searchFace_02);

        if(secondFloor[0] != 'u'){
            if(secondFloor[1] == 1){
                searchMain(searchFace_02,searchFace_01);
            }

            switch(secondFloor[0]){
                case 'f':
                    if(secondFloor[1] == 3){
                        normalRotate('l', 'f', 1);
                        searchMain(searchFace_01,searchFace_02);
                    }else if(secondFloor[1] == 5){
                        normalRotate('r', 'f', 0);
                        searchMain(searchFace_01,searchFace_02);
                    }
                break;
                case 'r':
                    if(secondFloor[1] == 3){
                        normalRotate('f', 'r', 1);
                        searchMain(searchFace_01,searchFace_02);
                    }else if(secondFloor[1] == 5){
                        normalRotate('b', 'r', 0);
                        searchMain(searchFace_01,searchFace_02);
                    }
                break;
                case 'b':
                    if(secondFloor[1] == 3){
                        normalRotate( 'r', 'b', 1);
                        searchMain(searchFace_01,searchFace_02);
                    }else if(secondFloor[1] == 5){
                        normalRotate( 'l', 'b', 0);
                        searchMain(searchFace_01,searchFace_02);
                    }
                break;
                case 'l':
                    if(secondFloor[1] == 3){
                        normalRotate( 'b', 'l', 1);
                        searchMain(searchFace_01,searchFace_02);
                    }else if(secondFloor[1] == 5){
                        normalRotate( 'f', 'l', 0);
                        searchMain(searchFace_01,searchFace_02);
                    }
                break;
            }
            
        }

        function normalRotate(face_01, face_02, dir){ // DIR : RIGHT 1  LEFT 0
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

// ////////////////////////////////////////////////////////////

    //判断顶层小面是否为顶层颜色
    function isOk (upIndex) { 
        if(fakeBigSixFace['u'][upIndex] === fakeBigSixFace['u'][4]){
            return true;
        }else{
            return false;
        }
    }

    //判断四周面是否为顶层颜色
    function isSideYes (face,upIndex) { 
        if(fakeBigSixFace[face][upIndex] === fakeBigSixFace['u'][4]){
            return true;
        }else{
            return false;
        }
    }

    // 小鱼 → 顶层ok
    function topFaceRotate (face, dir) {  //zheng 1 ni 0
        let dirF = (dir === 1) ? 0 : 1;
        pushAndChange([face, 90, dir], autoStep);
        pushAndChange(['u', 90, dir], autoStep);
        pushAndChange([face, 90, dirF], autoStep);
        pushAndChange(['u', 90, dir], autoStep);
        pushAndChange([face, 90, dir], autoStep);
        pushAndChange(['u', 180, dirF], autoStep);
        pushAndChange([face, 90, dirF], autoStep);
    }






    // 顶面完成
    function topFloorFirst(){

        //  F (R U R' U') F'
        function normalFirst_01(face){
            let face_right;
            switch(face){
                case 'f':
                    face_right = 'r';
                break;
                case 'r':
                    face_right = 'b';
                break;
                case 'b':
                    face_right = 'l';
                break;
                case 'l':
                    face_right = 'f';
                break;
            }
            pushAndChange([face, 90, 1], autoStep);
            pushAndChange([face_right, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_right, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face, 90, 0], autoStep);
        }

        //  (R U R' U') (R' F R F')
        function normalFirst_02(face){
            let face_right;
            switch(face){
                case 'f':
                    face_right = 'r';
                break;
                case 'r':
                    face_right = 'b';
                break;
                case 'b':
                    face_right = 'l';
                break;
                case 'l':
                    face_right = 'f';
                break;
            }
            pushAndChange([face_right, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_right, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_right, 90, 0], autoStep);
            pushAndChange([face, 90, 1], autoStep);       
            pushAndChange([face_right, 90, 1], autoStep);
            pushAndChange([face, 90, 0], autoStep);
        }

        // (r U R' U') (r' F R F')
        function normalFirst_03(face){
            let face_left,face_down;
            switch(face){
                case 'f':
                    face_left = 'r' ;
                    face_down = 'b' ;
                break;
                case 'r':
                    face_left = 'b' ;
                    face_down = 'l' ;
                break;
                case 'b':
                    face_left = 'l' ;
                    face_down = 'f' ;
                break;
                case 'l':
                    face_left = 'f' ;
                    face_down = 'r' ;
                break;
            }
            pushAndChange([face, 90, 1], autoStep);
            pushAndChange([face_left, 90, 1], autoStep);
            pushAndChange([face_down, 90, 0], autoStep);
            pushAndChange([face_left, 90, 0], autoStep);
            pushAndChange([face, 90, 0], autoStep);
            pushAndChange([face_left, 90, 1], autoStep);
            pushAndChange([face_down, 90, 1], autoStep);
            pushAndChange([face_left, 90, 0], autoStep);
        }

        // (R2 D') (R U'U') (R' D) (R U'U' R)
        function normalFirst_04(face){  //l , f
            let face_right;
            switch(face){
                case 'f':
                    face_right = 'r' ;
                break;
                case 'r':
                    face_right = 'b' ;
                break;
                case 'b':
                    face_right = 'l' ;
                break;
                case 'l':
                    face_right = 'f' ;
                break;
            }
            pushAndChange([face_right, 180, 1], autoStep);
            pushAndChange(['d', 90, 0], autoStep);
            pushAndChange([face_right, 90, 1], autoStep);
            pushAndChange(['u', 180, 0], autoStep);
            pushAndChange([face_right, 90, 0], autoStep);
            pushAndChange(['d', 90, 1], autoStep);
            pushAndChange([face_right, 90, 1], autoStep);
            pushAndChange(['u', 180, 0], autoStep);
            pushAndChange([face_right, 90, 1], autoStep);
        }

        // (R U U R' U') (R U R' U') (R U' R')
        function normalFirst_05(face){

            pushAndChange([face, 90, 1], autoStep);
            pushAndChange(['u', 180, 1], autoStep);
            pushAndChange([face, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face, 90, 0], autoStep);
        }

        // R U'U' (R2' U') (R2 U') R2' U2 R
        function normalFirst_06(face){

            pushAndChange([face, 90, 1], autoStep);
            pushAndChange(['u', 180, 0], autoStep);
            pushAndChange([face, 180, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face, 180, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face, 180, 0], autoStep);
            pushAndChange(['u', 180, 1], autoStep);
            pushAndChange([face, 90, 1], autoStep);
        }

        // //F' (L' U' L U)2 F;
        function normalFirst_07(face_01,face_02){

            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
        }

        // // F (R U R' U')2 F'
        function normalFirst_08(face_01,face_02){

            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
        }

        // f(R U R' U')2 f'
        function normalFirst_09(face_01,face_02){//r,b

            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
        }

        // f (R U R' U') f'
        function normalFirst_10(face_01,face_02){//b,l

            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
        }

        // f' (L' U' L U) f
        function normalFirst_11(face_01,face_02){//b,r

            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
        }

        //  (R U'U') (R2' F R F') U2 (R' F R F')
        function normalFirst_12(face_01,face_02){//r,f

            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 180, 0], autoStep);
            pushAndChange([face_01, 180, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 180, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
        }

        //(r U'U') (R' U' R U' r')
        function normalFirst_13(face_01,face_02,face_03){//b,l,f
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 180, 0], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
        }

        // (r' U2) (R U R'U) r
        function normalFirst_14(face_01,face_02,face_03){//l,b,r

            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 180, 1], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
        }

        // r U R' U R U U r'
        function normalFirst_15(face_01,face_02,face_03){//l,f,r

            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_02, 180, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
        }

        // r' U' R U' R' U2 r
        function normalFirst_16(face_01,face_02,face_03){//l,b,r

            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_02, 180, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
        }

         // F (R U' R'U')(R U R' F')
         function normalFirst_17(face_01,face_02){//f,r

             pushAndChange([face_01, 90, 1], autoStep);
             pushAndChange([face_02, 90, 1], autoStep);
             pushAndChange(['u', 90, 0], autoStep);
             pushAndChange([face_02, 90, 0], autoStep);
             pushAndChange(['u', 90, 0], autoStep);
             pushAndChange([face_02, 90, 1], autoStep);
             pushAndChange(['u', 90, 1], autoStep);
             pushAndChange([face_02, 90, 0], autoStep);
             pushAndChange([face_01, 90, 0], autoStep);
         }

         // R U'U' (R2' F R F')(R U'U'R')
         function normalFirst_18(face_01,face_02){//l,b

             pushAndChange([face_01, 90, 1], autoStep);
             pushAndChange(['u', 180, 0], autoStep);
             pushAndChange([face_01, 180, 0], autoStep);
             pushAndChange([face_02, 90, 1], autoStep);
             pushAndChange([face_01, 90, 1], autoStep);
             pushAndChange([face_02, 90, 0], autoStep);
             pushAndChange([face_01, 90, 1], autoStep);
             pushAndChange(['u', 180, 0], autoStep);
             pushAndChange([face_01, 90, 0], autoStep);
         }

        //  (R B')(R2 F)(R2 B) (R2 F') R
        function normalFirst_19(face_01,face_02,face_03){//f,r,l
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 180, 1], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_01, 180, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 180, 0], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
        }

        // r' U2 (R U R' U') (R U R' U) r
        function normalFirst_20(face_01,face_02,face_03){//b,r,f
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 180, 1], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
        }

        //  r U (R' U R U')2 U' r'
        function normalFirst_21(face_01,face_02,face_03){//f,r,b
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_02, 180, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
        }

        // (R' F) (R2 B') (R2 F') (R2 B) R'
        function normalFirst_22(face_01,face_02,face_03){//r,f,b
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 180, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_01, 180, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 180, 1], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
        }

        // (R U R' U) (R' F R F') U2 (R' F R F')
        function normalFirst_23(face_01,face_02){//r,f
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 180, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
        }

        // F (R U R' U) y' (R' U2) (R' F R F')
        function normalFirst_24(face_01,face_02,face_03){//f,r,l
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 180, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
        }

        // (M下 U)(R U R' U') M上 (R' F R F')
        function normalFirst_25(face_01,face_02,face_03,face_04){//l,r,f,b
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_04, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_04, 90, 0], autoStep);
        }

        // (R U R' U') (R' F) (R2 U R' U') F'
        function normalFirst_26(face_01,face_02){//r,f
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 180, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
        }

        // (R U R'U)(R'F R F') (R U'U'R')
        function normalFirst_27(face_01,face_02){//f,l
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 180, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
        }

        // (r U R' U') (r' R) (U R U' R')

        function normalFirst_28(face_01,face_02,face_03){//l,f,r
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
        }

        // (R U R' U') r R' (U R U' r')
        function normalFirst_29(face_01,face_02,face_03){//r,l, f
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);    
            pushAndChange([face_02, 90, 0], autoStep);
        }

        // (R' U') (R' F R F') (U R)
        function normalFirst_30(face_01,face_02){//b,r
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);             
        }

        // (R U R' U') x D' (R' U R) E' 
        function normalFirst_31(face_01,face_02,face_03){//r,b, f
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep); 
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);    
            pushAndChange([face_02, 90, 1], autoStep);  
        }

        // (R U R'U) (R U'R'U') (R'F R F')
        function normalFirst_32(face_01,face_02){//b,r
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep); 
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep); 
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);   
            pushAndChange([face_02, 90, 0], autoStep);  
        }

        // (R'U'R U') (R'U R U) (l U'R'U)
        function normalFirst_33(face_01,face_02){//r,b
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep); 
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep); 
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);  
        }

        // F (R U R' U') F' U F (R U R' U') F'

        function normalFirst_34(face_01,face_02){//b,l
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep); 
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep); 
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep); 
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);   
        }

        // (r U R' U) (R' F R F') R U2 r'
        function normalFirst_35(face_01,face_02,face_03){//f , r, b
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange(['d', 90, 1], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange(['d', 90, 0], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange([face_02, 180, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);   
        }

        // (R U)(B' U')(R' U R B R')
        function normalFirst_36(face_01,face_02){//r,b
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);   
        }

        // (R' U' F) (U R U') (R' F' R)
        function normalFirst_37(face_01,face_02){//l,b
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
        }

        //  R' F (R U R'U') F' (U R)
        function normalFirst_38(face_01,face_02){//r,f
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
        }

        // L F' (L' U' L U) F (U' L')
        function normalFirst_39(face_01,face_02){//l,f
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
        }

        //(r U2 R' U' R U' r') (R' U2 R U R' U R)
        function normalFirst_40(face_01,face_02,face_03,face_04){//l,f,r,b
           pushAndChange([face_01, 90, 1], autoStep);
           pushAndChange([face_02, 180, 1], autoStep);
           pushAndChange([face_03, 90, 0], autoStep);
           pushAndChange([face_02, 90, 0], autoStep);
           pushAndChange([face_03, 90, 1], autoStep);
           pushAndChange([face_02, 90, 0], autoStep);
           pushAndChange([face_01, 90, 0], autoStep);
           topFaceRotate (face_04, 1);
        }

        // (R' U' R U' R' U2 R) F (R U R' U') F'
        function normalFirst_41(face_01,face_02){//l,b

           pushAndChange([face_01, 90, 0], autoStep);
           pushAndChange(['u', 90, 0], autoStep);
           pushAndChange([face_01, 90, 1], autoStep);
           pushAndChange(['u', 90, 0], autoStep);
           pushAndChange([face_01, 90, 0], autoStep);
           pushAndChange(['u', 180, 1], autoStep);
           pushAndChange([face_01, 90, 1], autoStep);
           pushAndChange([face_02, 90, 1], autoStep);
           pushAndChange([face_01, 90, 1], autoStep);
           pushAndChange(['u', 90, 1], autoStep);
           pushAndChange([face_01, 90, 0], autoStep);
           pushAndChange(['u', 90, 0], autoStep);
           pushAndChange([face_02, 90, 0], autoStep);
        }

        // (r' U2 R U R' U r) (R U2 R' U' R U' R')
        function normalFirst_42(face_01,face_02,face_03,face_04){//l,b,r,f
           pushAndChange([face_01, 90, 0], autoStep);
           pushAndChange([face_02, 180, 1], autoStep);
           pushAndChange([face_03, 90, 1], autoStep);
           pushAndChange([face_02, 90, 1], autoStep);
           pushAndChange([face_03, 90, 0], autoStep);
           pushAndChange([face_02, 90, 1], autoStep);
           pushAndChange([face_01, 90, 1], autoStep);
           topFaceRotate (face_04, 0);
        }

        // (R U R' U R U2 R') F (R U R' U') F'
        function normalFirst_43(face_01,face_02){//l,b
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 180, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
        }

        // (R' U' R U') (R' U) y' (R' U R B)
        function normalFirst_44(face_01,face_02){//r,f

            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
        }

        // (r U r') (U R U' R')2 (r U' r')
        function normalFirst_45(face_01,face_02,face_03){//b,l,f
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
        }

        // R' F (U R U') (R2' F') (R2 U R' U' R)
        function normalFirst_46(face_01,face_02){//f,l

            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 180, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 180, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
        }

        // (r' R U) (R U R'U') (r2 R2') (U R U' r')  略

        // F (U R U') (R2 F') (R U R U' R')
        function normalFirst_47(face_01,face_02){//f,r

            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 180, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
        }

        // (r U r') (R U R' U') (r U' r')
        function normalFirst_48(face_01,face_02,face_03){//r,b,l

            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
        }

        // (l' U' l) (L' U' L U) (l' U l)
        function normalFirst_49(face_01,face_02,face_03){//l,b,r

            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_03, 90, 0], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_03, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
        }

        // R' F (R U R' F' R) y' (R U' R')
        function normalFirst_50(face_01,face_02){//r,f

            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange(['u', 90, 1], autoStep);
            pushAndChange([face_01, 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face_01, 90, 1], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange(['u', 90, 0], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
        }
// //////////////////////////////////////

//  小鱼的7个OLL公式


        //顶层为 十字的时候
        if( !isOk(0) && isOk(1) && !isOk(2) && isOk(3) && isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//0268

            if(isSideYes('f',0) && isSideYes('b',0) && isSideYes('f',2) && isSideYes('b',2)){
                normalFirst_05('r')
            }else if(isSideYes('l',0) && isSideYes('r',0) && isSideYes('l',2) && isSideYes('r',2)){
                normalFirst_05('b')
            }

            else if(isSideYes('f',0) && isSideYes('l',0) && isSideYes('f',2) && isSideYes('r',2)){
                normalFirst_06('b')
            }else if(isSideYes('l',0) && isSideYes('b',0) && isSideYes('l',2) && isSideYes('f',2)){
                normalFirst_06('r')
            }else if(isSideYes('b',0) && isSideYes('r',0) && isSideYes('b',2) && isSideYes('l',2)){
                normalFirst_06('f')
            }else if(isSideYes('r',0) && isSideYes('f',0) && isSideYes('r',2) && isSideYes('b',2)){
                normalFirst_06('l')
            }

        }

        //顶层为 小鱼的时候
        else if( !isOk(0) && isOk(1) && !isOk(2) && isOk(3) && isOk(5) && isOk(6) && isOk(7) && !isOk(8)){//028
            if(fakeBigSixFace['r'][2] === fakeBigSixFace['u'][4]){
                topFaceRotate ('r', 1) 
            }else if(fakeBigSixFace['b'][0] === fakeBigSixFace['u'][4]){
                topFaceRotate ('b', 0) 
            }
        }else if(isOk(0) && isOk(1) && !isOk(2) && isOk(3) && isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//268
            if(fakeBigSixFace['f'][2] === fakeBigSixFace['u'][4]){
                topFaceRotate ('f', 1) 
            }else if(fakeBigSixFace['r'][0] === fakeBigSixFace['u'][4]){
                topFaceRotate ('r', 0) 
            }
        }else if(!isOk(0) && isOk(1) && isOk(2) && isOk(3) && isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//068
            if(fakeBigSixFace['l'][2] === fakeBigSixFace['u'][4]){
                topFaceRotate ('l', 1) 
            }else if(fakeBigSixFace['f'][0] === fakeBigSixFace['u'][4]){
                topFaceRotate ('f', 0) 
            }
        }else if(!isOk(0) && isOk(1) && !isOk(2) && isOk(3) && isOk(5) && !isOk(6) && isOk(7) && isOk(8)){//026
            if(fakeBigSixFace['b'][2] === fakeBigSixFace['u'][4]){
                topFaceRotate ('b', 1) 
            }else if(fakeBigSixFace['l'][0] === fakeBigSixFace['u'][4]){
                topFaceRotate ('l', 0) 
            }
        }

        //顶层为 缺两个角(相邻)
        else if( !isOk(0) && isOk(1) && !isOk(2) && isOk(3) && isOk(5) && isOk(6) && isOk(7) && isOk(8)){//02
            if(fakeBigSixFace['r'][2] === fakeBigSixFace['u'][4]){
                normalFirst_03 ('b') 
            }else if(fakeBigSixFace['b'][0] === fakeBigSixFace['u'][4]){
                normalFirst_04 ('f') 
            }
        }else if(isOk(0) && isOk(1) && !isOk(2) && isOk(3) && isOk(5) && isOk(6) && isOk(7) && !isOk(8)){//28
            if(fakeBigSixFace['f'][2] === fakeBigSixFace['u'][4]){
                normalFirst_03 ('r') 
            }else if(fakeBigSixFace['r'][0] === fakeBigSixFace['u'][4]){
                normalFirst_04 ('l') 
            }
        }else if(isOk(0) && isOk(1) && isOk(2) && isOk(3) && isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//86
            if(fakeBigSixFace['l'][2] === fakeBigSixFace['u'][4]){
                normalFirst_03 ('f') 
            }else if(fakeBigSixFace['f'][0] === fakeBigSixFace['u'][4]){
                normalFirst_04 ('b') 
            }
        }else if(!isOk(0) && isOk(1) && isOk(2) && isOk(3) && isOk(5) && !isOk(6) && isOk(7) && isOk(8)){//06
            if(fakeBigSixFace['b'][2] === fakeBigSixFace['u'][4]){
                normalFirst_03 ('l') 
            }else if(fakeBigSixFace['l'][0] === fakeBigSixFace['u'][4]){
                normalFirst_04 ('r') 
            }
        }

        //顶层为 缺两个角(对角)
        else if(!isOk(0) && isOk(1) && isOk(2) && isOk(3) && isOk(5) && isOk(6) && isOk(7) && !isOk(8)){//08
            if(isSideYes('f',2)){
                pushAndChange(['f', 90, 0], autoStep);
                pushAndChange(['l', 90, 1], autoStep);
                pushAndChange(['f', 90, 1], autoStep);
                pushAndChange(['r', 90, 0], autoStep);
                pushAndChange(['f', 90, 0], autoStep);
                pushAndChange(['l', 90, 0], autoStep);
                pushAndChange(['f', 90, 1], autoStep);
                pushAndChange(['r', 90, 1], autoStep);
            }else{
                pushAndChange(['b', 90, 0], autoStep);
                pushAndChange(['r', 90, 1], autoStep);
                pushAndChange(['b', 90, 1], autoStep);
                pushAndChange(['l', 90, 0], autoStep);
                pushAndChange(['b', 90, 0], autoStep);
                pushAndChange(['r', 90, 0], autoStep);
                pushAndChange(['b', 90, 1], autoStep);
                pushAndChange(['l', 90, 1], autoStep);
            }

        }else if(isOk(0) && isOk(1) && !isOk(2) && isOk(3) && isOk(5) && !isOk(6) && isOk(7) && isOk(8)){//26
            if(isSideYes('b',0)){
                pushAndChange(['l', 90, 0], autoStep);
                pushAndChange(['b', 90, 1], autoStep);
                pushAndChange(['l', 90, 1], autoStep);
                pushAndChange(['f', 90, 0], autoStep);
                pushAndChange(['l', 90, 0], autoStep);
                pushAndChange(['b', 90, 0], autoStep);
                pushAndChange(['l', 90, 1], autoStep);
                pushAndChange(['f', 90, 1], autoStep);
            }else{
                pushAndChange(['r', 90, 0], autoStep);
                pushAndChange(['f', 90, 1], autoStep);
                pushAndChange(['r', 90, 1], autoStep);
                pushAndChange(['b', 90, 0], autoStep);
                pushAndChange(['r', 90, 0], autoStep);
                pushAndChange(['f', 90, 0], autoStep);
                pushAndChange(['r', 90, 1], autoStep);
                pushAndChange(['b', 90, 1], autoStep);
            }
        }


//  第2组 最简单不用背的7个公式


        //最简单不用背的7个公式(T形)
        else if(!isOk(0) && !isOk(1) && isOk(2) && isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && isOk(8)){//T朝l
            if(isSideYes('l',0) && isSideYes('l',2)){
                normalFirst_01 ('f') 
            }else{
                normalFirst_02 ('f') 
            }
        }else if(!isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && isOk(6) && isOk(7) && isOk(8)){//06
            if(isSideYes('b',0) && isSideYes('b',2)){
                normalFirst_01 ('l') 
            }else{
                normalFirst_02 ('l') 
            }
        }else if(isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && isOk(5) && isOk(6) && !isOk(7) && !isOk(8)){//06
            if(isSideYes('r',0) && isSideYes('r',2)){
                normalFirst_01 ('b') 
            }else{
                normalFirst_02 ('b') 
            }
        }else if(isOk(0) && isOk(1) && isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//06
            if(isSideYes('f',0) && isSideYes('f',2)){
                normalFirst_01 ('r') 
            }else{
                normalFirst_02 ('r') 
            }
        }

        //最简单不用背的7个公式(小拐弯)第四组里面合并进来四种情况  
        else if(!isOk(0) && isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//13

            if(!isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2) && isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2)){
                normalFirst_07('r','f')
            }else if(!isSideYes('f',0) && isSideYes('f',1) && isSideYes('f',2) && !isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2)){
                normalFirst_08('r','f')
            }


            else if(isSideYes('f',0) && isSideYes('f',1) && isSideYes('f',2) && !isSideYes('r',0) && isSideYes('r',1) && isSideYes('r',2)){
                normalFirst_19('f','r','l')
            }else if(!isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2) && isSideYes('r',0) && isSideYes('r',1) && isSideYes('r',2)){
                normalFirst_20('b','r','f')
            }else if(isSideYes('f',0) && isSideYes('f',1) && isSideYes('f',2) &&  !isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2)){
                normalFirst_21('f','r','b')
            }else if(isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2) &&  isSideYes('r',0) && isSideYes('r',1) && isSideYes('r',2)){
                normalFirst_22('r','f','b')
            }

        }else if(!isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//15
            if(!isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2) && isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2)){
                normalFirst_07('f','l')
            }else if(!isSideYes('l',0) && isSideYes('l',1) && isSideYes('l',2) && !isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2)){
                normalFirst_08('f','l')
            }

            else if(isSideYes('l',0) && isSideYes('l',1) && isSideYes('l',2) && !isSideYes('f',0) && isSideYes('f',1) && isSideYes('f',2)){
                normalFirst_19('l','f','b')
            }else if(!isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2) && isSideYes('f',0) && isSideYes('f',1) && isSideYes('f',2)){
                normalFirst_20('r','f','l')
            }else if(isSideYes('l',0) && isSideYes('l',1) && isSideYes('l',2) &&  !isSideYes('f',0) &&isSideYes('f',1) && !isSideYes('f',2)){
                normalFirst_21('l','f','r')
            }else if(isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2) &&  isSideYes('f',0) && isSideYes('f',1) && isSideYes('f',2)){
                normalFirst_22('f','l','r')
            }


        }else if(!isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//57
            if(!isSideYes('b',0) && isSideYes('b',1) && !isSideYes('b',2) && isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2)){
                normalFirst_07('l','b')
            }else if(!isSideYes('b',0) && isSideYes('b',1) && isSideYes('b',2) && !isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2)){
                normalFirst_08('l','b')
            }

            else if(isSideYes('b',0) && isSideYes('b',1) && isSideYes('b',2) && !isSideYes('l',0) && isSideYes('l',1) && isSideYes('l',2)){
                normalFirst_19('b','l','r')
            }else if(!isSideYes('b',0) && isSideYes('b',1) && !isSideYes('b',2) && isSideYes('l',0) && isSideYes('l',1) && isSideYes('l',2)){
                normalFirst_20('f','l','b')
            }else if(isSideYes('b',0) && isSideYes('b',1) && isSideYes('b',2) &&  !isSideYes('l',0) &&isSideYes('l',1) && !isSideYes('l',2)){
                normalFirst_21('b','l','f')
            }else if(isSideYes('b',0) && isSideYes('b',1) && !isSideYes('b',2) &&  isSideYes('l',0) && isSideYes('l',1) && isSideYes('l',2)){
                normalFirst_22('l','b','f')
            }


        }else if(!isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//37
            if(!isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2) && isSideYes('b',0) && isSideYes('b',1) && !isSideYes('b',2)){
                normalFirst_07('b','r')
            }else if(!isSideYes('r',0) && isSideYes('r',1) && isSideYes('r',2) && !isSideYes('b',0) && isSideYes('b',1) && !isSideYes('b',2)){
                normalFirst_08('b','r')
            }

            else if(isSideYes('r',0) && isSideYes('r',1) && isSideYes('r',2) && !isSideYes('b',0) && isSideYes('b',1) && isSideYes('b',2)){
                normalFirst_19('r','b','f')
            }else if(!isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2) && isSideYes('b',0) && isSideYes('b',1) && isSideYes('b',2)){
                normalFirst_20('l','b','r')
            }else if(isSideYes('r',0) && isSideYes('r',1) && isSideYes('r',2) &&  !isSideYes('b',0) &&isSideYes('b',1) && !isSideYes('b',2)){
                normalFirst_21('r','b','l')
            }else if(isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2) &&  isSideYes('b',0) && isSideYes('b',1) && isSideYes('b',2)){
                normalFirst_22('b','r','l')
            }

        }

        //最简单不用背的7个公式(一字) 合并复杂的3种
        else if(!isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//竖着
            if(!isSideYes('f',0) && !isSideYes('f',1) && !isSideYes('f',2) && isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2)){//
                normalFirst_09('r','b')
            }else if(!isSideYes('b',0) && !isSideYes('b',1) && !isSideYes('b',2) && isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2)){
                normalFirst_09('l','f')
            }

            else if(isSideYes('f',0) && !isSideYes('f',1) && !isSideYes('f',2) && isSideYes('r',0) && isSideYes('r',1) && isSideYes('r',2)){
                normalFirst_44('r','f')
            }else if(isSideYes('b',0) && !isSideYes('b',1) && !isSideYes('b',2) && isSideYes('l',0) && isSideYes('l',1) && isSideYes('l',2)){
                normalFirst_44('l','b')
            }



            else if(isSideYes('f',0) && !isSideYes('f',1) && isSideYes('f',2) && !isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2)){
                normalFirst_45('b','l','f')
            }

            else if(!isSideYes('f',0) && !isSideYes('f',1) && !isSideYes('f',2) && isSideYes('r',0) && isSideYes('r',1) && isSideYes('r',2)){
                normalFirst_46('f','l')
            }


        }else if(!isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//横着

            if(!isSideYes('l',0) && !isSideYes('l',1) && !isSideYes('l',2) && isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2)){//
                normalFirst_09('f','r')

            }else if(!isSideYes('r',0) && !isSideYes('r',1) && !isSideYes('r',2) && isSideYes('b',0) && isSideYes('b',1) && !isSideYes('b',2)){
                normalFirst_09('b','l')
            }


            else if(isSideYes('l',0) && !isSideYes('l',1) && !isSideYes('l',2) && isSideYes('f',0) && isSideYes('f',1) && isSideYes('f',2)){
                normalFirst_44('f','l')
            }else if(isSideYes('r',0) && !isSideYes('r',1) && !isSideYes('r',2) && isSideYes('b',0) && isSideYes('b',1) && isSideYes('b',2)){
                normalFirst_44('b','r')
            }



            else if(isSideYes('l',0) && !isSideYes('l',1) && isSideYes('l',2) && !isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2)){
                normalFirst_45('r','b','l')
            }

            else if(!isSideYes('l',0) && !isSideYes('l',1) && !isSideYes('l',2) && isSideYes('f',0) && isSideYes('f',1) && isSideYes('f',2)){
                normalFirst_46('l','b')
            }
        }







        //最简单不用背的7个公式(缺 L 的   f (R U R' U') f'  )
        else if(!isOk(0) && !isOk(1) && isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && isOk(7) && isOk(8)){//0136
            
            if(!isSideYes('f',0)){
                normalFirst_10('b','l')
            }else{
                normalFirst_36('r','b')
            }


        }else if(!isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && isOk(6) && isOk(7) && isOk(8)){//0125
                  
            if(!isSideYes('l',0)){
                normalFirst_10('r','b')
            }else{
                normalFirst_36('f','r')

            }

        }else if(isOk(0) && isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && isOk(6) && !isOk(7) && !isOk(8)){//2578

            if(!isSideYes('b',0)){
                normalFirst_10('f','r')
            }else{
                normalFirst_36('l','f')
            }

        }else if(isOk(0) && isOk(1) && isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//3678
            
            if(!isSideYes('r',0)){
                normalFirst_10('l','f')
            }else{
                normalFirst_36('b','l')
            }

        }



        //最简单不用背的7个公式(缺 L 的   f' (L' U' L U) f  )
        else if(isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && isOk(6) && isOk(7) && !isOk(8)){//1258
            
            if(!isSideYes('f',2)){
                normalFirst_11('b','r')
            }else{
                normalFirst_37('l','b')
            }

        }else if(isOk(0) && isOk(1) && isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//5678
            
            if(!isSideYes('l',2)){
                normalFirst_11('r','f')
            }else{
                normalFirst_37('b','r')
            }

        }else if(!isOk(0) && isOk(1) && isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && isOk(8)){//0367
            
            if(!isSideYes('b',2)){
                normalFirst_11('f','l')
            }else{
                normalFirst_37('r','f')
            }

        }else if(!isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && isOk(6) && isOk(7) && isOk(8)){//0123
            
            if(!isSideYes('r',2)){
                normalFirst_11('l','b')
            }else{
                normalFirst_37('f','l')
            }

        }


//  第3组 和十字公式和小鱼公式有关的8个简单公式

        // 仅有中间一个点的

        else if(!isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//

            if(isSideYes('l',0) && isSideYes('l',2) && isSideYes('r',0) && isSideYes('r',2)){ //第二种 左右
                normalFirst_12('r','f')
            }else if(isSideYes('f',0) && isSideYes('f',2) && isSideYes('b',0) && isSideYes('b',2)){ //第二种 上下
                normalFirst_12('b','r')
            }


            else if(isSideYes('l',0) && isSideYes('l',2) && !isSideYes('r',0) && !isSideYes('r',2)){
                normalFirst_01('f')
                normalFirst_10('b','l')
            }else if(isSideYes('b',0) && isSideYes('b',2) && !isSideYes('f',0) && !isSideYes('f',2)){
                normalFirst_01('l')
                normalFirst_10('r','b')
            }else if(isSideYes('r',0) && isSideYes('r',2) && !isSideYes('l',0) && !isSideYes('l',2)){
                normalFirst_01('b')
                normalFirst_10('f','r')
            }else if(isSideYes('f',0) && isSideYes('f',2) && !isSideYes('b',0) && !isSideYes('b',2)){
                normalFirst_01('r')
                normalFirst_10('l','f')
            }
        }


        // 中心加上一个角块 （两种情况）

        else if(isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//04
            if(isSideYes('f',0) && isSideYes('r',0)){
                normalFirst_10('l','f');
                pushAndChange(['u', 90, 1], autoStep);
                normalFirst_01('r');
            }else{
                normalFirst_10('f','r');
                pushAndChange(['u', 90, 0], autoStep);  
                normalFirst_01('b');
            }
        }else if(!isOk(0) && !isOk(1) && isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//24
            if(isSideYes('l',0) && isSideYes('f',0)){

                normalFirst_10('b','l');
                pushAndChange(['u', 90, 1], autoStep);
                normalFirst_01('f');
            }else{
                normalFirst_10('l','f');
                pushAndChange(['u', 90, 0], autoStep);
                normalFirst_01('r');
            }
        }else if(!isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && isOk(8)){//84
            if(isSideYes('b',0) && isSideYes('l',0)){
                normalFirst_10('r','b');
                pushAndChange(['u', 90, 1], autoStep);  
                normalFirst_01('l');
            }else{
                normalFirst_10('b','l');
                pushAndChange(['u', 90, 0], autoStep);
                normalFirst_01('f');
            }
        }else if(!isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && isOk(6) && !isOk(7) && !isOk(8)){//64
            if(isSideYes('r',0) && isSideYes('b',0)){
                normalFirst_10('f','r');
                pushAndChange(['u', 90, 1], autoStep);
                normalFirst_01('b');
            }else{
                normalFirst_10('r','b');   
                pushAndChange(['u', 90, 0], autoStep);
                normalFirst_01('l');
            }
        }

        // 四个色块组成的正方形 （两种情况）

        else if(!isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && isOk(7) && isOk(8)){//01236
            if(isSideYes('f',0)){
                normalFirst_13('b','l','f');
            }else{
                normalFirst_14('l','b','r');
            }
        }else if(!isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && isOk(6) && isOk(7) && !isOk(8)){//01258
            if(isSideYes('l',0)){
                normalFirst_13('r','b','l');
            }else{
                normalFirst_14('b','r','f');
            }
        }else if(isOk(0) && isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//25678
            if(isSideYes('b',0)){
                normalFirst_13('f','r','b');
            }else{
                normalFirst_14('r','f','l');
            }
        }else if(!isOk(0) && isOk(1) && isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//03678
            if(isSideYes('r',0)){
                normalFirst_13('l','f','r');
            }else{
                normalFirst_14('f','l','b');
            }
        }


        // 四个色块组成的闪电（情况一）

        else if(!isOk(0) && isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && isOk(6) && !isOk(7) && !isOk(8)){//136
        
            if(isSideYes('f',1) && isSideYes('f',2) && isSideYes('r',1) && isSideYes('r',2)){
                  normalFirst_15('l','f','r');
            }else{
                  normalFirst_34('b','l')
            }


        }else if(isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//015
            
            if(isSideYes('l',1) && isSideYes('l',2) && isSideYes('f',1) && isSideYes('f',2)){
                  normalFirst_15('b','l','f');
            }else{
                 normalFirst_34('r','b')
            }
        }else if(!isOk(0) && !isOk(1) && isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//257
            
            if(isSideYes('b',1) && isSideYes('b',2) && isSideYes('l',1) && isSideYes('l',2)){
                  normalFirst_15('r','b','l');
            }else{
                 normalFirst_34('f','r')
            }
        }else if(!isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && isOk(8)){//378
            
            if(isSideYes('r',1) && isSideYes('r',2) && isSideYes('b',1) && isSideYes('b',2)){
                  normalFirst_15('f','r','b');
            }else{
                 normalFirst_34('l','f')
            }
        }


        // 四个色块组成的闪电（情况二）

        else if(isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//037
            
            if(isSideYes('f',0) && isSideYes('r',0) && isSideYes('r',1)){
                  normalFirst_16('l','b','r');
            }else{
                normalFirst_35('f','r', 'b')

            }
        }else if(!isOk(0) && isOk(1) && isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//123
            
            if(isSideYes('l',0) && isSideYes('f',0) && isSideYes('f',1)){
                  normalFirst_16('b','r','f');
            }else{
                normalFirst_35('l','f', 'r')
            }
        }else if(!isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && isOk(8)){//158
            
            if(isSideYes('b',0) && isSideYes('l',0) && isSideYes('l',1)){
                  normalFirst_16('r','f','l');
            }else{
                normalFirst_35('b','l', 'f')
            }
        }else if(!isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && isOk(6) && isOk(7) && !isOk(8)){//567
            
            if(isSideYes('r',0) && isSideYes('b',0) && isSideYes('b',1)){
                  normalFirst_16('f','l','b');
            }else{
                normalFirst_35('r','b', 'l')
            }
        }


//第4组 9个公式

        // 四个色块组成的正方形 外加一个角色块

        else if(isOk(0) && isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && isOk(8)){//0138
            
            if(isSideYes('f',0) && isSideYes('f',1)){
                normalFirst_17('f','r');
            }else{
                normalFirst_18('l','b')
            }
        }else if(!isOk(0) && isOk(1) && isOk(2) && !isOk(3) && isOk(5) && isOk(6) && !isOk(7) && !isOk(8)){//1256
            
            if(isSideYes('l',0) && isSideYes('l',1)){
                normalFirst_17('l','f');
            }else{
                normalFirst_18('b','r')
            }
        }else if(isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && isOk(7) && isOk(8)){//0578
            
            if(isSideYes('b',0) && isSideYes('b',1)){
                  normalFirst_17('b','l');
            }else{
                normalFirst_18('r','f')
            }
        }else if(!isOk(0) && !isOk(1) && isOk(2) && isOk(3) && !isOk(5) && isOk(6) && isOk(7) && !isOk(8)){//2367
            
            if(isSideYes('r',0) && isSideYes('r',1)){
                  normalFirst_17('r','b');
            }else{
                normalFirst_18('f','l')
            }
        }

        // 小转弯 合并第二组(4种)


        // 3个色块形成斜线

        else if(isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && isOk(8)){//08
            
            if(!isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2) && !isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2)){
                normalFirst_23('r','f')
            }else{
                normalFirst_23('l','b')
            }
        }else if(!isOk(0) && !isOk(1) && isOk(2) && !isOk(3) && !isOk(5) && isOk(6) && !isOk(7) && !isOk(8)){//26
            
            if(!isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2) && !isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2)){
                normalFirst_23('f','l')
            }else{
                normalFirst_23('b','r')
            }
        }


        // 3个色块形成大写 数字 六

        else if(!isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && isOk(6) && !isOk(7) && isOk(8)){//68
            
            if(!isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2) && !isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2)){
                normalFirst_24('f','r','l')
            }else{
                normalFirst_25('l','r','f','b')
            }

        }else if(isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && isOk(6) && !isOk(7) && !isOk(8)){//06
            
            if(!isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2) && !isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2)){
               normalFirst_24('l','f','b')
            }else{
               normalFirst_25('b','f','l','r')
            }

        }else if(isOk(0) && !isOk(1) && isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//02
            
            if(!isSideYes('b',0) && isSideYes('b',1) && !isSideYes('b',2) && !isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2)){
                normalFirst_24('b','l','r')
            }else{
                normalFirst_25('r','l','b','f')
            }

        }else if(!isOk(0) && !isOk(1) && isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && isOk(8)){//28
            
            if(!isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2) && !isSideYes('b',0) && isSideYes('b',1) && !isSideYes('b',2)){
                normalFirst_24('r','b','f')
            }else{
                normalFirst_25('f','b','r','l')
            }
        }



// 第5组 10个公式

        // 4个色块,两个棱色块加上一个角色块

        else if(!isOk(0) && isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && isOk(8)){//138
            if(isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2) && !isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2)){
                normalFirst_26('r','f');
            }else{
                normalFirst_27('f','l');
            }

        }else if(!isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && isOk(6) && !isOk(7) && !isOk(8)){//156
            if(isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2) && !isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2)){
               normalFirst_26('f','l');
            }else{
               normalFirst_27('l','b');
            }

        }else if(isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//057
            if(isSideYes('b',0) && isSideYes('b',1) && !isSideYes('b',2) && !isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2)){
               normalFirst_26('l','b');
            }else{
               normalFirst_27('b','r');
            }

        }else if(!isOk(0) && !isOk(1) && isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//237
            if(isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2) && !isSideYes('b',0) && isSideYes('b',1) && !isSideYes('b',2)){
                normalFirst_26('b','r');
            }else{
                normalFirst_27('r','f');
                
            }
        }


        // 缺2个相邻棱色块

        else if(isOk(0) && isOk(1) && isOk(2) && isOk(3) && !isOk(5) && isOk(6) && !isOk(7) && isOk(8)){//57
            
            normalFirst_28('l','f','r');

        }else if(isOk(0) && isOk(1) && isOk(2) && !isOk(3) && isOk(5) && isOk(6) && !isOk(7) && isOk(8)){//37
            
            normalFirst_28('b','l','f');

        }else if(isOk(0) && !isOk(1) && isOk(2) && !isOk(3) && isOk(5) && isOk(6) && isOk(7) && isOk(8)){//13
            
            normalFirst_28('r','b','l');

        }else if(isOk(0) && !isOk(1) && isOk(2) && isOk(3) && !isOk(5) && isOk(6) && isOk(7) && isOk(8)){//15
            
            normalFirst_28('f','r','b');

        }


        // 缺2个相对棱色块

        else if(isOk(0) && !isOk(1) && isOk(2) && isOk(3) && isOk(5) && isOk(6) && !isOk(7) && isOk(8)){//17
            
            normalFirst_29('r','l','f');

        }else if(isOk(0) && isOk(1) && isOk(2) && !isOk(3) && !isOk(5) && isOk(6) && isOk(7) && isOk(8)){//35
            
            normalFirst_29('f','b','l');

        }


        // 5个色块,两个棱色块加上两个角色块 形成 门状 结构

        else if(!isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && isOk(5) && isOk(6) && !isOk(7) && isOk(8)){//3568
            
            if(isSideYes('r',2)){
                normalFirst_31('r','b', 'f')
            }else{
                normalFirst_30('b','r')
            }

        }else if(isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && isOk(6) && isOk(7) && !isOk(8)){//0167
            
            if(isSideYes('f',2)){
               normalFirst_31('f','r', 'l')
            }else{
               normalFirst_30('r','f')
            }

        }else if(isOk(0) && !isOk(1) && isOk(2) && isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//0235
            
            if(isSideYes('l',2)){
               normalFirst_31('l','f', 'b')
            }else{
               normalFirst_30('f','l')
            }

        }else if(!isOk(0) && isOk(1) && isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && isOk(8)){//1278
            
            if(isSideYes('b',2)){
                normalFirst_31('b','l', 'r')
            }else{
                normalFirst_30('l','b')
            }
        }


        // 5个色块, 形成 W 结构

        else if(isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && isOk(8)){//0378
            
            if(!isSideYes('r',2)){
                normalFirst_32('b','r')
            }else{
                normalFirst_33('r','b')
            }

        }else if(!isOk(0) && isOk(1) && isOk(2) && isOk(3) && !isOk(5) && isOk(6) && !isOk(7) && !isOk(8)){//1236
            
            if(!isSideYes('f',2)){
               normalFirst_32('r','f')
            }else{
               normalFirst_33('f','r')
            }

        }else if(isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && isOk(8)){//0158
            
            if(!isSideYes('l',2)){
               normalFirst_32('f','l')
            }else{
               normalFirst_33('l','f')
            }

        }else if(!isOk(0) && !isOk(1) && isOk(2) && !isOk(3) && isOk(5) && isOk(6) && isOk(7) && !isOk(8)){//2567
            
            if(!isSideYes('b',2)){
                normalFirst_32('l','b')
            }else{
                normalFirst_33('b','l')
            }
        }


        // 闪电 合并到上面


// 第6组 8个公式
        
        // 缺L合并到上面

        //大闪电 两种情况 正
        else if(isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && isOk(8)){//0358
            if(!isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2)){
                normalFirst_38('r','f')
            }else{
                normalFirst_38('l','b')
            }
        }else if(!isOk(0) && isOk(1) && isOk(2) && !isOk(3) && !isOk(5) && isOk(6) && isOk(7) && !isOk(8)){//1267
            if(!isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2)){
                normalFirst_38('f','l')
            }else{
                normalFirst_38('b','r')
            }
        }

        //大闪电 两种情况 反
        else if(!isOk(0) && !isOk(1) && isOk(2) && isOk(3) && isOk(5) && isOk(6) && !isOk(7) && !isOk(8)){//3625
            if(!isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2)){
                normalFirst_39('l','f')
            }else{
                normalFirst_39('r','b')
            }
        }else if(isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && isOk(8)){//0178
            if(!isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2)){
                normalFirst_39('b','l')
            }else{
                normalFirst_39('f','r')
            }
        }

        //小闪电 + 角色块   情况1
        else if(!isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && isOk(6) && !isOk(7) && isOk(8)){//1568
            if(!isSideYes('r',0) && !isSideYes('r',1) && isSideYes('r',2)){
                normalFirst_40('l','f','r','b')
            }else{
                normalFirst_41('l','b')
            }
        }else if(isOk(0) && !isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && isOk(6) && isOk(7) && !isOk(8)){//0567
            if(!isSideYes('f',0) && !isSideYes('f',1) && isSideYes('f',2)){
                normalFirst_40('b','l','f','r')
            }else{
                normalFirst_41('b','r')
            }
        }else if(isOk(0) && !isOk(1) && isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//0237
            if(!isSideYes('l',0) && !isSideYes('l',1) && isSideYes('l',2)){
                normalFirst_40('r','b','l','f')
            }else{
                normalFirst_41('r','f')
            }
        }else if(!isOk(0) && isOk(1) && isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && !isOk(7) && isOk(8)){//1238
            if(!isSideYes('b',0) && !isSideYes('b',1) && isSideYes('b',2)){
                normalFirst_40('f','r','b','l')
            }else{
                normalFirst_41('f','l')
            }
        }

        //小闪电 + 角色块   情况2
        else if(isOk(0) && !isOk(1) && isOk(2) && !isOk(3) && isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//0257
            if(!isSideYes('f',0) && !isSideYes('f',1) && !isSideYes('f',2)){
                normalFirst_42('l','b','r','f')
            }else{
                normalFirst_43('l','b')
            }
        }else if(!isOk(0) && !isOk(1) && isOk(2) && isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && isOk(8)){//2378
            if(!isSideYes('l',0) && !isSideYes('l',1) && !isSideYes('l',2)){
                normalFirst_42('b','r','f','l')
            }else{
                normalFirst_43('b','r')
            }
        }else if(!isOk(0) && isOk(1) && !isOk(2) && isOk(3) && !isOk(5) && isOk(6) && !isOk(7) && isOk(8)){//1368
            if(!isSideYes('b',0) && !isSideYes('b',1) && !isSideYes('b',2)){
                normalFirst_42('r','f','l','b')
            }else{
                normalFirst_43('r','f')
            }
        }else if(isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && isOk(5) && isOk(6) && !isOk(7) && !isOk(8)){//0156
            if(!isSideYes('r',0) && !isSideYes('r',1) && !isSideYes('r',2)){
                normalFirst_42('f','l','b','r')
            }else{
                normalFirst_43('f','l')
            }
        }


// 第7组 8个公式

        // 三种一字的合并到上面


        // 四个角色块
        else if(isOk(0) && !isOk(1) && isOk(2) && !isOk(3) && !isOk(5) && isOk(6) && !isOk(7) && isOk(8)){//0268
            pushAndChange(['l', 90, 0], autoStep);
            pushAndChange(['r', 90, 1], autoStep);
            pushAndChange(['b', 90, 1], autoStep);
            pushAndChange(['r', 90, 1], autoStep);
            pushAndChange(['b', 90, 1], autoStep);
            pushAndChange(['r', 90, 0], autoStep);
            pushAndChange(['b', 90, 0], autoStep);
            pushAndChange(['l', 180, 0], autoStep);
            pushAndChange(['r', 180, 0], autoStep);
            pushAndChange(['f', 90, 1], autoStep);
            pushAndChange(['r', 90, 1], autoStep);
            pushAndChange(['f', 90, 0], autoStep);
            pushAndChange(['l', 90, 0], autoStep);
        }

        //  L形状 四种  情况1
        else if(!isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && isOk(5) && isOk(6) && !isOk(7) && !isOk(8)){//356
            if(!isSideYes('f',0) && isSideYes('f',1) && isSideYes('f',2)){
                normalFirst_47('f','r')
            }else{
                normalFirst_48('r','b','l')
            }
        }else if(isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//017
            if(!isSideYes('l',0) && isSideYes('l',1) && isSideYes('l',2)){
                normalFirst_47('l','f')
            }else{
                normalFirst_48('f','r','b')
            }
        }else if(!isOk(0) && !isOk(1) && isOk(2) && isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//235
            if(!isSideYes('b',0) && isSideYes('b',1) && isSideYes('b',2)){
                normalFirst_47('b','l')
            }else{
                normalFirst_48('l','f','r')
            }
        }else if(!isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && isOk(8)){//178
            if(!isSideYes('r',0) && isSideYes('r',1) && isSideYes('r',2)){
                normalFirst_47('r','b')
            }else{
                normalFirst_48('b','l','f')
            }
        }

        //L形状 四种  情况2
        else if(!isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && isOk(8)){//358
            if(!isSideYes('f',0) && isSideYes('f',1) && !isSideYes('f',2)){
                normalFirst_49('l','b','r')
            }else{
                normalFirst_50('r','f')
            }
        }else if(!isOk(0) && isOk(1) && !isOk(2) && !isOk(3) && !isOk(5) && isOk(6) && isOk(7) && !isOk(8)){//167
            if(!isSideYes('l',0) && isSideYes('l',1) && !isSideYes('l',2)){
                normalFirst_49('b','r','f')
            }else{
                normalFirst_50('f','l')
            }
        }else if(isOk(0) && !isOk(1) && !isOk(2) && isOk(3) && isOk(5) && !isOk(6) && !isOk(7) && !isOk(8)){//035
            if(!isSideYes('b',0) && isSideYes('b',1) && !isSideYes('b',2)){
                normalFirst_49('r','f','l')
            }else{
                normalFirst_50('l','b')
            }
        }else if(!isOk(0) && isOk(1) && isOk(2) && !isOk(3) && !isOk(5) && !isOk(6) && isOk(7) && !isOk(8)){//127
             if(!isSideYes('r',0) && isSideYes('r',1) && !isSideYes('r',2)){
                 normalFirst_49('f','l','b')
             }else{
                 normalFirst_50('b','r')
             }
        }
    }

// ////////////////////////////////////////////////////////////
    
    // 顶层 四周 色块复原
    function topFloorSecond () {

        function thirdRotate (face) {
            let face_01,face_02;
            switch(face){
                 case 'f':
                     face_01 = 'l';
                     face_02 = 'r';
                 break;
                 case 'r':
                     face_01 = 'f';
                     face_02 = 'b';
                 break;
                 case 'l':
                     face_01 = 'b';
                     face_02 = 'f';
                 break;
                 case 'b':
                    face_01 = 'r';
                    face_02 = 'l';
                 break;
            }
            pushAndChange([face, 90, 1], autoStep);
            pushAndChange([face_02, 90, 0], autoStep);
            pushAndChange([face, 90, 1], autoStep);
            pushAndChange([face_01, 180, 1], autoStep);
            pushAndChange([face, 90, 0], autoStep);
            pushAndChange([face_02, 90, 1], autoStep);
            pushAndChange([face, 90, 1], autoStep);
            pushAndChange([face_01, 180, 1], autoStep);
            pushAndChange([face, 180, 1], autoStep);
        }

        function topFloorLast (thirdDir) {
            var face_c,face_reverse,dir,r_dir;

            switch(thirdDir){
                case 'f':
                    
                    if(fakeBigSixFace['l'][1] == fakeBigSixFace['b'][0]){
                        face_c = 'l';
                        face_reverse = 'b';
                        dir = 1;
                        r_dir = 0;
                    }else{
                        face_c = 'r';
                        face_reverse = 'b';
                        dir = 0;
                        r_dir = 1;
                    }
                break;

                case 'l':
                    
                    if(fakeBigSixFace['b'][1] == fakeBigSixFace['r'][0]){
                        face_c = 'b';
                        face_reverse = 'r';
                        dir = 1;
                        r_dir = 0;
                    }else{
                        face_c = 'f';
                        face_reverse = 'r';
                        dir = 0;
                        r_dir = 1;
                    }
                break;

                case 'b':
                    
                    if(fakeBigSixFace['r'][1] == fakeBigSixFace['f'][0]){
                        face_c = 'r';
                        face_reverse = 'f';
                        dir = 1;
                        r_dir = 0;
                    }else{
                        face_c = 'l';
                        face_reverse = 'f';
                        dir = 0;
                        r_dir = 1;
                    }
                break;

                case 'r':
                    
                    if(fakeBigSixFace['f'][1] == fakeBigSixFace['l'][0]){
                        face_c = 'f';
                        face_reverse = 'l';
                        dir = 1;
                        r_dir = 0;
                    }else{
                        face_c = 'b';
                        face_reverse = 'l';
                        dir = 0;
                        r_dir = 1;
                    }
                break;
            }
            

            topFaceRotate (face_c, dir)

            topFaceRotate (face_reverse, r_dir)
        }

        function isThirdFloorTure(dir){

              switch(dir){
                case 'f':
                    if(fakeBigSixFace['f'][0] === fakeBigSixFace['f'][2] && fakeBigSixFace['b'][0] === fakeBigSixFace['b'][2] && fakeBigSixFace['r'][0] === fakeBigSixFace['r'][2] && fakeBigSixFace['l'][0] === fakeBigSixFace['l'][2]){
                        return 'f';
                    }
                break;

                case 'l':
                    if(fakeBigSixFace['l'][0] === fakeBigSixFace['l'][2] && fakeBigSixFace['b'][0] === fakeBigSixFace['b'][2] && fakeBigSixFace['f'][0] === fakeBigSixFace['f'][2] && fakeBigSixFace['r'][0] === fakeBigSixFace['r'][2]){
                        return 'l';
                    }
                break;

                case 'b':
                    if(fakeBigSixFace['b'][0] === fakeBigSixFace['b'][2] && fakeBigSixFace['r'][0] === fakeBigSixFace['r'][2] && fakeBigSixFace['f'][0] === fakeBigSixFace['f'][2] && fakeBigSixFace['l'][0] === fakeBigSixFace['l'][2]){
                        return 'b';
                    }
                break;

                case 'r':
                    if(fakeBigSixFace['r'][0] === fakeBigSixFace['r'][2] && fakeBigSixFace['b'][0] === fakeBigSixFace['b'][2] && fakeBigSixFace['f'][0] === fakeBigSixFace['f'][2] && fakeBigSixFace['l'][0] === fakeBigSixFace['l'][2]){
                        return 'r'
                    }
                break;

                default:
                    return false;
                break;

              }
        }

        function isThirdFloorRealTure(dir){

              switch(dir){
                case 'f':
                    if(fakeBigSixFace['f'][0] === fakeBigSixFace['f'][1] && fakeBigSixFace['f'][0] === fakeBigSixFace['f'][2] && fakeBigSixFace['b'][0] === fakeBigSixFace['b'][2] && fakeBigSixFace['r'][0] === fakeBigSixFace['r'][2] && fakeBigSixFace['l'][0] === fakeBigSixFace['l'][2]){
                        return 'f';
                    }
                break;

                case 'l':
                    if(fakeBigSixFace['l'][0] === fakeBigSixFace['l'][1] && fakeBigSixFace['l'][0] === fakeBigSixFace['l'][2] && fakeBigSixFace['b'][0] === fakeBigSixFace['b'][2] && fakeBigSixFace['f'][0] === fakeBigSixFace['f'][2] && fakeBigSixFace['r'][0] === fakeBigSixFace['r'][2]){
                        return 'l';
                    }
                break;

                case 'b':
                    if(fakeBigSixFace['b'][0] === fakeBigSixFace['b'][1] && fakeBigSixFace['b'][0] === fakeBigSixFace['b'][2] && fakeBigSixFace['r'][0] === fakeBigSixFace['r'][2] && fakeBigSixFace['f'][0] === fakeBigSixFace['f'][2] && fakeBigSixFace['l'][0] === fakeBigSixFace['l'][2]){
                        return 'b';
                    }
                break;

                case 'r':
                    if(fakeBigSixFace['r'][0] === fakeBigSixFace['r'][1] && fakeBigSixFace['r'][0] === fakeBigSixFace['r'][2] && fakeBigSixFace['b'][0] === fakeBigSixFace['b'][2] && fakeBigSixFace['f'][0] === fakeBigSixFace['f'][2] && fakeBigSixFace['l'][0] === fakeBigSixFace['l'][2]){
                        return 'r'
                    }
                break;

                default:
                    return false;
                break;

              }
        }

        if(isThirdFloorRealTure('f')){

            topFloorLast (isThirdFloorRealTure('f'))
            return false;
        
        }else if(isThirdFloorRealTure('l')){
        
            topFloorLast (isThirdFloorRealTure('l'))
            return false;
        
        }else if(isThirdFloorRealTure('b')){
        
            topFloorLast (isThirdFloorRealTure('b'))
            return false;
        
        }else if(isThirdFloorRealTure('r')){
        
            topFloorLast (isThirdFloorRealTure('r'))
            return false;
        
        }

        else if(isThirdFloorTure('f')){

            topFloorLast (isThirdFloorTure('f'))
            return false;
        
        }else if(isThirdFloorTure('l')){
        
            topFloorLast (isThirdFloorTure('l'))
            return false;
        
        }else if(isThirdFloorTure('b')){
        
            topFloorLast (isThirdFloorTure('b'))
            return false;
        
        }else if(isThirdFloorTure('r')){
        
            topFloorLast (isThirdFloorTure('r'))
            return false;
        
        }

        if(fakeBigSixFace['f'][0] === fakeBigSixFace['f'][2]){
            thirdRotate ('r');
        }else if(fakeBigSixFace['r'][0] === fakeBigSixFace['r'][2]){
            thirdRotate ('b');
        }else if(fakeBigSixFace['l'][0] === fakeBigSixFace['l'][2]){
            thirdRotate ('f');
        }else if(fakeBigSixFace['b'][0] === fakeBigSixFace['b'][2]){
            thirdRotate ('l');
        }else{
            thirdRotate ('l');
            if(fakeBigSixFace['f'][0] === fakeBigSixFace['f'][2]){
                thirdRotate ('r');
            }else if(fakeBigSixFace['r'][0] === fakeBigSixFace['r'][2]){
                thirdRotate ('b');
            }else if(fakeBigSixFace['l'][0] === fakeBigSixFace['l'][2]){
                thirdRotate ('f');
            }else if(fakeBigSixFace['b'][0] === fakeBigSixFace['b'][2]){
                thirdRotate ('l');
            }
        }
    }


// ////////////////////////////////////////////////////////////

    //最后判断顶层的四周是否与他中心色块完全一致
    function isTopFloorOk (){
        if(fakeBigSixFace['f'][0] === fakeBigSixFace['r'][4]){
            pushAndChange(['u', 90, 0], autoStep);
        }else if(fakeBigSixFace['f'][0] === fakeBigSixFace['b'][4]){
            pushAndChange(['u', 180, 0], autoStep);
        }else if(fakeBigSixFace['f'][0] === fakeBigSixFace['l'][4]){
            pushAndChange(['u', 90, 1], autoStep);
        }
    }

    //最后四周是否与完成
    function isSideAllOk() {
       if(fakeBigSixFace['f'][0] === fakeBigSixFace['f'][1] && fakeBigSixFace['f'][0] === fakeBigSixFace['f'][2]  && fakeBigSixFace['l'][0] === fakeBigSixFace['l'][1] && fakeBigSixFace['l'][0] === fakeBigSixFace['l'][2] && fakeBigSixFace['b'][0] === fakeBigSixFace['b'][1] && fakeBigSixFace['b'][0] === fakeBigSixFace['b'][2] && fakeBigSixFace['r'][0] === fakeBigSixFace['r'][1] && fakeBigSixFace['r'][0] === fakeBigSixFace['r'][2]){
            return false;
       }else{
            return true;
       }
    }

    // 寻找步骤(分步骤串起来)
    function auto(test){

        searchDownMiddleCube('b');//参数是表示侧面的颜色（以中心色块为标准的）
        searchDownMiddleCube('f');
        searchDownMiddleCube('l');
        searchDownMiddleCube('r');
        ///////////////////////////
        searchCornerCube('l','f')
        searchCornerCube('f','r')
        searchCornerCube('b','l')
        searchCornerCube('r','b')
        // // /////////////////////
        searchSecondFloorCube('l','f')
        searchSecondFloorCube('b','l')
        searchSecondFloorCube('r','b')
        searchSecondFloorCube('f','r')
        //////////////////////////
        topFloorFirst();
        // // ////////////////////
        var topCount = 0;
        while(isSideAllOk()){
            topCount ++;
            if(topCount > 4){
                break;
            }
            topFloorSecond();
        }
        
        //////////////////
        isTopFloorOk ()
     
    }

// ///////////////////////////////////////////////////////////////////
    //过滤重复步骤 
    function filterSteps(arr){

        let arrLen = arr.length;

        for(let i = 0; i < arrLen - 1; i ++ ){


            if(arr[i][0] == arr[i + 1][0]){

                console.log(i);

                if(arr[i][2] == arr[i + 1][2]){
  
                    let tempDeg = arr[i][1] + arr[i + 1][1];
                    let tempDir = arr[i + 1][2];

                    if(tempDeg > 180){
                        tempDeg = Math.abs((arr[i][1] + arr[i + 1][1])%360-180);
                        tempDir = Number(!tempDir);
                    }

                    arr.splice(i,2,[arr[i][0],tempDeg,tempDir]);
                    arrLen -- ;
                    // i -- ;

                }else{

                    if(arr[i][2] === 0 && arr[i + 1][2] === 1){

                        if(-arr[i][1] + arr[i + 1][1] > 0){

                            arr.splice(i,2,[arr[i][0],-arr[i][1] + arr[i + 1][1],arr[i + 1][2]]);
                            arrLen -- ;
                            // i -- ;

                        }else{

                            arr.splice(i,2,[arr[i][0],arr[i][1] - arr[i + 1][1],arr[i][2]]);
                            arrLen -- ;
                            // i -- ;

                        }

                    }else if(arr[i][2] === 1 && arr[i + 1][2] === 0){

                        if(arr[i][1] - arr[i + 1][1] > 0){

                            arr.splice(i,2,[arr[i][0],arr[i][1] - arr[i + 1][1],arr[i][2]]);
                            arrLen -- ;
                            // i -- ;

                        }else{

                            arr.splice(i,2,[arr[i][0],-arr[i][1] + arr[i + 1][1],arr[i + 1][2]]);
                            arrLen -- ;
                            // i -- ;

                        }

                    }
                }


            }
        }

    }


// /////////////////////////////////////////////////////

    // 将步骤推进自动步骤数组
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

///////////////////////////////////////////////////////

    var timerStepByStep;
    var stop = false;
    // 暂停继续按钮
    get('.btnZ').onclick = function(){
        if(autoStep.length != 0){
            if(!stop){
                get('.btnZ').innerHTML= '继续';
                clearInterval(timerStepByStep);
                stop = true;
            }else{
                get('.btnZ').innerHTML= '暂停';
                timerStepByStep = setInterval(function(){
                    if(autoStep.length === 0){
                        clearInterval(timerStepByStep);
                    }else{
                        rotateCubeFace.apply(null,autoStep[0]);
                        autoStep.shift();  
                    }
                },speed);
                stop = false;
            }
        }
        
    };

    // 自动旋转的函数
    function stepByStep(autoStep,t,from){

        rotateCubeFace.apply(null,autoStep[0]);
        let tempStep = autoStep.shift();

        if(!from){
            saveShiftStep.unshift(tempStep);
        }
        
        clearInterval(timerStepByStep);
        timerStepByStep = setInterval(function(){
            if(autoStep.length === 0){
                clearInterval(timerStepByStep);
            }else{
                rotateCubeFace.apply(null,autoStep[0]);
                let tempStep = autoStep.shift();
                if(!from){
                    saveShiftStep.unshift(tempStep);
                }
            }
        },t);
    };

    // 下一步旋转的函数
    function nextStepStep(autoStep,t){

        rotateCubeFace.apply(null,autoStep[0]);
        let tempStep = autoStep.shift();
        saveShiftStep.unshift(tempStep);
    };

    // 上一步旋转的函数
    function lastStepStep(Step,t){

        autoStep.unshift(Step[0]);
        let tempShiftStep = [Step[0][0],Step[0][1],Number(!Step[0][2])]
        rotateCubeFace.apply(null,tempShiftStep);
        saveShiftStep.shift();
    };


// //////////////////////////////////////////////
    // random 打乱函数
    let randomArr = [];
    let randomArrTemp = [];
    function random(){
        
        // top 为 T 中心1块的 ok
        let steps = [
                        ['u', 180, 0],
                        ['r', 90, 1],
                        ['l', 90, 0],
                        ['d', 90, 1],
                        ['l', 90, 0],
                        ['d', 180, 1],
                        ['r', 180, 1],
                        ['b', 180, 1],
                        ['d', 90, 1],
                        ['b', 90, 0],
                        ['f', 180, 0],
                        ['l', 90, 0]
                    ];


        for (let i = 0; i < 12; i++) {
            let randomNum = Math.floor(Math.random()*12);
            pushAndChange(steps[randomNum], randomArr);
            randomArrTemp.push(steps[randomNum]);
        }

        // 固定步骤（找bug用）

        // for (let i = 0; i < 12; i++) {
        //     get('.bianliang').innerHTML += '["'+randomArrTemp[i][0]+'",'+randomArrTemp[i][1]+','+randomArrTemp[i][2]+'],'
        // }

        // var testArr = [
           
        //    ["d",90,1],["b",180,1],["b",180,1],["f",180,0],["b",180,1],["u",180,0],["b",90,0],["b",90,0],["l",90,0],["r",90,1],["d",90,1],["d",90,1],
        // ]

        // for (let i = 0; i < 12; i++) {
        //     pushAndChange(testArr[i], randomArr)
        // }
        
        stepByStep(randomArr,speed,true)
    }


    // 自动测试，出错停止
    // var testAuto = !true;
    var testCount = localStorage.times;

    // console.log(localStorage.times);
    if(testAuto){
        setTimeout(function(){
        
            $('.btn20').trigger('click');
            
            setTimeout(function(){

                if(autoStep.length == 0){
                    $('.btn19').trigger('click');

                    setTimeout(function(){
                        if ( !allOk() ){
                            console.log("danger!!!");
                        }else{
                            window.location.reload();
                            testCount ++;
                            localStorage.times = testCount;
                        };
                    },5000)
                }
            },1000)

        },1000)

    }
///////////////////////////////////////////////

    // 所有面全部 ok 判断
    function allOk(){
        if(fakeBigSixFace['f'][0] == fakeBigSixFace['f'][4] && 
           fakeBigSixFace['f'][1] == fakeBigSixFace['f'][4] && 
           fakeBigSixFace['f'][2] == fakeBigSixFace['f'][4] &&
           fakeBigSixFace['f'][3] == fakeBigSixFace['f'][4] && 
           fakeBigSixFace['f'][5] == fakeBigSixFace['f'][4] && 
           fakeBigSixFace['f'][6] == fakeBigSixFace['f'][4] && 
           fakeBigSixFace['f'][7] == fakeBigSixFace['f'][4] && 
           fakeBigSixFace['f'][8] == fakeBigSixFace['f'][4] && 

           fakeBigSixFace['u'][0] == fakeBigSixFace['u'][4] && 
           fakeBigSixFace['u'][1] == fakeBigSixFace['u'][4] && 
           fakeBigSixFace['u'][2] == fakeBigSixFace['u'][4] &&
           fakeBigSixFace['u'][3] == fakeBigSixFace['u'][4] && 
           fakeBigSixFace['u'][5] == fakeBigSixFace['u'][4] && 
           fakeBigSixFace['u'][6] == fakeBigSixFace['u'][4] && 
           fakeBigSixFace['u'][7] == fakeBigSixFace['u'][4] && 
           fakeBigSixFace['u'][8] == fakeBigSixFace['u'][4]
           ){
            return true;
        }else{
            return false;
        }
    }

    var calculate = true;

    get('.steps_auto').onclick = function(){
        
        if(calculate && !allOk()){
            auto(false);
            console.log(autoStep.length);
            filterSteps(autoStep);
            console.log(autoStep.length);
            calculate = false;
        }
        if(autoStep.length > 0){
            stepByStep(autoStep,speed,false)
        }
    };

    $('.btn_left').click(function(){
        $('.last_step').trigger('click')
    })
    $('.btn_right').click(function(){
        $('.next_step').trigger('click')
    })

    get('.last_step').onclick = function(){
        if(saveShiftStep.length > 0){
            lastStepStep(saveShiftStep,speed)
        }
    };

    get('.next_step').onclick = function(){
        if(calculate && !allOk()){
            auto(false);
            console.log(autoStep.length);
            filterSteps(autoStep);
            console.log(autoStep.length);
            calculate = false;
        }

        if(autoStep.length > 0){
            nextStepStep(autoStep,speed)
        }
    };

    get('.btn20').onclick = function(){
        if(autoStep.length === 0){
           calculate = true;
           random();
           randomArr = [];
           saveShiftStep = [];
       }
    };
    
    get('.cube_reset').onclick = function(){
        renderCube (true, []);
        calculate = true;
        autoStep = autoStep.splice(0,autoStep.length)
        saveShiftStep = saveShiftStep.splice(0,saveShiftStep.length)
        for(let i = 0; i < 9; i ++){

            bigSixFace['u'][i] = $($('.up_f .small_cubes')[i]).attr('data-newColor');
            bigSixFace['l'][i] = $($('.left_f .small_cubes')[i]).attr('data-newColor');
            bigSixFace['f'][i] = $($('.front_f .small_cubes')[i]).attr('data-newColor');
            bigSixFace['r'][i] = $($('.right_f .small_cubes')[i]).attr('data-newColor');
            bigSixFace['b'][i] = $($('.back_f .small_cubes')[i]).attr('data-newColor');
            bigSixFace['d'][i] = $($('.down_f .small_cubes')[i]).attr('data-newColor');

            fakeBigSixFace['u'][i] = $($('.up_f .small_cubes')[i]).attr('data-newColor');
            fakeBigSixFace['l'][i] = $($('.left_f .small_cubes')[i]).attr('data-newColor');
            fakeBigSixFace['f'][i] = $($('.front_f .small_cubes')[i]).attr('data-newColor');
            fakeBigSixFace['r'][i] = $($('.right_f .small_cubes')[i]).attr('data-newColor');
            fakeBigSixFace['b'][i] = $($('.back_f .small_cubes')[i]).attr('data-newColor');
            fakeBigSixFace['d'][i] = $($('.down_f .small_cubes')[i]).attr('data-newColor');

        }



        $('.init_wrap').hide();


        for(let i = 0; i < 9; i++) {
            $("#box_"+defaultBigSixFace["u"][i]).find(".face_01").css({
                backgroundColor : bigSixFace["u"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["l"][i]).find(".face_02").css({
                backgroundColor : bigSixFace["l"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["f"][i]).find(".face_03").css({
                backgroundColor : bigSixFace["f"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["r"][i]).find(".face_04").css({
                backgroundColor : bigSixFace["r"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["d"][i]).find(".face_05").css({
                backgroundColor : bigSixFace["d"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["b"][i]).find(".face_06").css({
                backgroundColor : bigSixFace["b"][i],
                borderRadius: '12px'
            })
        }

        auto(false);
    };

    get('.show_init').onclick = function(){
        renderCube (true, []);
        calculate = true;
        autoStep = autoStep.splice(0,autoStep.length)
        saveShiftStep = saveShiftStep.splice(0,saveShiftStep.length)


        for(let i = 0; i < 9; i++) {
            $("#box_"+defaultBigSixFace["u"][i]).find(".face_01").css({
                backgroundColor : bigSixFace["u"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["l"][i]).find(".face_02").css({
                backgroundColor : bigSixFace["l"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["f"][i]).find(".face_03").css({
                backgroundColor : bigSixFace["f"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["r"][i]).find(".face_04").css({
                backgroundColor : bigSixFace["r"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["d"][i]).find(".face_05").css({
                backgroundColor : bigSixFace["d"][i],
                borderRadius: '12px'
            })
            $("#box_"+defaultBigSixFace["b"][i]).find(".face_06").css({
                backgroundColor : bigSixFace["b"][i],
                borderRadius: '12px'
            })
        }

        $('.init_wrap').show();
    };

    
// /////////////////////////

    // 预设几个打乱的魔方配色

    $('.pre_color_01').click(function(){

        let pre_color = {

            'b': ["orange", "yellow", "green", "orange", "orange", "red", "red", "yellow", "red"],
            'd': ["red", "red", "orange", "green", "green", "white", "yellow", "green", "white"],
            'f': ["red", "white", "white", "yellow", "red", "yellow", "white", "blue", "yellow"],
            'l': ["orange", "green", "yellow", "green", "white", "blue", "blue", "white", "green"],
            'r': ["blue", "orange", "white", "red", "yellow", "blue", "blue", "red", "blue"],
            'u':["yellow", "orange", "green", "orange", "blue", "white", "green", "blue", "orange"]
        }

        for(let i = 0; i < 9; i ++){
         
            $($('.up_f .small_cubes')[i]).attr('data-newColor',pre_color['u'][i]);
            $($('.left_f .small_cubes')[i]).attr('data-newColor',pre_color['l'][i]);
            $($('.front_f .small_cubes')[i]).attr('data-newColor',pre_color['f'][i]);
            $($('.right_f .small_cubes')[i]).attr('data-newColor',pre_color['r'][i]);
            $($('.back_f .small_cubes')[i]).attr('data-newColor', pre_color['b'][i]);
            $($('.down_f .small_cubes')[i]).attr('data-newColor', pre_color['d'][i]);

            $($('.up_f .small_cubes')[i]).css({backgroundColor:pre_color['u'][i]});
            $($('.left_f .small_cubes')[i]).css({backgroundColor:pre_color['l'][i]});
            $($('.front_f .small_cubes')[i]).css({backgroundColor:pre_color['f'][i]});
            $($('.right_f .small_cubes')[i]).css({backgroundColor:pre_color['r'][i]});
            $($('.back_f .small_cubes')[i]).css({backgroundColor: pre_color['b'][i]});
            $($('.down_f .small_cubes')[i]).css({backgroundColor: pre_color['d'][i]});

        }
    })

    $('.pre_color_02').click(function(){
        let pre_color = {

            'b':["red", "yellow", "orange", "red", "orange", "white", "white", "orange", "orange"],
            'd':["green", "green", "green", "green", "green", "green", "green", "green", "blue"],
            'f':["white", "red", "orange", "yellow", "red", "orange", "red", "red", "red"],
            'l':["yellow", "blue", "orange", "blue", "white", "blue", "white", "white", "white"],
            'r':["blue", "red", "blue", "white", "yellow", "yellow", "yellow", "yellow", "red"],
            'u':["green", "orange", "yellow", "orange", "blue", "white", "blue", "blue", "yellow"]
        }

        for(let i = 0; i < 9; i ++){
         
            $($('.up_f .small_cubes')[i]).attr('data-newColor',pre_color['u'][i]);
            $($('.left_f .small_cubes')[i]).attr('data-newColor',pre_color['l'][i]);
            $($('.front_f .small_cubes')[i]).attr('data-newColor',pre_color['f'][i]);
            $($('.right_f .small_cubes')[i]).attr('data-newColor',pre_color['r'][i]);
            $($('.back_f .small_cubes')[i]).attr('data-newColor', pre_color['b'][i]);
            $($('.down_f .small_cubes')[i]).attr('data-newColor', pre_color['d'][i]);

            $($('.up_f .small_cubes')[i]).css({backgroundColor:pre_color['u'][i]});
            $($('.left_f .small_cubes')[i]).css({backgroundColor:pre_color['l'][i]});
            $($('.front_f .small_cubes')[i]).css({backgroundColor:pre_color['f'][i]});
            $($('.right_f .small_cubes')[i]).css({backgroundColor:pre_color['r'][i]});
            $($('.back_f .small_cubes')[i]).css({backgroundColor: pre_color['b'][i]});
            $($('.down_f .small_cubes')[i]).css({backgroundColor: pre_color['d'][i]});

        }
    })

    $('.pre_color_03').click(function(){
        let pre_color = {

            'b':["white", "red", "yellow", "orange", "blue", "orange", "yellow", "blue", "green"],
            'd':["yellow", "white", "red", "orange", "yellow", "white", "red", "yellow", "red"],
            'f':["orange", "yellow", "green", "orange", "green", "red", "green", "red", "white"],
            'l':["orange", "green", "blue", "green", "orange", "blue", "white", "yellow", "orange"],
            'r':["yellow", "white", "green", "yellow", "red", "white", "blue", "blue", "blue"],
            'u':["blue", "blue", "orange", "red", "white", "green", "white", "green", "red"]
        }

        for(let i = 0; i < 9; i ++){
         
            $($('.up_f .small_cubes')[i]).attr('data-newColor',pre_color['u'][i]);
            $($('.left_f .small_cubes')[i]).attr('data-newColor',pre_color['l'][i]);
            $($('.front_f .small_cubes')[i]).attr('data-newColor',pre_color['f'][i]);
            $($('.right_f .small_cubes')[i]).attr('data-newColor',pre_color['r'][i]);
            $($('.back_f .small_cubes')[i]).attr('data-newColor', pre_color['b'][i]);
            $($('.down_f .small_cubes')[i]).attr('data-newColor', pre_color['d'][i]);

            $($('.up_f .small_cubes')[i]).css({backgroundColor:pre_color['u'][i]});
            $($('.left_f .small_cubes')[i]).css({backgroundColor:pre_color['l'][i]});
            $($('.front_f .small_cubes')[i]).css({backgroundColor:pre_color['f'][i]});
            $($('.right_f .small_cubes')[i]).css({backgroundColor:pre_color['r'][i]});
            $($('.back_f .small_cubes')[i]).css({backgroundColor: pre_color['b'][i]});
            $($('.down_f .small_cubes')[i]).css({backgroundColor: pre_color['d'][i]});

        }
    })

    $('.pre_color_04').click(function(){
        let pre_color = {

            'b':["orange", "green", "orange", "blue", "red", "green", "yellow", "yellow", "white"],
            'd':["red", "yellow", "blue", "orange", "green", "yellow", "orange", "red", "green"],
            'f':["red", "white", "red", "white", "orange", "blue", "blue", "orange", "white"],
            'l':["blue", "white", "blue", "red", "yellow", "red", "green", "blue", "white"],
            'r':["white", "orange", "green", "red", "white", "yellow", "orange", "green", "red"],
            'u':["yellow", "orange", "yellow", "blue", "blue", "white", "yellow", "green", "green"]
        }

        for(let i = 0; i < 9; i ++){
         
            $($('.up_f .small_cubes')[i]).attr('data-newColor',pre_color['u'][i]);
            $($('.left_f .small_cubes')[i]).attr('data-newColor',pre_color['l'][i]);
            $($('.front_f .small_cubes')[i]).attr('data-newColor',pre_color['f'][i]);
            $($('.right_f .small_cubes')[i]).attr('data-newColor',pre_color['r'][i]);
            $($('.back_f .small_cubes')[i]).attr('data-newColor', pre_color['b'][i]);
            $($('.down_f .small_cubes')[i]).attr('data-newColor', pre_color['d'][i]);

            $($('.up_f .small_cubes')[i]).css({backgroundColor:pre_color['u'][i]});
            $($('.left_f .small_cubes')[i]).css({backgroundColor:pre_color['l'][i]});
            $($('.front_f .small_cubes')[i]).css({backgroundColor:pre_color['f'][i]});
            $($('.right_f .small_cubes')[i]).css({backgroundColor:pre_color['r'][i]});
            $($('.back_f .small_cubes')[i]).css({backgroundColor: pre_color['b'][i]});
            $($('.down_f .small_cubes')[i]).css({backgroundColor: pre_color['d'][i]});

        }
    })

// ///////////////////////////////////////////////////
    // 但步骤按钮组
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


// 给魔方着色（输入）

    let pick_up_color = 'white'

    $('.pick_color button').click(function(){
        pick_up_color = $(this).attr('data-color');
        $('.picked_up_color').css({
            backgroundColor: pick_up_color
        });
    });

    $('.small_cubes').click(function(){

        $(this).css({
            backgroundColor: pick_up_color
        });

        $(this).attr('data-newColor',pick_up_color)
    })

    $('.cancel').click(function() {
       $('.init_wrap').hide();
    });


    $('.confirm').click(function() {

        if (true) {
           var pick_color_over  = confirm("是否根据实体魔方已完成着色？");
        }
      

        if(pick_color_over){


            for(let i = 0; i < 9; i ++){

                bigSixFace['u'][i] = $($('.up_f .small_cubes')[i]).attr('data-newColor');
                bigSixFace['l'][i] = $($('.left_f .small_cubes')[i]).attr('data-newColor');
                bigSixFace['f'][i] = $($('.front_f .small_cubes')[i]).attr('data-newColor');
                bigSixFace['r'][i] = $($('.right_f .small_cubes')[i]).attr('data-newColor');
                bigSixFace['b'][i] = $($('.back_f .small_cubes')[i]).attr('data-newColor');
                bigSixFace['d'][i] = $($('.down_f .small_cubes')[i]).attr('data-newColor');

                fakeBigSixFace['u'][i] = $($('.up_f .small_cubes')[i]).attr('data-newColor');
                fakeBigSixFace['l'][i] = $($('.left_f .small_cubes')[i]).attr('data-newColor');
                fakeBigSixFace['f'][i] = $($('.front_f .small_cubes')[i]).attr('data-newColor');
                fakeBigSixFace['r'][i] = $($('.right_f .small_cubes')[i]).attr('data-newColor');
                fakeBigSixFace['b'][i] = $($('.back_f .small_cubes')[i]).attr('data-newColor');
                fakeBigSixFace['d'][i] = $($('.down_f .small_cubes')[i]).attr('data-newColor');

            }



            $('.init_wrap').hide();


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
        }
    });

    $('.wrap')[0].onmousedown=function (ev){
        var oEvent=ev||event;
        pauseEvent(oEvent);
        var disX=oEvent.clientX;
        var disY=oEvent.clientY;

        var posX = get(".x_rotate").value;
        var posY = get(".y_rotate").value;
     
        document.onmousemove=function (ev){
            var oEvent=ev||event;
            pauseEvent(oEvent);

            var l=oEvent.clientX-disX;//移动x坐标位置
            var t=oEvent.clientY-disY;//移动y坐标位置

            var last_cX = -t%1000 + Number(posX);
            var last_cY = l%1000 + Number(posY);

            get(".x_rotate").value = last_cX;
            get(".y_rotate").value = last_cY;

            $('.x_rotate').trigger('input');
            $('.y_rotate').trigger('input');
        };
         
        document.onmouseup=function (ev){
            var oEvent=ev||event;
            pauseEvent(oEvent);
            document.onmousemove=null;
            document.onmouseup=null;
        };
    };

    //阻止事件冒泡
    //不仅仅要stopPropagation，还要preventDefault
    function pauseEvent(e){

        if(e.stopPropagation) {
            e.stopPropagation();
        }
        if(e.preventDefault) {
            e.preventDefault();
        }
        e.cancelBubble=true;
        e.returnValue=false;
        return false;
    }

}