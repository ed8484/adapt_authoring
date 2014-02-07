define(function(require) {
  var Backbone = require('backbone'),
      Handlebars = require('handlebars'),
      $ = require('jquery'),
      AdaptBuilder = require('coreJS/adaptbuilder');

 var LoginView = Backbone.View.extend({

    className: 'login-view',

    model: AdaptBuilder.userModel,

    initialize: function() {
      this.listenTo(AdaptBuilder, 'loginFailed', this.loginFailed);
      console.log(this);
      this.render();
    },

   tagName: "div",

    events: {
      "click .loginForm a#linkDash" : "gotoDashboard",
      "click .loginForm a#linkRegister" : "gotoRegister",
      "click .loginForm a#linkForgotPassword" : "gotoForgotPassword",
      "click .loginForm button":"submitLoginDetails"
    },

    render: function() {
      console.log('render');
      var data = this.model.toJSON();
      var template = Handlebars.templates['login'];
      this.$el.html(template(data)).appendTo('#app');
      return this;
    },

    gotoForgotPassword: function(e) {
      e.preventDefault();
      Backbone.history.navigate('/login/forgot', {trigger: true});
    },

    gotoRegister: function(e) {
      e.preventDefault();
      Backbone.history.navigate('/register', {trigger: true});
    },

    submitLoginDetails: function(e) {
      e.preventDefault();
      //Do some crazy validation here
      var inputUsernameEmail = $("#inputUsernameEmail", this.$el).val();
      var inputPassword = $("#inputPassword", this.$el).val();
      var mdl = this.model;

      mdl.login(inputUsernameEmail, inputPassword, function(err, result){
        if( err || !result.success) {
          AdaptBuilder.trigger('loginFailed');
        } else {
          Backbone.history.navigate('/dashboard', {trigger: true});
        }
      });
    },

    gotoDashboard: function () {
      e.preventDefault();
      Backbone.history.navigate('/dashboard', {trigger: true});
    },

    loginFailed: function() {
      $('#loginFailed').removeClass('hide');
    }

  });

  return LoginView;

});
