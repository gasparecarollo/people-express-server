const express = require('express');
const people = express.Router();
const peopleArr = require('../Data/people.json');

people.get('/', (request, response) => {
    try {
        response.status(200).json(peopleArr);
    } catch (error) {
        response.status(404).json({ error: error });
    }

})
//- Index

people.get("/:id", (request, response) => {

    try {
        const { id } = request.params;
        const people = peopleArr.find((people) => people.id === Number(id))

        if (people) {
            response.status(200).json(people)
        } else {
            throw 'Could not find person';
        }
    } catch (error) {
        response.status(404).json({ error: error })
    }

})


people.post("/", (request, response) => {
    try {
        const person = request.body;

        if (person.id) {
            peopleArr.push(person);
            response.status(200).json(peopleArr[peopleArr.length - 1])
        } else {
            throw 'Could not add person'
        }
    } catch (error) {
        response.status(400).json({ error, error })
    }

    people.put("/:id", (request, response) => {

        try {
            const { id } = request.params;
            const person = request.body;
            const index = peopleArr.findIndex((people) => {
                people.id === Number(id);
                if (index !== -1) {
                    peopleArr.splice(index, 1, person)
                    response.status(201).json(peopleArr[index])
                } else {
                    throw 'Could not update person'
                }
            })
        } catch (error) {
            response.status(400).json({ error: error })
        }
    })

    people.delete("/:id", (request, response) => {

        try {
            const { id } = request.params;
            const index = peopleArr.findIndex((people) => {
                people.id === Number(id);
            })
            if (index !== -1) {
                peopleArr.splice(index, 1)
                response.status(200).json([peopleArr])
            } else {
                throw 'Could not delete person from database'
            }
        } catch (error) {
            response.status(400).json({ error: error });
        }
    })

}) 