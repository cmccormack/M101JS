/*
There are documents for each student (student_id) across a variety of classes (class_id). Note that not all students in the same class have the same exact number of assessments.
Some students have three homework assignments, etc.

Your task is to calculate the class with the best average student performance.
This involves calculating an average for each student in each class of all non-quiz assessments and then averaging those numbers to get a class average.
To be clear, each student's average should include only exams and homework grades. Don't include their quiz scores in the calculation.
What is the class_id which has the highest average student performance? Choose the correct class_id below.
*/



db.grades.aggregate([
  { $project: { _id: 0 } },
  { $unwind: "$scores"},
  { $match: { "scores.type": { $ne: 'quiz' } } }
])

/*  Results:
...
{ "student_id" : 0, "class_id" : 28, "scores" : { "type" : "exam", "score" : 39.17749400402234 } }
{ "student_id" : 0, "class_id" : 28, "scores" : { "type" : "homework", "score" : 20.81782269075502 } }
...
*/


db.grades.aggregate([
  { $project: { _id: 0 } },
  { $unwind: "$scores"},
  { $match: { "scores.type": { $ne: 'quiz' } } },
  { $group: {
    _id: { class_id: "$class_id" },
    scores: { $avg:  { $sum: [ "$scores.score" ] }}
  }},
  { $sort: { "scores": -1 }}
])