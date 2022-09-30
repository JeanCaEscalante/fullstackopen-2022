// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', ({username, password}) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password}).then(({body}) => {
    localStorage.setItem('loggedUser', JSON.stringify(body));
  });
});

Cypress.Commands.add('createBlog', ({title, author, url}) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: {title1: title, author1: author, url1: url},
    headers: {
      'Authorization':
      `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`,
    },
  });
});
