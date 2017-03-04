function force(el)
{
	var input = [
	{
		'one': 50,
		'two': 90,
		'key': 'one',
		'r': 5
	},
	{
		'one': 20,
		'two': 30,
		'key': 'two',
		'r': 7		
	},
	{
		'one': 60,
		// 'two': 10,
		'key': 'three',
		'r': 8
	}
	]

	// var canvas = d3.select("#canvas")
	var canvas = d3.select(el)
	var bubble = canvas.selectAll('.bubble').data(input, function(el) {return el.key});

	bubble.enter().append("circle")
		.attr("class", "bubble")
		.attr("cx", function(d){ return d.one })
		.attr("r", function(d){ return d.r })
		.style('fill', 'purple')
		.attr("cy", function(d) { return 50})
		.attr("key", function(d) {return d.key})


	var bugly = document.getElementById('bugly');
	bugly.addEventListener('click', toggle)

	var tog = 0;

	function toggle(){
		useTheForce.force("PosX", d3.forceX(function(d) {
			if (tog==0)
			{	
				tog = 1;	
				if (d.hasOwnProperty('two'))
				{
					return d.two
				}
			else
				{
					// d.r = 0;
					d.two = 10		
					return 50
				}
			}
			else { tog=0; return d.one}
		}
		)).alpha(.95)
		.restart()

		update()
	}


	var useTheForce = d3.forceSimulation(input)
		.force("Collision", d3.forceCollide(function(d) {return d.r}))
		.force("PosX", d3.forceX(function(d) {return d.one}))
		.force("PosY", d3.forceY(function(d) {return 50}))
		.force("center", d3.forceCenter(50,50))
		.on('tick', tick).alpha(.8);


	console.log(useTheForce)
	console.log(input)


	function tick(){	
		d3.selectAll('.bubble')
			.attr('cx', function(d){return d.x})
			.attr('cy', function(d){return d.y})
			.style('opacity', function(d) {return 0.05+Math.abs(d.vx)})
	}

	function update(){
		d3.selectAll('.bubble').transition()
			.attr('r', function(d){return d.r})
	}



}