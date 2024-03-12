export default class ValidadorCPF {

    testaCPF(cpf) {
        if(!this.#testaDigitos(cpf))
            return false;

        if(!this.#testaDigitosIguais(cpf))
            return false;

        if(!this.#testaDigitosVerificadores(cpf))
            return false;

        return true;
    }

    #testaDigitos(cpf) {
        const re = /^\d{11}$/;
        return re.test(cpf);
    }

    #testaDigitosIguais(cpf) {
        let digitos = cpf.split('');
        return !digitos.every(digito => digito == digitos[0]);
    }

    #testaDigitosVerificadores(cpf) {
        let digitos = cpf.split('').map(digito => parseInt(digito));
     
        let J = 0, K = 0;

        for(let i = 0; i < 9; ++i) {
            J += (10 - i) * digitos[i];
            K += (11 - i) * digitos[i];
        }

        J %= 11;
        
        if(J <= 1) J = 0;
        else J = 11 - J;

        K += 2 * J;
        K %= 11;
    
        if(K <= 1) K = 0;
        else K = 11 - K;

        return digitos[9] == J && digitos[10] == K;
    }
}
