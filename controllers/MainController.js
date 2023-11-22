class MainController {

    example(req, res) {
        res.render("example.ejs", {
            text: "This is an example API Route"
        })
    }

    index(req, res){
        const Todo = req.models.Todo
        Todo.find({}, (err, todos) => {
            if (err) {
                res.status(400).send(err)
            }
            else {
                res.render("index.ejs", {todos})
            }
        })
    }

}

export default MainController