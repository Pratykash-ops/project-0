
export default async function handler(req, res) {
    try{
        const url = atob(req.query.pq)
        res.redirect(url)
    }
    catch{
        res.status(400).send("An unexpected error occured")
    }
    
}