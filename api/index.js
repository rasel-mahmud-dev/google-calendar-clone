const app =require("./src/server.js")



const PORT  = process.env.PORT || 4000



app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`)  )