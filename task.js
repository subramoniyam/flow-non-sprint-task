const express = require('express')
const app = express()

app.use(express.json())

app.listen(3000, (req, res) => {
  console.log('Server is started...')
})



let books = []

app.post('/add_book', (req, res) => {

  let book = req.body.book_name
  let author = req.body.author
  let category = req.body.category
  let purchase_date = req.body.purchase_date

  
  let new_book = {"book_name": book, "author": author, "category": category, "purchase_date": purchase_date}
  books.push(new_book)
  res.json({"message":"Successfully Inserted"})
})

app.post('/delete_book', (req, res) => {
  let author = req.body.author
  let new_book = books.filter((book) => book.author !== author)
  books = new_book
  res.json("Successfully Deleted")
})

app.post('/list_books', (req, res) => {

  let req_author = req.body.author
  let req_purchase_date = req.body.purchase_date
  let results = ""

  console.log(req_author)
  console.log(req_purchase_date)
  if(req_purchase_date){
    results = books.filter((book) => book.purchase_date == req_purchase_date)
    console.log(results)
    res.send(results)
  }else if(req_author){
    results = books.filter((book) => book.author == req_author)
    console.log(results)
    res.send(results)
  }else{
    console.log(books)
    res.send(books)
  }
})