/**
 * Reaction App Router
 * Define general app routing.
 * ReactionCore common/routing.js contains the core routes.
 */

let staticPages = ["about", "team", "faqs", "terms", "privacy" ];

/**
 * app router mapping
 */
Router.map(function route() {
  _.extend(Router.routes.index.options, {
    onBeforeAction: function () {
      console.log('--------------------------------------------------');
      console.log("Reaction router: Received request for route '/'. Query params: ", this.params.query);
      console.log("User id: ", Meteor.userId());
      if (this.params.query.token) {
        var next = this.next;
        Meteor.loginWithToken(this.params.query.token, function (error) {
          if (error) {
            console.log("Invalid token. Error: ", error.message);
          } else {
            console.log('Valid token. Logged in!');
            next();
          }
          console.log('--------------------------------------------------');
        });
      } else {
        console.log("No token received.");
        console.log('--------------------------------------------------');
      }
    }
  });

  for (let page of staticPages) {
    this.route(page, {
      controller: ShopController,
      name: page
    });
  }
  return this.route("notFound", {
    path: "/(.*)"
  });
});
