require(['lib/AStarFloodFill',
		'lib/underscore-min'],
function(AStarFloodFill) {

    $('body').click(function(e){
    	var $target = $(e.target),
    		x = $target.data('x'),
    		y = $target.data('y');

    	if(_.isNumber(x)&&_.isNumber(y)){
    		AStarFloodFill.setPeak({x:x,y:y});
    	}
    });

    $('button').click(function(){
        AStarFloodFill.stop();
        $(this).remove();
    });

    function doneAll(){

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

    function fasterDone(){
        console.log('done');//AStarFloodFill.getWeightmap());
    }




    var map = [
                ['w','w','w','w','u','w','w','w','w','w','w','w'],
                ['w','u','w','u','u','w','u','u','u','w','w','w'],
                ['w','u','w','w','u','w','u','w','w','w','w','w'],
                ['w','u','u','u','u','w','u','u','u','u','w','w'],
                ['w','w','w','u','w','w','w','w','u','w','w','w'],
                ['w','w','w','u','w','u','w','w','u','w','w','w'],
                ['u','u','w','w','w','u','w','u','u','u','u','w'],
                ['w','w','w','w','w','u','w','w','w','w','w','w'],
                ['w','u','u','w','u','u','u','u','w','u','u','w'],
                ['w','w','u','w','w','u','w','w','w','u','w','w'],
                ['w','w','u','u','w','u','w','w','w','w','w','w'],
                ['w','w','u','u','w','u','w','w','w','w','w','w']
            ];

    AStarFloodFill.start({
        map: map,
        peak: {x:7,y:7},
        interval: 5,
        doneAll: doneAll
    });


    // just does some fading in and out in order to illustrate any blocking of the frame
    function pointlessMove(){
        $('img').fadeOut(500,function(){
            $('img').fadeIn(500,function(){
                pointlessMove();
            });
        });
    }
    pointlessMove();

});
