class MainController {

    async example(req, res) {
        res.render("example.ejs", {
            text: "This is an example API Route"
        })
    }

    async index(req, res) {
        const Todo = req.models.Todo

        try {
            const todos = await Todo.find({})
            res.render("index.ejs", { todos })
        } catch (err) {
            res.status(400).send(err)
        }
    }

    async new(req, res) {
        res.render("new.ejs")
    }

    async create(req, res) {
        const Todo = req.models.Todo
        req.body.completed = false
        try {
            const todo = await Todo.create(req.body)
            res.redirect("/")
        } catch (err) {
            res.status(400).send(err)
        }
    }

    async show(req, res) {
        const id = req.params.id
        const Todo = req.models.Todo
        try {
            const todo = await Todo.findById(id).then(function (todo) {
                console.log(todo)
                res.render("show.ejs", { todo })
        });
            // res.render("show.ejs", { todos })
        } catch (err) {
            res.status(400).send(err)
        }
    }

    async complete(req, res) {
        const id = req.params.id
        const Todo = req.models.Todo
        try {
            const todo = await Todo.findByIdAndUpdate(id, { completed: true }, { new: true })
            res.redirect("/")
        } catch (err) {
            res.status(400).send(err)
        }
    }

    async destroy(req, res) {
        const id = req.params.id
        const Todo = req.models.Todo
        try {
            const todo = await Todo.findByIdAndDelete(id)
            res.redirect("/")
        } catch (err) {
            console.log(err)
        }

    }

}

export default MainController