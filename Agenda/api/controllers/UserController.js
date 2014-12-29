/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {
 	/*Crear el usuario*/
 	new: function(req, res){
 		console.log('entre al formulario de registro');
 		res.view();
 	},

 	create: function(req, res){
 		var userObj={
 			name : req.param('name'),
 			lastname : req.param('lastname'),
 			telephone : req.param('telephone'),
 			email : req.param('email'),
 			addres : req.param('addres')
 		}

 		User.create(userObj, function(err,user){
 			if(err){
 				console.log(err);
 				return res.redirect('user/new');
 			}
 			return res.redirect('user/show/'+user.id);

 		});
 	},
 	/*ver usuarios*/
 	show: function(req, res, next){
 		User.findOne(req.param('id'), function userFounded(err,user) {
 			if (err){
 				console.log(err);
 				return next(err);
 			}
 			res.view({
 				user: user
 			});
 		});
 	},
 	edit: function(req, res, next){
 		User.findOne(req.param('id'), function userFounded(err, user){
 			if (err)
 				return next(err);
 			if(!user)
 				return next();
 			res.view({
 				user: user
 			});
 		});
 	},
 	update: function(req, res, next) {
 		var userObj = {
 			name : req.param('name'),
 			lastname : req.param('lastname'),
 			telephone : req.param('telephone'),
 			email : req.param('email'),
 			addres : req.param('addres')
 		}
 		User.update(req.param('id'), userObj, function userUpdate(err, user) {
 			if (err) {
 				req.session.flash = {
 					err: err
 				}
 				return res.redirect('user/edit/' + req.param('id'));
 			}
 			res.redirect('user/show/' + req.param('id'));

 		});
 	},
 	index: function(req, res, next){
 		User.find(function userFounded(err,users){
 			if (err) {
 				console.log(err);
 				return next(err);
 			}
 			res.view({
 				users: users
 			});
 		});
 	},
 	destroy: function (req, res, next) {
 		User.destroy(req.param('id'), function userDestroyed (err) {
 			if(err){
 				console.log(err);
 				return next(err);
 			}
 			res.redirect('/user/index');
 		});
 	}

}
