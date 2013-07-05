
module.exports = (grunt) ->

	# Initialize the configuration.
	@initConfig

		pkg: grunt.file.readJSON('package.json')
		# paths
		conf:
			#banner for files
			banner: '/*! <%= pkg.name %> - V: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'

			path:
				#scripts
				jsDir:"public/scripts/"

				#css
				sassDir: 'public/scss/'
				cssDir: 'public/css/'
				imagesDir: 'public/images'

		#Compass task
		compass:
			options:
				cssDir: '<%= conf.path.cssDir %>'
				sassDir: '<%= conf.path.sassDir %>'
				imagesDir: '<%= conf.path.imgDir %>'
				# specify: ['<%= conf.path.sassDir %>_baseStyle.scss', 'public/sass/jquery-ui-1.10.2.custom.scss']
				javascriptsDir: '<%= conf.path.jsDir %>'
				force: true
			files:['<%= conf.path.sassDir %>']

			dev:
				options:
					debugInfo :true

			prod:
				options:
					debugInfo :false

		# JSHint task
		jshint:
			files: ['!node_modules',
					'!public/components',
					'*.js']

			options:
				# browser: true
				# boss: true
				# curly: false
				# eqeqeq: false
				# eqnull: true
				# camelcase : false
				# evil : false
				# shadow: false
				globals:
					jQuery: true
					$: true
					io: true
					document: true
					window:true
					console:true

		# coffee:
		# 	options:
		# 		bare: true

		# 	compile:
		# 		# files:
		# 		# 	'<%= conf.path.jsDir %>main.js': '<%= conf.path.coffeeDir %>main.coffee'
		# 		expand: true,
		# 		cwd: '<%= conf.path.coffeeDir %>',
		# 		src: ['*.coffee'],
		# 		dest: '<%= conf.path.jsDir %>',
		# 		ext: '.js'

		# 	dev:
		# 		sourceMap: true



		#watch task
		watch:

			jsFiles:
				files: ['!node_modules',
				'<%= jshint.files %>']

				tasks: ['jshintage']

			scss:
				files: ['<%= compass.options.sassDir %>*.scss'],
				tasks: ['compass:dev']



			# coffee:
			# 	files: '<%= conf.path.coffeeDir %>*.coffee'
			# 	tasks: ['kawa']


	# Load Grunt plugins.
	@loadNpmTasks "grunt-contrib-watch"
	@loadNpmTasks "grunt-contrib-jshint"
	@loadNpmTasks "grunt-contrib-compass"
	# @loadNpmTasks "grunt-contrib-coffee"


	# Default task.
	@registerTask 'default', ['jshint']
	@registerTask 'jshintage', ['jshint']

	# @registerTask 'kawa', ['coffee']

	#demo task
	@registerTask "msg", "Treat yo' self!", ->
		# Notice we use the grunt object to retrieve configuration.
		compliments = grunt.template.process('<%= conf.path.imgSrcDir %>')
		grunt.log.writeln compliments
