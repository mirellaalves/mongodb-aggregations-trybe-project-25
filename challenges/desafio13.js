// Desafio 13
// Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos. Arredonde o resultado para cima.
// O resultado da sua query deve ter o seguinte formato:
// { "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }
db.trips.aggregate([
  { $match: {
    startTime: { $gte: ISODate("2016-03-10T00:00:00Z"), $lte: ISODate("2016-03-10T23:59:59Z")}
  }},
  { $project: {
    _id: 0,
    duracaoEmMinutos: {
      $divide: [
        { $subtract: [ "$stopTime", "$startTime" ] }, 1000*60
      ]
    }
  }},
  { $group: {
    _id: null,
    duracaoMediaEmMinutos: { $avg: "$duracaoEmMinutos" }
  }},
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" }
  }}
]);
