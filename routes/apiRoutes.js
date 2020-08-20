const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')
const uuid = require('uuid')

// GET all notes
router.get('/notes', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

// POST one note
router.post('/notes', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let notes = JSON.parse(data)
    let note = {
      id: uuid.v1(),
      title: req.body.title,
      text: req.body.text
    }
    notes.push(note)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }

      res.json(note)
    })
  })
})

// PUT one note
// router.put('/notes/:id', (req, res) => {

//   fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
//     if (err) { console.log(err) }

//     let notes = JSON.parse(data)

//     for (let i = 0; i < notes.length; i++) {
//       if (notes[i].id === req.params.id) {
//         notes[i].text = req.body.text
//       }
//     }

//     fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
//       if (err) { console.log(err) }

//       res.sendStatus(200)
//     })
//   })
// })

// DELETE one note
router.delete('/notes/:id', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let notes = JSON.parse(data)
    notes = notes.filter(note => note.id !== req.params.id)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }

      res.sendStatus(200)
    })
  })
})

module.exports = router