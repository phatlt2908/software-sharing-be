module.exports = function (app) {
	app.route('/')
		.get((req, res) => {
			res.send({ msg: 'Welcome' });
		});

	app.use('/auth', require('./master/auth-router'));
	app.use('/user', require('./master/user-router'));
	app.use('/master/category', require('./master/category-router'));
	app.use('/master/link-download', require('./master/link-download-router'));
	app.use('/master/post', require('./master/post-router'));

	app.use('/category', require('./service/category-router'));
	app.use('/post', require('./service/post-router'));
	app.use('/tag', require('./service/tag-router'));

	app.all('*', (req, res) => {
		res.status(404).send({ msg: 'not found' });
	})
}