require(['lib/AStarFloodFill',
        'lib/underscore-min'],
function(AStarFloodFill) {

    /*
     * crappy setup - all of this is for the rendering */
    $('body').click(function(e){
        var $target = $(e.target),
            x = $target.data('x'),
            y = $target.data('y');

        if(_.isNumber(x) && _.isNumber(y) && $target.text()!=='Infinity'){
            AStarFloodFill.setPeak({x:x,y:y});
        }
        moveMonster();
    });

    $('#stop').click(function(){
        AStarFloodFill.stop();
    });

    $('#start').click(function(){
        AStarFloodFill.startFill();
    });

    $('#lowestneighbor').click(function(){
        setLowestNeighbor();
    });

    function setLowestNeighbor(){
        var lowest = AStarFloodFill.lowestNeighborTo({
            x: parseInt($('#x').val(),10),
            y: parseInt($('#y').val(),10)
        });
        $('#x').val(lowest.x);
        $('#y').val(lowest.y);
        return lowest;
    }

    // just does some fading in and out in order to illustrate any blocking of the frame
    function pointlessMove(){
        $('img').fadeOut(300,function(){
            $('img').fadeIn(300,function(){
                pointlessMove();
            });
        });
    }
    
    pointlessMove();

    var walking = 0;
    $('#walking').click(function(){
        walking = 1 - walking;
    });

    function moveMonster(){

        if(!walking){return;}
        
        lowest = setLowestNeighbor();
        var index = (lowest.y * (map[0].length)) + (lowest.x+2),
            $tile = $('div:eq('+index+')'),
            $warn = $('#warn');

        $tile.addClass('position');

    }

    window.setInterval(moveMonster,700);




    /* actual AStarFloodFill usage here */
    var map = [
                ['w','w','w','w','u','w','w','w','w','w','w','w'],
                ['w','u','w','u','u','w','u','u','u','w','w','w'],
                ['w','u','w','w','u','w','u','w','w','w','w','w'],
                ['w','u','u','u','u','w','u','u','u','u','u','w'],
                ['w','w','w','u','w','w','w','u','w','w','w','w'],
                ['w','w','w','u','u','u','w','u','u','w','w','w'],
                ['u','u','w','w','w','u','w','w','u','u','u','w'],
                ['w','w','w','w','w','w','w','w','w','w','w','w'],
                ['w','u','u','w','u','u','u','w','u','u','u','u'],
                ['w','w','u','w','w','u','w','w','u','w','w','w'],
                ['u','w','u','w','w','u','w','w','u','w','w','w'],
                ['w','w','u','w','w','u','w','w','w','w','u','w'],
                ['w','u','u','u','w','u','w','w','u','u','u','w'],
                ['w','w','w','u','w','w','w','w','u','w','u','w'],
                ['u','w','w','u','w','u','w','w','u','w','w','w'],
                ['w','w','u','u','u','u','u','u','u','w','w','w']
            ];

    AStarFloodFill.start({
        map: map,
        peak: {x:7,y:7},
        interval: 10,
        doneAll: function(){

            var html = '',
                wmap = AStarFloodFill.getWeightmap(),
                cols = map[0].length,
                rows = map.length,
                i,j, cell;

            for(i=0;i<rows;i++){
                for(j=0;j<cols;j++){
                    cell = wmap[i][j] || (map[i][j] === 'w' ? '20' : 'Infinity');
                    html += '<div class="weight-'+cell+'" data-y="'+i+'" data-x="'+j+'">'+cell+'</div>';
                }
            }

            $('#map').html(html);
            console.log('done');

        }
    });

});
