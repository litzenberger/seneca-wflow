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



example 1 $ node example1 --seneca.log.all | grep flowEngine

example 2 $ node example2 --seneca.log.all | grep example2
