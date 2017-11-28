/*

For companies in our collection founded in 2004 and having 5 or more rounds of funding, calculate the average amount raised in each round of funding.
Which company meeting these criteria raised the smallest average amount of money per funding round? You do not need to distinguish between currencies.
Write an aggregation query to answer this question.

As a check on your solution, Facebook had the largest funding round average.

*/

db.companies.aggregate([
  { $match: { "founded_year": { $eq: 2004 } } },
  { $project: { name: 1, "funding_year": 1, _id: 0, "funding_rounds": 1, rounds: { $size: "$funding_rounds"}} },
  { $match: { "rounds": { $gte: 5 } } },
  { $unwind: "$funding_rounds"},
  { $group: {
    _id: { "name": "$name"},
    funding: { $avg: "$funding_rounds.raised_amount" }
  }},
  { $sort: { "funding": -1 } }
])

