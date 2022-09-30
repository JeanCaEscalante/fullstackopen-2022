describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      name: 'Jean C',
      username: 'root',
      password: '$Piensa16',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);

    const anotherUser = {
      name: 'Other user',
      username: 'gabiana',
      password: '12345',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', anotherUser);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000');
    cy.get('#login-form');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login-form');
      cy.get('#username').type('root');
      cy.get('#password').type('$Piensa16');
      cy.get('#login-button').click();

      cy.contains('Jean C logged');
    });

    it('fails with wrong credentials', function() {
      cy.get('#login-form');
      cy.get('#username').type('sdddsd');
      cy.get('#password').type('$Piensa1dd6');
      cy.get('#login-button').click();

      cy.contains('Wrong credentials')
          .should('have.css', 'background-color', 'rgb(248, 215, 218)');
    });
  });
  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#login-form');
      cy.get('#username').type('root');
      cy.get('#password').type('$Piensa16');
      cy.get('#login-button').click();
    });

    it('A blog can be created', function() {
      cy.contains('New Blogs').click();
      cy.get('#blog-form');
      cy.get('#title').type('Las nuevas funciones');
      cy.get('#author').type('Albert g.');
      cy.get('#url').type('google.com');
      cy.get('#likes').type('16');
      cy.get('#guardar').click();
      cy.contains('aggregate');

      cy.get('.accordion__title').contains('Las nuevas funciones');
      cy.get('#view').click();
      cy.get('.accordion__content').contains('Albert g.');
      cy.get('.accordion__content').contains('google.com');
      cy.get('.accordion__content').contains('16');
    });
  });
  describe.only('user like', function() {
    beforeEach(function() {
      cy.get('#login-form');
      cy.get('#username').type('root');
      cy.get('#password').type('$Piensa16');
      cy.get('#login-button').click();

      cy.contains('New Blogs').click();
      cy.get('#blog-form');
      cy.get('#title').type('Las nuevas funciones');
      cy.get('#author').type('Albert g.');
      cy.get('#url').type('google.com');
      cy.get('#likes').type('16');
      cy.get('#guardar').click();
      cy.contains('aggregate');
    });

    it('A blog like', function() {
      cy.get('#view').click();
      cy.get('#like').click();
      cy.get('.accordion__content').contains('17');
    });
  });
  describe.only('delete element', function() {
    beforeEach(function() {
      cy.login({username: 'root', password: '$Piensa16'});
      cy.createBlog({
        title: 'Create computer',
        author: 'Alberth Park',
        url: 'google.com',
      });

      cy.login({username: 'root', password: '$Piensa16'});
      cy.createBlog({
        title: 'Create element con react',
        author: 'Bram Mare',
        url: 'react.com',
      });
      cy.visit('http://localhost:3000');
    });
    it('delete blogs user login', function() {
      cy.get('#view').click();
      cy.get('#remove').click();
      cy.contains('deltete blog');
    });
  });
});

