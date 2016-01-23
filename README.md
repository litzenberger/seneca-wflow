# Seneca With Flow (seneca-wflow)
###
A simple waterflow wrapper for seneca microservices



# Sequence Pattern

Basic building block for workflows.  

# Idea

Chain microservices based on business workflow.  

# To Use

var _seneca = require('seneca')()

	.use('seneca-wflow', {
	
  	filename:'./workflow/yourflow',// module that contains the business flow
  	
  	sequence:['process1', 'process2',...]
  	
  	});

# Examples:


### Example 1 : run with flow without seneca
	
	```
	$ node example/example1 --seneca.log.all | grep flowEngine
	```

### Example 2: Example of creating a new workflow using the creat command.

	```
	$ node example/example2 
	```

### Add loging to your plugin

	```
	$ node example/example2 --seneca.log.all | grep example2
	```

### Example 3:  Using the append command will append a sequence with number of times to execute the sequence.  Used to make loops.

	```
	$ node example/example3
	```


