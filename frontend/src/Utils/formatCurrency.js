export function formatToCurrencyBr(value) {
  let valueFormated = ''
    if (value !== '' || value !== null){
      valueFormated = parseFloat(value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }
  
    return valueFormated;
}