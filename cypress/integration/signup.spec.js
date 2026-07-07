import SignupPage from "../pages/SignupPage"
import signupFactory from "../factories/SignupFactory"


describe('Signup', function(){

    var signup = new SignupPage()

    before(function(){
        cy.log("Executado apenas uma vez antes de todos os casos de teste")
    })

    beforeEach(function(){
        cy.log("Executado sempre antes de cada caso de teste")
    })

    after(function(){
        cy.log("Executado apenas uma vez depois de todos os casos de teste")
    })

   afterEach(function(){
        cy.log("Executado sempre depois de cada caso de teste")
    })

    it('Use should be deliver', function(){

        var deliver = signupFactory.deliver()

        signup.go()

        signup.fillform(deliver)

        signup.submit()

        const mensagem = "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato."
        signup.modalContentShouldBe(mensagem)

    })


    it('Incorret document', function(){

        var deliver = signupFactory.deliver()

        deliver.cpf = "12dfgdgvdfgfdgdfggdfgfdgfdgdfgdfgdfgdf"

        signup.go()

        signup.fillform(deliver)

        signup.submit()

        cy.get('.alert-error').should('have.text', 'Oops! CPF inválido')

    })

    it('Incorret E-mail', function(){

        var deliver = signupFactory.deliver()
        deliver.email = "cesarsantos.com.br"

        signup.go()

        signup.fillform(deliver)

        signup.submit()

        cy.get('.alert-error').should('have.text', 'Oops! Email com formato inválido.')

    })

    context('Required fields', function(){
        const mensagem= [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function(){
            signup.go()
            signup.submit()
        })

        mensagem.forEach(msg => {
            it(`${msg.field} is required`, function(){
                cy.contains('.alert-error', `${msg.output}`).should('be.visible')
            })
        });
    })

    it('Required fields', function(){
        signup.go()
        signup.submit()

        cy.contains('.alert-error', 'É necessário informar o nome').should('be.visible')
        cy.contains('.alert-error', 'É necessário informar o CPF').should('be.visible')
        cy.contains('.alert-error', 'É necessário informar o email').should('be.visible')
        cy.contains('.alert-error', 'É necessário informar o CEP').should('be.visible')
        cy.contains('.alert-error', 'É necessário informar o número do endereço').should('be.visible')
        cy.contains('.alert-error', 'Selecione o método de entrega').should('be.visible')
        cy.contains('.alert-error', 'Adicione uma foto da sua CNH').should('be.visible')
    })
})