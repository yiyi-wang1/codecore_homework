const express = require('express');
const router = express.Router();
const knex = require('../db/client');

//Create new cohorts
router.get("/new", (req, res) => {
    res.render('cohorts/new');
})

router.post("/new", (req, res) => {
    knex('cohorts').insert({
        name: req.body.cohort_name,
        members: req.body.members,
        logoUrl: req.body.logoUrl
    })
        .returning('*')
        .then(cohorts => {
            const newCohort = cohorts[0];
            res.redirect(`/cohorts/${newCohort.id}`);
        })
})

//view all cohorts
router.get('/', (req, res) => {
    knex('cohorts').orderBy('id', 'asc').then(cohorts => {
        if (cohorts) {
            res.render('cohorts/all', { cohorts: cohorts });
        } else {
            res.send("Cannot find cohorts");
        }
    })
})

//view single cohorts
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const teamMethod = req.query.teamMethod;
    const quantity = req.query.quantity;
    knex('cohorts').where('id', id).first().then(cohort => {
        if (cohort) {
            let arr;
            let err;
            const membersArr = cohort.members.split(",").filter(x => x);
            if (quantity && teamMethod) {
                if (quantity > membersArr.length || quantity < 1) {
                    err = "Quantity should be between 1 and the number of members!";
                } else {
                    //shuffle -> random pick
                    for (let i = membersArr.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        const temp = membersArr[i];
                        membersArr[i] = membersArr[j];
                        membersArr[j] = temp;
                    }
                    let teamNum;
                    if (teamMethod == 'Team Count') {
                        teamNum = quantity;
                    } else {
                        teamNum = Math.round(membersArr.length / quantity);
                    }
                    arr = Array.from({ length: teamNum }, (v) => []);
                    let k = membersArr.length - 1;
                    while (k >= 0) {
                        for (let i = 0; i < teamNum; i++) {
                            if (k >= 0) {
                                arr[i].push(membersArr[k]);
                                k--;
                            }
                        }
                    }
                }
            }
            res.render('cohorts/show', { cohort: cohort, err: err, arr: arr });
        } else {
            res.send(`Cannot find cohort with id: ${id}`);
        }
    })
})

//Edit single cohort
//show the edit page
router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    knex('cohorts').where('id', id).first().then(cohort => {
        if (cohort) {
            res.render('cohorts/edit', { cohort: cohort })
        } else {
            res.send(`Cannot find cohort with id: ${id}`);
        }
    })
})

//edit single cohort
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    knex('cohorts').where('id', id).first().update({
        name: req.body.cohort_name,
        members: req.body.members,
        logoUrl: req.body.logoUrl
    }).returning('*').then(cohorts => {
        const updatedCohort = cohorts[0];
        res.redirect(`/cohorts/${updatedCohort.id}`);
    })
})

//Delete single cohort
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    knex('cohorts').where('id', id).first().del().then(() => {
        res.redirect('/cohorts');
    })
})

module.exports = router;