/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cohorts').del()
  await knex('cohorts').insert([
    { name: 'Cohort 1', members: 'test1,test2,test3,test4,test5', logoUrl: 'http://placeimg.com/640/480' },
    { name: 'Cohort 2', members: 'test1,test2', logoUrl: 'http://placeimg.com/640/480' },
    { name: 'Cohort 3', members: 'test1,test2,test3,test4,test5,test6,test7,test8', logoUrl: 'http://placeimg.com/640/480' },
    { name: 'Cohort 4', members: 'test1,test2,test3', logoUrl: 'http://placeimg.com/640/480' }
  ]);
};
