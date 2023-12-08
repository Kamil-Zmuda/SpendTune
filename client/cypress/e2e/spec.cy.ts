
describe('Register', () => {
  beforeEach(() => {
    cy.visit('/register');
  });


  it('should register a new user with valid information', () => {
    cy.get('input[name="email"]').type(Cypress.env('newEmail'));
    cy.get('input[name="password"]').type(Cypress.env('newPassword'));
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('DoeTheSecond');

    cy.get('form').submit();
    cy.url().should('include', '/home');

    // Assert that the user is logged in
    cy.get('.register').should('not.exist'); // Assuming the registration form is hidden after successful registration
  });

  //TODO: change script so that new user is not created
  it('should show an error message with invalid registration information', () => {
    cy.get('input[name="email"]').type('invalidemail');
    cy.get('input[name="password"]').type('short');
    cy.get('input[name="firstName"]').type('fakeName');
    cy.get('input[name="lastName"]').type('fakeLastName');

    cy.get('form').submit();

    cy.get('input[name="email"]').should('not.have.text');
  });

  it('should navigate back to the login page', () => {
    cy.get('.register__actions button:last-child').click();
    cy.url().should('include', '/login');
  });

});




describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should log in and log out with valid credentials ', () => {
    cy.get('input[name="email"]').type(Cypress.env('email'));
    cy.get('input[name="password"]').type(Cypress.env('password'));
    cy.get('form').submit();

    cy.url().should('include', '/home');
    cy.get('.login').should('not.exist');
    
    cy.contains('Logout').click();
    cy.url().should('include', '/login');
  });

  it('should show an error message with invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@email.com');
    cy.get('input[name="password"]').type('invalid_password');

    cy.get('form').submit();
    cy.url().should('include', '/login');
  });

  it('should navigate to the registration page', () => {
    cy.get('.login__register button').click();
    cy.url().should('include', '/register');
  });
});





describe('syncs and categorises transactions from new user', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(Cypress.env('email'));
    cy.get('input[name="password"]').type(Cypress.env('password'));
    cy.get('form').submit();
  })

  it.skip('syncs transactions with new bank', () => {

    cy.intercept(
      'GET',
      'http://localhost:3001/api/create-link-token',
      {
        statusCode: 200,
        body: {
          expiration: '2023-11-22T14:37:39Z',
          link_token: 'link-sandbox-8650a104-a120-436f-a660-3492b6df1b6c',
          request_id: '5vTKC9G5i2cZGVX'
        }
      }
    ).as('createLinkToken')

    cy.intercept(
      'POST',
      'http://localhost:3001/api/exchange-public-token',
      {
        statusCode: 200,
        fixture: 'user.new.json'
      }).as('exchangeToken')

    cy.intercept(
      'POST',
      'http://localhost:3001/api/sync-transactions',
      { statusCode: 200, fixture: 'user.with.trx.json' }
    ).as('syncTransactions')

    cy.intercept('**plaid.com**', { fixture: 'user.new.json' }).as('plaidIntercept');


    cy.visit('/home');

    // onBeforeLoad(win) {
    //   cy.stub(win, 'fetch')
    //     .withArgs(Cypress.sinon.match(/.*plaid.com.*/))
    //     .resolves(newUser)  
    // },

    cy.get('.navbar > :nth-child(1) > :nth-child(2)').click();
    cy.url().should('include', '/sync');

    cy.wait('@createLinkToken').then(({ response }) => {
      const publicToken = response!.body.link_token;
      cy.log('publicToken :>> ', publicToken);
    });

    cy.wait('@exchangeToken').then(inter => {
      cy.log('@exchangeToken - inter :>> ', inter);
    })



    // cy.wait('@plaidIntercept').then(inter => cy.log(inter.response!.statusCode.toString()));
    // cy.wait('@syncTransactions');
  });



  it('adds new category and categorises transactions', () => {

    const uuid = () => Cypress._.random(0, 1e6).toString()
    const firstCat = uuid();
    const secondCat = uuid();
    let initialUncatTransactions;
    cy.get('.transaction__row').then(rows => {
      initialUncatTransactions = rows.length
    })

    cy.get('[data-cy="btn-add-category"]').click();
    cy.get('.modal__input').eq(0).type(firstCat);
    cy.get('.btn').eq(0).click();

    cy.contains('Add category').eq(0).click();
    cy.get('.modal__input').eq(0).type(secondCat);
    cy.get('.btn').eq(0).click();

    cy.get('.transaction__dropdown').eq(1)
      .select(firstCat);
    cy.get('.transaction__dropdown').eq(3)
      .select(secondCat).then(el => {
        cy.get('.transaction__row').should('have.length', 4);
      });

  });
});





const newUser = {
  "_id": {
    "$oid": "655ccd2b7205ff8de3e0533a"
  },
  "email": "juancamilo210@gmail.com",
  "password": "$2b$10$w3zCiDnBxxBb4qK1sn5NiOOO754t/uLFbWkWf5pxnDyi4JaysEbSy",
  "firstName": "juan",
  "lastName": "v",
  "accessToken": "",
  "linkedBanks": [],
  "next_cursor": "CAESJTlQcjFEd2V2VkFpYXFNTk5xYnY5Q3l3UmtramxscXVxUUt4QkEiDAiMpvOqBhDok/ikAioMCIym86oGEOiT+KQC",
  "transactions": [],
  "transactionsCategorized": [],
  "categories": [],
  "__v": 2
}