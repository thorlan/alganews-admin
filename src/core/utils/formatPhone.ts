
export default function formatPhone(numeroTelefone: string) {

    const ddd = numeroTelefone.split('').slice(0, 2).join('');
    const primeiroBloco = numeroTelefone.split('').slice(2, 7).join('');
    const ultimoBloco = numeroTelefone.split('').slice(7, 11).join('');

    return `(${ddd}) ${primeiroBloco}-${ultimoBloco}`

}