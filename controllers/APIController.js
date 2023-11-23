export default class APIController {

    async example(req, res) {
        res.json({
            text: "This is an example API Route"
        })
    }

    async getTodos(req, res) {
        try {
            console.log(req.models.Todo)
            const todos = await req.models.Todo.find({}).then(function (products) {
                res.send(products);
                });
            // res.render({todos})
            
        } catch (err) {
            res.status(400).send(err)
        }
    }
}












