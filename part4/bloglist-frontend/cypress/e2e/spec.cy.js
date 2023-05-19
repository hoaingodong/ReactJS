describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ngo Thi My Hoai',
      username: 'hoaihoai',
      password: '123456789'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with valid credentials', function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('hoaihoai')
      cy.get('#password')
        .type('123456789')
      cy.get('#loggin-button')
        .click()
      cy.contains('Welcome hoaihoai')
    })

    it('login fails with wrong password', function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('hoaihoai')
      cy.get('#password')
        .type('wrong')
      cy.get('#loggin-button')
        .click()

      cy.get('#error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'hoaihoai logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'hoaihoai', password: '123456789' })
    })

    it('can create new blog', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('Tu Linh')
      cy.get('#author')
        .type('My Hoai')
      cy.get('#url')
        .type('http://localhost:3000/')
      cy.contains('save')
        .click()

      cy.contains('Tu Linh - My Hoai')
    })

    it('user can like a blog', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('Chicken')
      cy.get('#author')
        .type('Dog')
      cy.get('#url')
        .type('http://localhost:3000/')
      cy.contains('save')
        .click()

      cy.contains('Chicken - Dog')
        .click()
      cy.contains('view')
        .click()
      cy.contains('0')
      cy.get('#like-button')
        .click()
      cy.contains('1')
    })

    it('user who created a blog can delete it', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('Chicken')
      cy.get('#author')
        .type('Dog')
      cy.get('#url')
        .type('http://localhost:3000/')
      cy.contains('save')
        .click()

      cy.contains('Chicken - Dog')
        .click()
      cy.contains('view')
        .click()
      cy.get('#remove-button')
        .click()

      cy.get('html').should('not.contain', 'Chicken - Dog')
    })
  })
})