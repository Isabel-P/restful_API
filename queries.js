const Pool = require('pg').Pool //data 
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'hunger',
  port: 5432,
})



const getFood = (request, response) => {
    //query -- select all from food database, order by id... returns all food and ratings
    pool.query('SELECT * FROM food ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }



  const getFoodById = (request, response) => {
    const id = parseInt(request.params.id)
  //bring back item from data base
    pool.query('SELECT * FROM food WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }



  const createFood = (request, response) => {
    const { food, rating } = request.body
  // creating a post request for new food + rating
    pool.query('INSERT INTO food (food, rating) VALUES ($1, $2) RETURNING *', [food, rating], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Food added with ID: ${results.rows[0].id}`)
    })
  }


//updating the data set with new raiting 
  const updateFood = (request, response) => {
    const id = parseInt(request.params.id)
    const { food, rating } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [food, rating, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Food modified with ID: ${id}`)
      }
    )
  }



  const deleteFood = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM food WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Food deleted with ID: ${id}`)
    })
  }


  module.exports = {
    getFood,
    getFoodById,
    createFood,
    updateFood,
    deleteFood,
  }