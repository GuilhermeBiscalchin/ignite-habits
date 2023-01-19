//para gerar as datas do ano e ter o retorno em tela.

import dayjs from "dayjs";

export function generateDatesFromYearBeginning() {
  const primeiroDiaDoAno = dayjs().startOf("year");
  const hoje = new Date();

  const datas = [];
  let compararData = primeiroDiaDoAno;

  while (compararData.isBefore(hoje)) {
    datas.push(compararData.toDate());
    compararData = compararData.add(1, "day");
  }

  return datas;
}
